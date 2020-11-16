import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Game from './Game/Game'
import Home from './Home/Home'
import './App.scss'

import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import Header from './Header/Header'
Amplify.configure(awsconfig)

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
        <Route exact path="/game/:id">
          <Header />
          <Game />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
