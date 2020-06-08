import {useEffect} from "react";


export default function useKeyPress(handler : (key?: any) => any, keys:string | string[]  = ["Escape"], pressType : string = "keydown") {
    useEffect(() => {
        if (!!keys && !Array.isArray(keys)) keys = [keys];

        const handleKeyPress = (keyEvent : any) : boolean => {
            if (!keys) return false;
            if(keys.includes(keyEvent.key)){
                handler(keyEvent.key);
                return true;
            }
            return false;
        }

        // Bind the event listener
        document.addEventListener(pressType, handleKeyPress);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener(pressType, handleKeyPress);
        };
    }, [keys, handler, pressType]);
}
