import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home } from './Components/Home'
import { NotFound } from './Components/NotFound'
import { Cart } from './Components/Cart'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component = {Home}/>
        <Route path="/cart" component={Cart}/>       
        <Route component={NotFound}/>        
      </Switch>
    </BrowserRouter>
  )
}

export default App
