import { useEffect, useState } from 'react';

const useIsOnline = () => {
    const [isOnline, setIsOnline] = useState(true);
    const handleOnline = () => {
        setIsOnline(true);
    };
    const handleOffline = () => {
        setIsOnline(false);
    };
    useEffect(() => {
        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);
        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    });
    return isOnline;
};

export default useIsOnline;
