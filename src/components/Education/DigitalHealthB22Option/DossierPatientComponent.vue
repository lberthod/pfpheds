<!-- src/components/Education/TableRondeComp.vue -->
<template>
    <div class="table-ronde-comp">
      <div class="video-container">
        <iframe
          :src="videoUrl"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        ></iframe>
      </div>
      <div class="description">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
     
      <!-- Section Chat avec ChatGPT -->
      <div class="chat-section">
        <h3>Discuter avec ChatGPT</h3>
        <div class="chat-window" ref="chatWindow">
          <div
            v-for="(message, index) in conversation"
            :key="index"
            :class="message.sender"
          >
            <p>{{ message.text }}</p>
          </div>
          <div v-if="isLoading" class="loading">
            <p>ChatGPT est en train de répondre...</p>
          </div>
        </div>
        <form @submit.prevent="sendMessage" class="chat-form">
          <input
            v-model.trim="userInput"
            type="text"
            placeholder="Écrivez votre message..."
            required
            @keydown.enter.prevent
          />
          <button type="submit" :disabled="isLoading">Envoyer</button>
        </form>
        <div v-if="error" class="error">
          <p>{{ error }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from "@/firebase"; // Assurez-vous que le chemin est correct
  import {
    ref as dbRef,
    push,
    onChildAdded,
    set,
    off,
  } from "firebase/database";
  import { ref, reactive, onMounted, onBeforeUnmount, watch } from "vue";
    const per = ' tu es expert digital santé a parler avec des étudiatns en soins infirmiers su  , repond de maniere succint, qualité, vulgarié, et pedagogiuqe, et simple si possbile.        Tu parle que de cet interview   que tu as acces ici après :  Aujourdhui nous en avec cédric michelet et nous allons  regarder différents aspects des dossiers électroniques3  3Patients cédric michelet en tant que responsable cyber3  santé et dans lassociation Kara ka  3qui est lassociation intercon tonal pour le dossier3  électronique du patient nous allons regarder avec lui plus  en détail cette thématique  Merci loïc Donc effectivement  je travaille pour le service de la santé publique du canton  du valais et je vais vous présenter aujourdhui les  différents éléments qui constituent  le dossier électronique du patient3  3La présentation va sarticuler autour de trois points3  3Tout dabord le dossier électronique3  3Quest-ce que cest le contexte? À quoi ça sert?3  3Dans un deuxième temps33  33la partie professionnelle qui vous33  3concerne peut peut être un petit peu plus3  3Comment saffiler comment utiliser le dossier électronique?  Et pour finir on regardera du côté des patients comment ces  derniers peuvent sinscrire  ouvrir un dossier électronique et utiliser ce dernier33  33On va rentrer tout de suite dans le vif du sujet3  Donc le dossier électronique du patient ou dep ou dep  est acronyme officiel qui a été inscrit dans la loi fédérale  3sur le dossier électronique par le parlementaire3  Vous avez ici les différents acronymes et les différents  noms dans les différentes langues nationales  Donc quest-ce que cest le3  dossier électronique du patient?3  Si vous êtes des professionnel de santé33  ce nest pas à vous que je vais apprendre quaujourdhui33  il y a beaucoup dacteurs de santé qui3  gravitent autour du patient3   ans en arrière3  on avait uniquement un médecin de famille mais aujourdhui3  il y a beaucoup plus dacteurs qui vous prennent en charge3  On peut penser à lhôpital à la pharmacie33  33au CMS pour les soins à domicile aux ems3  3pour quand vous serez un petit peu plus vieux et tous ces3  33acteurs séchangent de linformation3  3mais de manière unid direction33  3Donc chacun échange avec une seule autre personne3  Et ces différents canaux peuvent prendre différentes formes  comme lenvoi d email la messagerie aujourdhui whatsapp  qui ne devrait pas être utilisée car peu sécurisée  mais quand même utilisée sur le terrain3  des appels téléphoniques ou des courriers papier3  lambition du dossier électronique du patient3  cest venir se substituer à ces différents canaux  dinformation afin davoir un point unique  pour retrouver les informations médicales3  Vous le voyez en bas à gauche lexclusion des assurances  Donc cest uniquement un outil qui regroupe les acteurs et  3les professionnels de santé3  Donc pas du tout les assurances  Donc si on résume de très haut niveau  donc le dossier électronique du patient  cest un point daccès unique aux documents médicaux3  indépendamment de leur lieu de production  Cela veut dire que si un professionnel de santé cherche un3  3document qui vous concerne333  3son premier réflexe devrait être daller voir dans votre3  3dossier électronique du patient3  3Deuxièmement une notion assez importante3  Le dep est un système secondaire par  3opposition à système primaire3  Donc système primaire  cest le logiciel que le professionnel  va utiliser tous les jours  Dans sa pratique le dep na pas vocation à venir se  3substituer à ses logiciels33  Le médecin aura son logiciel lhôpital aura son logiciel  3Le dep est uniquement une plate-forme intermédiaire qui3  3collecte les documents importants et3  33vitaux pour votre prise en charge33  3Donc cest uniquement une copie des documents3  3Cest pour ça que cest un système secondaire3  33Et troisièmement le dossier électronique est33  3une base pour la suite33  3Le dossier électronique permet le partage de documents3  3qui vous sont pour des épisodes de soins qui33  3vous sont déjà arrivés3  3Mais il y a dautres services qui vont venir graviter autour3  3du dossier électronique et sappuyer sur ce dernier3  33On peut penser au transfert de documents entre professionnel33  333de santé au plan de médication pour avoir une vision à jour333  333de votre médication ou le plan de soins partagés333  33pour la gestion des soins à domicile33  3Maintenant quelques notions autour du contexte politique et3  3légal qui a vu la mise en œuvre du dossier électronique33  3Donc la première stratégie cyber santé de la confédération33  3date de  avec une révision en 3  Et tout ça a abouti à la mise en œuvre de ce fameux dossier  électronique avec la l Depp  Donc la loi sur le dossier électronique du patient  qui est rentrée en vigueur avec ces différentes ordonnances  dapplication le avril    il est prévu et on en parlera un petit peu plus tard3  une révision de fond de cette loi qui devrait intervenir au  plus tôt pour   soit à peu près  ans après lentrée en vigueur3  de la première loi3  Globalement ce qui est prévu dans la loi et lambition  3primaire du dossier électronique était damener différents3  3bénéfices tant pour le citoyen que pour les33  3différents professionnels de santé3  3La première la plus évidente33  3cest lamélioration de la qualité et de3  33la continuité des soins3  On peut imaginer en effet quun professionnel qui a accès à  la bonne information au bon moment pourra mieux prendre en3  charge ces différents patients  3une diminution des risques derreur via un accès plus aisé  et plus direct à lintégralité de la documentation médicale  éviter des examens inutiles  Aujourdhui souvent3  3il est plus simple de refaire un examen  3que de rechercher les anciens examens3  auprès dautres institutions  Donc le but du dossier électronique et justement de  minimiser ces examens redondants3  Et puis le dernier point  donner un accès facilité au dossier médical3  3tant du point de vue des3  professionnels mais aussi des patients  Donc on le sait peut être tout le monde ne le sait pas  mais les données médicales appartiennent  directement aux patients33  Il est en droit de les exiger et3  dy avoir accès en tout temps3  Mais ce nest pas forcément évident aujourdhui parce quon33  3ne sait pas forcément à qui sadresser33  3par exemple dans les grandes institutions33  33Et puis il y a une mise à jour régulière3333  3Cest difficile pour un patient33  3de le demander toutes les semaines33  3Lavantage du dossier électronique33  cest quil y a accès directement depuis  3chez lui en temps réel  Il a noter que le projet global dossier électronique a été  3jugé dutilité publique par le service3  de la santé et le canton  3Et cest pourquoi nous nous engageons de manière33  importante dans ce projet  Pour ce faire différents éléments ont été mis en place  Le canton du valais sest rendu compte assez rapidement en   au vu de la complexité de la loi et des ordonnances  sur le dossier électronique quil nest pas possible de  mettre en œuvre ce système tout seul3  Cest pourquoi on sest rapproché des  3différents cantons romans3  Et ceci a vu la création en mars   dune association  inter cantonale qui regroupe cinq cantons  en loccurrence le valais fribourg Genève  jura et le canton de vaud3  Et nous avons créé lassociation inter  cantonale qui sappelle Kara  33Cet association inter cantonal est financé intégralement par33  3les différents cantons et a notamment pour mission de mettre3  3en œuvre le dossier électronique sur les3  3territoires concernés333  Il a noté que lassociation se comporte comme nimporte  quelle autre association de droit privé3  Cest à dire quil y a une assemblée générale qui est  aujourdhui constituée des différents conseillers détat de  la santé des différents cantons  Nous avons un comité de direction constitué des chefs de  service de la santé des différents cantons et ensuite  différentes commissions de travail  tant au niveau juridique ou de coordination  ou pour la prise en charge des besoins des patients3  Lambition qui se cache derrière Kara  et je lai déjà dit une fois  cest que outre offrir le dep qui repose sur une base  légale il y a la volonté doffrir dautres services à  valeur ajoutée pour les professionnels et les patients des  différents cantons concernés  Le premier est le service transfert en professionnel  3qui est déjà en fonction en val33  3Jen parler un un petit peu plus tard plus en détail  le plan de médication qui a lambition doffrir une vue3  3exhaustive de la médication dun patient3  33Aujourdhui on voit que cest une33  3problématique assez importante3  3Les patients savent assez peu le nombre de3  3médicaments quils prennent3  On a des patients qui sont poly morbides  3On a des fois des patients aujourdhui qui prennent plus de3   à  médicaments par jour  Alors se rappeler exactement chaque médicament le nom  la posologie cest pas forcément évident3  Il y a beaucoup dacteurs qui  3gravitent autour de la médication3  On peut penser aux médecins qui vous fait lordonnance  la pharmacie qui va faire délivrance des médicaments  et des fois encore  lordonnance du médecin et la délivrance  Il peut avoir une différence3  Par exemple si on donne un générique à la place dun  médicament ou sil y a une erreur dans la posologie  on rappelle que le rôle du pharmacien est aussi de3  3vérifier lordonnance3  Ensuite si vous êtes hospitalisé  lhôpital va vous donner un certain nombre de médicaments  pas forcément vos traitements habituels  mais ce qui a besoin pendant votre séjour et en fonction des  médicaments que lhôpital utilise3  Donc on voit beaucoup de mouvements autour des médicaments  Donc une grande difficulté à avoir une vue globale et cest  3le rôle du plan de médication partagée3  333Ce module est en développement333  3On espère pouvoir faire les premiers pilotes à la fin 3  3le plan de soin partagé3  Outil aussi un outil qui est en développement au sankara  Cest un outil pour gérer linter profession  plus particulièrement pour les soins à domicile ou il y a  plusieurs infirmières les CMS  différents médecins qui peuvent entourer un patient3  Et donc là on a un outil qui permette de faire un suivi  actif des différents patients  Donc ce module est un peu plus3  avancé dans son développement  Les pilotes vont commencer en janvier 3  et ensuite plein dautres choses qui vont aussi arriver  En parallèle on peut penser au carnet de vaccination  qui est un projet piloté par l fsp et qui va être intégré  3début  dans le dossier électronique3  et dautres éléments on peut penser aux directives3  anticipées aujourdhui ont fourni un template de documents3  pour imaginer un module un peu plus évolué3  3le don dorganes un petit peu peu moins utile depuis que ça333  a été inscrit dans la loi le consentement automatique3  3mais plein déléments qui peuvent venir et de briques33  3additionnels qui peuvent venir se greffer33  3autour du dossier électronique33  33Et ça cest lambition de Cara333  3Mettre en place ces outils de manière gratuite33  33dans les différents cantons3  Le but on le voit  cest favoriser la collaboration entre les professionnels de  santé toujours au bénéfice de la population3  des patients et des professionnels  Quelques mots sur le financement et les bases légales  3Donc lambition de Cara est doffrir un dossier  électronique y compris le transfert aujourdhui et demain  les autres modules PMP et PSP  à tous les prestataires de soins sur les cantons concernés  Lutilisation de la plateforme est aujourdhui entièrement  gratuite et financée par les cantons  3et lobjectif réel derrière tout ça3  cest de faire avancer le système de santé public33  Donc il ny a aucun intérêt commercial vu que cest porté  par les pouvoirs publics  Donc pas dintérêt commercial  3ni sur les données utilisateurs3  3ni sur les données médicales  En parallèle de ça  3les cantons concernés ont créé une base légale commune3  3Donc le dossier électronique du patient aujourdhui est3  3couvert par la l Depp qui est une loi fédérale33  3Par contre les services à valeur ajoutée33  comme le transfert PMP au PSP nont pas de base légale  Cest pourquoi il y a eu la création de cette convention3  inter cantonale qui est rentrée en vigueur en février   et qui couvre justement lutilisation  de ses différents services  Un dernier mot on parle de communauté  d si on va voir la loi  Donc la communauté cest un regroupement de professionnels  et de population dont Kara est une communauté au sens de la  loi qui couvre les cinq cantons précités3  3Mais en suisse concurrence oblige telle que prévue par le  législateur dans la loi il y a différentes autres  communautés qui existent  On voit quelques-unes sur même toute lintégralité sur ce  3schéma par exemple3  3pour nos chatel qui ont leur propre communauté  3Mon dossier de santé si remonte on à argovie avec é médo  une grande partie des cantons suisse allemands sont  3regroupés dans une communauté qui appartient3  3à la poste post année33  3Là on a les grisons dans et sanita et quelques communautés3  3transverses par exemple3  33la communauté des pharmaciens à Bills ou une portée par la3  f à des suisses  Donc on voit que cest un paysage hétéroclite3  3donc forcément difficile à expliquer et à  montrer aux patients  Cest pour ça quon a déjà essayé davoir une vision unique  3avec Kara ami pour les cantons romains  3quelques mots maintenant plus33  particulièrement sur notre canton  Donc le canton du valais comment on organisé3  Donc on la vu on a Kara au niveau inter cantonal  mais au niveau du canton du valais  il était aussi important pour nous  3davoir le maximum dacteurs de santé  3mais aussi la population qui soit impliquée dans33  le pilotage de ce projet3  Donc on a différents acteurs représentés ici qui3  gravitent autour du projet33  Tout dabord en o gauche au niveau du canton3  Donc on a le département de la santé et le s sp3  Donc le service de santé république qui est actif3  Et nous avons deux commissions au niveau du canton33  3la première le GA33  33Donc le groupe daccompagnement pour le dossier électronique333  3et la deuxième la commission consultative pour la33  3protection et sécurité des données33  3Jy reviendrai juste après333  nous avons des contacts sur la droite avec33  les autres cantons directement3  Donc nos collègues et nous avons des contacts en dessous3  avec Cara qui lui-même3  soccupe de notre prestataire qui nous fournit aujourdhui3  la plate-forme du dossier33  3électronique qui est la poste suisse3  Donc juste un petit peu plus en détail sur limplication3  3des partenaires locaux en valet33  3Donc je lai dit nous avons ce fameux gad33  3qui est le groupe daccompagnement333  3Donc cest un groupe que nous réunissons deux à trois fois33  3par année en fonction des besoins33  3Maintenant un petit peu moi plus quune fois33  3dans lequel nous échangeons avec les différents acteurs33  33de santé du canton33  3Donc on voit un petit peu ici les différents participants33  3Donc on voit que nous avons les grandes institutions comme333  33le lui valet la clinique de adaptation3333  3toutes les cliniques du haut du haut plateau de adaptation333  3On a la société médicale3333  333donc est différente faîtières des professionnels33333  33Donc la société médicale du valet pour les médecins3333  33on a Laval pour les ems le gvc ms33333  33pour que représentent les CMS3333  33On a pour les physio3333  3on a aussi un représentant des patients au travers de333  3lassociation ad pales33  3Donc on voit quon a lintégralité des acteurs qui sont33  3concernés et impliqués33  3Donc cest avec eux quon discute de leurs besoins et quon333  33leur explique lévolution du projet pour quils puissent en333  3ensuite porter à leurs différents membres33  3Généralement pour chacun de ces acteurs33  on a deux représentants toujours un qui représente3  3le valet francophone et un qui représente le valet3  Et à côté de la commission de protection des sécurité3  cest une commission aussi consultative qui nous aide à3  prendre quelques décisions autour des différents règlements3  aux lois que nous mettons en place3  3Voilà pour lorganisation purement valaisanne33  3Maintenant on va rentrer un peu dans le contenu du dep33  Donc en parlant de sécurité3  de contenu et de comment on y accède3  tout dabord on va commencer33  3On va commencer par un schéma de haut niveau qui explique33  3tout petit peu le processus de vie33  3dun dossier électronique33  Donc la participation du patient est3  33donc le patient aujourdhui peut choisir333  davoir un dep ou pas33  Donc il y a une action consciente de sa part3  33pour ouvrir un dossier électronique333  Donc la première étape cest que le patient33  doit signer un consentement ou un contrat si on veut3  pour louverture dun dossier électronique à partir du3  moment ou ce consentement est signé3  le dossier électronique existe333  à partir du moment ou le dossier électronique existe les3  différents professionnels de santé3  Donc des professionnels indépendants ou des institutions333  3peuvent venir publier dans le dossier électronique33  Donc lalimenter en documents3  Donc on voit quil ny a pas de droit particulier3  à lécriture dans un dossier électronique3  3partie du moment ou il existe nimporte quel professionnel33  peut automatiquement alimenter3  nimporte quel dossier électronique3  3Ensuite le patient va pouvoir donner des droits à33  33différents professionnels de santé333  3Donc cest un acte conscient de sa part333  33Donc il va délibérément choisir des professionnels333  3ou des institutions33  Et dès que ce professionnel ou linstitution a accès3  il va pouvoir consulter des documents dans le dep33  3Il y a une fonctionnalité qui a été prévue par le3  législateur qui sappelle le mode bris de glace3  3ou le mode durgence33  Typiquement cest un patient qui arriverait3  en urgence à lhôpital3  Donc inconscient qui dispose dun dossier électronique mais33  qui na pas donné de droit à lhôpital3  lhôpital pourrait accéder en mode bris de glace directement3  3au documents pour la prise en charge du patient3  Donc à chaque accès en mode bris de glace3  3il faut noter le pourquoi du comment de laccès3  et le patient sera informé de tous les bris de glace3  Et sil devait y avoir un accès indu via cette  fonctionnalité après sa relève du domaine pénal  le patient a la possibilité aussi sur son dossier  3électronique de désactiver ses accès Brit las pour empêcher333  3tout accès indu à ce niveau là3  3Ensuite nouveauté par rapport à lexistence du dossier3  3papier ou du dossier purement dans les institutions33  le patient peut directement accéder3  3gérer et alimenter son dossier électronique  Donc pour lui cest beaucoup plus facile daccéder à ces  documents qui sont directement mis à  disposition dans son dep  Et il peut aussi alimenté3  on pense particulièrement aux directives anticipées3  Par exemple on voit que le patient a un rôle très actif  3dans son dossier électronique  Cest lui qui doit louvrir3  3Cest lui qui doit le gérer celui qui donne des droits33  Donc on peut imaginer que tous les patients nont pas cette  capacité à se connecter à utiliser loutil  Donc cest pourquoi dans le dossier électronique  3il y a la possibilité de désigner un représentant  Donc le représentant aura les mêmes droits  que le patient pourra agir3  De la même manière il a noté que le représentant Depp est  3un tout petit peu différent du représentant civil33  Il ny a pas forcément un lien entre le  patient et le représentant3  On peut imaginer les choses les plus simples  3Cest le parent qui ouvre pour son pour ses enfants3  3Donc ça ou relativement simple333  33un tuteur qui ouvre pour un pupille33  3mais ça pourrait nimporte être nimporte qui33  votre voisin ou votre médecin qui pourrait33  3gérer votre dep pour vous33  Donc là il suffit davoir de signer3  un papier qui autorise votre représentant à agir3  sur votre dossier électronique3  Maintenant si on parle tout peu de sécurité3  3donc évidemment on gère des données médicales3  hautement sensibles  Donc la sécurité est évidemment un élément qui est au centre  3du dossier électronique  3Donc comment fonctionnent les droits33  daccès sur le dossier électronique?  Donc par défaut personne na accès à votre dep uniquement  3le patient ou le représentant peut voir son dep  Ensuite le patient pourra donner des droits daccès à des3  utilisateurs de manière nominative par exemple  3à votre médecin à votre pharmacia ou à des groupes33  Donc par exemple vous pourrez donner à lhôpital du valet  3ou à une autre institution des droits daccès parce que vous3  3ne savez pas forcément quel médecin ou quel médecin3  33assistant va vous prendre en charge333  3quand vous serez hospitalisé3  3Il y a une possibilité de choisir une durée de3  3validité de ces droits3  Par exemple pour dire je donne à lhôpital pour la  3durée de mon séjour à lhôpital3  Donc pour deux semaines et automatiquement au bout des deux  semaines les droits seffacent  Ensuite il y a la possibilité  outre de donner un droit global sur vos dos électroniques  il y a des droits au niveau de chaque document3  Donc il y a une possibilité de modifier par3  3document les différents droits  Donc si on regarde un tout petit peu un petit schéma  Donc en termes de niveau de confidentialité aujourdhui  3il y en a trois qui sont définis de par la loi de manière3  33obligatoire normale restreint et secret  3Donc le patient peut en tout temps pour chacun des  documents modifier le niveau de droit  3Donc généralement3  les documents sont en mode normal par défaut33  3le patient peut le monter en restreint3  redescendre en normal le mettre en secret  le changer en tout temps autant de fois quil le désire3  33Donc quest-ce que ça implique en termes daccès?3  3Donc pour le patient ou ce représentant3  33il a accès aux documents des trois niveaux par défaut33  Ensuite un professionnel ou une institution à laquelle vous3  donnez accès à votre dep pourra lire par défaut tous les  documents en mode normal et par les deux autres  Ensuite vous avez la possibilité pour chaque professionnel3  ou institution de les déclarer comme médecin ou  3institution de confiance  Donc il y a une étape supplémentaire et des coups33  33ces professionnels auront des droits étendus3  Non seulement ils pourront voir les documents en mode  normal mais aussi en mode restreint3  Et pour finir il a possibilité davoir une liste noire ou  3black liste sur laquelle vous inscrivez des gens  Ceci est notamment utile si vous donnez un droit  33par exemple à une institution ou quel cas tous les3  utilisateurs de linstitution auront des droits  Mais si vous voulez en sortir en exclure un spécifiquement  il suffit de la mettre sur à l noire et indépendamment des3  3autres droits par défaut il naura jamais accès33  3Ensuite au niveau sécurité indépendant des droits daccès3  3la loi sur le dossier électronique du patient et ses3  33différentes ordonnances impose des comptes contraintes de  sécurité extrêmement élevées  3Il y a plusieurs points de contrôle  Jen ai mis quelques uns ici3  Par exemple il y a lobligation davoir le stockage des  3documents uniquement en suisse et de manière cryptée  ce qui veut dire que dans la base de données  un autre prestataires aujourdhui  les documents sont cryptés  Et il y a aussi une obligation que la clé de crypt ne soit  pas accessible à la personne qui gère la base donnée des  documents ce qui veut dire que par exemple  si y a un employé indélicat de notre prestataire  voler la base donnée des documents médicaux3  il ne pourrait rien en faire parce quil  naurait pas la clé de décryptage  3Donc cest des choses qui sont contrôlées3  Il y a aussi la possibilité davoir des traces en temps réel  dans ce qui veut dire que toutes les actions qui sont  3effectuées sur votre dossier électronique  3Donc un médecin qui accède à votre dossier3  un médecin qui va lire un document  un médecin qui va récupérer un document  33toutes ses actions sont tracées et legué33  33Et ces différentes traces sont accessibles en temps réel aux33  3patients via le portail daccès3  3Et le dernier élément cest le login à double facteur  ce qui veut dire quon a un nom dutilisateur  un mot de passe et un autre facteur qui permet de mieux  sécuriser votre votre logging3  ces différents contrôles ces différentes exigences3  Ça représente à peu près  points de contrôle différent3  Pour vous donner un peu le niveau de profondeur3  doivent être certifiés et audité par un auditeur exter33  3Cet auditeur doit être accrédité par la confédération et33  3cette audit est valable trois ans3  Donc la saison Cara a été certifiée en avril  et a été rec3  certifiée en 3  Donc dans la certification3  il y a les outils techniques qui sont auditées3  mais aussi également tous les processus de lassociation et  qui gravitent là autour je vous ai mis en bas à droite ici  33le logo officiel de la confédération légale qui333  3indique que la communauté a été certifiée avec un petit lien33  d patient ta Cara qui vous permet de vérifier en ligne la  validité de ces différentes certifications  Ensuite en termes de contenu3  3Donc quand ce quon retrouve en fait dans ce dossier  33électronique donc le dossier électronique est alimenté par33  deux catégories dutilisateurs dune part  3les professionnels de santé3  3mais aussi les patients directement globalement dans le dep3  3on va retrouver des rapports ou des résultats déléments qui3  3vous sont déjà arrivés33  33Donc par exemple des lettres de sortie de lhôpital333  3des rapports de consultation des résultats de laboratoire333  3généralement le format de ces documents est majoritairement3  3des documents PDF vu que ce sont des rapports3  33Mais il y a également la possibilité déjà aujourdhui de33  33mettre des documents ou des données sous des33  3formats structurés33  33Mais encore faut-il que ce format structuré soit le même33  333utilisé dans toute la suisse?33  333Cest pourquoi il y a une liste de formats de documents3333  33reconnus par la confédération et uniquement ces formats là33  33peuvent être aujourdhui stockés dans le dep3  3On entend souvent la critique de dire que le dep est3  33un cimetière à PDF33  3Alors malheureusement ce nest pas tout âgé3  33juste cette manière là dune part33  3il faut déjà dire que le PDF est un document médical3  3Donc cest déjà utile pour les différents professionnels33  3et différents patients3  Le dep a la possibilité déjà aujourdhui de stocker autre3  3chose que du dep de stocker de la donnée structurée  mais ça nécessite deux autres éléments  Il faut que celui qui produit linformation  Donc celui qui produit le rapport soit capable de produire  3un document sous forme structurée3  ce qui nest pas forcément le cas aujourdhui  3Quand beaucoup dacteurs aujourdhui3  produisent des rapports dans Word  Donc évidemment en tirer un document structuré  ça va être un peu compliqué3  Et si on structure le document encore faut il que celui qui  veut lire le document et lexploiter soit en3  3capacité de lire et dexploiter un format structuré3  333Donc on voit que ce nest pas forcément le dept qui pose33  33souci aujourdhui mais vraiment que toute la chaîne soit33  3adaptée à ce niveau là3  3un des premiers éléments quon pourrait imaginer qui  arrivera assez rapidement de manière structurée  ça peut être les résultats de laboratoire parce que  3dune part cest déjà structuré à la base et ça fait sens33  de lexploiter de manière structurée  parce ça permet de tracer des courbes en fonction  de plusieurs résultats  Donc là il y aurait un réel intérêt par contre  3des lettres ou des rapports3  On peut imaginer quil y a un tout petit peu moins  3dintérêt aujourdhui3  Elle est structurer directement  Ensuite quand vous offrez un dossier électronique du  patient aujourdhui il est vide3  évidemment parce quil ny a aucun document  Toutefois au sein de Kara  lors de louverture du dossier électronique  on offre la possibilité aux patients de sélectionner un  certain nombre dinstitutions dans lequel  il a été hospitalisé  Et ensuite Kara va envoyer automatiquement la demande à ses  institutions en demande de publier lhistorique pour le  patient dans votre dossier électronique  3Donc aujourdhui pour le valet33  33cest déjà possible pour différentes institutions de le33  3faire comme lhôpital du valet3  3la clinique remonte de adaptation la clinique de valeur3  la clinique cice à saxon la clinique bernoise  3et la clinique de cran Montana3  Donc si vous sélectionnez ces institutions et que vous avez  fait un séjour ces institutions vont haute bâtiment  publier un ensemble de lhistorique de vos documents  Pour finir en termes daccès  Donc pour vous connecter sur votre dossier électronique3  donc vous allez le faire pour les patients au travers  dune application web  Donc vous allez vous connecter directement sur internet  pour les professionnels cest également pareil  Donc il y a la possibilité davoir un portail professionnel  pour ceux ci mais en parallèle de ça  3il y a aussi la possibilité davoir une interface technique33  pour les différents éditeurs de logiciels3  qui officient pour les professionnels33  33Donc qui a la possibilité pour les professionnels de rester333  3dans leur logiciel métier dont ils ont de lhabitude et33  3dinteragir avec le dossier électronique directement33  Celui-ci Donc évidemment en termes de confort3  3cest beaucoup plus agréable parce que vous avez peut être33  quun seul bouton pour publier un document quun seul bouton3  pour consulter le dossier électronique dun patience nest3  pas besoin daller sur le portail web encore faut  3il que léditeur de logiciel  ait fait les travaux de raccordement nécessaires  3Et ça ça un travail encore pour nous de tous les jours33  dessayer de convaincre ces différents éditeurs  de faire ces différents travaux3  Néanmoins au travers de Kara on essaie  on a compris lintérêt davoir des logiciels connectés3  Donc on met en œuvre différentes  33ressources depuis plusieurs années33  On essaie de démarer les éditeurs depuis plusieurs années et  on met beaucoup de moyens gratuitement à disposition de ces  divers éditeurs pour faciliter leur intégration  Quelques mots maintenant sur le service transfert dont jai3  parlé rapidement au début3  3Donc le service transfert3  3Donc cest un module qui permet de faire léchange direct3  3et numérique de documents entre professionnels3  3et institutions de santé3  Donc on na pas le patient qui est dans la boucle pour le  moment cest un service qui est opérationnel en valet  depuis début   Donc depuis assez longtemps  bientôt  ans maintenant et qui a été migré sur la3  3plateforme Kara de manière inter cantonale3  en octobre    Le cas dusage que nous avons majoritairement aujourdhui  3cest lenvoi des documents depuis lhôpital du valet vers  les médecins en cabinet3  Donc on a aujourdhui à peu près  médecins  3utilisateurs de cette plateforme  Et ça représente environ entre neuf et  zéro documents qui  sont échangés de manière numérique  3par ces plateformes par mois3  Et le service est disponible comme la plate-forme Kara  gratuitement pour les différents acteurs de santé la seule3  obligation cest dêtre affilier Kara évidemment3  Donc un petit schéma juste pour montrer comment  ça se présente aujourdhui  3Donc au sommet on a linstitution3  3par exemple lhôpital du valet33  3qui envoie de manière automatiser les documents3  3Donc lhôpital aujourdhui envoie une douzaine de types de  3documents de manière automatisé pour imaginer de sortie des33  3notes de consultation des résultats de laboratoire  Donc cest aujourdhui implémenté de manière native et  transparente dans le système de lhôpital  Donc les médecins de lhôpital savent peut être même pas que  ça voyait de manière automatisée  En fait dès que le document est prêt  dès que le document est terminé dans le logiciel de  3lhôpital il est automatiquement exporté pour3  les différents utilisateurs  Donc cest envoyé sur la plateforme carra3  Les documents sont stockés pendant 3 jours  3ce qui était une condition du préposé de stocker de manière3  temporaire les documents et tout ça repose en fait  sur la convention intercontinentale  Donc cest notre base légale pour le mettre en œuvre  à partir du moment ou le document est à disposition  la plateforme envoie automatiquement une notification  aux différents destinataires du document pour dire quil y a  un nouveau document à disposition  Et à partir de ce moment là3  33le médecin a trois possibilités pour récupérer le document33  3La première cest de se connecter sur un portail web dans3  3lequel il va pouvoir voir la liste des documents à3  disposition lesli voire les récupérer  La deuxième cécile dispose dun logiciel de cabinet qui a  intégré donc aujourdhui avec le service transfert  nous avons le logiciel de cabinet me de la  3so liva qui a intégré  Donc cest une société valaisanne qui représente à peu près   % des cabinets installés aujourdhui en valet3  3Donc on nen a quun mais ça représenterait même une3  33majorité des utilisateurs pour nous33  3Et donc là si les médecins qui disposent du logiciel me we3  3directement dans midway ils ont un bouton3  3on sait quils peuvent récupérer et voir la liste de tous3  3les documents qui au ont été adressés par lhôpital33  3Et la deuxième dernière possibilité3  3cest pour les personnes qui disposent dun email3  33sécurisé à ch3  3Il y a la possibilité dès que le document arrive dans la33  3plate-forme de transfert quun email sécurisé soit envoyé3  3avec le document en pit3  3Voilà donc ça cest un peu le service transfert3  33Cest relativement apprécié aujourdhui33  33parce que dès quun médecin333  33sinscrit utilise le service transfert33  33On peut lui assurer que dès le lendemain333  3le  % des documents qui le concernent33  33qui transitent par lhôpital il les aura pas à de savoir si333  3le patient il a adep ou pas3333  3On sait quon va tout lui envoyer par le service transfert333  3et aussi une rapidité dès que le document est33  3clos à lhôpital aujourdhui33  3Donc le document est prêt Généralement deux minutes plus33  3tard le document est à disposition par le professionnel33  3On voit quil y a un gain de temps33  3Et puis il y a aussi un gain de traitement aujourdhui3  33avant cétait une impression cétait un envoi courrier33  3Donc il faut quune une secrétaire médicale à lhôpital33  3imprime le document le mettre sous pli33  3il faut de ou trois jours pour que ça arrive par courrier33  3Ensuite il faut que vos secrétaire ou cabinet3  33ouvre lenveloppe scan33  3le document dans votre dossier local3  3Donc on imagine le gain de temps davoir un canal numérique33  3Donc ça cest un service déjà à disposition aujourdhui3  333gratuitement en valais et je dis en valet mais en fait3  3il est aussi déployé3  33Il est en train dêtre déployé sur le canton de vaux3  33Il y en a déjà aujourdhui lhôpital rivière à chablais333  33qui est un hôpital bilan tonal quil lutilise aussi33  33Donc pour nous médecins qui travaille dans le chablais33  3il a la possibilité de recevoir également les documents du h3  3maintenant à passer un peu sur la partie professionnelle3  3Donc en tant que professionnel3  3je suis intéressé par le dossier électronique du patient3  3Quest-ce que je dois faire pour lutiliser?33  3Donc déjà qui doit lutiliser aussi si on revient un petit3  3peu sur les fondamentaux3  3Donc si on reprend la loi aujourdhui dans la loi33  33il est inscrit que les hôpitaux et les cliniques ont33  3lobligation de participer au dossier électronique3  3En théorie ils ont trois ans après lentrée en vigueur de3  33la l Depp pour être intégré33  3Donc ce qui laissait le délai en avril 3  3je vous cache pas que ça pris un petit peu plus de temps que3  3ça pour que les différentes institutions33  3fassent le nécessaire3  33On ne peut pas dire aujourdhui on est bien avancé33  33même si on na pas pas encore  pour exactement atteint le333  3but quon est fixé33  33Mais il y a un petit épisode COVID vide qui arrivait entre33  333deux qui a un peu ralenti333  333Malheureusement les différents délais et les deuxièmes333  33personnes qui ont lobligation de participer au dossier33  33électronique sont les ms et les maisons de naissance qui33  3avait cinq ans après lentrée en vigueur3  3avril en avril 33  3Pour tous les autres acteurs cest à dire les médecins3  3les physi les infirmières ou même les patients333  33Personne na lobligation de participer33  3Donc à bien plaire lutilisation3  3à noter quil y a une petite correction de la laal3  33qui impose pour tous les nouveaux médecins à partir du er33  333janvier  33  33Donc tous les nouveaux médecins qui demandent une33  33autorisation de facturation à la charge de louest33  33Donc lassurance obligatoire des soins33  333il y a une obligation de participer également au dé33  33pour tous les autres acteurs333  33Comme je lai dit lutilisation est totalement libre33  3333à à noter que je lai dit quelquefois333  333il va y avoir une révision de la EP qui33  3333devrait alors il y a une pou létat de consultation publique333  333à lautomne 3333  3333on parle dune entrée en vigueur possible pour 3333  333Donc cest à dire entre aujourdhui  fin 3333  33il y a encore le passage et les discussions aux chambres33  33fédérales la possibilité dun référendum33  33en fonction de comment ça se passe333  33Donc tout ça va prendre trois ou quatre33  333ans pour entrer en vigueur333  333Donc on voit les délais aussi33  333dès quon est sujet à des lois fédérales33  33cest toujours long dans le temps33  33cet à tout est un marathon33  3Donc on imagine  et dans cette loi33  333une des grosses modifications33  3cest lobligation de participation pour tous les acteurs3  33La mal Donc cest à dire quaujourdhui pas tout le monde333  3était concerné mais maintenant ça3  3sera pour tous les acteurs3  3Donc ça veut dire également les médecins qui ont des33  3autorisations avant janvier   pour penser aux physio3  33on peut penser à plein de gens33  33Donc tous les acteurs et professionnels de santé3  3auront lobligation de participer au dossier électronique et3  33lobligation de publier des documents33  3333Ça cétait un peu un des problèmes de la LP aujourdhui333  33dans la loi cest juste marqué quil y a une obligation333  33daffiliation à une communauté333  33Donc cest un peu sujet à interprétation en fonction des33  333personnes avec qui on discute dans la correction de la loi333  3il y aura vraiment une obligation de participation et une3  3obligation de publication des documents3  33Alors maintenant si on en vient à la filiation en tant que33  3professionnelle donc je suis professionnel33  3je veux utiliser quest ce que je dois faire?333  3En fait il y a deux grandes étapes33  3Si on veut la première333  3cest laffiliation à une communauté33  3Alors je vais parler ici de Cara333  3Cest la communauté qui concerne le canton du valais33  3Donc la filiation en fait33  333cest un contrat qui va être signé33  3entre le professionnel et la communauté33  3Et la deuxième vous devez disposer dun log guide sécurisé3  3on des des moyens didentification électronique3  333Donc cest un login sécurisé à deux facteurs33  3Donc si on prend le premier point donc le contrat Kara33  3donc la filiation en tant que tel3  3333Donc cest quelque chose qui peut se faire totalement333  33en ligne aujourdhui333  33Donc il est à noter que ce nest pas le professionnel qui33  33sa fini mais cest linstitution33  33Donc ça cest un prérequis légal33  3Donc cest lhôpital du valet qui saffilie à la communauté33  3ou si vous êtes par exemple3  3un médecin qui travaillait de manière indépendante3  3cest quand même votre cabinet qui va saffiler directement333  33à linstitution on voit quil y la la33  3nécessité davoir un gnn3  3Donc pour le grn cest un identifiant unique33  3tant pour les professionnels de santé que3  3pour les institutions3  3Ensuite une fois que linstitution est affiliée3  3il y aura la déclaration des utilisateurs3  3Donc cest là quon va lister tous les employés qui auront3  33accès au dossier électronique à3  33lintérieur de linstitution33  3Donc on peut penser aux médecins aux infirmières33  3aux secrétaire médicales3  3donc le minimum pour pouvoir saffiler c de déclarer au3  3moins un utilisateur ici aussi il faudra un lln3  33Donc généralement pour les professions médicales33  3le glm est attribué de manière automatique3  33à lobtention du diplôme33  33Quand je pense au pharmacien ou au médecin333  333il se peut que certains acteurs comme des infirmières ou des33  333médicales ne disposent pas dun lln333  3Donc cest quelque chose qui peut se demander33  3gratuitement aujourdhui33  3Et lassociation qui gère les grn en suisse aujourdhui3  3cest la fondation rev data cest que jai mis le lien ici3  33Donc sur leur site directement3  33il y a un formulaire pour faire une demande de numéro lln333  3qui est accessible gratuitement pour nimporte quelle3  33personne qui ait travaille de loin ou de près3  3dans le domaine de la santé3  3Ensuite on déclare des utilisateurs33  33Donc un utilisateur de deux sortes3  3cest soit un professionnel de santé qui sera un utilisateur3  33à part entière mais aussi la possibilité davoir33  33la notion dauxiliaire3  3On pense ici particulièrement aux secrétaire médical qui ne3  3sont pas forcément des professionnels de santé au sens3  33premier du terme qui travaillent quand même dans le domaine3  3Et souvent on voit que même dans les grandes institutions3  33ou dans les cabinets cest pas forcément les médecins qui33  33vont publier les documents333  33Ça peut être la secrétaire qui dans un deuxième temps33  33quand le document est finalisé va pouvoir publier33  33Donc même ces personnes là pourront disposer dun login33  3individuel pour pouvoir se connecter au dossier électronique3  3et soit lire soit publié des documents33  3Il est à noter que les auxiliaires ont un3  3statut un petit peu particulier3  33Un auxiliaire est forcément rattaché à un professionnel de33  33santé et lauxiliaire va hériter33  3des droits du professionnel33  33Donc dans le système on verra le médecin3  3mais on ne verra pas la secrétaire3  333la secrétaire sera rattacher au médecin et aura333  3les mêmes droits que le médecin3  3Évidemment linscription je le redis encore une fois3  3est totalement gratuite pour les différents professionnels3  3Ensuite la deuxième grande étape donc le donc3  3le moyen didentification électronique3  33la contrainte imposée par la loi33  3cest que ce mi doit être certifié33  3Donc on a vu que les communautés certifiées3  33mais les mieux aussi doivent être certifiés avec33  3leurs propres contraintes33  33Donc on peut utiliser que un mois identification certifié33  33selon la loi aujourdhui pour les professionnels33  333il y en a a deux à disposition sur le canton du valet33  3Donc soit la l i de lentreprise elk soit la i de3  3lentreprise ha chien33  33Je vous ai mis un lien ici avec plus dinformations33  3directement sur le site de car les démarches sont à la33  3charge du fournisseur3  33sont à la charge du professionnel de santé à faire33  3directement auprès de des fournisseurs3  3Donc ce nest pas Cara qui soccupe à ce niveau là parce3  3quil se trouve que des fois certaines institutions ont déjà3  33des contrats avec la chienne et disposent déjà de ce type de33  3login qui nest pas utilisé que dans le dossier33  3électronique les coûts33  3sont pris en charge par le professionnel33  3Donc cest le seul coût qui reste333  3à la charge du professionnel333  33Cest le identification33  3Une petite remarque pour les connaisseurs ou les33  3utilisateurs déjà dune ha chienne33  3Les identités ha chiennes peuvent33  33être délivrées à deux niveaux333  3Il y a des ha chien personnelles et des ha chiennes3  3dinstitutions dont vous pourriez avoir une chienne pour3  33votre cabinet médical à noter que cette nest pas utilisable33  333dans le cas du dossier électronique3333  33parce quil faut une chienne personnalisée33  33il faut quon puisse identifier les personnes33  33de manière nominative3  3Ensuite quand on finit3  3laffiliation dans quelques éléments peut être à être3  3conscient cest que la première chose3  3dès que vous êtes affilié et que vous avez déclaré des33  33utilisateurs Linstitution et les utilisateurs seront3  3visibles par les patients dans le dossier électronique3  3Donc à partir de ce moment-là ils pourront commencer à33  3vous donner des droits daccès  soit votre institution à votre cabinet3  soit directement de manière nominative à  des différents utilisateurs3  Avoir ici la différence à les  3auxiliaires ne sont pas visibles3  Les ères héritent des droits du professionnel  à partir du moment où vous êtes visible que les patients  peuvent vous donner des droits ça va créer un certain  nombre dattente chez les patients3  Donc ils sont en droit dattendre que vous allez  3consulter le dossier électronique3  Vous allez les prendre en charge ou au mieux encore que vous  allez publier des documents que vous allez produire pour ses  différents patients3  33Ensuite il est à noter que même si vous disposez pas dun33  33logiciel de cabinet ou un logiciel primaire qui a été3  3intégré vous pouvez toujours utiliser le portail qui est3  3gratuitement à disposition  3Et pour finir sur Kara3  il y a une carte interactive ou cest quon peut voir  lintégralité des professionnels et institutions qui sont33  aujourdhui affiliées et qui3  3utilisent le dossier électronique  On arrive gentiment au dernier point côté patient  Donc les patients comment faire  pour utiliser le dossier électronique?  33Donc on la dit déjà au début3  louverture dun dossier électronique aujourdhui est  totalement facultative pour un impatient3  Ça lui à entreprendre la démarche pour en ouvrira  On a parlé plusieurs fois de cette révision de fond de la l  qui devrait arriver par   Donc on a vu que la première grosse réforme  cétait lobligation pour tous les professionnels  La deuxième grosse réforme33  cest le passage au système opt out  Donc aujourdhui on est dans un système dine  3Cest à dire que le patient doit faire la démarche sil veut3  3un dossier électronique sinon il nen a pas dans la version33  3qui arrivera en  loopt out le principe cest3  3on ouvrira un dossier électronique pour la totalité de la3  3population suisse sauf pour les personnes qui exprimeront3  leur non intérêt de manière proactive  Donc on va poser la question à toute la population  On ne sait pas encore exactement comment le processus va se  3dérouler mais on posera la question3  Les gens ont un certain délai pour se prononcer  et passer ce délai  On ouvrira pour toute la population3  Donc on verra quand tout dun coup  3on va avoir un nombre de dossiers électroniques beaucoup3  plus important avec cette révision3  Ensuite également pour la population  pour accéder au dossier autant pour le professionnel que  pour le citoyen il faut mieux certifier33  Donc aujourdhui la solution proposée en valet pour la  population en général cest la solution de suisse suicide  Donc la suisse a qui est une solution certifiée selon la loi3  et à noter que nous allons arriver3  3il va y avoir une mise en œuvre33  33en fait dune identité au niveau national33  3Donc une i nationale qui devrait arriver3  début  pour un certain nombre de cas dusage3  3Et mi  pour le dossier électronique avec un login33  national qui sappellera ha gov  3qui va venir concurrence et peut être remplacer différentes3  solutions de le guide tant pour la population3  3La suisse a dit que pour les professionnels33  33louverture du dep pour les différents patients peut se333  3faire en ligne directement sur Cara ch3  33lobtention dune suisse33  3Donc comme cest un moyen didentification3  33reconnu selon la loi3  33Donc il y a une vérification didentité qui est33  3imposée avec des papiers didentité3  3Donc soit une identité soit un passeport et tout ce33  3processus peut se faire de deux façons soit en présentiel33  3soit entièrement en ligne33  3Pour la partie présentiel3333  33le service de la santé a mis en œuvre depuis mars 333  33bureaux où la population peut se rendre pour faire333  33une suisse et ouvrir un dossier électronique33  3Donc ces cinq bureaux sont situés sur les sites333  3hospitaliers de martini si brique vierge33  3ainsi que lhôpital riviera chablais depuis février 33  3ses bureaux ont deux mission3  33Comme je lai dit dune part33  3vérifiez votre identité et vous aider dans lacquisition3  3dune suisse aidi et le deuxième33  vous aider à ouvrir un dossier électronique  lentièreté des informations pour ou trouver ses bureaux et  prendre rendez vous vous le trouver sur notre site cantonal  3avec le lien devs ch  3Donc pouvez soit prendre un rendez vous directement  3dans ses différents bureaux  Ou alors si vous passez devant le bureau  3vous pouvez toujours vous arrêter  Les gens discutent toujours volontiers  3Jen arrive à la fin de ma présentation3  quelques informations pour les gens qui  voudraient encore aller un petit peu plus loin  3Vous avez ici les coordonnées des personnes au niveau du3  3canton canton du valais qui soccupe de ce dossier3  3On est toujours bien volontiers à disposition pour répondre3  3aux questions ou prendre différentes remarques3  Vous avez les différentes pages cantonales3  3Donc on a deux pages3  une qui concerne la population en général et une  dédiée au professionnels3  Ensuite évidemment le site de la session Kara et pour  finir le site de linformation fédérale  dossier patient ch  qui parle de manière générale du dossier  électronique du patient en suisse3  Donc je remercie de votre attention  3Et la seule chose que je peux vous dire3 '

  export default {
    name: "TableRondeComp",
    props: {
      videoUrl: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const userInput = ref("");
      const conversation = reactive([]);
      const isLoading = ref(false);
      const error = ref(null);
      const chatWindow = ref(null);
      let unsubscribeAnswer = null; // Renommé pour plus de clarté
  
      const sendMessage = async () => {
        if (userInput.value.trim() === "") return;
  
        // Ajouter le message de l'utilisateur à la conversation
        conversation.push({ sender: "user", text: userInput.value });
  
        isLoading.value = true; // Démarrer l'indicateur de chargement
        error.value = null; // Réinitialiser les erreurs
  
        try {
          // Référence au nœud "ask" dans Firebase
          const askMessagesRef = dbRef(db, "ask");
  
          // Créer une nouvelle référence pour le message
          const newMessageRef = push(askMessagesRef);
          const messageId = newMessageRef.key;
  
          // Définir les données du message
          await set(newMessageRef, {
            message: userInput.value,
            persona: per,
          });
  
          // Référence au nœud correspondant dans "answer"
          const answerRefPath = `answer/${messageId}`;
          const answerRef = dbRef(db, answerRefPath);
  
          // Ajouter un écouteur pour la réponse correspondante dans "answer"
          unsubscribeAnswer = onChildAdded(answerRef, (snapshot) => {
            const answerData = snapshot.val();
  
            if (answerData) {
              if (typeof answerData === 'string') { // Vérifier que answerData est une chaîne
                conversation.push({ sender: "bot", text: answerData });
              } else {
                console.warn("Format de réponse inattendu:", answerData);
                conversation.push({ sender: "bot", text: "Réponse invalide reçue." });
              }
              isLoading.value = false; // Arrêter l'indicateur de chargement
            } else {
              console.warn("Réponse vide reçue");
              isLoading.value = false;
            }
          });
        } catch (err) {
          console.error("Erreur lors de l'envoi du message:", err);
          conversation.push({
            sender: "bot",
            text: "Désolé, une erreur est survenue. Veuillez réessayer.",
          });
          error.value = "Impossible d'envoyer le message. Veuillez vérifier votre connexion.";
          isLoading.value = false; // Arrêter l'indicateur de chargement
        }
  
        // Réinitialiser l'input
        userInput.value = "";
      };
  
      const scrollToBottom = () => {
        if (chatWindow.value) {
          chatWindow.value.scrollTop = chatWindow.value.scrollHeight;
        }
      };
  
      // Observer les changements de la conversation pour défiler automatiquement
      watch(
        () => conversation.length,
        () => {
          scrollToBottom();
        }
      );
  
      onMounted(() => {
        scrollToBottom();
      });
  
      onBeforeUnmount(() => {
        if (unsubscribeAnswer) {
          unsubscribeAnswer(); // Appeler la fonction de désabonnement
        }
      });
  
      return {
        videoUrl: props.videoUrl,
        title: props.title,
        description: props.description,
        userInput,
        conversation,
        isLoading,
        sendMessage,
        chatWindow,
        error,
      };
    },
  };
  </script>
  
  <style scoped>
  p{color:black;}
  .process-comp {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .video-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 ratio */
    height: 0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .description {
    padding: 1rem;
    background-color: var(--surface-border);
    border-radius: 8px;
  }
  
  .description h2 {
    margin: 0 0 0.5rem 0;
    color: var(--primary-color);
  }
  
  .description p {
    margin: 0;
    color: black;
  }
  
  .chat-section {
    padding: 1rem;
    background-color: var(--surface-card);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .chat-section h3 {
    margin-bottom: 1rem;
    color: var(--primary-color);
  }
  
  .chat-window {
    max-height: 300px;
    overflow-y: auto;
    padding: 0.5rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .chat-window .user,
  .chat-window .bot {
    display: flex;
  }
  
  .chat-window .user {
    justify-content: flex-end;
  }
  
  .chat-window .user p {
    background-color: var(--primary-color-light);
    color: black;
    padding: 0.5rem 1rem;
    border-radius: 15px;
    max-width: 70%;
    word-wrap: break-word;
  }
  
  .chat-window .bot {
    justify-content: flex-start;
  }
  
  .chat-window .bot p {
    background-color: #e0e0e0;
    color: #2c3e50;
    padding: 0.5rem 1rem;
    border-radius: 15px;
    max-width: 70%;
    word-wrap: break-word;
  }
  
  .chat-form {
    display: flex;
    gap: 0.5rem;
  }
  
  .chat-form input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--surface-border);
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .chat-form button {
    padding: 0.5rem 1rem;
    background-color: var(--primary-color);
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 1rem;
  }
  
  .chat-form button:disabled {
    background-color: var(--primary-color-light);
    cursor: not-allowed;
  }
  
  .chat-form button:hover:not(:disabled) {
    background-color: var(--primary-color-dark);
  }
  
  .loading {
    text-align: center;
    color: var(--primary-color);
    font-style: italic;
  }
  
  .error {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background-color: #ffe0e0;
    color: #d8000c;
    border: 1px solid #d8000c;
    border-radius: 4px;
  }
  </style>
  