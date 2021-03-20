import { useCallback, useEffect, useRef, useState } from 'react';

export default function useDebounce(term, delay = 400) {
  const [state, setState] = useState(term);
  const [debounceTerm, setDebounceTerm] = useState(state);
  const temp = useRef(null);

  useEffect(() => {
    temp.current = setTimeout(() => {
      setDebounceTerm(state);
    }, delay);

    return () => {
      temp.current && clearTimeout(temp.current);
    };
  }, [delay, state]);

  const handleChange = useCallback((value) => {
    setState(value);
  }, []);

  return [debounceTerm, handleChange];
}
