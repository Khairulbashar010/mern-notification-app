import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import User from './containers/User/User';
import UserPage from './containers/UserPage/UserPage';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
			<Switch>
				<Route path="/" exact component={User}/>
				<Route path="/:id" component={UserPage}/>
            </Switch>
        </Router>

      </header>
    </div>
  );
}

export default App;
