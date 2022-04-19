import RegisterationForm from './RegisterationForm'
import LoginComponent from './LoginComponent'
import { useNavigate } from 'react-router-dom'

export default function LoginRegisterationForm(props){

    let navigate = useNavigate()
    const navigateToPiratesPage = () => {
        navigate('/pirates')
    }

    return(<div>
        <div className='Header'><h1>Welcome To Pirates Crew</h1></div>
        <div className='content register-content'>
        <RegisterationForm login={props.login} navigateToPiratesPage={navigateToPiratesPage}></RegisterationForm>
        <LoginComponent login={props.login} navigateToPiratesPage={navigateToPiratesPage}></LoginComponent>
        </div>
        </div>)
}