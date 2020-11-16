import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Game from './Game/Game'
import Home from './Home/Home'
import './App.scss'

import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/game/:id">
          <Game />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
