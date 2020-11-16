import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Game from './Game/Game'

import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Link to="/game/54123bad-61b4-4336-9ac9-d868e6947f2c">
            <button>join game</button>
          </Link>
          <Link to="/game/1">
            <button>create game</button>
          </Link>
        </Route>
        <Route exact path="/game/:id">
          <Game />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
