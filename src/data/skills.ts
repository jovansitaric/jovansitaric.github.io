export const skills = {
    html: "HTML",
    css: "CSS / SCSS",
    javascript: "JavaScript",
    vue: "Vue",
    astro: "Astro",
    angular: "Angular",
    react: "React",
    rxjs: "RxJS",
    gatsby: "Gatsby",
    wordpress: "WordPress",
    php: "PHP",
    laravel: "Laravel",
    restApi: "REST APIs",
    git: "Git",
    figma: "Figma",
    acf: "ACF",
    seo: "SEO",
} as const;

export type SkillKey = keyof typeof skills;
export type SkillLabel = (typeof skills)[SkillKey];

export const skillList: SkillKey[] = [
    "html",
    "css",
    "javascript",
    "vue",
    "astro",
    "angular",
    "react",
    "rxjs",
    "gatsby",
    "wordpress",
    "php",
    "laravel",
    "restApi",
    "git",
    "figma",
];
