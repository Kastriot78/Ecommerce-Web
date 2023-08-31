import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// qe nese bojm scroll dhe e ndrrojm pagen, me u kthy prap n fillim t faqes by default, e thirrim tek App.tsx
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}