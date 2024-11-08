export const getStatusLabel = (status_id: number): string => {
    switch (status_id) {
      case 0:
        return 'черновик';
      case 1:
        return 'активная';
      case 2:
        return 'архив';
      default:
        return 'неизвестно';
    }
  };
  