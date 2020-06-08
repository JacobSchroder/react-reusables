import {useEffect} from "react";

export default function useClickAway(refs, handler, clickType = "mousedown") {
    useEffect(() => {

        if (!!refs && !Array.isArray(refs)) refs = [refs];

        function handleClickOutside(event) {
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

        // Bind the event listener
        document.addEventListener(clickType, handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener(clickType, handleClickOutside);
        };
    }, [refs, handler, clickType]);
}
