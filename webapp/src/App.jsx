import './App.css';
import User from './containers/User/User'
import UserPage from './containers/UserPage/UserPage'
import { BrowserRouter as Router, Route } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
            <Route path="/" exact component={User}/>
            <Route path="/:id" component={UserPage}/>
        </Router>

      </header>
    </div>
  );
}

export default App;
