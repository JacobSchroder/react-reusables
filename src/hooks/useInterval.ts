import {useEffect, useRef } from 'react';

/**
 *  Trigger callback function in a loop with specified delay. Optionally specify repetitions.
 * @param {function} callback Function
 * @param {number} delay MS before calling callback function pr iteration
 * @param [reps] number of repetitions - negative numbers means infinite
 * @param {any} dependency props that should reset the timer on update
 */

export default function useInterval(callback : () => any, delay : number, reps : number = -1 , dependency : any = null): void {
    const savedCallback = useRef<()=>any>(() => {});
    const repeat = useRef(reps);

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (reps === 0) return;
        let id : any = null;
        function tick() {
            if (repeat.current === 0) {
                if (id !== null) clearInterval(id)
                return;
            }
            savedCallback.current();
            if (repeat.current > 0) repeat.current--;
        }
        id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay, reps, dependency]);
}
