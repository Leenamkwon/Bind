export const DARK_MODE = 'DARK_MODE';
export const LIGHT_MODE = 'LIGHT_MODE';

const initialState = { isThemeMode: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' };

export function themeReducer(state = initialState, { type, payload }) {
  switch (type) {
    case DARK_MODE:
      return { ...state, isThemeMode: 'dark' };
    case LIGHT_MODE:
      return { ...state, isThemeMode: 'light' };
    default:
      return state;
  }
}
