import { useParams } from "react-router";
import CrewPosition from '../enums/crewPosition'

export default function ViewPirate(props) {

    const { _id } = useParams();
    console.log("id: " + _id)

    let [pirate, ...others] = props.pirates.filter((p) => { return p._id == _id })
    console.log(pirate)

    let leg = pirate.leg ? "Yes" : "No"
    let eye = pirate.eye ? "Yes" : "No"
    let hook = pirate.hook ? "Yes" : "No"
    let position
    for(let key in CrewPosition){
        if (CrewPosition[key].num == pirate.crewPosition){
            position = CrewPosition[key].value
        }
    }

    return (
        <div>
            <div className='header'>
                <div className='headerTitle'><h1>{pirate.name}</h1></div>
                <div className='btnHeader'></div>
            </div>
            <div className='conetnt'>
                <div className='display-pirate'>
                    <div className='column-1'>
                        <div className='pirate-image'>
                            <img src={pirate.image}></img>
                        </div>
                        <div className='phrase'>{pirate.catchPhrase}</div>
                    </div>
                    <div className='column-2'>
                        <h2 className='about'>About</h2>
                        <div className='row'>
                            <label className='name'>Position</label>
                            <label className='value'>{position}</label>
                        </div>
                        <div className='row'>
                            <label className='name'>Treasure</label>
                            <label className='value'>{pirate.treasureChests}</label>
                        </div>
                        <div className='row'>
                            <label className='name'>Peg leg</label>
                            <label className='value'>{leg}</label>
                        </div>
                        <div className='row'>
                            <label className='name'>Eye patch</label>
                            <label className='value'>{eye}</label>
                        </div>
                        <div className='row'>
                            <label className='name'>Hook hand</label>
                            <label className='value'>{hook}</label>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}