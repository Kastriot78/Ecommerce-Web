import { useEffect } from 'react';

interface Props {
    setOpen: (isOpen: boolean) => void;
}
const OutsideClick = (ref: any, setOpen: (isOpen: boolean) => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ref, setOpen]);
};

export default OutsideClick;