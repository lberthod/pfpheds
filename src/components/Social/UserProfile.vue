<template>
  <div>
    <Navbar />
    <div class="container mt-4">
      <h2>Profil de {{ user ? user.fullName : 'Utilisateur' }}</h2>
      <div v-if="user">
        <p><strong>Nom complet:</strong> {{ user.fullName }}</p>
        <p><strong>Bio:</strong> {{ user.bio }}</p>
        <p v-if="user.roles"><strong>Rôles:</strong> {{ user.roles.join(', ') }}</p>
        <!-- Display more user information here -->
      </div>
      <div v-else>
        <p>Utilisateur non trouvé.</p>
      </div>

      <div class="posts mt-4">
        <h3>Messages de {{ user ? user.fullName : 'Utilisateur' }}</h3>
        <div v-if="userPosts.length > 0">
          <div v-for="post in userPosts" :key="post.id" class="post">
            <div class="post-content">{{ post.content }}</div>
            <div class="post-meta">{{ formatTimestamp(post.timestamp) }}</div>
          </div>
        </div>
        <div v-else>
          <p>Aucun message trouvé pour cet utilisateur.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Utils/Navbar.vue';
import { ref as dbRef, onValue } from "firebase/database";
import { db, auth } from '../../../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'UserProfile',
  components: {
    Navbar
  },
  data() {
    return {
      user: null,
      userPosts: [],
      userId: null, // Store the authenticated user's ID
    };
  },
  created() {
    this.getCurrentUser();
  },
  methods: {
    getCurrentUser() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userId = user.uid; // Get the authenticated user's ID
          this.fetchUserProfile();
          this.fetchUserPosts();
        } else {
          this.user = null;
          this.userPosts = [];
        }
      });
    },
    fetchUserProfile() {
      if (!this.userId) return;

      const userRef = dbRef(db, `users/${this.userId}`);
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          this.user = {
            fullName: userData.fullName || 'Nom inconnu',
            bio: userData.bio || 'Pas de bio disponible',
            roles: userData.roles ? Object.keys(userData.roles) : []
          };
        } else {
          this.user = null;
        }
      });
    },
    fetchUserPosts() {
      if (!this.userId) return;

      const postsRef = dbRef(db, 'posts');
      onValue(postsRef, (snapshot) => {
        const postsData = snapshot.val();
        if (postsData) {
          this.userPosts = Object.values(postsData).filter(post => post.authorId === this.userId);
        }
      });
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

.post-meta {
  font-size: 0.8em;
  color: #999;
}
</style>
