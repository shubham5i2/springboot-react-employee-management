import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import AddEmployeeComponent from './components//AddEmployeeComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <Routes>
          <Route exact path='/' element={<ListEmployeeComponent />}></Route>
          <Route exact path='/add-employee' element={<AddEmployeeComponent />} ></Route>
          <Route path='/edit-employee/:id' element={<AddEmployeeComponent />}></Route>
        </Routes>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
