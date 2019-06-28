import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signup from '../components/Signup'
import Signin from '../components/Signin'
import Home from '../components/Home'
import Messages from '../components/Messages'
import Chats from '../components/Chats'
import Dashboard from '../components/Dashboard'
import Profile from '../components/profile'
import ChatBox from '../components/ChatBox'

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