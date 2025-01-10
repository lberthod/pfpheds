<!-- src/components/Education/IntroComponent.vue -->
<template>
    <div class="intro-component">
      
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
        <p> {{ description }}</p>
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
    const per = ' tu es expert digital santé a parler avec des étudiatns en soins infirmiers su  , repond de maniere succint, qualité, vulgarié, et pedagogiuqe, et simple si possbile.        Tu parle que de cet interview   que tu as acces ici après :   vas et nous allons nous intéresser aux impacts humains de latechnologie et le processus de créationMerci loïc pour ton habitation à parler devant vousmesdames messieurs bonjour à tout le mondeDans cette présentation on va effectivement aborder latechnologie sous langle humainCest à dire pas sous langle du matériel sous langle dulogiciel mais sous langle de ce que ça produitdintroduire une technologie sur lorganisation du travailet de ce que ça produit sur le travail votre travailpar exemple on va aborder six points successivementpuis dans le premier point jaimerais mattarder brièvementsur les impacts des nouvelles technologies surlorganisation du travailFondamentalement on peut dire que les nouvellestechnologies elles permettent surtoutde nouvelles formes de collaborationElles permettent notamment de travailler en réseau avec desgens qui sont disséminés dans lespace dans différentesrégions différents pays différentes institutionsCette collaboration en réseau permet daccéder à descompétences dont on ne dispose pas nécessairement soi mêmeou dans son environnement immédiatLes nouvelles technologies elles aidentégalement au diagnosticOn peut penser à lutilisation de lintelligenceartificielle pour diagnostiquerun diagnostiquer telle ou telle maladie ou interpréter desde limagerie médicaleEt puis les nouvelles technologies aident également à laprise de décision par exemplepour choisir un traitement le plus approprié par rapport àlétat dun patientDonc ça cest le premier pointdisons très schématiquement les nouvelles technologiesCe nest pas juste de la technologiecest des impacts sur lorganisation du travailEt du coup quels sont les enjeux par rapport auxentreprises et aux institutions dans ce processus?Oui cest une question importanteLa question des enjeux parce que cest une nouvelletechnologies elles ont beaucoup denjeux sur lagestion des institutionsElles ont beaucoup denjeux sur la performance de travailElles ont beaucoup denjeux sur la santé autravail égalementEt ces enjeux peuvent être tantôt positifs tantôt négatifsEt puis parfois également ils peuvent être ambigusdes effets positifs de la technologieVous en avez sans doute déjà tous cestoutes fait lexpérienceCest un travail qui est parfois plus efficacequi est plus rapideCest un travail dans lequel si tout va biennos tâches et nos compétences senrichissenton peut avoir une plus grande variété dactivitésEt puis on doit également développer de nouvellescompétences pour maîtriser ces nouvellestechnologies des nouvelles technologiesCest aussi plus de flexibilité à la fois dans le temps etdans lespace parce que ça permet par exempledaccéder à des donnéesnon seulement quand on est à son poste de travail pendantles heures de bureau mais aussi quand on est ailleurs et àdautres à dautres momentsça permet également la collaboration à distanceOn la bien vu par exemple pendant la pendant la pandémieavec la généralisation du travail à distanceCes effets positifs peuvent aussi être négatifssuivant les circonstancesPar exemple un travail plus efficace et plus rapideÇa peut aussi être un travail plus intense plus intenseà la fois de manière quantitativeOn travaille plus dans le même laps de tempsmais aussi un travail plus intense sur plan qualitatifParce que quand on automatise des processus de travailce qui va rester à lopérateur humaincest les tâches les plus complexesEt quand on travaille tout le tempsà des haut niveaux de complexitéon se fatigue se fatigue davantageDonc ça a un goût cognitif des des aspects négatifsÇa peut aussi être lorsquon a développé un système quisavère trop lourd ou qui savère inadapté aux besoins desutilisateurs ça peut ralentir letravail occasionner des erreursCest un phénomène qui est bien connu dans le domaine de lasanté notamment autour du dossier patient informatiséÇa peut aussi avoir des risques pour la santé par exempletout bêtement des risques et à la répétitivité des gestesOn a une moins grande variétéune moins grande palette gestuelle quand on travaille sur unordinateur quand on utilise dautresinstruments plus traditionnelsEt puis ça peut également fragiliser des relationssociales et professionnellesSi les gens ne se voient plus par exemple vousje ne sais pas comment vous vivez cette formationLe fait est quon nest pas tous dans la même salleet que ça vous permet daccéder à cette formationmême si vous habitez loinEn revanche ça permettra moins facilement de créer desliens entre nousDans certains cas on peut aussi observerune baisse dautonomie des travailleurs des travailleusesQuand la technologie est utilisée pourcontrôler le rendement contrôler les modes opératoiresça peut réduire lautonomieEt voilà quelques exemplesOn peut en citer dautres tant positifs que négatifsest ce quon peut dire pour conclure sur cette partiecest quil ny a pas de déterminisme technologiqueCe nest pas la technologie en soi qui va avoir des effetspositifs ou négatifsCest plutôt la manière dont on utilise et le contexte danslequel on va lemployerMerci du coup si je comprends bien pour être acceptéla technologie doit êtreUtile et UtilisableOui utile et utilisableCest les deux mots clés delacceptation des technologiesDepuis les années  on a développé des modèlesdes modèles scientifiques de lintroduction et delappropriation dune nouvelle technologieun modèle très classiqueCest le modèle tam tm pour technologyacceptance modèleEt ce modèlece modèle a introduit ces deux dimensions que tu as évoquéslutilité et labilitéPuis je vais vous présenter une slide pourillustrer ce modèleCe modèle je l schématisé à ma manièreen reprenant la figure un peu stéréotypique de licebergvous savez quun iceberg quon voit un petit peu la partieémergée puis la partie émergéeon la voit pas mais elle est plus grandeAlors cest pareil en matière de digitalisation etdergonomie puisque je suis ergo unpeu de pu pour ma disciplineDonc le premier critèrecelui auquel les gens pensent plus facilementnotamment quand on discute avec des développeursinformatiques cest souvent le critère qui revient àlesprit en entendant mourir ergonomie ce premier critèrecest labilitéÇa désigne le fait quun système est facile etagréable dutilisationEt ça renvoie essentiellement à linterfaceà la navigation à la police de caractèreà lemplacement des différents éléments graphiquesÇa renvoie au caractère userOn parle également de you x user experiencemais finalement ça cest la partie relativement aiséeaisé et bien documentéOn peut appliquer des recettes de cuisine quasimentla partie qui est moins visible moins connue égalementCest lutilité On peut avoir un système qui estparfaitement utilisable et agréable dutilisationmais qui peut être totalement inutiledans un contexte donnéparce que ce système ne va pas répondre aux besoins delactivité que font les gensderrière cette notion dutilitéIl y a aussi lidée de savoir si le système sinscrit demanière fluide sans occasionner des retards des doublonsdes ralentissements dans les activitésles processus ou lorganisation du travailPuis on peut rajouter un dernier élément qui nest pas issudu modèle tam mais qui est important quand mêmecest la manière dont on conduit le changement parcequintroduire une nouvelle technologieCest un changement qui peut bouleverser pas mal de chosespas mal dhabitude et susciter beaucoup dincertitudesDonc la manière dont on informe les gens dont on les faitparticiper la manière dont on construit collectivement dusens avec eux un rôle déterminant dans le fait que cettetechnologie va susciter des attitudes positivesconduire à une intention de lutiliserune utilisation effective ou encore une appropriationplus plus généraleVoilà pour ce point sur lutilité et labilitéDonc du coupCela amène que toute innovation technologique ou digitalamène une innovation et une dimension socialeCest tout à fait juste lintroduction dune technologieÇa nest pas quun phénomène technologique ou techniqueCest un processus socio technique avec deux dimensionsune dimension technique et une dimension socialeLa dimension socialeElle réside par exemple par exempledans les impacts sociaux de la technologieSi vous introduisez une technologie telle que par exemplecelle quon utilise aujourdhui pour ce cours et que cettecette technologie a changercomme jai dit avant la nature de nos relationson est chacun derrière un microon fait face à trois camérasLes auditeurs sont ailleurs je ne sais pasou je ne sais pas quand ils verront cette vidéo tout çacest une dimension socialeCest radicalement différent dun cours classique ou on a unenseignant ou une enseignante face à des étudiants et desétudiantes dans une dans une salleCest ni bien animal cest juste différentEt cest une dimension une dimension socialeUn autre aspect de la dimension socialecest que la technologie elleelle est aussi entre guillemets déterminée socialementSi vous regardez qui sont habituellement les chefs de projetdintroduction de technologiedans une organisation cest souvent des hommesCest des hommes qui ont un bagage technique qui viennent dumonde de lingénierie ou de linformatiqueCest souvent des hommes blancs dun certain âgeEt puis cest même pas cliché ce que jai dit làÇa correspond à un certainnombre de choses quon peut observerSi cétait des femmes des femmes allophonesdes femmes jeunes ou que saisje encore peut être que la manière dont la technologie estconçu serait serait différentePuis je vous renvoie au biais de lintelligenceartificielle notamment assezrégulièrement parlé dans les médiasOn voit que faire la technologie elle nest paselle nest pas nere effectivement une dimension socialeVoilà donc lidéecest vraiment dadopter une approche socio technique enanalysant en quoi la technologieelle est influencée par le côté social et en quoi elle vaimpacter le côté social etdu coup samène quil faut également impliquer les futursutilisateurs pour ce côté socialTu as tout à fait raison de le direEt en fait je me rends compte maintenanten écoutant que jai obligé de vous présenter une slidedu coup je vais quand même vous la passermême si elle était liée au point précédentCette slide là elle en fait elle est liéeelle est liée à ta question présente précédenteElle est aussi liée à la question que tu viens de poserOn peut imaginer un processus de digitalisation comme unentonnoir et cet entonnoiron a souvent tendance à laborder par le petit boutcest à dire linterfaceEncore une fois quand on pense ergonomie et digitalisationon pense surtout à la manière dont lécran vace à quoi lécran va ressemblerToutefois cest encore une fois la partie assez facilece qui est plus compliqué et sans doute plus importantaussi cest de bien examiner lesprocessus qui se cachent derrièreSouvent quand on informat en attenteça vouloir reproduire les processus quon avait avantmais sous une forme digitaleEt souvent ça coince digitalcest aussi repenser les processusorganisationnels et informatiques puis en amont de tout çaEh bien il sagit également danalyserle travail du même les activités que les gens fontla manière dont ils sont organisésla manière dont ils communiquent dont ils collaborentlenvironnement dans lequel ils interviennentEt pour comprendre tout ça on revient à ta questionEh bien il faut nécessairement faire participer lesutilisateurs futurs parce que les utilisateursceux qui sont les spécialistes de tout un parti quil y adans le sommet de lentonnoirEt puis ça on la dit tout à lheuretout changement techniquecest aussi un changement social et qui ditchangement social dit forcément faire participerles futurs utilisateursDonc jen ai fini pour cette slide et je reviens maintenantà ta question sur la participationEffectivement pour favoriser lappropriation dunetechnologie il faut associer les utilisateursEt ça ça se passe à plusieurs niveauxLes utilisateurs cest les gens quiconnaissent le mieux leur activitéCest utile de les associer pour comprendre leur job etcomprendre pourquoi on développe une technologieÇa permet de connaître les besoins pas leurs besoins à euxdu genre je préférais que ça soit comme si ou comme çamais les besoins de lactivité que ces personnesdoivent réaliserIl y a aussi un aspect plus psychologiquefaire participer les gensça les aide à se projeter dans lavenirÇa les aide à trouver du sens à la technologiepuis avoir le sentiment quils ont une certaine influencesur ce quon va leur leur fournirfaire participer les gensÇa sert aussi à évaluer ensembleles maquettes qui sont fournies par lesdéveloppeurs et les ingénieursÇa sert aussi à évaluer les ouiles propositions de développement qui sont faites ça sert àles tester dans des scénarios dactivité pour sassurer queça permettra de faire le jobPuis un tout dernier élément cest que cette participationen fait elle simprovise pas à faire participer les gensCest un un vrai métier ou en tout cascest un vrai ensemble de techniquesÇa nécessite une certaine ingénierie la participationune approche structuréeEt puis cest typiquement à ça que servent desergon norms par exempleEt du coup il na pas que besoin dinformaticiens demanager pour la récit dun projet dune innovationIl a également dimpliquer les utilisateursfinaux on précisOui oui Un développement réussiJe pense que cest un développement dans lequel on arrive àfaire prendre la sauce entre des spécialistes dudéveloppement des spécialistes de lutilisationdes utilisateurs eux mêmesEt puis ça peut nécessiter lintervention dun tierscomme par exemple des en accompagnement duchangement ou en ergonomieEt effectivement les utilisateurs ont un rôle qui estimportant et qui nest pas simple à apprendreVous imaginez un utilisateur qui va peut être être confrontéune fois dans sa vie un gros projetdintroduction de nouvelles technologiesEn général ce nest pas son métieril na pas le vocabulaire il na pas des connaissancespuis en face de lui il a des spécialistes qui ont un masterdes connaissances un jargon mais qui en revanchene connaissent pas le travail pour lequel ils vont devoirdévelopper une solution techniqueEt ce nest pas facile ni pour les uns ni pour les autresCe nest pas facile pour les développeurs de comprendre lejob des utilisateursEt ce nest pas facile pour les utilisateurs de comprendrela logique des développeursCe nest pas non plus facile pour eux dexpliquer leurtravail et ce travaildexplicitation de lactivité quon aça demande une prise de reculça demande de réfléchir à son activitéEt puis souvent ça peut nécessiter un accompagnementencore une fois par des facilitateurs du changementDonc autrement dit et en conclusionles connaissances de métier elles sont irremplaçablesmais elles ne sont pas faciles à exprimerCest quelque chose quil faut apprendreEt encore une fois quelque chose qui doit se structurerPuis pour terminer je vous proposequelques référencesJen ai mis six que vous trouverezlà ou loïc vous met à disposition toutela documentation du coursAlors jai pris pas que des choses récentespar exemple larticle dele rapport de bastien escapa date des années NantesEt cest un des documents fondateurs de lanalyseergonomique des interfacesIl reste toujours valablenotamment pour les questions dutilisationLes autres sont pour les les trois autres premiers sont desdes articles scientifiques en françaissur lacceptation des technologiesLe quatrième est en anglais et il concerne spécifiquement ledomaine de la santé et il met en avant les les problèmes etnotamment les problèmes derreur etde risque pour les patients liés à desdéveloppements inadéquatsEt les deux derniers documents sont des documents écrits parvotre humble le serviteur et ses collègues et qui portentde manière générale sur la transformation digitaleVoilà jespère que vous aurez eudu plaisir à ces quelques minutes déchangeMerci encore pour linvitation'

  export default {
    name: "VideoComp",
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
  