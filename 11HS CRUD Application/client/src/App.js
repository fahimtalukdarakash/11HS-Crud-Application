import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
//import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Add_subject from './Components/Add_subject';
import Edit from './Components/Edit';
import Read from './Components/Read';
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Add_subject" element={<Add_subject/>} />
        <Route path="/Edit/:id" element={<Edit/>} />
        <Route path="/Read/:id" element={<Read/>} />
      </Routes>
    </>
   
  );
}

export default App;
