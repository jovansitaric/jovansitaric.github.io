export type Language = "en" | "sr";

export const experienceUiText = {
    en: {
        experienceType: "Experience type",
        work: "Work",
        internship: "Internship",
        selectedWork: "Selected work",
        selectedInternship: "Selected internship",
    },
    sr: {
        experienceType: "Vrsta iskustva",
        work: "Posao",
        internship: "Praksa",
        selectedWork: "Odabrani posao",
        selectedInternship: "Odabrana praksa",
    },
} as const satisfies Record<Language, Record<string, string>>;

const monthNames = {
    en: {
        January: "January",
        February: "February",
        March: "March",
        April: "April",
        May: "May",
        June: "June",
        July: "July",
        August: "August",
        September: "September",
        October: "October",
        November: "November",
        December: "December",
        Present: "Present",
    },
    sr: {
        January: "Januar",
        February: "Februar",
        March: "Mart",
        April: "April",
        May: "Maj",
        June: "Jun",
        July: "Jul",
        August: "Avgust",
        September: "Septembar",
        October: "Oktobar",
        November: "Novembar",
        December: "Decembar",
        Present: "Trenutno",
    },
} as const satisfies Record<Language, Record<string, string>>;

export function getExperienceUiText(language: Language) {
    return experienceUiText[language];
}

export function translateExperienceDate(date: string, language: Language) {
    return date.replace(
        /January|February|March|April|May|June|July|August|September|October|November|December|Present/g,
        (month) => monthNames[language][month as keyof typeof monthNames.en],
    );
}
