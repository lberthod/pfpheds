<!-- src/components/Education/IACOm.vue -->
<template>
    <div class="iac-om">
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
    </div>

         <!-- Section Chat avec ChatGPT -->
         <div class="chat-section">
        <h3>Discuter avec la vidéo</h3>
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
   const per = ' tu est unexpert digital santé a parler avec des étudiatns en soins infirmiers sur la thematque de la tehcnologie et princiaplemetn lintelligence artificelle, repond de manire pedagque et vulagairsant le techno facilement, voici le contenu abordé, base toi sur cela, repond succiment, qualité et court,          Bonjour aujourdhui nous accueillons André kocharqui est docteur et professeur en intelligence artificielleDu coup je le laisse se présenterexpliquer les thématiques quil va aborderMerci loïc Donc je suis effectivementprofesseur docteur à laValley Valley à la h spécialisée en intelligenceartificielle générative et léconomie dentrepriseJe travaille sur les intelligences artificielle générativedepuis  surtout dans le cadre de sécuritécomment est ce quils sont utilisés pour lebien ou pour le mal?Et jai également fait un doctorat plutôt orienté domainebiomédicale entre John Hopkins aux états-uniset à paris justAujourdhui je vais parler de lautomatisation dans lasanté à travers des génératifmais je vais changer un peu du ton comparé àpromesse habituelle de la transformationEt je vais parler plutôt des dangers dangerOk du coupsouvent quon vous entendez parler des lmmodel tel que notamment le chat gpt ou le lamade Facebook ou le cloud de anthropiqueOn vous dit souvent que cest une révolution dans la santéLe si de open sa mal manvous a expliqué que bientôt les y vont être des conseilsmédical pour des personnes qui ne peuvent pas soffrir de lasanté ce qui est déjà une déclaration un peu problématiqueMais ça ne va pas nous concerner ici Google qui a fait lapublicité de leur chat bot clinique le maître palm deuxdes papiers qui vous présentent desapplications de conversation ou vous applaudvotre radiographieEt puis vous pouvez avoir un Tchad pour savoir ce que vousavez ou sinon même Google deep mind quiutilise des espèces de lm optimisé pour le traitement deséquences ad pour expliquer comment les protéines pompéespour aider avec la recherche de neuro médicamentstout ça ça paraît magiqueÇa paraît génial Cependanten tant que quelquun qui a travaillé avec des donnéesmédicales et quelquun qui est un ingénieurquand vous voyez de la magieça veut dire quil y a des chosesqui ne sont pas bien expliquéesÇa veut dire quil y a des choses qui sontpas clairs pour les utilisateurs finalEt cest problématique Pourquoi cest problématique?Parce quon a on a eu des expériences par le passéque à chaque fois quil y a une solution magiquenotamment désir les gens vont lutiliserdune manière qui finit par être dangereuseen ne comprenant pas leur limitationLune des pour laquelle on a le plus dexemplescest des voici sur qui ce qu au solnotamment des Tesla ou on peut aller sur les autores puisles laisser conduire et juste observer de temps en tempsCe qui se passe problèmecest que cest la façon dont ça se passe quand tout sepasse bien quand les choses ne se passent pas aussi bien ouquil y a des citations inattendues sur la routeQuand par exemple devant vousvous avez une camionnette qui transporte des feuxce qui va se passer cest que lauto pilotte de votreTesla il va voir ces feux làil va les classifier et pas puis vous allez avoir unedéferlante de feu qui vous arrivez dessusLa Tesla sera confuse et elle va se retrouver encastrée dansun camion à moins que vous intervenez pour la corrigerPour cette raison làplutôt que laisser la place à la magie et lemmerveillement il est indispensable de comprendre certainsaspects de fonctionnement des outils de linotamment de li génératif et comprendre ses limitationsce qui sera le but de cette sessionOk donc que sont ces lm que sont ceset bah ce nest pas très difficile dexpliquerune fois quon ne va pas dans les détails techniquesvous êtes déjà bien familier avec les modèles gén natifsneuronaux classiquesDonc par exemple quand vous composez vos lettresdans les éditeurs de textes notamment jimmamais aussi les solutions de Microsoftquand vous écrivez dans certains momentsquand ce que vous avez écrivez est suffisamment fréquentou suffisamment typiqueLapplication va vous suggérer de compléter vos motsPar exemple si vous écrivez madame monsieurje vous envoi les documents concernant la demande par lasuite avant de pouvoir continuer à veuillez agréermonsieur et madame làà lexpression de vos sentiments distingués estce que les modèles peuvent compléterTrès bien Donc en fait si vous voulezvous pouvez vous même faire uneimpression dun modèle génératif et on va le faire ensembleVous avez ce début de phrasedans lattente de votre réponse madame monsieurje vous prie daccepter mes salutations les plus distinguéesest ce que cest une continuation qui estacceptable ou pas vraimentJe vous laisse une seconde chez vousEt oui cest une continuation qui est à fait acceptableMadame monsieur je vous prie daccepter messalutations les meilleuresEncore une fois est ce que cest acceptable Oui non ouiLassurance de mes sincères salutationsencore une fois plutôt acceptableLexpression de mes sentiments cordiauxOn peut commencer à débattre si vous êtes vraiment expertdans le domaine mais on va dire que cest acceptable ou lesdun sentiment distinguéPar contre monsieur et madameje vous prie daccepter le dossier  juinÇa commence à sonner un peu bizarrePuis si vous avancez dans lavant le poisson emballébon marché ça a complètement rien à voir et unchemin de chien dans votre foyerEncore une fois ça na complètement rien à voirEt en fait cest un peu la façon dont les lm fonctionnentEt cest la raison pour laquelle il y a une différence dansla performance des lm cest que les lmils vont regarder une partie du texte et de chercher unecomplétion de ce texte la plus probablePar exemple je vous priedaccepter un chien dans votre foyerÇa marche tout à fait Vous ignorez juste le reste de laphrase madame monsieurje vous le prie daccepter le six  juinEncore une fois ça marche très bienEt c est uniquement quon vous regardez lensemble de laphrase mes sentiments les plus distingués que ça commence àdevenir assez correctC est pour ça quil y a une progression vers ces modèles deplus en plus large qui sont capables de prendre en compte deplus en plus de contextesLe deuxième ingrédient quil faut comprendre pour comprendreles lm et leurs limitationscest ce que le modèle apprend vraimentEt quelque part ce quil apprend estsurprenant mot simpleIl apprend juste le mot suivant le plusprobable dans ce que vous faitesVous prenez énormément de séquencesde mots que vous trouvez la plupart du temps sur internetet vous lui dites ok des deuxprécisé moi le mot suivantEt donc du coup le modèle commence par dire ok deuxpré moi le mot suivant le modèle vous prédit deux oiseauxTrès bien dans votre texte ceffectivement dit deux oiseauxDonc vous donnez un bouquet à votre modèleCest un bon modèle cest bien comporté et vous continuezet vous commencez la deuxième séquence qui commence par deuxet votre modèle vous dit ah en fait ça va être auoiseau sauf que nonEn vrai cest deux personnesDonc du coup vous donnez pas de cookie au modèleDans cet exemple là ce qui fait que le modèle apprend enplaisir le mot suivant le plus probableétant donné tout le contexte quil est capable de prendre encompte puis vous empiler ces exemples et vous en donnez aumodèle énormément énormément énormémentEt la seule chose qui reste pour comprendre les lmcest vraiment la sélection du mois suivantQuand vous savez vous qui a tapé pour choisirle mois suivant notre continuation de lettre vous pouvezappuyer sur table pour dire que jaccepte ousinon vous tapez manuellementDonc ça marche très bien Les modèles qui vous font cestils vont regarder toutes les continuations possibles et puisles classer par les probabilitéspuis finalement choisir celle qui est la plus probableA moins quil y en a un certain qui soit vraiment pasprobable ou certains quils ont décidé de censurer pour desquestions diverses et variéesDonc ça cest la façon dont les lm génératifcest à dire similaire au ch gpt gpt quatreClaude fonctionnentCe sont des prédicteur de motsDu coup on va continuer avecle premier des problèmes qui en découleCest le biais dexpositionEt ici pour changer et rendre les choses un peu plusvisuelles je vais modifieret je vais passer pour les génératives dimagesétant donné que les principes de fonctionnement sont tout àfait similaires sauf que ça fait des explications qui sontun peu plus intuitivesDonc vous prenez un lien génératives imagesvous lui demandez de générer dans les de soleilÇa vous retourne cette image Cest magnifiqueVous lui demander de générer zermattEt ça vous retourne une image dune village qui ressemblebeaucoup aux zermatt avec une vision carte postale deun arrière plan génial iciDonc vous dites chouette c fonctionne super bienDonc du coup je vais essayer de générer dautres imagesVous demandez à lia a de générer une autremontagne puis vous rendre compteCe nest pas tout à fait la montagne quil vous fautVous lavez demandé de générer Jim fra ouet vous avez eu un zarma un peu spécial puis la guerrecest aussi un zarma un peu spécialDonc cest ce quon appelle un biais dexposition àma Horn est une montagne qui est extrêmement reconnaissablequi est pris en photo par énormément de touristes qui lepost sur tous les réseaux sociaux quilancèrent dans les imagesDonc cest quelque chose qui est très représentédans les datassept dentraînement de ces modèles génératifDu coup à partir du moment où le modèle pense quil fautgénérer une montagne ça va quasiment toujours générerà ma Horn quelque chose qui ressembleDonc ça en retournant aux lm ce quon appelle le biaisdexposition dire ce que est le plus souvent dit générer cequi est le plus souvent présent dansle data à sept dentraînementDonc par exemple si je prends un lm que je ne vais passpécifier mais cest un modèle génératif tout à fait réelqui est plus trop utilisé qui était très utiliséJe suis un temps vous lui demander de compléterla capitale de la suisseEt devinez ce que ça va dire? Je vous laisse trois secondesUn deux troiset bien sûr que la capitale de la suisse et sta goldqui est la plus grande villela plus ville au nord et la plus ville populaire de laSuède une de ville dEurope le plus closement politdonc quest-ce qui sest passé?Étant donné quil y a beaucoup de confusion entre la suisseet la Suède dans linternet anglophonele modèle a appris que Stockholmcest quand même un peu plus cité que berne et queà vrai dire la suisse na pas vraiment de capitalDonc on va dire puis on vacontinuer comme si cétait correctSi vous avez eu lexpérience dinteraction avec certainstouristes étrangersvous pouvez vous rendre compte de comment ce type de donnéesdans le data dentraînement était générépuis de la même façonquand on va voir du côté de nos voisins en Francequand on dit la capitale de la France nest pasdevinez ce qui va se passer vous donne trois secondesun de troisEh oui la capitale de la France nest pas parisDonc le modèle pas mentir en citant toutes les villes lesplus connues de Franceà commencer par paris et grosse modoSi vous avez une session séquence de mots qui est capitaleFrance ne pas avoir paris est quasiment impossible à causede ce biais dexpositionCependant vous pouvez me diremais cest pas du tout ce que je voisQuand interagit avec ch p Claude la mainje complète pas les phrasesEt puis ça quand même pas mal de diversitéOui tout à faitCe que je vous ai présenté cest des modèles dites de basedes modèles fondationalors que les modèles avec lesquels vous intéressez la racemajorité de temps sont des modèlesqui sont dit conversationCe qui sest passé cest que les personnes qui ont entraînéles modèles ils ont donné des exemples de dialogues quilsveulent à ce que les modèles soient capables de répliquerpour que les modèles les utilisentEn tant quen exemple par exemple aient des mots moimes symptômes sont alors en tant que modèle conconsulter le médecin mais je dirais que okmais est ce que cest un concert ou une migrainetant du coup une fois que vous avez donné ça dansvous rajoutez ça dans les dates à sept dentraînementvotre modèle sera capable de faire ce genre de interactionen utilisant dautres données sur lesquellesil a été prêt entraînéDonc les modèles sont prêts à entraîner sur les dialogues detype qui sont attendus lorsquon va faire son attentionEt encore une fois je répètecest des modèles qui sont très trèstrès larges qui on veut beaucoup de donnéesLes exemples que je vous ai présenté icicétaient des modèles qui étaient de taille dequelques milliards de paramètresPuis jai p trois a fait passerle tour à plus de quasiment     de paramètresce qui donne une longueur de contexte et une quantité detextes variés quil a vu qui est complètement énormeDonc encore une foissi auparavant vous avez un modèle qui pouvait juste analyserquelques paragraphes pour faire une décisionpar exemple sur accepter ou refuser le CVles modèles modernes sont capables de prendre en comptebeaucoup plus de contenumais aussi de contenu plus variés sans être optimisés pourils peuvent avoir une idée des CV des infirmiers des CVdes professeurs des CV des conducteurs de trainparce quils ont rencontré des données qui étaient relatifsà ça dans leur data dentraînementCependant ces a toutcomme les lm que je vous ai présenté initialement et legénéral général sont biaisés par lesdatas sept dentraînementCest comme ça que vous obtenez des exemples magnifiquesdefra et a guerre que je vous ai montré tout à lheureOk du coup on a vu que les lmla façon dont ils étaient entraînéscétait pour être capable de prédire le mot suivant le plusle mot suivant le plus probable donnait le contextece qui est très différent de la communication humaine et quidonne lieu à un des plus gros dangers dutilisationpotentielle des on va juste faire cette partieencore une fois ok donccomme vous vous avez vu juste avant les lm au finalne font que entre prédire le mot suivant le plus probableétant donné le contexte et en sappuyant sur les dates àsept dentraînement ceci est une façon très différente dontles humains interagissent et la fluidité dans le langage deses el peu potentiellement à prêter confusion et est lundes facteurs de risque dutilisation deslm les plus majeursDonc quand vous faites de la communication humainequand nous fond de la communication humaine en généralnous avons un contexte social dans lequella communication se passeDonc par exemple ceci êtes en cours pré enregistrévous avez un contexte physique et physiologiqueDonc je suis assis dans une pièceavec de lespace gris derrière moivous êtes probablement assis chez vous ou au travailEt il y a aussi un contexte des expériencesDe mon côté jai des expériences vécuespar exemple interagissant avec les lm ou en travaillantavec les données médicauxVous de votre côté vous avez dexpérience à avoir engagéavec les patients ou avoir essayé dapprendre des conceptspuis nous avons aussi des expériences partagéesEt quand on communique quand je vous dis par exemplequelque chose jessaie de de faire appel dun côté à mesexpériences à moi mais aussi à nos expériences partagéesEt quelque part les mots servent en tant que pointeursvers ces expériencesCe nest pas vraiment le doigt qui est importantcest lobjet vers lequel il pointeDune façon si vous vous engagez dans la communicationdans la direction opposéevous allez faire appel à une expérience partagéepuis vous allez revenir vers uneexpérience qui vous est personnelleEt cette communication humaine est une base très importantdes rapports sociaux surtout dans la santé parce quepar exemple si votre passionil vous donne une échelle de douleurça fait référence directe à son expérience vécu que vousnavez pas mais vous avez une expérience partagée pourpouvoir avoir une idée de ce qui se passe de la même façongrâce à vos étudesvous savez que certains médicaments si donnés en patientvont lui aider ou au contrairevont un peu moins lui aider en fonction du groupe dans lequi se situe ce sont des expériencesLes lnm sont ce quon appelle des perroquets stochastiquesEt vous avez peut être entendre ce mot à plusieurs reprisessi vous lavez pas encore attendu pourquoi?Parce que ce sont des machinesDonc machines stochastiques qui prédisent le mot suivant leplus probable ils nont pas dexpérienceils ne font pas appel dexpériencequelque part ils sen foutentSi les expériences sont réellesne sont pas réelles parce quils ne pointent pas vers sesexpériences ils prédisent juste le mot suivant le plusprobable et quelque part çaça conduit à un problème assez majeur avec lutilisation deslnm cest que quelque part cesdata sept pré entraînés de mots confussont des objets extrêmement complexes et quelque peualrich chien ou on met une visage humain enfaisant du pré entraînement par dialogue que je vousai mentionné par dessusEt puis une classification supplémentaire par préférenceDonc le but des lmcest que vous avez une interface pour les interactionsattendues qui est ce visagetrès sympathiquePar contre ce que vous pouvez trouver dans leur contenu quise cache derrière est beaucoup plus vasteEt quand vous tombez en dehors du domaine dinteractionattendu pour les développeurs des lmpouvez tomber dans toutes ces données problématiquesDonc pour appuyerce message du fait que les lm sont des ok statiquesje vais vous donner un exemple de lefficacitéclinique des parachutesDonc aujourdhui on est le  septembreDonc si vous pouviez chercher Google à ce moment là et vouschercher est ce que les parachutes sontefficaces en anglais vous avez avoir un sommaire parle ai de Google qui va vous dire que une étude a trouvé queles parachutes nétaient pas bien plus efficaces que lessacs à dos vides pour les sauteurs des avionsEt donc du coup en utilisant votre expérience de vécuvous pouvez dire que cest un problématique parce que si jesaute dun avion sans parachuteje vais sembler un moustiquepuis vous décidez de chercher un peu vous cliquezvous trouvez que cest une étude qui dit effectivement quelutilisation de parachutes pour éviter la mort ettraumatisme majeur nest pas supportée par un des essaiscliniques randomisésDites cest bizarre quand même quel était le type de essaisclinique randomisés?Et puis vous lisez le papier et vous voyez cette image là etvous rendez compte quen fait lavionil était parqué sur le terrainDonc du coup effectivement de votre expériencevous savez que quand en avions comme ça que avec unparachute ou sans parachute ça ne fait pas de différenceVous allez pas vous faire malPeut-être vous allez vous t la chevilleDans le pire des cas le lm na pas cette capacité analyséeLem na pas ce contexte làil va vous recracher plus ou moinsle résumé des choses qui sortentle plus souvent des publicationsDonc le titre abstract peut être quelques éléments deconclusion qui sont dans ce cas particulierle fait que vous navez pas besoin de parachute pour sauterdes avions le fait que les avions doivent être gars sur leterrain quelque chose qui est complètement amides à destinationsVous avez très certainement entendu parler deshallucinations dans le cas de générCependant au vu de lintroduction quon a fait deet des lm en tant que des prédicteur dimages les plusprobables ou des textes les plus probablesje pense que vous pouvez commencer à avoir un peu uneintuition de ce quil vient et du fait que ce sont pasforcément vraiment des hallucinationsDonc vous pouvez avoir plusieurs raisonspour les hallucinationsLun des plus triviaux que vous pouvez imaginercest les données dentraînement qui sont erronéesDonc classiquement ce que je vous ai montré avant lacapitale de la suisse Stockholmà le fait est que les données dentraînement proviennent delinternet anglophone ou il y a énormément de confusionentre la suisse et la Suède au point que même le wall streeta affiché le drapeau suisse à la place du drapeau suédoisdurant le de Spotify une compagnie très largelun des plus bour unicorne de la SuèdeDonc ça cest un cas typique des data dentraînementerronés qui est dans ce cas a est il à rondmais dans des cas plus subtils peut être plus problématiquepuis à de ce que je vous ai parlé des billets dexpositionil y aussi aussi les données dentraînement qui ne sontpas représentativesDonc classiquementsi vous prenez un lm de votre choix et vous commencez àavoir la conversation de quelles sont les choses pourlesquelles valet est connue?Pouvez avoir une réponse du type de vallee connue pour sonconcours de reine les concours de rennes de neigeil va continuer de la sorte vous serez en mode maisou parce queest effectivement contenu pour les concours de rennesles combats de vache qui aiment bien se battreLe problème cest que quand on parle le concours de reinedans le contexte général sur internetce que les gens ils parlentcest des petites filles qui shabillent en rennes de neigeet qui font des concoursDonc le modèle fait un match upVous retrouvez avec le concours des reines de neigede vallée que je pense cest peut être quelque chose quonpourrait introduiremais qui pour le monde nexiste pas du toutCest une hallucination totaleEncore une fois à cause des billets à dentraînementvous avez aussi des hallucinations qui sont dues à labsencedes à donner dentraînementDonc par exemple si je demande à un al assez récentdécrire la vie quotidienne des étudiantes infirmièresà lécole de santé de hso Valley en  mots déjàça va pondre un texte qui fait bien plus de  motsmais surtout va me raconter queil y a des cours théoriques qui ont lieu sur le campusde c ou martiniJe pense pas quils existentDonc si vous pouvez continuer à lire le restecest peut être certaines choses qui sont bien devinéescertains choses qui sont un peu moins bien devinées maisdune manière générale il ny a pas de données sur ou sontles écoles de santé de la HC sauvagetDonc le modèle va en inventer quelque choseVous pouvez aussi avoir une hallucination qui en est unepour vous mais qui nen est pas vraimentqui manque juste de contexteVous pouvez demander modèle de donnez moi les informationssur sur les un bodden en sattendant à ce quele modèle vous raconte des choses sur saint-nicolas etlavallée de zarmasauf que la vaste majorité du tempsil va vous parler de imboden en Arkansasqui est une petite ville qui a été fondéepar la famille des migrants dont on se pose des questions dece quil venaient mais ce nest pas la même narrative àlaquelle vous vous êtes attenduCest dans votre cassi vous attendiez à la réponse sur le nom de familleBoden est une hallucinationCe nest pas vraiment une destination parce que cest uneexplication de quelque chose qui est réel justepar manque de contexte de votre questionparce que vraiment vous vouliezy a aussi une confusion des concepts prochesEncore une fois les al étant probabsi les mots sont utilisés dune manière interchangeable avecune grande probité les chances sont forts qui vontconfondre du coup ce siteune conversation avec mon collègue professeur docteurDimitri per David avec chaque JP en début de  ou ilpour poser à chaîne JP la question de combien de paramètrechaque JP en avait sch?JP lui répond quil en a   La réalité il est très probable quil na plutôt    parce quil était basé sur le modèle jpttrois on sait il y avait     de paramètresDonc cette confusion entre millions et milliardspeut paraître être mineure mais cest la différence entremodèle qui peut être exécuté sur votre téléphone portable etun modèle qui a besoin dun ordinateur dans un data centerpour tourner Puis en utilisant continuant surcet exemple une autre raison dehallucination et la reprise de contexte de conversationindésirable ou les modèles qui est un peu trop influençableDonc si ce qui se passecest que mon collègue essaye de faire du gazla du modèle lui pose la question de mais jétais sûr que tuavais uniquement trois pour    àta documentation le dit du couple modèle sexcuse et puis en vente des modèles plus petitsqui font millions de paramètres alors que cestquelque chose qui nexiste pasDonc il dit que cest l gpt qui faisait millions deparamètres alors quen réalitécest un modèle qui était plus proche de de    de paramètresUne raison encore supplémentairepour les hallucinations est loubli des instructionsParfois quon vous donnait un modèlevous lui donner des instructionsEn début de phrase vous avez un long texteet quand le modèle arrive à la fin du texteles instructions ne sont plus dans sa fenêtre dattentionelle ne peut plus y faire attentionDonc si vous lui poser la question est ce que tu peux medire si sa candidat est une bonne à correspondance à cetteposition là comme à beaucoup de gens dans la RH ne devraitpas faire puis vous poster la description du postela description du candidat à son CVsa lettre de motivationil est possible à ce que dici à ce que le modèle arrive àla fin il est complètement oublié de ce que vous lui avezdemandé et génère quelque chose qui est plus moins aléatoireou est basé juste sur les dernières phrasesCe que vous allez dire ah ouicest de lhallucination parce quil a inventé uneexpérience ou un re requirement mais en réalitécest plus un oubli dinstructionpuis vous avez à peut êtrelation la plus complète complexequi est la généralisation problématiqueCest surtout lessor des modèles plus grands qui ont desconnaissances généraux entre guille mes connaissances assezbien acquises et qui vont essayer de les utiliser encoordination pour donner des réponses meilleuresCe quon appelle pour vous en donner un exemplevous avez un statement qui est vrai que les femmes onttoujours du mal à être prises au sérieux dans le milieumédical puis vous avez aussi unstatement qui est vraiCest ceux et celles qui ne sont pas prisesau sérieux dans le même médicalUne mauvaise expérience en généralPuis vous entendez aussi assez souvent un conseil en ligneque si vous avez mes expériences travailil faut changer tout de travaildans ce que le modèle va faireIl va faire une conclusion et René ce que les femmes doiventquitter le milieu médical ce qui est complètement fauxEt je nai pas besoin de vous effet pourquoicest problématique mais de point de vue de modèleça fait énormément de sens à cause de la combinaison de tousces faits dont il est conscient comme des faits réelsEt encore une fois on en revient au fait que leshallucinations ne sont pas une expérience dutilisateurne sont pas en recoupe les et on en revientque les hallucinations ne sont pas une propriété des lmCest une expérience des utilisateurs ou les utilisateurssattendaient à une réponse qui ont a obtenu complètementdifférente ont obtenu une réponse qui ne faisait pasréférence à une expérience vécueou enregistrée mais qui a été inventée par le modèleDonc les hallucinations sont uneexpérience des utilisateursCest pas une propriété du modèle et peut avoir beaucoup deraisons différentes dont je vousai mentionné le plus probableCest pour ça quil est particulièrement difficilede sen défaireAlors des non génératif jusquà maintenanton a parlé surtout des et des génératifCependant il existe certains qui ne sont pas vraimentet qui résoudre dune certaine façoncertains des problèmes avec les lm purement génératifPour comprendre comment ça fonctionneon va retourner jusquau baseOn va retourner jusquà cette fin architecturesur laquelle la plupart des lm sont basés aujourdhui sontdes architectures qui a permettent qui permettaient à labase la traduction entre des différents langagesDonc cest notamment si vous avez entendu parlerle fameux transformermais les modèles qui le précédaientfonctionnaient aussi un peu pareilDonc vous prenez un mot en françaisDonc par exemple jaime les vachesvous le traduisez dans une autre langage i les vécupour cela vous avez besoin de quelque part représenter cesens abstrait de la phrase dans un langage pour ledécoder dans un langage différentDonc cest ce que dans ces architectures est un module quonappelle les encs qui est en grès gros gros réseaua rhoé et lencre ce qui faitil crée une représentation abstraite dun concept etlenvoie aux décodeurs et le décodeurs le décode dans unlangage à qui lui est connuDonc si vous prenez les élément comme çacest ce quon appelle les élément traducteursCest pour la plupart des éléments que vous utilisez pourfaire des traductions entre langageDonc je vous donne un exemple de quelques modèlesle t simple Bart sont des traducteursmais ça peut aussi être desintroducteurs plus abstraits qui par exempleprennent un rapport médical et vousdonnent tous les points importantsPar exemple vous avez ce bloc de texte et vous avez ouile patient a  ansa mal fait après une session de snowboard un peu intense quivous permet de faire le diagnostic un peu mieuxEn théorie en pratiquece sont des aile sont toujours des pairCest une traduction la plus probablemais ne relatant pas les expériencessans garantie dêtre justeEt ce qui est de plus importante sans connaissance médicalequi permettent de prioriser ce que présent dans le rapportou poser des questions supplémentairespour avoir des informations qui peuvent ne pas être dans lerapport mais qui sont nécessaires pour le diagnosticVous avez aussi des lm en codeurDonc si vous enlevez toute la partiequi génère du texte et vous mettait justela représentation abstraite du sensce que ça vous permet de fairecest de trouver des textes avec des représentationssimilaires dans les langages différentsdans les bases données de texteDonc des à personnes qui aime les vachesune personne qui est aimé par les vachesune personne et les vaches qui aiment les montagnes ou lespersonnes qui aiment les animauxDune manière générale ça vous permet de faire deux chosestrès intéressantes dans la première à la recherche derreurDonc quand le sens est assez proche des autres phasesmais il y a des déviations assez importantes qui sontbizarres quon peut souligner et demander à lutilisateursi cest vraiment ce quil voulait dire ou la recherche destextes avec une signification similaireDonc la première application correctioncest ce que vous voyez quand vous avez vos mots qui sontsoulignés en rouge quand vous avez mal écritDonc classiquement le sens est pareil à quelque chosedautre mais il y a quelques parties qui clochentDonc le modèle est capable de détecter et le souligner puisla partie qui fait de la recherche de textes avec unesignification similaireça vous permet de faire quelque chose quon appelle lesakles rerie augment de générationDonc vous prenez les al éléments en codeurles al élément traducteur vous encoder le texteDonc par exemple vous dites jai une demandede mon passion qui a un tel âge qui a une telle présentationest ce que je pourrais trouver des cas similairesUtilisez lencodage pour trouver les textes parlant de mêmesconcepts même sils sont dans les langages différents non?Par exemple les rapports de la suisse alémanique dans lesrapports dans les hôpitaux de la suisse alémanique plutôtque que dans les hôpitaux romanset vous rajoutez ces textes avec votre quête en tant quecontexte supplémentairepuis vous traduisez en réponse attendueDonc par exemple cest ce que le gpt search est en trainde faire ou cest ce que je peux faire avec un lm quejutilise plus comme en moi en demandant par exempletrouver des exemples de cas de don en valléeen utilisant le recherche webDonc le modèle va cher faire des recherches web pourlesquels utilisent cette interfacede en codage plutôt que des mots spécifiquesrécupérer les donnéesfaire lanalyse des données et vous retourner une réponseDans ce cas là cest quil ny a pas vraiment de rapport ded Valley aller par contre il y alarrivée de moustiques tigreDonc il y a des craintes vis à vis de ça AttentionEncore une fois ça reste toujours des perruques plastiqueLa traduction est la plus probablemais restant ne relatant pas dexpériencesans garantie dêtre justeDonc par exemple dans ce cas particulier si vous posez aulnm que je vous ai mentionné tout à lheure qui a accès à larecherche web sans lui demander explicitement de chercheril va vous expliquer quil est incapable de chercher et vavous donner plein dautres endroitsvous chercher dont certains ne sont pas forcémenttrès pertinent pour votre recherchePuis ce qui est assez intéressantcest que non seulement des textes ont en sensabstrait mais aussi des imagesCest ce quon appelle des modèles mixtesDonc par exemple si se focalise toujours sur la personnequi bien les images si vous avez cette image làvous pouvez très certainement la décrire en tant quunepersonne les vaches je des pleins de détails en tant quela vache et rousse lhomme la personne est un hommeLhomme porte un tee shirtIl y a de lherbe en arrière planDonc du coup pouvait avoir cette correspondance entre lestextes et les images que vous pouvez analyser avec les lmCest ce quon appelle les modèles mixtesQuand une fois je ne veux pas vous faire le topo tout letemps vous avez la traduction des images en texte la plusprobable mais ne leur a t on pas dexpérience sansgarantie dêtre justeDonc souvenez vous de cette image de ailleursentre guillemets et ça des applications directeslorsque les des implications directeslorsque les l mixtes se divisaient dans le contexte médicalPour vous Donner un exemple à vous avez icides exemples de classification de radiographie pour savoirsi le patient à du vide ou nonEt il y ades données de type qui sont présents dans le datadentraînement puis des données qui nont pas été vuesLe modèle est assez performant pour trouver du COVID videmais un peu moins performant du trouver non du COVIDQuest ce qui se passe si vous injecter une image qui narien à voir pour lequel votre modèlena pas de contexte pour pouvoir linterpréterVous Avez à avoir des prédictions qui sont àcomplètement absurdes par exemplece chat noir et du ko  avec une confiance de  %Pourquoi Quest ce qui sest passé?Comme Je vous ai expliqué par le passéles limitations sappliquent aux modèles mixtes de la façondont ils applique au modèle de langageEt dans ce cas précis il ny avait pas dimage de chat quiétait présente dans celledentraînement de ce modèle spécifiqueDu coup ce modèle spécifique de la classification danalysedimages va interpréter les modèles de chat comme desmodèles de radiographie et essayer de le classifier avec çace qui normalement devrait passerpour une invest destinationMais comme vous avez compris nen est pas vraimentet juste une parenthèsecette image nest pas encore des modèles génératif sont desmodèles qui étaient prêt à entraîner avant larrivée des lmmais qui présentent les mêmes problématiques quon voit auxlm faisant la même chose aujourdhuiEt la dernière des choses dont je voudrais parlerdans cette capsulecest le contexte dutilisation des outils qui en faitla sécurité ou en insécurité qui en découleÀ Quelque chose dont on parle assez souvent dans lecontexte de sécurité des lmcest le biais dautomatisationvous expliquer intuitivement ce que cest cest que à vousmoi quasiment tout le mondeplus des cartes dans des lieux quon connaît pason utilise des navigateurs assez souvent des Googlemaps et il fonctionneTellement Bien Lavaste majorité de temps quon apprend à leur faireconfiance aveuglement et à suivre toutes les directionsproblème cest que parfois quand ils sont trèsRarement à Quelles ont tortÀ vous Retrouver avec des voitures qui sont constammentcommencées qui vont dans des endroitsils ne devraient pas aller en essayant de naviguer vers desendroits qui sont inatteignablesPar exemple si vous êtes allés à greenwaldil y a plein de signes comme ça disant que nonvous pouvez pas prétendre cette route là pour arriver àYork parce quil ny a pas de route qui vavous avez besoin de retourner en arrière votre sûr etprendre le parking à ne pas croire ce que Google vousdit ce qui est drôleMais le problème cest quil y a eu plusieurs situationspotentiellement mortelles avec Google mapsmais Apple maps quand ils sont sortis en Et le bio de mode dautomatisation est assez drôle quand onen parle comme ça mais çades conséquences extrêmement réelles est extrêmementimportante qui est le fait queles machines imparfaites font parfois des décisionsimparfaites est une solution standard et dajouter unhumain pour valider la décision justement pouradresser ces problèmes raresLe problème cest que si la machine est correctesuffisamment souvent comme pour nos conducteurslhumain va finir par si différer toujoursEt ça conduit déjà un cas au Danemarkdans un cas au pays balou un algorithme de détection de fraude à désavantagessociaux avait beaucoup de faux positifsmais avait suffisamment de cas de détection réelle pour queles personnes qui étaient censées de superviserne les détecte pas qui conduisent ce qui a conduit à desimpact assez grave aux personnes qui auraient dû avoir desaides qui les ont pas eu et qui ont parfois par conséquentont perdu leurs enfants et ont pris leur propre vieCest pour ça que à chaque fois que vous entendez quequelquun vous dit oui notre algorithme a de limitationmais on va mettre à un humain dans la boucleLa première des choses que vous avez besoin de penser et dedemander cest de quelle façon?Parce que cest lhumain elle a juste censé vérifier ledes décisions fausses de la machine qui est autrementtoujours juste la réalité est quen tant que humainon nest pas très bon dans cette tâche là de vigilanceéternelle face à une machine qui est presque parfaiteet quelque part ce biais daut automation a un impact surlutilisation des algorithmes àles algorithmes qui peuvent être validésacceptés ou pas en tant que des medical deviceune ation de la FDA qui est présentedans beaucoup de publicationsIl y a des planificationsdes device médicaux et des algorithmes qui sont des devicesmédicaux utilisés dans le diagnostic qui existent égalementau Canada en union européenne ou en suisseEt quand vous avez face à vous un algorithmeDonc par exemple on va dire un algo de détection desanomalies des radiographies de cache thoraciqueOn peut dire que cest juste en train de regarder desanomalies au chaos ou le docteur qui fait de la radiographieradiologue na pas trouvé des problèmeslui même juste peut être pour faire des études ouavoir un deuxième avisDonc vous avez une classe numéro un de médical device etcomme les dho scope qui nont pas besoin dénormément devalidation mais maintenant ce même algorithmeQui était au parents utilisé pour donner un deuxième aviset utilisé dans une situation critiqueDonc vous avez un déluge de passions qui arriveavec une nouvelle maladieOn va dire par laquelle mère pense tout de suite à une il ya quatre ans et vous avez besoin de faire un triage trèsrapide des patients basés sur leur radio parce que ledocteur nest juste pas disponible et on est juste pas enmesure denégocier un tel flux de patientsDonc si vous détecter une anomalievous envoyez le patient aux urgences parce que vous êtesquasiment sûr que cette nouvellepathologie potentiellement mortelleSi vous pas d anomalie vous envoyez le patient la maisonlà les choses sont complètement différentesUne erreurAh nest Plus mineure de la part dalgorithmesCest une erreur qui peut faire la différenceentre la vie et la mortDonc passer tout de suiteà un débat musical de classe trois etles conditions dapprobation sont beaucoup plus strictesEt la seule chose qui a changécest les conditions dans lesquelles ils sont utilisésDonc encore une foisquand vous avez face à vous un algorithme ou une méthode demachine en ligne on vous dit quelle peut être appliquéepar ça dans ces conditions làÀ Ce qui est importantcest de toujours garder à lespritles conditions dapplication et sassurer que les conditionsdapplication pour lesquelles un algorithme a été approuvéÀ Ne sont pas dépassésUn Puis en guise depuis en guise dintervention finalejaimerais conclure par une histoirepour vous expliquer à quel point il est difficilede comprendre les algorithmes et que conduisent les Anacomplexes et à quel point ils sontpotentiellement dangereusesCette personne là sur limage qui est de bager leA un Bien informaticien decentre de concert de Andersonvous dit très certainement pas grand choseEt pourtant cest la personne qui a révélé lun des plusgrands scandales récents de fabrication de données dans ledomaine de concert ou grosso modo à une équipe aconduit une analyseÀ Deux expressions de gène dans les conseils et a diton a trouvé une signature parfaite ou quand ces cinq gènessont amplifiés il y a une meilleure réponse à cesmédicaments à est ce qui sest passécest quand il a essayé de répéter lanalyseil en a rien trouvéIl na pas trouvé une réponse améliorée dans lecas de ces gènesEt en fait lun des problèmes étaitcest que dans ces gènes là dans la liste des  gènesil y avait certains qui faisaient du senspour les chercheurs pour les médecins et quon lui voyaitdisait que oui ça fait du sensCest très bien Donclexpérience quil avait fait à lépoquecest quil a pris une liste de gènes aléatoires et il les adonné des médecins à des biologistes et a ditce gène est associé avec des tumeursMa mère plus importante de ce que vous pourriez expliquerpour toi puis dans la liste de gènes aléatoireun docteur ou un biologiste sur en train detraverser et serait dit ah ouiAlors je vois ces quatre jeunes Oui ça fait du sensPourquoi? Parce que encore une foisla façon dont les modèles ou la façon dont les algorithmesvont voir des objetsà notre expérience telle que est ce quun médicament estefficace ou pas est ce que un marqueur de génétique enpacte le pronostic ne sont pas les mêmes dont on voitDonc quand on regarde sur cesabstraites des signatures dexpression de gèneson ne voit pas grand choseOn est on est obligé de avoir recours àdes outils informatiquesEt dans ce cas précis loutil informatiquea été lépi valu la factorisation de matriceEt en fait ce quil a découvert cest queléquipe qui avait initialement publié les résultats avaittriché qui navait pas vraiment dimpact et quil avait plusou moins à renversé les passions dans les essais cliniquesqui étaient censés susceptibles ou ne pas être susceptiblesaux médicaments même si cétait le plus probable quilnavait pas vraiment dimpact ça çacétait lun des plus grands scandales dela recherche médicale clinique et précliniquede ces  dernières annéesCétait une erreur de factorisation de matrice de paramètresÇa conduit à  rétraction heures perdues de recherche et à peu près  patientsquon estime quils sont morts à cause de ces cliniques enrenversées les lm sont des matrices de  suite à puissance  paramètresOn est presque une dizaine dordres de magnitude de plus deparamètres avec lesquels on peut commettre ce type derreurLà gardez à lesprit que les modèlescontinuant à ne pas être clair quand vous voyezun retour de modèlepar exemple une erreur de classificationdun chien à ski en tant que ou loup pouvez vous direah oui alors il y a ça qui est différentIl y a ça qui est différent Donc algorithme doit penser çaQuand vous allez regarder à lintérieur dalgorithmesça va faire aucun sensOn a toujours beaucoup du mal à comprendre comment lesmodèles de machine en fonctionnent sur tous les modèles quisont très performants et dautre en plus de difficultéavec les elem ou des modèles génératif à la fois de la partde leur taille et de laissent de leur donner dentraînementGardez vos yeux ouvertsne faites pas confiance à des outils juste parce que ce sontdes algorithmes de pointeet gardez à lesprit quils peuvent échouer comme tous lesautres outils et les outilsalgorithmiques que vous avez face à vousSur ce merci de votre attention'
   export default {
     name: "IACom",
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
  