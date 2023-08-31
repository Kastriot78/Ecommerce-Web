import React, { useState, useEffect } from 'react';
import { resetValue } from '../redux/wishlistRedux';
import { useDispatch } from 'react-redux';

interface Props {
    show: boolean;
}

const ProductAdded: React.FC<Props> = ({ show }) => {
    const [isVisible, setIsVisible] = useState(show);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsVisible(show);
        if (show) {
            const timeout = setTimeout(() => {
                setIsVisible(false);
            }, 2000);
            return () => {
                clearTimeout(timeout);
                dispatch(resetValue()); //we need to reset show value when we change page because when we return on that page we should not see alert again.
            }
        }
    }, [show, dispatch]);

    return (
        <div className={`popup-message-wrap ${isVisible ? 'show' : ''}`}>
            <div className="popup-message">Product Added</div>
        </div>
    )
}

export default ProductAdded;
