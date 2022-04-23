import logo from './logo.svg';
import './App.css';
import { Component } from 'react'
import LoginRegisterationForm from './components/LoginRegiterationForm'
import HomePage from './components/HomePage'
import { BrowserRouter as Router, Route, Link as RouterLink, HashRouter, Routes } from 'react-router-dom'
import axios from 'axios';
import ViewPirate from './components/ViewPirate'
import CreatePirate from './components/CreatePirate'
import Pirate from './classes/Pirate';
const Base_Url = 'http://localhost:3000'

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: {},
      isLoggedIn: false,
      pirates: []
    }

  }

  login = async (user) => {
    let results = await axios.get(Base_Url+'/api/pirates', { withCredentials: true })
    let newList = results.data.map(p => {return new Pirate(p._id, p.name, p.catchPhrase,p.crewPosition, p.eye, p.hook, p.leg, p.image, p.treasureChests)})
    this.setState({
      loggedInUser: user,
      isLoggedIn: true,
      pirates: newList
    }, () => {
      console.log(this.state)
    })

  }

  async componentDidMount() {
    // await this.forTesting()
  }

  // forTesting = async () => {
  //   let results = await axios.get('http://localhost:8000/api/pirates', { withCredentials: true })
  //   this.setState({
  //     pirates: results.data
  //   }, () => {
  //     console.log(this.state)
  //   })
  // }

  logout = async () => {
    // clear cookies from server side
    let result = await axios.get(Base_Url+'/api/logout')
    // logout client side
    if (result.status == 200) {
      this.setState({
        loggedInUser: {},
        isLoggedIn: false
      })
    }
  }

  async componentWillUnmount() {
    if (this.state.isLoggedIn) {
      this.logout()
    }
  }

  addPirateToPiratesList = (pirate) => {
    let newList = [...this.state.pirates]
    newList.push(pirate)
    // console.log('before sorting and after adding new item: ')
    // newList.forEach(e => {console.log(e.name)})
    // console.log(newList.toString())
    newList.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    // console.log('after sorting:')
    // newList.forEach(e => {console.log(e.name)})
    this.setState({pirates: newList})
  }

  omitPirateFromPiratesList = (_id) => {
    let newList = [...this.state.pirates]
    let index = newList.findIndex((p) => {return p._id == _id})
    newList.splice(index, 1)
    this.setState({pirates: newList})
  }
  

  render() {

    let page
    if (!this.state.isLoggedIn) {
      page = (<Router>
        {/* <LoginRegisterationForm login={this.login}></LoginRegisterationForm> */}
        <Routes>
          <Route path="/" exact element={<LoginRegisterationForm login={this.login} />} />
        </Routes>
      </Router>)
    } else {
      page = (<Router>
        {/* <LoginRegisterationForm login={this.login}></LoginRegisterationForm> */}
        <Routes>
          {/* <Route path="/pirates" exact element={<HomePage pirates={this.state.pirates}></HomePage>} />
          <Route path="/pirate/:_id" exact element={<ViewPirate pirates={this.state.pirates}></ViewPirate>} /> */}
          <Route path="/" exact element={<HomePage pirates={this.state.pirates} omitPirateFromPiratesList={this.omitPirateFromPiratesList}></HomePage>} />
          <Route path="/pirates" exact element={<HomePage pirates={this.state.pirates} omitPirateFromPiratesList={this.omitPirateFromPiratesList}></HomePage>} />
          <Route path="/pirate/new" exact element={<CreatePirate addPirateToPiratesList={this.addPirateToPiratesList}></CreatePirate>} />
          <Route path="/pirate/:_id" exact element={<ViewPirate pirates={this.state.pirates}></ViewPirate>} />
        </Routes>
      </Router>)
    }

    return (
      <div className='container'>
        {page}
      </div>)
  }
}

export default App;
