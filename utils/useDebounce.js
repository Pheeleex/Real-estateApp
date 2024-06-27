import { useEffect, useRef } from 'react';

const useDebounce = (func, delay) => {
  const timeoutRef = useRef(null);

  const debouncedFunc = (...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return debouncedFunc;
};

export default useDebounce;
