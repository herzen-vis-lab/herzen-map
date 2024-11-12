export const createToken = (username: string) => {
    const payload = {
      username,
      exp: Date.now() + 60 * 60 * 1000,
    };
    return btoa(JSON.stringify(payload));
  };