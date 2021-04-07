const ACCESS_TOKEN = 'accessToken';

export const setAuth = (accessToken: string): void => {
  localStorage.setItem(ACCESS_TOKEN, accessToken)
}

export const clearAuth = (): void => localStorage.removeItem(ACCESS_TOKEN);

export const isAuth = (): boolean => {
  if (localStorage.getItem(ACCESS_TOKEN)) return true;
  return false;
}

export const getAuth = (): string | null => localStorage.getItem(ACCESS_TOKEN);