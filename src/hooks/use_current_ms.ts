import { useEffect, useState } from 'react';

const useCurrentMs = () => {
  const [value, setValue] = useState(new Date().getTime());
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(new Date().getTime());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
  return value;
};

export default useCurrentMs;
