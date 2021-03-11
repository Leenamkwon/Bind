import { useState } from 'react';

export const useTargetClick = (init) => {
  const [state, setState] = useState(init);

  const handleSetstate = (param) => {
    setState(param);
  };

  return [state, handleSetstate];
};
