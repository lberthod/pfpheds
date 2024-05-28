<template>
  <Navbar />
  <section class="surface-section px-4 py-8 md:px-6 lg:px-8">
    <div class="container flex justify-center">
      <!-- Column for Cards -->
      <div class="flex-grow">
        <h1 class="text-900 font-bold text-5xl text-center">Institutions</h1>
        <p class="text-600 font-normal text-xl text-center">Découvrez les institutions partenaires de notre réseau</p>
        <div class="grid flex justify-center">
          <div class="col-12 md:col-6 xl:col-3 p-3 flex justify-center" v-for="institution in paginatedInstitutions" :key="institution.id" style="">

            <Card style="width: 20rem; height: 35rem; display: flex; flex-direction: column; justify-content: space-between;">
              <template #header>
                <div style="position: relative;">
                  <img :src="institution.imageUrl || '/default-image.jpg'" alt="institution" class="card-image" />
                  <Tag style="position: absolute; top: 20px; left: 20px;">{{ institution.Canton }}</Tag>
                </div>
                <p class="text-center text-2xl text-900 font-bold">{{ institution.Name }}</p>
              </template>
              <template #subtitle>
                <div class="text-center">
                  <p>{{ institution.Lieu }} <Tag>{{ institution.Langue }}</Tag></p>
                </div>
              </template>
              <template #content>
                <div class="flex gap-3 justify-content-around">
                  <Button @click="goToDetails(institution.id)" label="Détails" icon="pi pi-info-circle" class="p-button-text" />
                  <a :href="institution.URL" target="_blank" class="p-button p-component " rel="noopener noreferrer">
                    <span class="p-button-icon pi pi-external-link"></span>
                    <span class="p-button-label ml-2">Site web</span>
                  </a>
                </div>
              </template>
            </Card>
          </div>
        </div>

        <Paginator :rows="itemsPerPage" :totalRecords="totalInstitutions" :rowsPerPageOptions="[12, 24, 36, 48, 60, 72, 84]" @page="onPageChange"></Paginator>
      </div>
    </div>
  </section>

  <AppDarkAndLightMode />
  <Footer />
</template>

<script>
import { db } from '../../../firebase.js';
import { ref, onValue } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import AppDarkAndLightMode from '@/layout/AppDarkAndLightMode.vue';
import Navbar from '@/components/Utils/Navbar.vue';
import Footer from '@/components/Utils/Footer.vue';



export default {
  components: { Navbar, Footer, AppDarkAndLightMode },
  data() {
    return {
      allInstitutions: [],
      institutionDetailsPath: '/institution/',
      institutions: [],
      currentPage: 1,
      itemsPerPage: 12,
      totalInstitutions: 0,
      category: {
        title: "Catégories",
        categories: {
          AIGU: false,
          REA: false,
          MSQ: false,
          SYSINT: false,
          NEURO_GER: false,
          AMBU: false,
        }
      },
      language: {
        Français: false,
        Allemand: false,
        Anglais: false,
        Italien: false,
      },
      level: {
        PFP1A: false,
        PFP1B: false,
        PFP2: false,
        PFP3: false,
        PFP4: false,
      },
      canton: {
        title: "Cantons",
        cantons: {
          AG: false,
          AI: false,
          AR: false,
          BE: false,
          BL: false,
          BS: false,
          FL: false,
          FR: false,
          GE: false,
          GL: false,
          GR: false,
          JU: false,
          LU: false,
          NE: false,
          NW: false,
          OW: false,
          SG: false,
          SH: false,
          SO: false,
          SZ: false,
          TG: false,
          TI: false,
          UR: false,
          VD: false,
          VS: false,
          ZH: false,
          ZG: false,
          Étranger: false,
        }
      }
    };
  },
  computed: {
    paginatedInstitutions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      console.log("Paginating from:", start, "to", end); // Debug information
      return this.allInstitutions.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.totalInstitutions / this.itemsPerPage);
    },
  },
  methods: {
    fetchInstitutionsFromFirebase() {
      const institutionsRef = ref(db, 'institutions/');
      onValue(institutionsRef, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const imagePromises = Object.keys(data).map(async key => {
            const institution = { id: key, ...data[key] };
            if (institution.imagePath) {
              const imageRef = storageRef(storage, institution.imagePath);
              institution.imageSrc = await getDownloadURL(imageRef).catch(() => 'https://eduport.webestica.com/assets/images/courses/4by3/21.jpg');
            } else {
              institution.imageSrc = 'https://eduport.webestica.com/assets/images/courses/4by3/21.jpg'; // Chemin d'une image par défaut si aucune image n'est fournie
            }
            if (institution.URL && !institution.URL.startsWith('http')) {
              institution.URL = 'http://' + institution.URL;
            }
            return institution;
          });
          this.allInstitutions = await Promise.all(imagePromises);
          this.totalInstitutions = this.allInstitutions.length;
        } else {
          this.allInstitutions = [];
          this.totalInstitutions = 0;
        }
      });
    },
    updatePageData() {
      if (this.currentPage > this.totalPages) {
        this.currentPage = Math.max(1, this.totalPages);
      }
      if (this.currentPage === 0 && this.totalInstitutions > 0) {
        this.currentPage = 1;
      }
    },
    onPageChange(event) {
      this.currentPage = event.page;
      this.itemsPerPage = event.rows;
      this.$nextTick(() => {
        this.updatePageData();
      });
    },
    addToFavorites(id) {
      console.log("Added to favorites: ", id);
    },
    goToDetails(id) {
      if (id) {
        this.$router.push({ name: 'InstitutionView', params: { id: id } });
      } else {
        console.error("ID is undefined for this institution.");
      }
    },

  },
  mounted() {
    this.fetchInstitutionsFromFirebase();
  }
}
</script>

<style scoped>
.card-image {
  width: 100%;
  height: 15rem; /* Adjusted height */
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}

@media (min-width: 992px) { /* Adjustments for larger screens */
  .container {
    display: flex;
    justify-content: center; /* Centering the container to add space on the sides */
  }
  .grid {
    justify-content: center; /* Centering the grid */
  }
}
</style>
