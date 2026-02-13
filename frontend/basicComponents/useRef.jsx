import { useEffect ,useRef } from "react";

export default function userefExample(){
    const inputRef = useRef(null);  
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    return (
        <div>
            <input ref={inputRef} type="text" placeholder="Focus me on load" />
        </div>
    );
};
