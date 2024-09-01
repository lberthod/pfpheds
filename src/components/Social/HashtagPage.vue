<template>
  <div>
    <Navbar />
    <div class="container mt-4">
      <h2>Posts avec #{{ hashtag }}</h2>
      <div v-if="posts.length > 0">
        <div v-for="(post, index) in posts" :key="post.id" class="post">
          <div class="post-content">{{ post.content }}</div>
          <div class="post-meta">
            Posté par <router-link :to="{ name: 'UserProfile', params: { username: post.author } }">@{{ post.author }}</router-link> à {{ formatTimestamp(post.timestamp) }}
          </div>

          <!-- Reply form -->
          <button v-if="currentUser" @click="toggleReplyForm(index)">Répondre</button>
          <div v-if="replyForms[index]" class="reply-form">
            <textarea v-model="replyContent[index]" placeholder="Écrire une réponse..."></textarea>
            <button @click="submitReply(post, index)">Envoyer</button>
          </div>
          
          <!-- Display replies -->
          <div v-if="post.replies" class="replies">
            <div v-for="(reply, replyIndex) in post.replies" :key="replyIndex" class="reply">
              <p><strong>{{ reply.author }}</strong>: {{ reply.content }}</p>
              <p class="reply-meta">à {{ formatTimestamp(reply.timestamp) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Aucun post trouvé pour ce hashtag.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Utils/Navbar.vue';
import { ref as dbRef, onValue, push, set, serverTimestamp } from "firebase/database";
import { db, auth } from '../../../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'HashtagPage',
  components: {
    Navbar
  },
  props: {
    hashtag: String
  },
  data() {
    return {
      posts: [],
      replyForms: [], // To track visibility of reply forms
      replyContent: [], // To store reply content for each post
      currentUser: null // Track the logged-in user
    };
  },
  created() {
    this.fetchHashtagPosts();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  },
  methods: {
    fetchHashtagPosts() {
      const postsRef = dbRef(db, 'posts');
      onValue(postsRef, (snapshot) => {
        const postsData = snapshot.val();
        if (postsData) {
          this.posts = Object.entries(postsData).map(([id, post]) => ({
            ...post,
            id
          })).filter(post => post.content.includes(`#${this.hashtag}`));
        }
      });
    },
    formatTimestamp(timestamp) {
      if (!timestamp) return '';
      return new Date(timestamp).toLocaleString(); // Format to local date and time
    },
    toggleReplyForm(index) {
      this.replyForms[index] = !this.replyForms[index]; // Toggle visibility of reply form
      if (!this.replyForms[index]) {
        this.replyContent[index] = ''; // Clear reply content if form is closed
      }
    },
    submitReply(post, index) {
      if (!this.replyContent[index] || this.replyContent[index].trim() === '') {
        alert("Veuillez écrire quelque chose avant de répondre.");
        return;
      }

      const newReply = {
        author: this.currentUser.email,
        content: this.replyContent[index],
        timestamp: serverTimestamp(),
        responseTo: {
          id: post.id,
          author: post.author,
          content: post.content
        }
      };

      // Add the reply to the post in Firebase
      const postRef = dbRef(db, `posts/${post.id}/replies`);
      push(postRef, newReply);

      // Clear the reply form and hide it
      this.replyContent[index] = '';
      this.replyForms[index] = false;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

.post {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}

.reply-form {
  margin-top: 10px;
  margin-bottom: 10px;
}

.reply-meta {
  font-size: 0.8em;
  color: gray;
}
</style>
