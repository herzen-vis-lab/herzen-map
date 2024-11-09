export const getStatusLabel = (status_id: number): string => {
    switch (status_id) {
      case 0:
        return 'Черновик';
      case 1:
        return 'Активная';
      case 2:
        return 'Архив';
      default:
        return 'Неизвестно';
    }
  };
  