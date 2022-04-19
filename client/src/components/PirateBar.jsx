import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function PirateBar(props) {

    let navigate = useNavigate()

    const view = function (){
        navigate('/pirate/'+props.pirate._id)
    }

    const remove = async function (){
        // props.removePirate(props.pirate._id)
        try{
            let response = await axios.delete('http://localhost:8000/api/pirate/'+props.pirate._id)
            alert('pirate was successfully deleted')
      
        }catch(e){
            alert(e.toString())
        }
    }

    return (
        <div className='pirate-bar'>
            <div className='pirate-image'>
                <img src={props.pirate.image}></img>
            </div>
            <div className='pirate-info'>
                <h2 className='pirate-name'>{props.pirate.name}</h2>
                <button className='view' onClick={view}>view pirate</button>
                <button className='delete' onClick={remove}>walk the Plank</button>
            </div>
        </div>
    )
}