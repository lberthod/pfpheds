<!-- src/components/Education/IntroductionComponent.vue -->
<template>
  <div>
    <!-- 
      Transition pour animer le changement de page.
      mode="out-in" attend la fin de la transition de sortie
      avant de jouer la transition d’entrée.
    -->
    <transition name="fade" mode="out-in">
      <!-- Page 1 : Introduction Générale -->
      <section
        v-if="currentView === 'pageUn'"
        key="pageUn"
        class="introduction-section"
      >
        <header class="introduction-header">
          <h1 class="section-title">Introduction Générale</h1>
          <p class="section-subtitle">
            Comprendre l'impact des technologies digitales sur le secteur de la santé.
          </p>
        </header>

        <!-- Sujet 1 : Impacts Humains de la Technologie -->
        <article class="topic-block">
          <h2 class="article-title">1. Impacts Humains de la Technologie</h2>
          <p>
            Les nouvelles technologies transforment la manière dont nous travaillons et interagissons dans le secteur de la santé. Elles facilitent la collaboration à distance, améliorent les diagnostics grâce à l'intelligence artificielle et optimisent la prise de décision médicale.
          </p>
          <p>
            <strong>Points-clés :</strong>
            <ul>
              <li>Collaboration en réseau avec des professionnels dispersés géographiquement.</li>
              <li>Utilisation de l'IA pour diagnostiquer des maladies et interpréter des images médicales.</li>
              <li>Optimisation des décisions médicales pour des traitements plus appropriés.</li>
            </ul>
          </p>
        </article>

        <!-- Bouton pour passer à la page deux -->
        <footer class="introduction-footer">
          <button class="btn-next-page" @click="currentView = 'pageDeux'">
            Passer à la Section Suivante
          </button>
        </footer>
      </section>

      <!-- Page 2 : Enjeux et Défis des Institutions -->
      <section
        v-else-if="currentView === 'pageDeux'"
        key="pageDeux"
        class="introduction-section"
      >
        <header class="introduction-header">
          <h1 class="section-title">2. Enjeux et Défis des Institutions</h1>
        </header>

        <!-- Sujet 2 : Enjeux pour les Entreprises et Institutions -->
        <article class="topic-block">
          <h2 class="article-title">Enjeux pour les Entreprises et Institutions</h2>
          <p>
            L'intégration des technologies digitales dans les institutions de santé présente de nombreux enjeux. Il s'agit notamment de la gestion efficace des données, de la performance au travail, et de la santé au travail. Ces défis peuvent avoir des effets positifs ou négatifs selon la manière dont les technologies sont mises en œuvre.
          </p>
          <p>
            <strong>Points-clés :</strong>
            <ul>
              <li>Gestion sécurisée des données sensibles des patients.</li>
              <li>Amélioration de la performance et de l'efficacité des équipes médicales.</li>
              <li>Prévention des risques liés à une utilisation intensive des technologies.</li>
            </ul>
          </p>
        </article>

        <!-- Bouton pour passer à la page suivante -->
        <footer class="introduction-footer">
          <button class="btn-next-page" @click="currentView = 'pageTrois'">
            Avancer vers la Prochaine Section
          </button>
        </footer>
      </section>

      <!-- Page 3 : Acceptation et Participation des Utilisateurs -->
      <section
        v-else-if="currentView === 'pageTrois'"
        key="pageTrois"
        class="introduction-section"
      >
        <header class="introduction-header">
          <h1 class="section-title">3. Acceptation et Participation des Utilisateurs</h1>
        </header>

        <!-- Sujet 3 : Modèles d'Acceptation Technologique -->
        <article class="topic-block">
          <h2 class="article-title">Modèles d'Acceptation Technologique</h2>
          <p>
            Pour que les nouvelles technologies soient adoptées avec succès, elles doivent être à la fois utiles et faciles à utiliser. Le modèle d'acceptation de la technologie (TAM) souligne l'importance de ces deux aspects. De plus, la participation active des utilisateurs finaux dans le processus de création et d'implémentation des technologies est essentielle pour assurer leur appropriation et leur efficacité.
          </p>
          <p>
            <strong>Points-clés :</strong>
            <ul>
              <li>Utilité : Les technologies doivent répondre aux besoins réels des utilisateurs.</li>
              <li>Utilisabilité : Les interfaces doivent être conviviales et ergonomiques.</li>
              <li>Participation des utilisateurs : Impliquer les utilisateurs dans le développement pour mieux répondre à leurs attentes.</li>
            </ul>
          </p>
        </article>

        <!-- Bouton pour passer à la page suivante -->
        <footer class="introduction-footer">
          <button class="btn-next-page" @click="currentView = 'pageQuatre'">
            Page de Conclusion Finale
          </button>
        </footer>
      </section>

      <!-- Page 4 : Conclusion Finale & Perspectives -->
      <section
        v-else-if="currentView === 'pageQuatre'"
        key="pageQuatre"
        class="introduction-section"
      >
        <header class="introduction-header">
          <h1 class="section-title">4. Conclusion Finale & Perspectives</h1>
        </header>

        <!-- Conclusion Finale -->
        <article class="topic-block">
          <h2 class="article-title">Synthèse & Horizon</h2>
          <p>
            La digitalisation dans le secteur de la santé offre de nombreuses opportunités pour améliorer la qualité des soins et l'efficacité des institutions. Cependant, elle présente également des défis importants, notamment en termes de sécurité des données et d'acceptation par les utilisateurs. Pour réussir cette transformation, une approche socio-technique est nécessaire, impliquant à la fois des aspects techniques et humains.
          </p>
          <p>
            <strong>Perspectives :</strong>
            <ul>
              <li>Développement de systèmes d'IA plus transparents et explicables.</li>
              <li>Amélioration continue des interfaces utilisateurs pour une meilleure ergonomie.</li>
              <li>Renforcement de la sécurité des données pour protéger les informations sensibles des patients.</li>
              <li>Promotion de la formation et de l'accompagnement des utilisateurs pour faciliter l'adoption des technologies.</li>
            </ul>
          </p>
          <p>
            <strong>Conclusion :</strong>
            La réussite de la digitalisation en santé repose sur une intégration harmonieuse des technologies avec les besoins humains et institutionnels. En adoptant une approche centrée sur l'utilisateur et en assurant une sécurité robuste, les technologies digitales peuvent véritablement transformer le paysage de la santé pour le mieux.
          </p>
        </article>

        <!-- Bouton pour revenir à la première page -->
        <footer class="introduction-footer">
          <button class="btn-back-home" @click="currentView = 'pageUn'">
            Revoir la première page
          </button>
        </footer>
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'IntroductionComponent',
  data() {
    return {
      // Vue actuelle, commence par la première page d'introduction
      currentView: 'pageUn',
    };
  },
};
</script>

