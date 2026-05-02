import { useCallback, useEffect, useRef, useState } from 'react';

export const useModalShake = () => {
    const [isShaking, setIsShaking] = useState(false);
    const timeoutRef = useRef(null);
    const rafRef = useRef(null);

    const triggerShake = useCallback(() => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
        }

        if (rafRef.current) {
            window.cancelAnimationFrame(rafRef.current);
        }

        setIsShaking(false);

        rafRef.current = window.requestAnimationFrame(() => {
            setIsShaking(true);
            timeoutRef.current = window.setTimeout(() => {
                setIsShaking(false);
                timeoutRef.current = null;
            }, 360);
        });
    }, []);

    const handleOverlayClick = useCallback((callback) => {
        if (callback && typeof callback === 'function') {
            callback();
        } else {
            triggerShake();
        }
    }, [triggerShake]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }
            if (rafRef.current) {
                window.cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return { isShaking, handleOverlayClick, triggerShake };
};
