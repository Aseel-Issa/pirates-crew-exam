import PirateBar from './PirateBar'
import {useNavigate} from 'react-router-dom'

export default function HomePage(props) {

    // let data = JSON.stringify(props.user)

    let navigate = useNavigate()
    const removePirate = (id) => {
        props.removePirateById(id)
    }

    const createPirate = () => {
        navigate('/pirate/new')
    }
    return (<div>
        <div className='header'>
            <div className='headerTitle'><h1>Pirate Crew</h1></div>
            <div className='btnHeader'><button className='headerBtn' onClick={createPirate}>add pirate</button></div>
        </div>
        <div className='conetnt all-pirates-view'>
            {props.pirates.map(p => { return <PirateBar key={p._id} pirate={p} removePirate={removePirate}></PirateBar>})}
        </div>

    </div>)
}