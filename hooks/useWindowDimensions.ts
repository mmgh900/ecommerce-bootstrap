import { useState, useEffect } from 'react';
/**
 * Defining an enum to be used as a type for breakpoints
 * For more info: https://getbootstrap.com/docs/5.1/layout/breakpoints/
 */
export enum BootstrapBreakpoints {
    xs = 0,
    sm = 576,
    md = 768,
    lg = 992,
    xl = 1200,
    xxl = 1400
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}