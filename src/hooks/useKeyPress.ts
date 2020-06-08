import {useEffect} from "react";

/**
 * Listen for KeyBoard events with handler function
 * @param handler function to call onKeyPress
 * @param pressType "keydown" | "keyup"
 * @param [el] HTML element on which to bind event listener
 */
export default function useKeyPress(handler : (key?: any) => any, pressType : "keydown" | "keyup" = "keydown", el : any = document) {
    useEffect(() => {

        // Bind the event listener
        el.addEventListener(pressType, handler);
        return () => {
            // Unbind the event listener on clean up
            el.removeEventListener(pressType, handler);
        };
    }, [handler, pressType, el]);
}
