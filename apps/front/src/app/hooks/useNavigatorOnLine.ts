import { useEffect, useState } from 'react';

const useNavigatorOnLine = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const setOnline = () => setIsOnline(true);
  const setOffline = () => setIsOnline(false);
  
  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return isOnline;
};

export default useNavigatorOnLine;
