<script setup>
import { ref } from 'vue';
import { usePrimeVue } from 'primevue/config';
const $primevue = usePrimeVue();

defineExpose({
    $primevue
});

const activeIndex = ref(0);
const items = ref([
    {
        label: 'Organisation générale de la formation pratique (FP)',
        icon: 'pi pi-fw pi-info-circle',
        questions: [
            'GLOSSAIRE',
            'Comment est organisée la formation pratique dans la filière physiothérapie romande ?',
            'Comment est organisée la formation pratique sur le site de Loèche-Les-Bains ?',
            'Combien y a-t-il de périodes de formation pratique dans le cursus BSC en physiothérapie ?',
            'Comment sont réparties les places de formation pratique ?',
            'Que se passe-t-il si je ne respecte pas les critères demandés ?'
        ],
        answers: [
            'CPT : contrat pédagogique tripartite<br>FP: Formation pratique<br>PFP: Période de formation pratique<br>PF: Practitien·ne formateur·trice<br>SAE: Sport-art-études',
            'La plupart des places de FP sont propre à chaque filière cependant certaines places font partie d’un pot commun entre les différentes filières romandes de physiothérapies.',
            'Vous trouverez la réponse à ces informations dans les fiches modules des périodes de formations pratiques (PFP), qui sont identiques entre tous les sites de la filière romande de physiothérapie, sur intranet',
            'Le cursus BSC en physiothérapie compte 4 périodes de formations pratique, ce qui représente environ 1/3 de votre formation.  <br> Ces 4 périodes durent :  6 semaines (PFP1) ; 10 semaines (PFP2) ; 10 semaines (PFP3) ; 8 semaines (PFP4). ',
            'Le responsable formation pratique vous soumettra, environ 3 mois avant le début de la formation pratique de l’année en cours, un fichier Excel regroupant la liste des places disponibles.<br>Nous vous conseillons de prendre le temps de lire le document “Attribution des places de FP / Zuteilung Praktikumsplätze” qui reprend point par point le processus d’attribution des places de FP ainsi que les critères à respecter.<br>A noter que l’attribution des places de PFP pour les étudiant·e·s SAE se fait en amont. ',
            'Si un·e d’entre vous ne respecte pas les critères demandés, la répartition des places proposées sera refusée. En cas de récidive, les dispositions nécessaires seront prises.'
        ]
    },
    {
        label: 'Processus Formation Pratique',
        icon: 'pi pi-fw pi-envelope',
        questions: [
            'Quel est l échéancier concernant votre formation pratique',
            'Qui-sont les formateur·trice·s HES et quelles sont leurs tâches ?',
            "Qu'est - ce que le contrat pédagogique tripartite et à quoi sert - il ? ",
            'Puis-je bénéficier d’aide pour la réalisation de mon contrat pédagogique tripartite ?',
            'Quelle est la procédure d’évaluation à laquelle je serais soumis·e durant la formation pratique ?',
            'Comment suis-je impliqué dans mon évaluation de PFP ?',
            'Je suis en échec à la fin de ma période de formation pratique, que va-t-il se passer ?',
            'En cas de double échec lors d’une PFP, que se passe-t-il ?',
            'J’ai été absent lors de ma période de formation pratique, quelles sont les conséquences ?',
            'Puis-je prendre congé durant ma formation pratique ?',
            'Quels sont les horaires que je serais amené à faire durant ma période de formation pratique ?',
            'Nous avons l’habitude de devoir évaluer tous nos modules (EEE), en est-il de même pour la formation pratique ?',
            'Puis-je profiter d’une place de formation pratique d’un autre site ?',
            'Je souhaiterai ouvrir une nouvelle place de FP, puis-je contacter directement l’institution ?',
            "Est-il possible d'effectuer une PFP à l'étranger ?",
            'Y-a-t-il un lieu où nous pouvons retrouver tous les documents présentés dans cette FAQ ?',]
        ,
        answers: [
            "Env. 3 mois avant le début de la PFP  : Envoi de la liste des places de FP par le resp. FP -Répartition des places de FP par les étudiant·e·s <br>Env. 2 ½ mois avant le début de la PFP - Transmission de la répartition des places de FP par les délégué·e·s de classe au resp. FPEnv. 2 mois avant le début de la PFP- 	Confirmation de la répartition des places de FP aux étudiant·e·s par le resp. FPPrise de contact avec les institution par l’étudiant·e Prise de contact avec le·la formateur·trice HES par l’étudiant·e, rédaction et échanges en lien avec le CPT<br>Au plus tard 2 sem. avant le début de la PFP- Envoi du CPT à l’institution par le·la formateur·trice HES<br>2ème – 3ème semaines de FP-Discussion et Signature du CPT1 avec formateur·trice HES et praticien formateur (PF)<br>Durant la PFP-Votre formateur·trice HES ainsi que le resp. FP se tiennent à votre entière disposition en cas de nécessité.<br>Mi PFP-Evaluation et échange avec les signataires du CPT2<br> Fin de PFP-Evaluation, signature (PF + étudiant·e) et transmission par voie électronique des documents d’évaluation au resp. FP par le·la PF<br>2ème – 3ème semaine post PFP-Débrief de la PFP entre formateur·trice HES et étudiant·e<br><br>1- en 3ème BSC l’étudiant·e se charge lui-même de la discussion de son CPT avec son PF. En cas de demande particulière, votre formateur·trice HES organisera une séance Teams ou se déplacera sur site pour en discuter.<br>2-En cas d’échec/difficultés notables à mi PFP ou si le·la PF et/ou l’étudiant·e l’estime nécessaire, une rencontre est organisée entre les signataires du CPT.<br><br>",
            'Mis à part le responsable de formation pratique, divers autres formateur·trice·s HES le soutiennent.<br>Le rôle de ces formateur·trice·s HES est d’accompagner et de soutenir les étudiant-e-s lors de la réalisation et/ou de la signature de leur CPT ainsi que lors du suivi de leur FP d’un point de vue pédagogique et du débriefing post FP.',
            "Le contrat pédagogique tripartite (CPT) indique les objectifs à atteindre par l’étudiant·e durant la PFP. Plus précisément, ce dernier doit servir à développer les rôles et les compétences présentés dans le référentiel de compétence. Il précise également les ressources mises à sa disposition. Ce contrat, cosigné par l’étudiant·e, la·le formateur·trice HES et le·la PF permet à chaque partie de formaliser ses attentes et de s’entendre sur les objectifs d’apprentissage visés.",
            'Puis-je bénéficier d’aide pour la réalisation de mon contrat pédagogique tripartite ?',
            'Quelle est la procédure d’évaluation à laquelle je serais soumis·e durant la formation pratique ?',
            'Comment suis-je impliqué dans mon évaluation de PFP ?',
            'Je suis en échec à la fin de ma période de formation pratique, que va-t-il se passer ?',
            'En cas de double échec lors d’une PFP, que se passe-t-il ?',
            'J’ai été absent lors de ma période de formation pratique, quelles sont les conséquences ?',
            'Puis-je prendre congé durant ma formation pratique ?',
            'Quels sont les horaires que je serais amené à faire durant ma période de formation pratique ?',
            'Nous avons l’habitude de devoir évaluer tous nos modules (EEE), en est-il de même pour la formation pratique ?',
            'Puis-je profiter d’une place de formation pratique d’un autre site ?',
            'Je souhaiterai ouvrir une nouvelle place de FP, puis-je contacter directement l’institution ?',
            "Est-il possible d'effectuer une PFP à l'étranger ?",
            'Y-a-t-il un lieu où nous pouvons retrouver tous les documents présentés dans cette FAQ ?',]
    },

]);

