
import './App.css'
import Navbar from './components/Navbar/Navbar'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import HomePage from "./pages/HomePage/HomePage"
import Footer from "./components/Footer/Footer"

function App() {
  return (
    <div > 
      <Navbar/>
      <HomePage/>
      <Footer/>     
    </div>
  );
}

export default App
