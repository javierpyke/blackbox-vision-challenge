import '../../App.css';
import logo from '../../img/blackboxvision_logo.png';
import {Link} from 'react-router-dom'
import {Button} from "@chakra-ui/react"

function App() {
  return (
    <div className='App'>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Link to="/game">
        <Button colorScheme="teal" size="lg">JUEGO NUEVO</Button>
        </Link>
      </header>
    </div>
  );
}

export default App;