import {useEffect} from "react";

/**
 * Trigger handler function when user clicks outside Ref(s)
 * @param refs React Ref or array of React Refs. Clicking outside this/theese refs triggers the ClickOutside handler.
 * @param handler function to call when clicking outside Ref(s)
 * @param clickType "mousedown" or "mouseup"
 */
export default function useClickAway(refs : any, handler : () => any, clickType : "mousedown" | "mouseup" = "mousedown") : void{
    useEffect(() => {

        if (!!refs && !Array.isArray(refs)) refs = [refs];

        function handleClickOutside(event : MouseEvent) {
            if (!refs) {
                handler();
                return true;
            }
            for (let i = 0; i < refs.length; i++){
                if (!refs[i].current || refs[i].current.contains(event.target)) {
                    return false;
                }
            }
            handler();
            return true;
        }

        document.addEventListener(clickType, handleClickOutside);
        return () => {
            document.removeEventListener(clickType, handleClickOutside);
        };
    }, [refs, handler, clickType]);
}
