import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signup from '../components/Signup.jsx'
import Signin from '../components/Signin.jsx'
import Home from '../components/Home.jsx'
import Messages from '../components/Messages.jsx'
import Chats from '../components/Chats.jsx'
import Dashboard from '../components/Dashboard.jsx'
import Profile from '../components/profile.jsx'
import ChatBox from '../components/ChatBox.jsx'

export default () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/signup' exact component={Signup}/>
          <Route path='/signin' exact component={Signin}/>
          <Route path='/messages' exact component={Messages}/>
          <Route path='/chats' exact component={Chats} />
          <Route path='/dashboard' exact component={Dashboard} />
          <Route path='/profile' exact component={Profile} />
          {/* <Route path='/active/:id' component={ChatBox} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  )
}