<!-- src/components/Education/RightSidebar.vue -->
<template>
    <div class="right-sidebar">
      <!-- Section Anecdotes / Fun Facts sur la Santé Digitale -->
      <section class="fun-facts">
        <h2>Anecdotes sur la Santé Digitale</h2>
        <p>based on chatgpt knowledge, no fact-check human</p>
        <ul class="facts-list">
          <li
            v-for="fact in displayedFacts"
            :key="fact.id"
            class="fact-item"
            @animationend="handleAnimationEnd(fact.id)"
            :class="fact.animationClass"
          >
            {{ fact.text }}
          </li>
        </ul>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RightSidebar',
    data() {
      return {
        // 50 anecdotes/faits détaillés sur la santé digitale
        allFacts: [
          { id: 1, text: "Le premier dossier patient informatisé a été introduit en 1972 à l’hôpital El Camino en Californie. Cette innovation a révolutionné la gestion des données médicales, permettant un accès plus rapide et plus précis aux informations des patients, réduisant ainsi les erreurs médicales et améliorant la qualité des soins." },
          { id: 2, text: "La télémédecine a considérablement réduit le besoin de déplacements pour les consultations de routine, offrant aux patients la possibilité de consulter des spécialistes depuis le confort de leur domicile. Cela a non seulement amélioré l'accès aux soins dans les zones rurales, mais a également réduit la charge sur les établissements de santé urbains." },
          { id: 3, text: "L’utilisation de capteurs connectés permet un suivi continu et en temps réel des patients, offrant des données précieuses sur leur état de santé. Ces capteurs peuvent surveiller des paramètres tels que la fréquence cardiaque, la pression artérielle et les niveaux de glucose, aidant ainsi les professionnels de santé à détecter rapidement des anomalies et à intervenir en cas de besoin." },
          { id: 4, text: "Les applications de santé mentale en ligne jouent un rôle crucial en élargissant l’accès aux soins psychologiques. Elles offrent des outils de gestion du stress, des séances de thérapie virtuelle et des ressources éducatives, permettant aux individus de recevoir un soutien adapté à leurs besoins, souvent à moindre coût et avec une plus grande flexibilité." },
          { id: 5, text: "L’intelligence artificielle (IA) est capable d’analyser des milliers de radios en quelques secondes pour détecter des anomalies que l’œil humain pourrait manquer. Cette capacité améliore non seulement la précision des diagnostics, mais accélère également le processus de traitement, permettant aux patients de recevoir des soins plus rapidement." },
          { id: 6, text: "Les montres connectées ne se contentent pas de suivre la fréquence cardiaque ; elles peuvent également détecter des troubles du rythme cardiaque tels que la fibrillation auriculaire. Ces dispositifs fournissent des alertes en temps réel, permettant aux utilisateurs de consulter un professionnel de santé rapidement en cas d’anomalie détectée." },
          { id: 7, text: "Le Big Data joue un rôle essentiel dans la recherche clinique en accélérant l’analyse des données de patients. En agrégant et en analysant de vastes ensembles de données, les chercheurs peuvent identifier des tendances, découvrir de nouveaux traitements et améliorer les protocoles de soins de manière plus efficace et précise." },
          { id: 8, text: "Les dossiers médicaux électroniques (DME) réduisent considérablement les erreurs liées à la transcription manuelle des informations médicales. Ils permettent un accès instantané aux antécédents médicaux d’un patient, facilitant ainsi la prise de décisions cliniques informées et la coordination des soins entre différents professionnels de santé." },
          { id: 9, text: "La robotique chirurgicale a transformé le domaine des interventions chirurgicales en offrant des procédures moins invasives et plus précises. Ces robots permettent aux chirurgiens de réaliser des opérations avec une précision millimétrique, réduisant ainsi les temps de récupération et minimisant les risques de complications post-opératoires." },
          { id: 10, text: "Les plateformes de rendez-vous en ligne ont considérablement diminué le temps d’attente pour les patients. En permettant la réservation de consultations via internet, ces plateformes améliorent l'efficacité des services de santé et offrent une meilleure expérience utilisateur en réduisant les délais d'attente et en optimisant les emplois du temps des professionnels de santé." },
          { id: 11, text: "Les serious games sont utilisés dans le domaine de la santé pour former les professionnels de manière ludique et interactive. Ces jeux permettent d'acquérir des compétences cliniques, de pratiquer des scénarios de soins complexes et d’améliorer la prise de décision en environnement simulé, renforçant ainsi l’efficacité de la formation médicale." },
          { id: 12, text: "La cybersécurité est devenue un enjeu majeur dans la protection des données médicales. Avec l'augmentation des cyberattaques ciblant les systèmes de santé, il est essentiel de mettre en place des mesures robustes pour sécuriser les informations sensibles des patients et garantir la confidentialité et l'intégrité des données médicales." },
          { id: 13, text: "L’impression 3D est exploitée dans le secteur médical pour créer des prothèses personnalisées et abordables. Cette technologie permet de produire des dispositifs sur mesure adaptés à la morphologie de chaque patient, améliorant ainsi le confort et l’efficacité des traitements de remplacement articulaire et autres dispositifs médicaux." },
          { id: 14, text: "Les objets connectés jouent un rôle crucial dans la rééducation à distance après une opération. Ces dispositifs permettent de surveiller les progrès des patients, d’ajuster les programmes de rééducation en temps réel et de fournir des feedbacks immédiats, favorisant une récupération plus rapide et efficace." },
          { id: 15, text: "Le cloud computing facilite le partage d’informations médicales entre les hôpitaux et les cliniques. En centralisant les données des patients dans le cloud, les professionnels de santé peuvent accéder rapidement aux informations nécessaires, améliorer la coordination des soins et offrir un service plus intégré et cohérent." },
          { id: 16, text: "Des algorithmes de reconnaissance vocale simplifient la prise de notes médicales, permettant aux médecins de dicter facilement leurs observations et diagnostics. Cette technologie réduit le temps passé à la saisie manuelle des données, augmentant ainsi l'efficacité des consultations et la précision des dossiers médicaux." },
          { id: 17, text: "La télésurveillance permet de détecter rapidement les signes de complications post-opératoires chez les patients. En surveillant continuellement les paramètres vitaux à distance, les professionnels de santé peuvent intervenir immédiatement en cas de détection d’anomalies, améliorant ainsi les taux de survie et réduisant les hospitalisations prolongées." },
          { id: 18, text: "Les chatbots médicaux fournissent un premier tri des symptômes et conseillent une orientation appropriée. Ces assistants virtuels utilisent l'intelligence artificielle pour évaluer les symptômes des patients, les guider vers les services de santé appropriés et offrir des conseils préliminaires, améliorant ainsi l'accès aux soins et l'efficacité du système médical." },
          { id: 19, text: "La génomique numérique accélère la découverte de traitements ciblés pour certaines maladies. En analysant les données génétiques des patients, les chercheurs peuvent identifier des mutations spécifiques et développer des thérapies personnalisées, augmentant ainsi les chances de succès des traitements et réduisant les effets secondaires." },
          { id: 20, text: "Les applications de suivi de la glycémie simplifient la gestion du diabète au quotidien. Ces applications permettent aux patients de suivre leurs niveaux de glucose en temps réel, d’analyser les tendances, de recevoir des rappels pour la prise de médicaments et de partager leurs données avec leurs professionnels de santé, améliorant ainsi le contrôle de la maladie." },
          { id: 21, text: "Les bracelets connectés analysent la qualité du sommeil, favorisant un meilleur repos et une meilleure santé globale. En surveillant les cycles de sommeil, la fréquence cardiaque et les mouvements, ces dispositifs fournissent des insights personnalisés permettant aux utilisateurs d’améliorer leurs habitudes de sommeil et de détecter d’éventuels troubles." },
          { id: 22, text: "Des plateformes en ligne de partage de données aident à la recherche sur les maladies rares. En centralisant les données de patients atteints de conditions peu communes, ces plateformes facilitent la collaboration entre chercheurs, accélérant ainsi la découverte de traitements et améliorant les perspectives de guérison." },
          { id: 23, text: "Les simulateurs de réalité virtuelle améliorent la formation des chirurgiens en offrant des environnements immersifs et réalistes. Ces simulateurs permettent aux chirurgiens de pratiquer des procédures complexes sans risque, perfectionnant ainsi leurs compétences et réduisant les marges d’erreur lors des opérations réelles." },
          { id: 24, text: "L’IA prédictive peut alerter le personnel soignant d’une éventuelle défaillance cardiaque bien avant qu’elle ne survienne. En analysant en continu les données des patients, ces algorithmes identifient les signes précurseurs de crises cardiaques, permettant une intervention rapide et potentiellement salvatrice." },
          { id: 25, text: "Le téléconseil médical a explosé avec la crise sanitaire, réduisant les risques de contagion en permettant des consultations à distance. Cette expansion a non seulement maintenu l'accès aux soins pendant les périodes de confinement, mais a également établi un modèle de soins hybrides alliant téléconsultation et visites en personne." },
          { id: 26, text: "La gamification motive les patients à respecter leur programme de rééducation en rendant les exercices plus engageants et interactifs. En intégrant des éléments de jeu, ces programmes augmentent la participation des patients, améliorent la constance dans les exercices et accélèrent la récupération." },
          { id: 27, text: "La reconnaissance d’images médicales par IA atteint des taux de précision supérieurs à 90%, surpassant souvent les évaluations humaines. Cette technologie est utilisée pour analyser des radiographies, des IRM et d’autres imageries médicales, facilitant des diagnostics plus rapides et plus précis." },
          { id: 28, text: "Les implants connectés informent en temps réel sur l’état de l’appareil cardiaque, permettant une surveillance continue et proactive. Ces implants peuvent détecter des anomalies, ajuster automatiquement les réglages et envoyer des alertes au personnel médical en cas de besoin, améliorant ainsi la gestion des patients cardiaques." },
          { id: 29, text: "Des lunettes de réalité augmentée aident les chirurgiens à mieux visualiser les tissus internes pendant les opérations. En superposant des informations numériques sur le champ de vision réel, ces dispositifs fournissent des détails supplémentaires tels que les structures anatomiques et les données vitales, augmentant ainsi la précision des interventions." },
          { id: 30, text: "La collecte de données de santé à grande échelle aide à anticiper les épidémies en identifiant rapidement les tendances et les foyers d'infection. En analysant des données en temps réel provenant de diverses sources, les autorités sanitaires peuvent mettre en place des mesures préventives efficaces pour contenir la propagation des maladies." },
          { id: 31, text: "Les portails patients donnent un accès simple et sécurisé au dossier médical et aux résultats de tests. Ces plateformes permettent aux patients de consulter leurs informations de santé à tout moment, de partager facilement des données avec leurs professionnels de santé et de suivre l’évolution de leur traitement." },
          { id: 32, text: "Les programmes de réadaptation en ligne encouragent la continuité des soins à domicile en offrant des exercices personnalisés et des suivis virtuels. Ces programmes permettent aux patients de poursuivre leur rééducation sans interruption, améliorant ainsi les résultats thérapeutiques et réduisant les risques de rechute." },
          { id: 33, text: "La 5G va booster la télémédecine avec des transmissions vidéo en haute définition, sans latence. Cette avancée technologique permet des consultations plus interactives, des diagnostics plus précis et la possibilité de réaliser des interventions à distance avec une qualité de connexion optimale." },
          { id: 34, text: "Les technologies blockchain renforcent la traçabilité et la sécurité des données de santé en assurant une gestion décentralisée et immuable des informations médicales. Cette transparence améliore la confiance entre les patients et les prestataires de soins, tout en facilitant le partage sécurisé des données." },
          { id: 35, text: "Des capteurs cutanés mesurent la température et l’humidité pour prévenir des infections cutanées, particulièrement chez les patients alités ou en rééducation. Ces capteurs permettent une surveillance continue de l’état de la peau, détectant rapidement les signes d’infection et permettant une intervention précoce." },
          { id: 36, text: "Les plateformes numériques facilitent la coordination entre médecins généralistes et spécialistes, assurant une prise en charge globale et intégrée des patients. En centralisant les informations médicales et en permettant une communication fluide, ces plateformes améliorent la qualité des soins et réduisent les risques de redondance ou d’erreur." },
          { id: 37, text: "Les applications d’entraînement cérébral améliorent l’attention et la mémoire grâce à des exercices cognitifs interactifs et personnalisés. Ces applications aident à prévenir le déclin cognitif, à améliorer les performances intellectuelles et à offrir des outils de stimulation mentale adaptés à chaque utilisateur." },
          { id: 38, text: "Le suivi digital des vaccinations permet de mieux contrôler la couverture vaccinale en assurant un enregistrement précis et une gestion efficace des doses administrées. Ces systèmes facilitent la planification des campagnes de vaccination, la notification des rappels et l’identification rapide des zones sous-vaccinées." },
          { id: 39, text: "Les algorithmes d’apprentissage profond détectent précocement des tumeurs dans des IRM avec une précision exceptionnelle. En analysant les images médicales de manière détaillée, ces algorithmes peuvent identifier des anomalies subtiles, permettant un diagnostic plus rapide et des interventions plus efficaces." },
          { id: 40, text: "Le télédiagnostic offre un second avis médical rapide, même dans les zones isolées où l'accès aux spécialistes est limité. Cette technologie permet aux patients de consulter des experts à distance, améliorant ainsi l'accès aux soins de haute qualité et réduisant les délais de diagnostic." },
          { id: 41, text: "Les objets connectés rappellent de prendre des médicaments à l’heure prévue, aidant ainsi les patients à mieux gérer leur traitement et à éviter les oublis. Ces dispositifs peuvent envoyer des notifications, suivre l’observance et fournir des rapports détaillés aux professionnels de santé." },
          { id: 42, text: "Des robots de service aident les infirmiers à distribuer du matériel dans les hôpitaux, améliorant l'efficacité et réduisant la charge de travail. Ces robots peuvent transporter des médicaments, des équipements médicaux et d’autres fournitures, permettant au personnel soignant de se concentrer davantage sur les soins aux patients." },
          { id: 43, text: "Les plateformes de suivi de grossesse à distance offrent un accompagnement personnalisé aux femmes enceintes, en surveillant leur santé et celle du bébé. Ces plateformes permettent des consultations régulières, des conseils personnalisés et une surveillance continue, améliorant ainsi les résultats de la grossesse." },
          { id: 44, text: "La réalité virtuelle soulage la douleur en détournant l’attention des patients pendant les procédures douloureuses ou les traitements. En immergeant les patients dans des environnements virtuels apaisants, cette technologie réduit la perception de la douleur et améliore le confort pendant les soins." },
          { id: 45, text: "Les bases de données mondiales accélèrent la recherche sur les maladies infectieuses en centralisant et en partageant des données critiques. Cette collaboration internationale permet une réponse plus rapide et plus coordonnée face aux épidémies, facilitant la découverte de traitements et de vaccins efficaces." },
          { id: 46, text: "La reconnaissance faciale peut aider à détecter certaines maladies génétiques rares en identifiant des caractéristiques physiques spécifiques. Cette technologie permet un diagnostic précoce, facilitant ainsi la mise en place de traitements adaptés et améliorant les perspectives des patients atteints." },
          { id: 47, text: "Les solutions e-santé améliorent l’accès aux soins dans les régions rurales en offrant des services de télémédecine et des consultations en ligne. Ces solutions réduisent les barrières géographiques, permettant aux habitants des zones isolées de recevoir des soins de qualité sans avoir à se déplacer sur de longues distances." },
          { id: 48, text: "Les avatars virtuels servent de guide interactif lors d’examens médicaux, offrant une assistance personnalisée et des explications en temps réel. Ces avatars peuvent aider les patients à se préparer aux procédures, à comprendre les étapes du traitement et à se sentir plus à l’aise pendant les soins." },
          { id: 49, text: "Des prothèses bioniques contrôlées par la pensée offrent une mobilité naturelle aux personnes amputées. Grâce à des interfaces neuronales, ces prothèses répondent directement aux intentions de l'utilisateur, permettant des mouvements fluides et précis qui imitent ceux des membres naturels." },
          { id: 50, text: "Les applications de cohérence cardiaque guident la respiration pour mieux gérer le stress, aidant ainsi les utilisateurs à atteindre un état de relaxation profonde. En fournissant des exercices de respiration structurés, ces applications améliorent la santé mentale et physique en réduisant les niveaux de stress et en favorisant un meilleur équilibre émotionnel." },
          { id: 51, text: "Les applications de réalité augmentée sont utilisées pour former les médecins en leur permettant de superposer des informations anatomiques sur des mannequins ou des modèles réels. Cela améliore la compréhension des structures complexes et facilite l'apprentissage des procédures chirurgicales." },
{ id: 52, text: "La télémédecine a permis une expansion rapide des consultations virtuelles pendant la pandémie de COVID-19, réduisant ainsi la pression sur les hôpitaux et limitant la propagation du virus en évitant les visites physiques." },
{ id: 53, text: "Les systèmes de gestion des lits dans les hôpitaux utilisent l'intelligence artificielle pour optimiser l'allocation des ressources, réduire les temps d'attente et améliorer l'efficacité opérationnelle des établissements de santé." },
{ id: 54, text: "Les dispositifs de surveillance à domicile connectés permettent aux patients de surveiller leurs paramètres vitaux tels que la pression artérielle et le taux d'oxygène, facilitant une gestion proactive des maladies chroniques." },
{ id: 55, text: "Les plateformes de e-santé permettent aux patients de stocker et de partager leurs dossiers médicaux électroniques avec différents prestataires de soins, assurant une continuité des soins et une meilleure coordination entre les professionnels de santé." },
{ id: 56, text: "Les chatbots de santé mentale utilisent des techniques de thérapie cognitivo-comportementale pour offrir un soutien émotionnel et des exercices de gestion du stress, accessibles 24/7 aux utilisateurs." },
{ id: 57, text: "Les applications mobiles de suivi de la nutrition aident les utilisateurs à maintenir une alimentation équilibrée en fournissant des recommandations personnalisées basées sur leurs besoins caloriques et leurs objectifs de santé." },
{ id: 58, text: "Les plateformes de télésurveillance permettent aux médecins de suivre l'évolution des patients atteints de maladies chroniques en temps réel, ajustant les traitements en fonction des données recueillies." },
{ id: 59, text: "Les prothèses intelligentes équipées de capteurs permettent aux amputés de contrôler leurs membres artificiels avec une précision accrue, améliorant ainsi leur mobilité et leur qualité de vie." },
{ id: 60, text: "Les applications de gestion de la douleur utilisent des techniques de biofeedback pour aider les patients à contrôler leur douleur en modifiant leur respiration et leur tension musculaire." },
{ id: 61, text: "La réalité virtuelle est utilisée pour traiter les phobies et les troubles anxieux en exposant les patients à des environnements virtuels contrôlés, facilitant ainsi la désensibilisation progressive." },
{ id: 62, text: "Les robots d'assistance médicale aident les infirmiers en automatisant des tâches répétitives telles que la distribution de médicaments, permettant ainsi aux professionnels de se concentrer davantage sur les soins aux patients." },
{ id: 63, text: "Les dispositifs de diagnostic portable, tels que les glucomètres connectés, permettent aux patients de surveiller leurs niveaux de glucose en temps réel et de partager ces données avec leurs médecins pour un suivi précis." },
{ id: 64, text: "Les plateformes de téléconsultation spécialisée permettent aux patients des régions éloignées d'accéder à des spécialistes sans avoir à se déplacer, réduisant ainsi les disparités en matière de soins de santé." },
{ id: 65, text: "Les systèmes d'analyse prédictive utilisent des algorithmes pour identifier les risques de maladies futures chez les patients, permettant une intervention précoce et une prévention efficace." },
{ id: 66, text: "Les applications de gestion du sommeil analysent les habitudes de sommeil des utilisateurs et fournissent des recommandations personnalisées pour améliorer la qualité du repos." },
{ id: 67, text: "La robotique assistée par IA aide les physiothérapeutes à personnaliser les programmes de rééducation en fonction des progrès individuels des patients." },
{ id: 68, text: "Les plateformes de santé intégrée combinent données de différentes sources, telles que les dossiers médicaux électroniques et les dispositifs de suivi à domicile, pour offrir une vue holistique de la santé du patient." },
{ id: 69, text: "Les technologies de reconnaissance vocale permettent aux médecins de dicter leurs notes cliniques directement dans les dossiers médicaux électroniques, améliorant ainsi l'efficacité et la précision des enregistrements." },
{ id: 70, text: "Les applications de gestion de la douleur chronique fournissent des outils de suivi et des techniques de relaxation pour aider les patients à mieux gérer leur condition au quotidien." },
{ id: 71, text: "Les plateformes de santé communautaire en ligne favorisent le soutien mutuel entre patients atteints de maladies similaires, facilitant l'échange d'expériences et de conseils." },
{ id: 72, text: "Les dispositifs de suivi de la santé reproductive permettent aux femmes de surveiller leur cycle menstruel, de prédire l'ovulation et de gérer leur fertilité de manière plus précise." },
{ id: 73, text: "Les applications de santé connectée utilisent l'intelligence artificielle pour analyser les habitudes de vie des utilisateurs et fournir des recommandations personnalisées pour améliorer leur bien-être général." },
{ id: 74, text: "Les systèmes de gestion des médicaments automatisés rappellent aux patients de prendre leurs médicaments à temps et suivent leur conformité au traitement." },
{ id: 75, text: "Les plateformes de télémédecine pour les soins post-opératoires permettent aux patients de consulter leurs chirurgiens à distance, assurant ainsi un suivi régulier et une détection précoce des complications." },
{ id: 76, text: "Les technologies de blockchain sont utilisées pour sécuriser et authentifier les données médicales, garantissant leur intégrité et leur confidentialité." },
{ id: 77, text: "Les applications de fitness connectées fournissent des plans d'entraînement personnalisés et suivent les progrès des utilisateurs en temps réel, motivant ainsi une activité physique régulière." },
{ id: 78, text: "Les systèmes d'intelligence artificielle aident les radiologues à interpréter les images médicales plus rapidement et avec une précision accrue, améliorant ainsi les diagnostics." },
{ id: 79, text: "Les dispositifs portables de suivi de la santé mentale analysent les niveaux de stress et proposent des techniques de relaxation pour aider les utilisateurs à gérer leur bien-être émotionnel." },
{ id: 80, text: "Les applications de gestion des maladies chroniques offrent des outils de suivi, des rappels de médication et des ressources éducatives pour aider les patients à mieux contrôler leur condition." },
{ id: 81, text: "Les technologies de réalité mixte combinent réalité augmentée et réalité virtuelle pour offrir des environnements de formation médicale immersifs et interactifs." },
{ id: 82, text: "Les plateformes de données de santé collaboratives permettent aux chercheurs du monde entier de partager et d'analyser des données anonymisées, accélérant ainsi la découverte de nouveaux traitements et vaccins." },
{ id: 83, text: "Les systèmes de gestion des crises sanitaires utilisent des algorithmes prédictifs pour modéliser la propagation des maladies et planifier les interventions de santé publique." },
{ id: 84, text: "Les robots compagnons sont utilisés pour fournir un soutien émotionnel aux patients âgés ou isolés, améliorant leur qualité de vie et leur bien-être mental." },
{ id: 85, text: "Les plateformes de e-learning en santé permettent aux professionnels de la santé de suivre des formations continues et de se tenir informés des dernières avancées médicales." },
{ id: 86, text: "Les dispositifs de surveillance de l'activité physique intégrés aux vêtements permettent de collecter des données précises sur les mouvements et la posture des utilisateurs, facilitant ainsi la prévention des blessures." },
{ id: 87, text: "Les applications de santé reproductive offrent des informations personnalisées sur la santé sexuelle, la contraception et la planification familiale, améliorant l'autonomie des femmes dans la gestion de leur santé reproductive." },
{ id: 88, text: "Les technologies de nanomédecine permettent une administration ciblée des médicaments au niveau cellulaire, augmentant l'efficacité des traitements et réduisant les effets secondaires." },
{ id: 89, text: "Les systèmes d'analyse de sentiment sur les réseaux sociaux aident les autorités de santé à surveiller l'opinion publique et à détecter rapidement les tendances émergentes en matière de santé." },
{ id: 90, text: "Les applications de réalité virtuelle sont utilisées pour la réhabilitation cognitive des patients ayant subi des traumatismes crâniens, aidant à restaurer les fonctions cognitives perdues." },
{ id: 91, text: "Les plateformes de consultation génétique en ligne permettent aux individus d'accéder facilement à des conseils génétiques et à des tests de dépistage personnalisés." },
{ id: 92, text: "Les dispositifs de détection précoce des infections utilisent des capteurs biologiques pour identifier rapidement les signes d'infection, permettant une intervention rapide et réduisant la propagation des maladies." },
{ id: 93, text: "Les systèmes de gestion des urgences médicales optimisent la répartition des ressources et la coordination des équipes de secours, améliorant ainsi la rapidité et l'efficacité des interventions d'urgence." },
{ id: 94, text: "Les technologies de réalité virtuelle sont utilisées pour la formation en gestion des situations de crise, préparant les professionnels de la santé à réagir efficacement face à des scénarios d'urgence." },
{ id: 95, text: "Les applications de santé publique fournissent des informations actualisées sur les campagnes de vaccination, les épidémies en cours et les conseils de prévention, aidant ainsi à sensibiliser et à protéger la population." },
{ id: 96, text: "Les systèmes de surveillance environnementale liés à la santé analysent les données sur la qualité de l'air, l'eau et d'autres facteurs environnementaux pour prévenir les maladies liées à l'environnement." },
{ id: 97, text: "Les dispositifs de réalité augmentée aident les orthophonistes à fournir des thérapies linguistiques interactives et engageantes pour les patients ayant des troubles de la parole." },
{ id: 98, text: "Les plateformes de télémédecine intégrées aux maisons de retraite permettent un suivi médical régulier des résidents, améliorant ainsi leur santé et leur bien-être général." },
{ id: 99, text: "Les applications de santé connectée offrent des programmes de bien-être personnalisés, incluant des exercices de méditation, de yoga et de pleine conscience, pour améliorer la santé mentale et physique des utilisateurs." },
{ id: 100, text: "Les systèmes d'intelligence artificielle pour la gestion des flux de travail hospitaliers optimisent l'allocation des ressources, réduisent les temps d'attente et améliorent l'efficacité globale des opérations médicales." }

        ],
        displayedFacts: [],
        intervalId: null,
        factsPool: [], // Pool des faits disponibles pour éviter les répétitions
        transitioning: false // Indique si une transition est en cours
      };
    },
    methods: {
      /**
       * Initialise l'affichage des anecdotes et démarre la rotation automatique.
       */
      initFactsDisplay() {
        // Initialiser le pool de faits
        this.factsPool = [...this.allFacts];
        // Sélectionner 3 faits aléatoires distincts au démarrage
        const initialFacts = this.pickRandomFacts(3);
        this.displayedFacts = initialFacts.map(fact => ({ ...fact, animationClass: '' }));
        // Rotation automatique toutes les 5 secondes
        this.intervalId = setInterval(() => {
          this.rotateFacts();
        }, 5000);
      },
  
      /**
       * Sélectionne n faits aléatoires distincts dans la liste allFacts,
       * en évitant les faits déjà affichés.
       */
      pickRandomFacts(n) {
        const selected = [];
        for (let i = 0; i < n; i++) {
          if (this.factsPool.length === 0) {
            // Réinitialiser le pool si tous les faits ont été affichés
            this.factsPool = [...this.allFacts];
            // Retirer les faits déjà affichés
            this.displayedFacts.forEach(fact => {
              const index = this.factsPool.findIndex(f => f.id === fact.id);
              if (index !== -1) this.factsPool.splice(index, 1);
            });
          }
          if (this.factsPool.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.factsPool.length);
            selected.push(this.factsPool[randomIndex]);
            this.factsPool.splice(randomIndex, 1);
          }
        }
        return selected;
      },
  
      /**
       * Lance la transition pour remplacer une anecdote.
       */
      rotateFacts() {
        if (this.transitioning) return; // Empêcher les rotations concurrentes
        this.transitioning = true;
  
        // Choisir aléatoirement un fait à remplacer
        const factIndex = Math.floor(Math.random() * this.displayedFacts.length);
        const factToReplace = this.displayedFacts[factIndex];
  
        // Appliquer la classe de fade-out à l'élément ciblé
        this.displayedFacts[factIndex].animationClass = 'fade-out';
        // Laisser la classe se supprimer après la fin de l'animation dans handleAnimationEnd
      },
  
      /**
       * Gère la fin des animations de fade-out et fade-in.
       */
      handleAnimationEnd(factId) {
        const factIndex = this.displayedFacts.findIndex(fact => fact.id === factId);
        if (factIndex === -1) return;
  
        const fact = this.displayedFacts[factIndex];
        if (fact.animationClass === 'fade-out') {
          // Remplacer le fait avec un nouveau fait et appliquer fade-in
          const newFact = this.pickRandomFacts(1)[0];
          if (newFact) {
            this.displayedFacts[factIndex] = { ...newFact, animationClass: 'fade-in' };
          }
        } else if (fact.animationClass === 'fade-in') {
          // Réinitialiser la classe d'animation
          this.displayedFacts[factIndex].animationClass = '';
          this.transitioning = false;
        }
      }
    },
    mounted() {
      this.initFactsDisplay();
    },
    beforeUnmount() { // Remplacé beforeDestroy par beforeUnmount pour Vue 3
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }
  };
  </script>
  
  <style scoped>
  .right-sidebar {
    padding: 2rem 1.5rem;
    background-color: #ffffff;
    height: 100%;
    color: #2c3e50;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .right-sidebar section {
    margin-bottom: 1rem;
  }
  
  .right-sidebar h2 {
    font-size: 1.6rem; /* Augmentation de la taille du titre */
    margin-bottom: 1rem;
    color: var(--primary-color);
    border-bottom: 2px solid var(--primary-color-light);
    padding-bottom: 0.5rem;
  }
  
  .right-sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  /* --- Styles pour les Anecdotes --- */
  .fun-facts {
    /* Vous pouvez ajuster la marge si nécessaire */
  }
  
  .facts-list {
    display: flex;
    flex-direction: column;
    gap: 1rem; /* Augmentation de l'espacement entre les anecdotes */
    overflow: hidden; /* pour éviter des sauts */
  }
  
  .fact-item {
    background-color: #f9f9f9;
    color: #333;
    margin-bottom: 0;
    padding: 1rem 1.5rem; /* Augmentation du padding pour des anecdotes plus grandes */
    border-radius: 0.5rem;
    cursor: default;
    font-size: 1.1rem; /* Augmentation de la taille de la police */
    line-height: 1.5; /* Amélioration de la lisibilité */
    opacity: 1;
  }
  
  /* Classes d'animation */
  .fade-out {
    animation: fadeOutSteps 1s forwards;
  }
  
  .fade-in {
    animation: fadeInSteps 1s forwards;
  }
  
  /* Keyframes pour fade-out avec pauses à chaque 10% */
  @keyframes fadeOutSteps {
    0% { opacity: 1; }
    10% { opacity: 0.9; }
    20% { opacity: 0.8; }
    30% { opacity: 0.7; }
    40% { opacity: 0.6; }
    50% { opacity: 0.5; }
    60% { opacity: 0.4; }
    70% { opacity: 0.3; }
    80% { opacity: 0.2; }
    90% { opacity: 0.1; }
    100% { opacity: 0; }
  }
  
  /* Keyframes pour fade-in avec pauses à chaque 10% */
  @keyframes fadeInSteps {
    0% { opacity: 0; }
    10% { opacity: 0.1; }
    20% { opacity: 0.2; }
    30% { opacity: 0.3; }
    40% { opacity: 0.4; }
    50% { opacity: 0.5; }
    60% { opacity: 0.6; }
    70% { opacity: 0.7; }
    80% { opacity: 0.8; }
    90% { opacity: 0.9; }
    100% { opacity: 1; }
  }
  
  /* Ajoutez un peu de transition pour améliorer la fluidité */
  .fade-out,
  .fade-in {
    transition: opacity 0.1s linear;
  }
  </style>
  