const changeItem = (index) => {
    activeIndex.value = index;
};
</script>

<template>
    <div>
        <div class="font-bold text-900 text-5xl mb-3 text-center">FAQ's</div>
        <div class="text-700 text-center mb-5 line-height-3"> </div>

        <div class="flex flex-column md:flex-row gap-5">
            <div class="card mb-0 md:w-20rem">
                <div class="text-900 block font-bold mb-3">Catégories</div>
                <ul class="list-none m-0 p-0">
                    <li v-for="(item, i) in items" :key="i" @click="changeItem(i)" class="mb-2">
                        <a v-ripple
                            class="p-ripple flex align-items-center cursor-pointer select-none p-3 transition-colors transition-duration-150 border-round"
                            :class="{
                                'bg-primary': activeIndex === i,
                                'hover:surface-hover': activeIndex !== i
                            }">
                            <i class="mr-2 text-lg" :class="item.icon"></i>
                            <span>{{ item.label }}</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="card flex-1">
                <Accordion>
                    <AccordionTab v-for="(question, i) in items[activeIndex].questions" :key="i" :header="question">
                        <p class="line-height-3 m-0 p-0" v-html="items[activeIndex].answers[i]"></p>
                    </AccordionTab>
                </Accordion>
            </div>
        </div>
    </div>
</template>
