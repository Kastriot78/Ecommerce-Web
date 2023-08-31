import { useEffect, useState } from 'react';

export const LoaderHook = () => {
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoadingPage(false);
        }, 1100);
    }, []);

    return loadingPage;
}