type Listener = () => void;
let _accessToken: string | null = null;
const listeners = new Set<Listener>();

export const tokenStore = {
  get: () => _accessToken,

  set: (token: string | null) => {
    _accessToken = token;
    listeners.forEach(listener => listener());
  },

  clear: () => {
    _accessToken = null;
    listeners.forEach(listener => listener());
  },

  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
