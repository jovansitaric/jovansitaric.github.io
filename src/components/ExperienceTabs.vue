<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import {
    getExperienceUiText,
    translateExperienceDate,
    type Language,
} from "../data/i18n";

type Experience = {
    company: string;
    position: string;
    date: string;
    summary: string;
    detail: string;
    stack: string;
};

const experiences: Record<"work" | "internship", Experience[]> = {
    work: [
        {
            company: "Cake.com",
            position: "Angular Front-end Developer",
            date: "November 2025 - Present",
            summary:
                "Joined the team one to build and maintain one of the most successful tracking app 'Clockify'.",
            detail: "Actively working with Angular, RxJS, HTML, CSS and JavaScript. Each day starts with daily meetings and tracking the tasks status in 'Plaky' application.",
            stack: "Angular · RxJS · JavaScript · REST API",
        },
        {
            company: "Wireless Media Group",
            position: "Medior Front-end Developer",
            date: "November 2022 - November 2024",
            summary:
                "Joined the OEC team to build and maintain ecommerce experiences for Telekom across B2B and B2C products.",
            detail: "Worked daily with Vue, Vuex, HTML, CSS and JavaScript on products including mts.rs, mojasupernova.mts.rs, mtel.me and mtel.ba, backed by SAP Hybris.",
            stack: "Vue · Vuex · JavaScript · Hybris",
        },
        {
            company: "Ewasoft (ex. fSD)",
            position: "Front-end Developer",
            date: "September 2021 - November 2022",
            summary:
                "Built web applications, SPA experiences and WordPress sites as part of the Webgators team.",
            detail: "Moved from a successful internship into a junior role, working across React, Gatsby, Alpine.js, ACF, WPML, PHP and JavaScript projects.",
            stack: "React · Gatsby · WordPress · PHP",
        },
        {
            company: "ApaOne Marketing Agency",
            position: "Full-stack Developer",
            date: "March 2021 - April 2021",
            summary:
                "Owned delivery across a busy portfolio of fourteen projects as the company's only developer.",
            detail: "Developed with Vue, HTML, CSS, jQuery, Laravel, custom PHP CMS tools and WordPress backed by MySQL.",
            stack: "Vue · Laravel · PHP · MySQL",
        },
        {
            company: "Dotkom Blog",
            position: "WordPress Developer",
            date: "February 2017 - Present",
            summary:
                "Maintained and evolved an independent culture and underground music blog as a part-time contributor.",
            detail: "Focused on WordPress, SEO and frequent front-end improvements while helping the non-profit organization grow its reach.",
            stack: "WordPress · SEO · CSS",
        },
        {
            company: "TapeNS Group",
            position: "Web Developer & Graphic Designer",
            date: "February 2018 - August 2019",
            summary:
                "Created websites and print-ready vector artwork for an international adhesive tape company.",
            detail: "Worked with WordPress, HTML, CSS and jQuery, then expanded into Photoshop and Illustrator for printed tape designs.",
            stack: "WordPress · jQuery · Photoshop",
        },
    ],
    internship: [
        {
            company: "fSD Ltd.",
            position: "Front-end Developer",
            date: "June 2021 - September 2021",
            summary:
                "Learned pixel-perfect implementation, ABEM methodology and vanilla JavaScript while shipping custom WordPress sites.",
            detail: "Finished the internship by learning React, Gatsby and headless CMS integration with Strapi.",
            stack: "JavaScript · React · Gatsby · Strapi",
        },
        {
            company: "Bee IT Ltd.",
            position: "Salesforce Developer",
            date: "January 2021",
            summary:
                "Worked with a small student team on a custom Salesforce storefront and a set of guided development tasks.",
            detail: "Practiced code review, storefront setup and team delivery under a short, focused deadline.",
            stack: "Salesforce · JavaScript",
        },
        {
            company: "Vega IT Ltd.",
            position: "Front-end Developer",
            date: "May 2020",
            summary:
                "Translated PSD designs into responsive interfaces and completed six front-end practice projects.",
            detail: "Explored legacy browser techniques, floats, UI principles and the discipline of pixel-accurate implementation.",
            stack: "HTML · CSS · UI",
        },
        {
            company: "IT Engine Ltd.",
            position: "Full-stack Developer",
            date: "November 2020",
            summary:
                "Built a to-do application with a Laravel REST API and Vue during an intensive one-week placement.",
            detail: "Learned how to connect a Vue client to a REST backend with Axios and ship a working application quickly.",
            stack: "Laravel · Vue · Axios",
        },
    ],
};

type ExperienceTranslation = Partial<
    Pick<Experience, "position" | "summary" | "detail">
>;
const experienceTranslations: Record<
    "sr",
    Record<"work" | "internship", ExperienceTranslation[]>
