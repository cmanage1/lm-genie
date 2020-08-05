import React from 'react';
import './App.css';
import { 
  BrowserRouter as Router, 
  Route 
} from 'react-router-dom';
import Lsat from './components/Lsat/Lsat'
import Mcat from './components/Mcat/Mcat'
import Landing from './components/Landing/Landing'
import Privacy from './components/Privacy/Privacy'
import About from './components/About/About'
import Nav from './components/Nav'
import Footer from './components/Footer';
//import Footer from './components/Footer'

 const App = () => (
  <Router>
    <Nav />
    <div>   
         <Route exact path="/"  component={Landing} />
         <Route path="/lsat" component={Lsat} />
         <Route path="/mcat" component={Mcat} />
         <Route path="/about" component={About} />
         <Route path="/privacy" component={Privacy} />
     </div>
     <Footer/>
   </Router>
)



export default App;
