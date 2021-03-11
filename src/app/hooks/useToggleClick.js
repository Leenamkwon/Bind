import { useState } from 'react';

export function useToggleClick(init) {
  const [state, setState] = useState(init);

  const changeState = () => {
    setState(!state);
  };

  return [state, changeState];
}
