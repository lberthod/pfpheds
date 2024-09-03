<template>
  <div>
    <UserProfile />
    <div class="container mt-4">
      <h1>Fil d'actualité</h1>

      <!-- Intégration du filtre de recherche avancée -->
      <AdvancedSearchFilter @filter-posts="applyFilters" />

      <!-- Formulaire de création de post -->
      <div class="post-form">
        <textarea v-model="newPost" placeholder="Écrivez quelque chose..." class="form-control mb-2"></textarea>
        <select v-model="postType" class="form-select mb-2">
          <option value="hashtag">Hashtag (#)</option>
          <option value="mention">@Mention (Group)</option>
        </select>
        <input v-if="postType === 'mention'" v-model="mentionGroup" placeholder="Entrez le groupe (@BA23, @BA24, etc.)" class="form-control mb-2">
        
        <!-- Champ d'entrée pour les hashtags -->
        <input v-if="postType === 'hashtag'" v-model="newHashtag" @keyup.enter="addHashtag" placeholder="Ajouter un hashtag (#BA23, #BA24, etc.)" class="form-control mb-2">
        <div v-if="hashtags.length > 0" class="hashtags-container">
          <span v-for="(hashtag, index) in hashtags" :key="index" class="badge bg-primary mr-2">
            {{ hashtag }}
            <button type="button" class="btn-close btn-sm text-white" @click="removeHashtag(index)"></button>
          </span>
        </div>
        
        <button class="btn btn-primary" @click="postMessage">Poster</button>
      </div>

      <!-- Affichage des posts avec InfiniteScroll -->
      <InfiniteScroll :loading="loading" @load-more="loadMorePosts">
        <PostItem
          v-for="(post, index) in filteredPosts"
          :key="post.id"
          :post="post"
          :currentUser="currentUser"
        />
      </InfiniteScroll>
    </div>
  </div>
</template>

<script>
import { ref as dbRef, push, set, onValue, serverTimestamp } from "firebase/database";
import { db, auth } from '../../../firebase.js'; 
import { onAuthStateChanged } from 'firebase/auth';
import UserProfile from '@/components/Social/UserProfile.vue';
import InfiniteScroll from '@/components/Social/InfiniteScroll.vue';
import PostItem from '@/components/Social/PostItem.vue';
import AdvancedSearchFilter from '@/components/Social/AdvancedSearchFilter.vue';

export default {
  name: "NewsFeed",
  components: {
    UserProfile,
    InfiniteScroll,
    PostItem,
    AdvancedSearchFilter
  },
  data() {
    return {
      posts: [],
      filteredPosts: [],
      newPost: '',
      postType: 'hashtag',
      mentionGroup: '',
      newHashtag: '',
      hashtags: [],
      currentUser: null,
      userRoles: [],
      loading: false,
      searchQuery: '',
      filterType: 'all',
      sortOrder: 'newest'
    };
  },
  methods: {
    navigateToHashtag(hashtag) {
      this.$router.push({ name: 'HashtagPage', params: { hashtag } });
    },
    navigateToMentionGroup(group) {
      if (this.hasRole(group)) {
        this.$router.push({ name: 'MentionGroupPage', params: { group } });
      } else {
        alert(`Accès refusé: Vous n'avez pas le rôle nécessaire pour accéder à @${group}.`);
      }
    },
    addHashtag() {
      if (this.newHashtag.trim() !== '' && !this.hashtags.includes(this.newHashtag)) {
        this.hashtags.push(this.newHashtag);
        this.newHashtag = '';
      }
    },
    removeHashtag(index) {
      this.hashtags.splice(index, 1);
    },
    postMessage() {
      if (this.newPost.trim() === '') {
        alert("Veuillez écrire quelque chose avant de poster.");
        return;
      }

      const newPostRef = push(dbRef(db, 'posts'));
      const postData = {
        author: this.currentUser.email,
        content: this.newPost,
        timestamp: serverTimestamp(),
        hashtags: this.hashtags,
        mentionGroups: this.mentionGroup ? [this.mentionGroup.replace('@', '')] : [],
        replies: []
      };

      set(newPostRef, postData)
        .then(() => {
          this.newPost = '';
          this.mentionGroup = '';
          this.hashtags = [];
        })
        .catch(error => {
          console.error("Erreur lors de la publication du message:", error);
        });
    },
    fetchPosts() {
      this.loading = true;

      const postsRef = dbRef(db, 'posts');
      onValue(postsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.posts = Object.entries(data).map(([key, post]) => ({
            ...post,
            id: key
          }));
          this.applyFilters();
        }
        this.loading = false;
      });
    },
    applyFilters(filterOptions = null) {
      if (filterOptions) {
        this.searchQuery = filterOptions.query;
        this.filterType = filterOptions.type;
        this.sortOrder = filterOptions.order;
      }

      let filtered = this.posts;

      if (this.searchQuery) {
        filtered = filtered.filter(post => post.content.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }

      if (this.filterType !== 'all') {
        if (this.filterType === 'hashtag') {
          filtered = filtered.filter(post => post.hashtags && post.hashtags.includes(this.searchQuery));
        } else if (this.filterType === 'mention') {
          filtered = filtered.filter(post => post.mentionGroups && post.mentionGroups.includes(this.searchQuery));
        } else if (this.filterType === 'author') {
          filtered = filtered.filter(post => post.author.toLowerCase().includes(this.searchQuery.toLowerCase()));
        }
      }

      if (this.sortOrder === 'newest') {
        filtered.sort((a, b) => b.timestamp - a.timestamp);
      } else {
        filtered.sort((a, b) => a.timestamp - b.timestamp);
      }

      this.filteredPosts = filtered;
    },
    loadMorePosts() {
      // Logic for infinite scroll (fetching more posts)
      this.fetchPosts(); // Re-fetch for simplicity, improve with pagination logic
    },
    hasRole(role) {
      return this.userRoles.includes(role);
    }
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = user;
        this.fetchPosts();

        const userRef = dbRef(db, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          if (userData && userData.roles) {
            this.userRoles = Object.keys(userData.roles);
          }
        });
      } else {
        this.currentUser = null;
        this.userRoles = [];
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

.navigation-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.post-form {
  margin-bottom: 20px;
}

.hashtags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}

.feed {
  margin-top: 20px;
}
</style>
