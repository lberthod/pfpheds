<!-- components/Social/PostItem.vue -->
<template>
    <div class="post-item">
      <div class="post-header">
        <img :src="defaultAvatar" alt="Avatar" class="avatar">
        <div class="post-author">
          <strong>{{ post.author }}</strong> 
          <span class="post-date">{{ formatTimestamp(post.timestamp) }}</span>
        </div>
      </div>
      <div class="post-content">{{ post.content }}</div>
      <div class="post-actions">
        <button @click="toggleReplyForm" class="btn btn-link">Répondre</button>
      </div>
      
      <!-- Formulaire de réponse -->
      <div v-if="showReplyForm" class="reply-form">
        <textarea v-model="replyContent" placeholder="Écrire une réponse..." class="form-control mb-2"></textarea>
        <button @click="submitReply" class="btn btn-secondary">Envoyer</button>
      </div>
      
      <!-- Affichage des réponses -->
      <div v-if="post.replies && post.replies.length > 0" class="replies">
        <div v-for="(reply, index) in post.replies" :key="index" class="reply">
          <div class="reply-header">
            <img :src="defaultAvatar" alt="Avatar" class="avatar">
            <div class="reply-author">
              <strong>{{ reply.author }}</strong> 
              <span class="reply-date">{{ formatTimestamp(reply.timestamp) }}</span>
            </div>
          </div>
          <div class="reply-content">{{ reply.content }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref as dbRef, push, serverTimestamp } from "firebase/database";
  import { db } from '../../../firebase.js';
  
  export default {
    name: "PostItem",
    props: {
      post: Object,
      currentUser: Object,
    },
    data() {
      return {
        showReplyForm: false,
        replyContent: '',
        defaultAvatar: new URL('@/assets/images/avatar/avatar99.png', import.meta.url).href,
      };
    },
    methods: {
      toggleReplyForm() {
        this.showReplyForm = !this.showReplyForm;
        if (!this.showReplyForm) {
          this.replyContent = '';
        }
      },
      submitReply() {
        if (!this.replyContent.trim()) {
          alert("Veuillez écrire quelque chose avant de répondre.");
          return;
        }
  
        const newReply = {
          author: this.currentUser.email,
          content: this.replyContent,
          timestamp: serverTimestamp(),
          responseTo: {
            id: this.post.id,
            author: this.post.author,
            content: this.post.content
          }
        };
  
        const postRef = dbRef(db, `${this.post.group ? 'mentionMessages' : 'hashtagMessages'}/${this.post.id}/replies`);
        push(postRef, newReply);
  
        this.replyContent = '';
        this.showReplyForm = false;
      },
      formatTimestamp(timestamp) {
        if (!timestamp) return '';
        return new Date(timestamp).toLocaleString();
      }
    }
  };
  </script>
  
  <style scoped>
  .post-item {
    padding: 15px;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .post-item:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
  
  .post-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .post-author {
    font-weight: bold;
    color: #333;
  }
  
  .post-content {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 1.1em;
    color: #555;
  }
  
  .post-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .reply-form {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  
  .replies {
    margin-top: 10px;
    padding-left: 20px;
    border-left: 2px solid #f0f0f0;
  }
  
  .reply {
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 6px;
    margin-bottom: 5px;
    position: relative;
    transition: background-color 0.3s ease;
  }
  
  .reply:hover {
    background-color: #f0f0f0;
  }
  
  .reply-header {
    display: flex;
    align-items: center;
  }
  
  .reply-author {
    font-weight: bold;
    margin-right: 10px;
  }
  </style>
  