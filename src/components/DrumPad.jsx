import { useRef,useEffect,useState } from "react"


export default function DrumPad({audio,char, action,clipName ,disableStatus}){
    const audioRef = useRef()
    const buttonRef = useRef()
    const [isPressed,setIsPressed]=useState(false)

    let btnClass;
     
    disableStatus? btnClass ="": btnClass = "pressed" 


    useEffect(()=>{
        const keyPress =(event)=>{
            if(event.key.toUpperCase() === char){
                setIsPressed(true);
                audioRef.current.currentTime = 0;
                buttonRef.current.click();
            }
        };
        const keyUp = (event) => {
            if (event.key.toUpperCase() === char) {
              setIsPressed(false);
            }
          };
        window.addEventListener("keydown", keyPress);
        window.addEventListener("keyup",keyUp)
        return ()=>{
            window.removeEventListener("keydown",keyPress);
            window.removeEventListener("keyup", keyUp);
        }
    },[char,action])


    return <>
        <div className="drum-pad" id={clipName}>
            <audio ref={audioRef} src={audio} id={char} className="clip"></audio>
            <button ref={buttonRef}  className={isPressed ? btnClass : ""} onClick={()=>action(audioRef,clipName)} disabled={disableStatus} >{char}</button>
        </div>
    </>
}