import './App.css';
import {Route} from 'react-router-dom';
import NewGame from './Components/NewGame';
import Main from './Components/Main'



function App() {
  return (
    <>
      <Route exact path="/"><Main /></Route>
      <Route exact path="/game"><NewGame /></Route>
    </>
  );
}

export default App;