> = {
    sr: {
        work: [
            {
                position: "Angular front-end developer",
                summary:
                    "Pridružio sam se timu kako bih razvijao i održavao jednu od najuspešnijih aplikacija za praćenje vremena, Clockify.",
                detail: "Aktivno radim sa Angularom, RxJS-om, HTML-om, CSS-om i JavaScriptom. Svaki dan počinje dnevnim sastankom, a status zadataka pratimo u aplikaciji Plaky.",
            },
            {
                position: "Medior front-end developer",
                summary:
                    "Pridružio sam se OEC timu na izradi i održavanju e-commerce iskustava za Telekom, za B2B i B2C proizvode.",
                detail: "Svakodnevno sam radio sa Vue, Vuex, HTML-om, CSS-om i JavaScriptom na proizvodima kao što su mts.rs, mojasupernova.mts.rs, mtel.me i mtel.ba, uz SAP Hybris na backendu.",
            },
            {
                position: "Front-end developer",
                summary:
                    "Izrađivao sam web aplikacije, SPA iskustva i WordPress sajtove kao deo Webgators tima.",
                detail: "Nakon uspešne prakse prešao sam u juniorsku ulogu i radio sa Reactom, Gatsbyjem, Alpine.js-om, ACF-om, WPML-om, PHP-om i JavaScriptom.",
            },
            {
                position: "Full-stack developer",
                summary:
                    "Vodio sam isporuku četrnaest projekata kao jedini developer u kompaniji.",
                detail: "Radio sam sa Vueom, HTML-om, CSS-om, jQueryjem, Laravelom, prilagođenim PHP CMS alatima i WordPressom uz MySQL.",
            },
            {
                position: "WordPress developer",
                summary:
                    "Održavao sam i razvijao nezavisni blog o kulturi i underground muzici kao saradnik sa nepunim radnim vremenom.",
                detail: "Bavio sam se WordPressom, SEO optimizacijom i čestim unapređenjima front-enda, pomažući neprofitnoj organizaciji da proširi svoj uticaj.",
            },
            {
                position: "Web developer i grafički dizajner",
                summary:
                    "Izrađivao sam sajtove i vektorska rešenja za štampu za međunarodnu kompaniju koja proizvodi lepljive trake.",
                detail: "Radio sam sa WordPressom, HTML-om, CSS-om i jQueryjem, a zatim proširio znanje na Photoshop i Illustrator za dizajn štampanih traka.",
            },
        ],
        internship: [
            {
                position: "Front-end developer",
                summary:
                    "Učio sam pixel-perfect implementaciju, ABEM metodologiju i vanilla JavaScript dok sam izrađivao prilagođene WordPress sajtove.",
                detail: "Praksu sam završio učenjem Reacta, Gatsbyja i integracije headless CMS-a Strapi.",
            },
            {
                position: "Salesforce developer",
                summary:
                    "Radio sam u malom studentskom timu na prilagođenom Salesforce storefrontu i nizu razvojnih zadataka.",
                detail: "Vežbao sam code review, podešavanje storefronta i timsku isporuku u kratkom roku.",
            },
            {
                position: "Front-end developer",
                summary:
                    "Pretvarao sam PSD dizajne u responzivne interfejse i završio šest praktičnih front-end projekata.",
                detail: "Istraživao sam tehnike za stare browsere, float raspored, UI principe i disciplinu pixel-perfect implementacije.",
            },
            {
                position: "Full-stack developer",
                summary:
                    "Napravio sam to-do aplikaciju sa Laravel REST API-jem i Vueom tokom intenzivne prakse od jedne nedelje.",
                detail: "Naučio sam kako da povežem Vue klijent sa REST backendom koristeći Axios i brzo isporučim funkcionalnu aplikaciju.",
            },
        ],
    },
};

const mode = ref<"work" | "internship">("work");
const selected = ref(0);
const language = ref<Language>("en");
const activeExperiences = () =>
    experiences[mode.value].map((experience, index) => ({
        ...experience,
        date: translateExperienceDate(experience.date, language.value),
        ...(language.value === "sr"
            ? experienceTranslations.sr[mode.value][index]
            : {}),
    }));
const selectMode = (nextMode: "work" | "internship") => {
    mode.value = nextMode;
    selected.value = 0;
};
const onLanguageChange = (event: Event) => {
    const nextLanguage = (event as CustomEvent<Language>).detail;
    if (nextLanguage === "en" || nextLanguage === "sr")
        language.value = nextLanguage;
};
onMounted(() => {
    language.value = document.documentElement.lang === "sr" ? "sr" : "en";
    window.addEventListener("portfolio-language-change", onLanguageChange);
});
onBeforeUnmount(() =>
    window.removeEventListener("portfolio-language-change", onLanguageChange)
);
</script>

<template>
    <div class="experience-shell">
        <div class="experience-sidebar">
            <div
                class="mode-switch"
                role="tablist"
                :aria-label="getExperienceUiText(language).experienceType"
            >
                <button
                    :class="{ active: mode === 'work' }"
                    role="tab"
                    :aria-selected="mode === 'work'"
                    @click="selectMode('work')"
                >
                    {{ getExperienceUiText(language).work }}
                </button>
                <button
                    :class="{ active: mode === 'internship' }"
                    role="tab"
                    :aria-selected="mode === 'internship'"
                    @click="selectMode('internship')"
                >
                    {{ getExperienceUiText(language).internship }}
                </button>
            </div>
            <div class="experience-list">
                <button
                    v-for="(experience, index) in activeExperiences()"
                    :key="experience.company"
                    :class="{ active: selected === index }"
                    @click="selected = index"
                >
                    <span>0{{ index + 1 }}</span
                    >{{ experience.company }}
                </button>
            </div>
        </div>
        <Transition name="experience-swap" mode="out-in">
            <article
                :key="`${mode}-${selected}`"
                class="experience-detail"
                aria-live="polite"
            >
                <p class="eyebrow">
                    {{
                        mode === "work"
                            ? getExperienceUiText(language).selectedWork
                            : getExperienceUiText(language).selectedInternship
                    }}
                </p>
                <h3>{{ activeExperiences()[selected].position }}</h3>
                <p class="experience-company">
                    {{ activeExperiences()[selected].company }}
                </p>
                <p class="experience-date">
                    {{ activeExperiences()[selected].date }}
                </p>
                <p>{{ activeExperiences()[selected].summary }}</p>
                <p>{{ activeExperiences()[selected].detail }}</p>
                <strong>{{ activeExperiences()[selected].stack }}</strong>
            </article>
        </Transition>
    </div>
</template>
