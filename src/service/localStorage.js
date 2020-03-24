export const TOKEN_STORAGE_KEY = 'accessToken';

export const getLocalStorage = () => window.localStorage;

export const getAccessToken = () => getLocalStorage().getItem(TOKEN_STORAGE_KEY);

export const setAccessToken = token => getLocalStorage().setItem(TOKEN_STORAGE_KEY, token);
