import React from "react";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TodoForm from './components/TodoForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/form/:todoid' element={< TodoForm />}></Route>
      </Routes>
    </Router>   
  );
}

export default App;
