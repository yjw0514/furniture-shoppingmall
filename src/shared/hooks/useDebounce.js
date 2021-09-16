import { useEffect, useState } from 'react';

export default function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('setting');
      setDebounceValue(value);
    }, [delay]);
    return () => {
      console.log('clearing');
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceValue;
}
