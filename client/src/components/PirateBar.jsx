import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const Base_Url = 'http://localhost:3000'

export default function PirateBar(props) {

    let navigate = useNavigate()

    const view = function (){
        navigate('/pirate/'+props.pirate._id)
    }

    const remove = async function (){
        // props.removePirate(props.pirate._id)
        try{
            let response = await axios.delete(Base_Url+'/api/pirate/'+props.pirate._id, { withCredentials: true })
            alert('pirate was successfully deleted')
            props.omitPirateFromPiratesList(props.pirate._id)
      
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