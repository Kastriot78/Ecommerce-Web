import React, { useState, useEffect } from "react";

const ScrollTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    return (
        <div className="top-to-btm">
            {showTopBtn && (
                <div className="icon-position icon-style" onClick={goToTop}>
                    <i
                        className="fa-solid fa-angle-up"
                    />
                </div>
            )}
        </div>
    );
};
export default ScrollTop;