import DrumPad from "./DrumPad"
import { useEffect, useState } from "react"



export default function DrumMachine(){
    const[nameField,setNameField] = useState('')
    const[powerBtn,setPowerBtn] = useState({
        disable:false,
        pressed:false
    })

    const[volume,setVolume] = useState(0.5)


    function handlePowerButton(){
        setPowerBtn(prevState =>({
            disable: !prevState.disable,
            pressed: !prevState.pressed
        }))
    }


    function handlePlayAudio(reff,nam){
        reff.current.play()
        setNameField(nam)
    }

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
        setNameField(Math.round(e.target.value * 100))
    };

    useEffect(()=>{
        const audios = document.querySelectorAll("audio")
        audios.forEach((audio)=>{
            audio.volume = volume
        })
    },[volume])




    return <div id="drum-machine">
            <div id="display">
                <DrumPad disableStatus={powerBtn.disable}  action={handlePlayAudio} char={"Q"}  clipName={"Heater 1"} audio={"public/Heater-1.mp3"}/>
                <DrumPad disableStatus={powerBtn.disable} action={handlePlayAudio} char={"W"} clipName={"Heater 2"} audio={"public/Heater-2.mp3"}/>
                <DrumPad disableStatus={powerBtn.disable} action={handlePlayAudio} char={"E"} clipName={"Heater 3"} audio={"public/Heater-3.mp3"}/>
                <DrumPad disableStatus={powerBtn.disable} action={handlePlayAudio} char={"A"} clipName={"Heater 4"} audio={"public/Heater-4.mp3"}/>
                <DrumPad disableStatus={powerBtn.disable} action={handlePlayAudio} char={"S"} clipName={"Clap"} audio={"public/Clap.mp3"}/>
                <DrumPad disableStatus={powerBtn.disable} action={handlePlayAudio} char={"D"} clipName={"Open HH"} audio={"public/Open-HH.mp3"}/>
                <DrumPad disableStatus={powerBtn.disable} action={handlePlayAudio} char={"Z"} clipName={"Kick n'Hat"} audio={"public/Kick_n_Hat.mp3"}/>
                <DrumPad disableStatus={powerBtn.disable} action={handlePlayAudio} char={"X"} clipName={"Kick"} audio={"public/Kick.mp3"}/>
                <DrumPad disableStatus={powerBtn.disable} action={handlePlayAudio} char={"C"} clipName={"Closed HH"} audio={"public/Closed-HH.mp3"}/>
            </div>
            <div id="left-display">
            <h4>Power</h4>
            <div className="power-btn">
                <div onClick={handlePowerButton} className={powerBtn.pressed ? 'move':'' }></div>
                </div>
                <div id="name-field">
                    <h1>{nameField}</h1>
                </div>
                <div className="range-wrap">
                    <input disabled={powerBtn.disable} className="slider" type="range" min="0" max="1" step="0.01" onChange={handleVolumeChange} name="range-inp"/>
                    <div className="color"></div>
                </div>
            </div>
        </div>
}