<style scoped>
/* ----------------------------------------------------- */
/* Transition fade pour l'animation entre les pages      */
/* ----------------------------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* ------------------------------------------ */
/* Styles généraux pour la section d'introduction */
/* ------------------------------------------ */
.introduction-section {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.introduction-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2.3rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: 1.15rem;
  color: #7f8c8d;
  max-width: 750px;
  margin: 0.5rem auto 0;
  line-height: 1.4;
}

.topic-block {
  margin-bottom: 2rem;
}

.topic-block h2 {
  font-size: 1.6rem;
  color: #34495e;
  margin-bottom: 1rem;
}

.topic-block p {
  font-size: 1.05rem;
  color: #2d3436;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.topic-block ul {
  list-style-type: disc;
  margin-left: 1.5rem;
}

.topic-block li {
  margin-bottom: 0.5rem;
}

strong {
  font-weight: 600;
}

.introduction-footer {
  text-align: center;
  margin-top: 2.5rem;
}

.btn-next-page,
.btn-back-home {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #fff;
  margin-right: 1rem;
}

/* Bouton pour passer à la page suivante */
.btn-next-page {
  background-color: #2980b9;
}
.btn-next-page:hover {
  background-color: #1f6391;
}

/* Bouton pour revenir à la première page */
.btn-back-home {
  background-color: #95a5a6;
  margin-right: 0;
}
.btn-back-home:hover {
  background-color: #7f8c8d;
}
</style>
