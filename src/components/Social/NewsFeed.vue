<template>
  <div>
    <UserProfile />
    <div class="container mt-4">
      <h1>Fil d'actualité</h1>

      <!-- Navigation buttons for hashtags -->
      <div class="hashtag-navigation-buttons">
        <button class="btn btn-outline-primary" @click="navigateToHashtag('BA23')">Hashtag BA23</button>
        <button class="btn btn-outline-primary" @click="navigateToHashtag('BA24')">Hashtag BA24</button>
      </div>

      <!-- Post creation form -->
      <div class="post-form">
        <textarea v-model="newPost" placeholder="Écrivez quelque chose..."></textarea>
        <select v-model="postType">
          <option value="hashtag">Hashtag (#)</option>
          <option value="mention">@Mention (Group)</option>
        </select>
        <input v-if="postType === 'mention'" v-model="mentionGroup" placeholder="Entrez le groupe (@BA23, @BA24, etc.)">
        <button @click="postMessage">Poster</button>
      </div>

      <!-- Displaying posts -->
      <div class="feed">
        <div v-for="(post, index) in posts" :key="index" class="post">
          <p><strong>{{ post.author }}</strong>: {{ post.content }}</p>
          <p v-if="post.responseTo"><strong>Réponse à:</strong> {{ post.responseTo.content }}</p>
          <button v-if="currentUser" @click="toggleReplyForm(index)">Répondre</button>
          
          <!-- Reply form -->
          <div v-if="replyForms[index]" class="reply-form">
            <textarea v-model="replyContent[index]" placeholder="Écrire une réponse..."></textarea>
            <button @click="submitReply(post, index)">Envoyer</button>
          </div>
          
          <!-- Display replies -->
          <div v-if="post.replies" class="replies">
            <div v-for="(reply, replyIndex) in post.replies" :key="replyIndex" class="reply">
              <p><strong>{{ reply.author }}</strong>: {{ reply.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref as dbRef, push, set, onValue, serverTimestamp } from "firebase/database";
import { db, auth } from '../../../firebase.js'; 
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '@/components/Utils/Navbar.vue';
import UserProfile from '@/components/Social/UserProfile.vue';

export default {
  name: "NewsFeed",
  components: {
    Navbar,
    UserProfile
  },
  data() {
    return {
      posts: [],
      newPost: '',
      postType: 'hashtag', // Default to hashtag
      mentionGroup: '', // To store the group for @mention messages
      currentUser: null,
      replyForms: [], // Array to keep track of which posts' reply forms are open
      replyContent: [] // Array to keep track of reply content for each post
    };
  },
  methods: {
    navigateToHashtag(hashtag) {
      this.$router.push({ name: 'HashtagPage', params: { hashtag } });
    },
    postMessage() {
      if (this.newPost.trim() === '') {
        alert("Veuillez écrire quelque chose avant de poster.");
        return;
      }

      let newPostRef;
      let postData = {
        author: this.currentUser.email,
        content: this.newPost,
        timestamp: serverTimestamp(),
        replies: []  // Initialize replies as an empty array
      };

      if (this.postType === 'hashtag') {
        newPostRef = push(dbRef(db, 'hashtagMessages'));
      } else if (this.postType === 'mention' && this.mentionGroup.trim() !== '') {
        postData.group = this.mentionGroup.replace('@', ''); // Save the group without '@'
        newPostRef = push(dbRef(db, 'mentionMessages'));
      } else {
        alert("Veuillez entrer un groupe valide pour le message @mention.");
        return;
      }

      set(newPostRef, postData);
      this.newPost = ''; // Clear the textarea after posting
      this.mentionGroup = ''; // Clear the mention group input
    },
    fetchPosts() {
      // Fetch both hashtag and mention messages
      const hashtagRef = dbRef(db, 'hashtagMessages');
      onValue(hashtagRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.posts = Object.entries(data).map(([key, post]) => ({
            ...post,
            id: key  // Use the Firebase key for each post
          }));
        } else {
          this.posts = [];
        }
      });

      const mentionRef = dbRef(db, 'mentionMessages');
      onValue(mentionRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.posts.push(...Object.entries(data).map(([key, post]) => ({
            ...post,
            id: key  // Use the Firebase key for each post
          })));
        }
      });
    },
    toggleReplyForm(index) {
      this.$set(this.replyForms, index, !this.replyForms[index]); // Toggle the reply form visibility
      if (!this.replyForms[index]) {
        this.$set(this.replyContent, index, ''); // Clear the reply content if the form is closed
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
      const postRef = dbRef(db, `${post.group ? 'mentionMessages' : 'hashtagMessages'}/${post.id}/replies`);
      push(postRef, newReply);

      // Clear the reply form and hide it
      this.$set(this.replyContent, index, '');
      this.$set(this.replyForms, index, false);
    }
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = user;
        this.fetchPosts();
      } else {
        this.currentUser = null;
      }
    });
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

.post-form {
  margin-bottom: 20px;
}

.feed {
  margin-top: 20px;
}

.post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.reply-form {
  margin-top: 10px;
  margin-bottom: 20px;
}

.hashtag-navigation-buttons {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

button {
  margin-top: 10px;
}
</style>
