import './App.css';
import Login from "./components/Login"
import Home from "./components/Home"
import Header from "./components/Header"
import { BrowserRouter,Routes,Route} from "react-router-dom";
import {useEffect} from "react"
import  {getUserAuth} from "./actions";
import { connect } from 'react-redux';

function App(props) {
  useEffect(()=>{
    props.getUserAuth();
  },[])
  return (
     <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Login/>} 
        />
        <Route 
          path="/home" 
          element={<><Header/><Home/></>} 
        />
      </Routes>
     </BrowserRouter>
  );
}
const mapStateToProps=(state)=>{
  return {};
}
const mapDispatchToProps=(dispatch)=>{
  return {getUserAuth:()=>dispatch(getUserAuth())};
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
