import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route exact path='/' element={< Login />}></Route>
      <Route exact path='/dashboard' element={< Dashboard />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
