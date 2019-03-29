import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signup from '../components/Signup.jsx'
import Signin from '../components/Signin.jsx'
import Home from '../components/Home'
import Messages from '../components/Messages.jsx'
import Chats from '../components/Chats.jsx'

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
        </Switch>
      </BrowserRouter>
    </div>
  )
}