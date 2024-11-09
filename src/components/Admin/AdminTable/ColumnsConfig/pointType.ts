export const getTypeLabel = (type_id: number): string => {
    switch (type_id) {
      case 2:
        return 'Памятник';
      case 3:
        return 'Факультет';
      case 4:
        return 'Институт';
      case 5:
        return 'Общежитие';
      case 6:
        return 'Буфет';
      case 7:
        return 'Столовая';
      case 8:
        return 'Библиотека';
      case 9:
        return 'Иностранцам';
      case 10:
        return 'Памятник архитектуры';
      case 11:
        return 'Достопримечательность';
      case 12:
        return 'Историческое здание';
      case 13:
        return 'Технопарк';
      case 14:
        return 'приемная комиссия';
      case 15:
        return 'Обсерватория';
      case 16:
        return 'Музей';
      case 17:
        return 'Вход';
      case 18:
        return 'Точка кипения';
      case 19:
        return 'Спорт';
      case 20:
        return 'СДК';
      case 21:
        return 'Гостиница';
      case 22:
        return 'Подготовительные курсы';
      default:
        return 'Неизвестный';
    }
  };
  