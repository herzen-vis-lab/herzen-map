
export const getYMapLanguage = (lang: string) => {
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
  }
