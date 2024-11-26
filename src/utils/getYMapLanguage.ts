export const getYMapLanguage = (lang: string | undefined): "ru_RU" | "en_US" | "tr_TR" | "en_RU" | "ru_UA" | "uk_UA" | undefined => {
  switch (lang) {
    case "ru":
      return "ru_RU";
    case "en":
      return "en_US";
    case "zh":
      return "en_US";
    default:
      return "ru_RU";
  }
};