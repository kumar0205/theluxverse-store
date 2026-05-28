// App-level URL params / env config helper

const getParam = (paramName, defaultValue = null) => {
  if (typeof window === 'undefined') return defaultValue;

  const urlParams = new URLSearchParams(window.location.search);
  const fromUrl = urlParams.get(paramName);
  if (fromUrl) return fromUrl;

  const fromEnv = import.meta.env[`VITE_${paramName.toUpperCase()}`];
  if (fromEnv) return fromEnv;

  return defaultValue;
};

export const appParams = {
  appId: getParam('app_id'),
  token: getParam('access_token'),
};
