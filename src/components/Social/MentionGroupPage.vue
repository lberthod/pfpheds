<template>
    <div>
      <div class="container mt-4">
        <h2>Messages pour le groupe @{{ group }}</h2>
        <div v-if="posts.length > 0">
          <div v-for="post in posts" :key="post.id" class="post">
            <div class="post-content">{{ post.content }}</div>
            <div class="post-meta">
              Posté par <router-link :to="{ name: 'UserProfile', params: { userId: post.authorId } }">@{{ post.author }}</router-link> à {{ formatTimestamp(post.timestamp) }}
            </div>
            <button v-if="currentUser" @click="toggleReplyForm(post.id)">Répondre</button>
            <div v-if="replyForms[post.id]" class="reply-form">
              <textarea v-model="replyContent[post.id]" placeholder="Écrire une réponse..."></textarea>
              <button @click="submitReply(post)">Envoyer</button>
            </div>
            <div v-if="post.replies" class="replies">
              <div v-for="(reply, index) in post.replies" :key="index" class="reply">
                <p><strong>{{ reply.author }}</strong>: {{ reply.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Aucun message trouvé pour ce groupe.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Utils/Navbar.vue';
  import { ref as dbRef, onValue, push, serverTimestamp, set } from "firebase/database";
  import { db, auth } from '../../../firebase.js';
  import { onAuthStateChanged } from 'firebase/auth';
  
  export default {
    name: 'MentionGroupPage',
    components: {
      Navbar
    },
    props: {
      group: String
    },
    data() {
      return {
        posts: [],
        replyForms: {},
        replyContent: {},
        currentUser: null
      };
    },
    created() {
      this.getCurrentUser();
      this.fetchGroupPosts();
    },
    methods: {
      getCurrentUser() {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.currentUser = user;
          } else {
            this.currentUser = null;
          }
        });
      },
      fetchGroupPosts() {
        const postsRef = dbRef(db, 'mentionMessages');
        onValue(postsRef, (snapshot) => {
          const postsData = snapshot.val();
          if (postsData) {
            this.posts = Object.values(postsData).filter(post => post.group === this.group);
          } else {
            this.posts = [];
          }
        });
      },
      toggleReplyForm(postId) {
        if (this.replyForms[postId]) {
          this.$set(this.replyForms, postId, false);
          this.$set(this.replyContent, postId, '');
        } else {
          this.$set(this.replyForms, postId, true);
        }
      },
      submitReply(post) {
        if (!this.replyContent[post.id] || this.replyContent[post.id].trim() === '') {
          alert("Veuillez écrire quelque chose avant de répondre.");
          return;
        }
  
        const newReply = {
          author: this.currentUser.email,
          content: this.replyContent[post.id],
          timestamp: serverTimestamp(),
          responseTo: {
            id: post.id,
            author: post.author,
            content: post.content
          }
        };
  
        // Add the reply to the post in Firebase
        const postRef = dbRef(db, `mentionMessages/${post.id}/replies`);
        push(postRef, newReply);
  
        // Clear the reply form and hide it
        this.$set(this.replyContent, post.id, '');
        this.$set(this.replyForms, post.id, false);
      },
      formatTimestamp(timestamp) {
        if (!timestamp) return '';
        return new Date(timestamp).toLocaleString(); // Format to local date and time
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
    margin-bottom: 20px;
  }
  </style>
  