import {useEffect, useRef } from 'react';

/**
 *  Trigger callback function after delay. Optionally reset delay on dependency update
 * @param {function} callback Function to call after delay/timeout
 * @param {number} delay MS before calling callback function
 * @param {any} dependency props that should reset the delay/timeout on update (using clearTimeout and setTimeout)
 */

export default function useTimeout(callback : () => any, delay : number, dependency : any = null): void {
    const savedCallback = useRef<()=>any>(() => {});

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setTimeout(tick, delay);
            return () => clearTimeout(id);
        }
    }, [delay, dependency]);
}
