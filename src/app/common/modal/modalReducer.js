const MODAL_OPEN = 'MODAL_OPEN';
const MODAL_CLOSE = 'MODAL_CLOSE';

const initialState = {
  open: false,
  component: null,
};

export function modalOpen(component) {
  return { type: MODAL_OPEN, payload: component };
}

export function modalClose() {
  return { type: MODAL_CLOSE };
}

export function modalReducer(state = initialState, { type, payload }) {
  switch (type) {
    case MODAL_OPEN:
      return { ...state, open: true, component: payload };
    case MODAL_CLOSE:
      return { ...state, open: false, component: null };
    default:
      return state;
  }
}
