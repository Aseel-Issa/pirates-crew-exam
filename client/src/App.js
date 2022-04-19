import logo from './logo.svg';
import './App.css';
import { Component } from 'react'
import LoginRegisterationForm from './components/LoginRegiterationForm'
import HomePage from './components/HomePage'
import { BrowserRouter as Router, Route, Link as RouterLink, HashRouter, Routes } from 'react-router-dom'
import axios from 'axios';
import ViewPirate from './components/ViewPirate'
import CreatePirate from './components/CreatePirate'

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
    let results = await axios.get('http://localhost:8000/api/pirates', { withCredentials: true })
    this.setState({
      loggedInUser: user,
      isLoggedIn: true,
      pirates: results.data
    }, () => {
      console.log(this.state)
    })

  }

  async componentDidMount() {
    await this.forTesting()
  }

  forTesting = async () => {
    let results = await axios.get('http://localhost:8000/api/pirates', { withCredentials: true })
    this.setState({
      pirates: results.data
    }, () => {
      console.log(this.state)
    })
  }

  logout = async () => {
    // clear cookies from server side
    let result = await axios.get('/api/logout')
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

  async removePirateById(id) {
    try {
      let response = await axios.delete('http://localhost:8000/api/pirate/' + id)
      alert('pirate was successfully deleted')

    } catch (e) {
      alert(e.toString())
    }
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
          <Route path="/" exact element={<HomePage pirates={this.state.pirates}></HomePage>} />
          <Route path="/pirates" exact element={<HomePage pirates={this.state.pirates}></HomePage>} />
          <Route path="/pirate/new" exact element={<CreatePirate></CreatePirate>} />
          <Route path="/pirate/:_id" exact element={<ViewPirate pirates={this.state.pirates}></ViewPirate>} />
        </Routes>
      </Router>)
    }
    // to be deleted
    // page=(<Router>
    //   {/* <LoginRegisterationForm login={this.login}></LoginRegisterationForm> */}
    //   <Routes>
    //     <Route path="/" exact element={<HomePage pirates={this.state.pirates}></HomePage>} />
    //     <Route path="/pirates" exact element={<HomePage pirates={this.state.pirates}></HomePage>} />
    //     <Route path="/pirate/new" exact element={<CreatePirate></CreatePirate>} />
    //     <Route path="/pirate/:_id" exact element={<ViewPirate pirates={this.state.pirates}></ViewPirate>} />
    //   </Routes>
    // </Router>)

    return (
      <div className='container'>
        {page}
      </div>)
  }
}

export default App;
