export const checkToken = (token: string) => {
    try {
      const { exp } = JSON.parse(atob(token));
      return exp > Date.now();
    } catch {
      return false;
    }
  };