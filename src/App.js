import './App.css';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import ChatInterface from './Components/ChatInterface';
import {BrowserRouter ,Routes ,Route} from 'react-router-dom';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='/chatInterface' element={<ChatInterface/>}/>
    </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
