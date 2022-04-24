import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import CrewPosition from '../enums/crewPosition'
import axios from 'axios'
import Pirate from '../classes/Pirate'
const Base_Url = 'http://localhost:3000'

export default function CreatePirate(props) {

    let [name, setName] = useState('')
    let [image, setImage] = useState('')
    let [treasure, setTreasure] = useState('')
    let [phrase, setPhrase] = useState('')
    let [position, setPosition] = useState(1)
    let [leg, setLeg] = useState(true)
    let [eye, setEye] = useState(true)
    let [hook, setHook] = useState(true)

    const handleInput = (e) => {
        switch(e.target.id){
            case "name": setName(e.target.value) ;
            break;
            case "image": setImage(e.target.value)
            break;
            case "treasure": setTreasure(e.target.value)
            break;
            case "phrase": setPhrase(e.target.value) ;
            break;
        }
    }

    const handleCheckbox = (e) =>{
        // console.log(e.target.id)
        switch(e.target.id){
            case "eye": setEye(!eye) ;
            break;
            case "leg": setLeg(!leg)
            break;
            case "hook": setHook(!hook)
            break;
        }
    }

    const handleListOnChange = (e) => {
        setPosition(e.target.value)
    }


    let navigate = useNavigate()
    const goHome = () => {
        navigate('/pirates')
    }
    const createPirate = async () => {
        if(name == '' || image == '' || treasure == '' || name == '' || phrase == '' ){
            alert('All fields are required, please check again')
            return
        }
        let pirate = {
            name: name,
            image: image,
            treasureChests: treasure,
            catchPhrase: phrase,
            crewPosition: position,
            leg: leg,
            eye: eye,
            hook: hook
        }
        // console.log(pirate)

        let pirate2
        try{
            let response = await axios.post(Base_Url+'/api/pirate/new', pirate, { withCredentials: true })
            alert('pirate was successfully saved')
            // console.log(response)
            let p= response.data
            pirate2 = new Pirate(p._id, p.name, p.catchPhrase,p.crewPosition, p.eye, p.hook, p.leg, p.image, p.treasureChests)
            // props.addPirateToPiratesList(pirate)

        }catch(e){
            alert(e.toString())
        }
        props.addPirateToPiratesList(pirate2)
    }
    let options = []
    for (let key in CrewPosition) {
        // console.log([key].num)
        // console.log([key].value)
        options.push(<option value={CrewPosition[key].num} key={CrewPosition[key].num}>{CrewPosition[key].value}</option>)
    }
    return (<div>
        <div className='header'>
            <div className='headerTitle'><h1>Pirate Crew</h1></div>
            <div className='btnHeader'><button className='headerBtn' onClick={goHome}>Crew board</button></div>
        </div>
        <div className='conetnt create-content'>
            <div className='column-1'>
                <div className='create-input'>
                    <label>Pirate name</label>
                    <input id='name' value={name} onChange={handleInput}></input>
                </div>
                <div className='create-input'>
                    <label>Image url</label>
                    <input id='image' value={image} onChange={handleInput}></input>
                </div>
                <div className='create-input'>
                    <label># of treasure chests</label>
                    <input type='number' id='treasure' value={treasure} onChange={handleInput}></input>
                </div>
                <div className='create-input'>
                    <label>Pirate catch phrase</label>
                    <input id='phrase' value={phrase} onChange={handleInput}></input>
                </div>

            </div>
            <div className='column-2'>
                <div className='create-input'>
                    <label>Crew position</label>
                    <select name="selectList" id="position" onChange={handleListOnChange} value={position}>
                        {options}
                    </select>
                </div>
                <div>
                    <input type='checkbox'  checked={leg} onChange={handleCheckbox} id='leg'></input>
                    <label>Peg leg</label>
                </div>
                <div>
                    <input type='checkbox'  checked={eye} onChange={handleCheckbox} id='eye'></input>
                    <label>Eye patch</label>
                </div>
                <div>
                    <input type='checkbox' checked={hook} onChange={handleCheckbox} id='hook'></input>
                    <label>Hook hand</label>
                </div>

                <button onClick={createPirate}>add pirate</button>
            </div>
        </div>

    </div>)
}