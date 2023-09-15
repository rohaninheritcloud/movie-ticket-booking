import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Protected from './components/Protected';
import Screen1 from './components/Screen1/Screen1';
import Screen2 from './components/Screen2/Screen2';
import Book1 from './components/BookScreen1/Book1';
import Book2 from './components/BookScreen2/Book2';
import Register from './components/Register/Register';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Protected Component={Home} />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/screen1" element={<Protected Component={Screen1}/>}/>
        <Route path="/screen2" element={<Protected Component={Screen2}/>}/>
        <Route path="/screen1/book" element={<Protected Component={Book1}/>}/>
        <Route path="/screen2/book" element={<Protected Component={Book2}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
