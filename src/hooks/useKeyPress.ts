import {useEffect} from "react";


export default function useKeyPress(handler : (key?: any) => any, pressType : string = "keydown", el : any = document) {
    useEffect(() => {

        // Bind the event listener
        el.addEventListener(pressType, handler);
        return () => {
            // Unbind the event listener on clean up
            el.removeEventListener(pressType, handler);
        };
    }, [handler, pressType, el]);
}
