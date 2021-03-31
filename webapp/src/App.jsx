import './App.css';
import User from './containers/User/User'
import UserPage from './containers/UserPage/UserPage'
import MessagePage from './containers/MessagePage/MessagePage'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
            <Route path="/" exact component={User}/>
            <Switch>
              <Route path="/message" component={MessagePage}/>
              <Route path="/:name" component={UserPage}/>
            </Switch>
        </Router>

      </header>
    </div>
  );
}

export default App;
