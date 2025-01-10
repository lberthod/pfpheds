<!-- src/components/Education/ConclusionComponent.vue -->
<template>
    <div>
      <!-- 
        Transition pour animer le changement de page.
        mode="out-in" attend la fin de la transition de sortie
        avant de jouer la transition d’entrée.
      -->
      <transition name="fade" mode="out-in">
        <!-- Page 1 : Impacts Humains & Réorganisation du Travail -->
        <section
          v-if="currentView === 'pageUn'"
          key="pageUn"
          class="conclusion-section"
        >
          <header class="conclusion-header">
            <h1 class="section-title">Conclusion Globale</h1>
            <p class="section-subtitle">
              Synthèse complète en quatre volets autour de la digitalisation en santé
            </p>
          </header>
  
          <!-- Impacts Humains & Réorganisation du Travail -->
          <article class="topic-block">
            <h2 class="article-title">1. Impacts Humains & Réorganisation du Travail</h2>
            <p>
              Les retours d’expérience soulignent que la généralisation 
              des Dossiers Électroniques du Patient (DEP), 
              la télémédecine et les plateformes de collaboration 
              modifient radicalement l’organisation et la nature du travail. 
              D’une part, ces innovations permettent une meilleure coordination 
              interprofessionnelle (infirmiers, médecins, pharmaciens, etc.) 
              en favorisant l’échange rapide de données cliniques et 
              la traçabilité des informations. D’autre part, 
              elles exigent une adaptation continue des équipes, 
              confrontées à la multiplication des tâches administratives, 
              à une surcharge informationnelle et à la nécessité de 
              mettre à jour régulièrement leurs compétences numériques.
            </p>
            <p>
              Parallèlement, l’accès facilité aux données encourage 
              la centralisation des parcours de soins, 
              ce qui peut dynamiser la prévention et le suivi à long terme, 
              tout en réduisant certains actes redondants ou déplacements inutiles. 
              Cependant, la mise en œuvre concrète se heurte parfois 
              à l’ergonomie insuffisante de certains logiciels, 
              et à une variabilité d’usage selon les structures. 
              Les professionnels pointent également le risque 
              de diminution du temps accordé aux interactions en face-à-face 
              avec les patients, du fait de l’augmentation des saisies informatiques.
            </p>
            <p>
              <strong>Points-clés :</strong> 
              <ul>
                <li>
                  Renforcer l’accompagnement au changement : 
                  formations régulières, tutoriels pratiques, 
                  espaces de soutien pour échanger sur les défis rencontrés.
                </li>
                <li>
                  Impliquer les équipes dans la conception 
                  ou la sélection des outils numériques, afin de 
                  mieux répondre aux besoins concrets du terrain.
                </li>
                <li>
                  Équilibrer les gains administratifs avec 
                  la préservation du temps clinique dédié au patient.
                </li>
              </ul>
            </p>
          </article>
  
          <!-- Bouton pour passer à la page deux -->
          <footer class="conclusion-footer">
            <button class="btn-next-page" @click="currentView = 'pageDeux'">
              Passer à l’Intelligence Artificielle
            </button>
          </footer>
        </section>
  
        <!-- Page 2 : Intelligence Artificielle & Bonnes Pratiques -->
        <section
          v-else-if="currentView === 'pageDeux'"
          key="pageDeux"
          class="conclusion-section"
        >
          <header class="conclusion-header">
            <h1 class="section-title">2. Intelligence Artificielle & Bonnes Pratiques</h1>
          </header>
  
          <!-- IA et bonnes pratiques -->
          <article class="topic-block">
            <h2 class="article-title">IA en Santé : Innovations, Défis et Cadres de Confiance</h2>
            <p>
              L’essor de l’Intelligence Artificielle (IA) dans le domaine sanitaire 
              se manifeste par la multiplication d’outils de reconnaissance d’images, 
              de systèmes d’aide au diagnostic et de plateformes d’analyses prédictives. 
              Les algorithmes de machine learning permettent de croiser d’importants 
              volumes de données (imagerie, biologie, historique de soins) 
              pour fournir des alertes ou des recommandations personnalisées. 
              Ces dispositifs, lorsqu’ils sont bien implémentés, 
              peuvent contribuer à la précision diagnostique, 
              à l’optimisation de la prévention et à la réduction des erreurs cliniques.
            </p>
            <p>
              Toutefois, la fiabilité des algorithmes dépend essentiellement 
              de la qualité et de la représentativité des jeux de données utilisés. 
              Des biais peuvent survenir si certaines populations 
              (femmes enceintes, minorités ethniques, etc.) 
              sont sous-représentées dans les bases d’entraînement. 
              De plus, l’opacité de certains modèles d’IA (dits “boîtes noires”) 
              complique l’interprétation et la justification 
              des décisions cliniques proposées. 
              Les professionnels ont donc un rôle critique d’évaluation 
              et de validation de ces résultats, 
              afin de garantir la pertinence et l’acceptabilité de l’IA dans la pratique.
            </p>
            <p>
              <strong>Points-clés :</strong>
              <ul>
                <li>
                  Développer des protocoles de validation clinique rigoureux 
                  et des mécanismes de traçabilité pour sécuriser l’usage de l’IA.
                </li>
                <li>
                  Former les professionnels aux fondements et limites 
                  des algorithmes, pour encourager une utilisation éclairée.
                </li>
                <li>
                  Intégrer les aspects réglementaires et éthiques 
                  (secret professionnel, consentement, équité) 
                  dans chaque étape du déploiement.
                </li>
              </ul>
            </p>
          </article>
  
          <!-- Bouton pour passer à la page trois -->
          <footer class="conclusion-footer">
            <button class="btn-next-page" @click="currentView = 'pageTrois'">
              Avancer vers la Sécurité & la Participation
            </button>
          </footer>
        </section>
  
        <!-- Page 3 : Sécurité, Protection des Données & Participation -->
        <section
          v-else-if="currentView === 'pageTrois'"
          key="pageTrois"
          class="conclusion-section"
        >
          <header class="conclusion-header">
            <h1 class="section-title">
              3. Sécurité, Protection des Données & Participation
            </h1>
          </header>
  
          <!-- Sécurité des Données -->
          <article class="topic-block">
            <h2 class="article-title">Sécurité et Conformité Légale</h2>
            <p>
              La transformation numérique, en centralisant et en connectant 
              les données de santé, expose les organisations 
              à des risques cybernétiques accrus (piratages, ransomwares, etc.). 
              Le chiffrement des informations, la gestion rigoureuse des accès 
              (authentification forte, traçabilité) et l’adhésion 
              aux normes en vigueur (loi DEP, directives cantonales, 
              standards internationaux) constituent le socle indispensable 
              pour préserver la confidentialité et l’intégrité des données médicales.
            </p>
            <p>
              Sur le plan opérationnel, la sensibilisation des équipes 
              demeure un vecteur clé de prévention. 
              Les erreurs humaines (partage de mots de passe, 
              accès à des messageries non sécurisées, etc.) 
              représentent la principale faille potentielle. 
              Des programmes de formation continue, des procédures claires 
              et des audits réguliers soutiennent l’émergence 
              d’une culture de cybersécurité partagée.
            </p>
  
            <h2 class="article-title">Participation et Co-construction</h2>
            <p>
              Les solutions numériques en santé ne trouvent leur pleine pertinence 
              que si elles sont pensées en collaboration avec 
              l’ensemble des acteurs concernés : 
              soignants, informaticiens, responsables institutionnels et patients. 
              Les retours d’expérience, les groupes de travail interprofessionnels 
              et l’implication des usagers finaux (patients chroniques, familles) 
              permettent d’identifier rapidement les ajustements nécessaires 
              en matière d’ergonomie, de pertinence fonctionnelle 
              et d’acceptabilité sociale.
            </p>
            <p>
              <strong>Points-clés :</strong>
              <ul>
                <li>
                  Mettre en place des formations axées sur la sécurité au quotidien, 
                  adaptées à chaque catégorie de professionnels.
                </li>
                <li>
                  Encourager le recueil et l’analyse systématique 
                  des retours terrain pour améliorer en continu les logiciels.
                </li>
                <li>
                  Définir des stratégies de déploiement transparentes, 
                  incluant les patients dans la compréhension 
                  et la maîtrise de leurs données.
                </li>
              </ul>
            </p>
          </article>
  
          <!-- Bouton pour passer à la page quatre -->
          <footer class="conclusion-footer">
            <button class="btn-next-page" @click="currentView = 'pageQuatre'">
              Page de Conclusion Finale
            </button>
          </footer>
        </section>
  
        <!-- Page 4 : Conclusion Finale & Perspectives -->
        <section
          v-else-if="currentView === 'pageQuatre'"
          key="pageQuatre"
          class="conclusion-section"
        >
          <header class="conclusion-header">
            <h1 class="section-title">
              4. Conclusion Finale & Perspectives
            </h1>
          </header>
  
          <!-- Conclusion Finale -->
          <article class="topic-block">
            <h2 class="article-title">Synthèse & Horizon</h2>
            <p>
              Les différents volets examinés (réorganisation du travail, 
              intelligence artificielle, sécurité et participation) 
              confirment la complexité et le potentiel de la digitalisation 
              du système de santé. Les gains attendus — 
              amélioration de la qualité des soins, réduction de tâches répétitives, 
              accessibilité renforcée — ne se concrétisent pleinement 
              qu’à la condition d’un pilotage rigoureux 
              et d’une réflexion éthique et organisationnelle approfondie. 
              L’équilibre entre technologie et relation humaine 
              doit rester au cœur de chaque innovation, 
              afin de préserver la confiance et la pertinence clinique.
            </p>
            <p>
              Les témoignages recueillis dans les discussions et les vidéos 
              montrent qu’une démarche participative est un levier stratégique : 
              solliciter l’avis des professionnels de terrain 
              dès la phase de conception, former en continu, 
              écouter les remontées critiques pour ajuster les fonctionnalités. 
              Du côté des institutions, la définition d’indicateurs de suivi 
              (taux d’adoption, satisfaction usager, incidents de sécurité) 
              permet de mesurer l’avancée des projets 
              et d’en corriger la trajectoire.
            </p>
            <p>
              <strong>Perspectives :</strong>
              <ul>
                <li>
                  Continuer à explorer et valider des usages pertinents de l’IA, 
                  en veillant à inclure des populations diverses 
                  dans les bases de données.
                </li>
                <li>
                  Renforcer la transversalité entre soignants, ingénieurs, 
                  gestionnaires et chercheurs pour innover 
                  de manière interdisciplinaire.
                </li>
                <li>
                  Établir des standards communs de cybersécurité et de protection 
                  de la vie privée, adaptables aux évolutions technologiques.
                </li>
                <li>
                  Cultiver une culture de la qualité, 
                  où la technologie sert à soutenir la décision clinique 
                  et à valoriser la relation soignant-patient.
                </li>
              </ul>
            </p>
            <p>
              <strong>Conclusion :</strong> 
              Les orientations prises aujourd’hui dans la digitalisation en santé 
              façonneront les pratiques de demain. 
              L’enjeu réside dans la capacité collective 
              à transformer les avancées technologiques 
              en opportunités réelles d’amélioration de la santé publique, 
              tout en protégeant la dimension humaine et éthique 
              qui demeure le fondement du soin.
            </p>
          </article>
  
          <!-- Bouton pour revenir à la page un -->
          <footer class="conclusion-footer">
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
    name: 'ConclusionComponent',
    data() {
      return {
        // Vue actuelle, commence par la première page de conclusion
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
  /* Styles généraux pour la section de conclusion */
  /* ------------------------------------------ */
  .conclusion-section {
    max-width: 900px;
    margin: 2rem auto;
    padding: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  
  .conclusion-header {
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
  
  .conclusion-footer {
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
  