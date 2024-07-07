
import './App.css'
import Navbar from './components/Navbar/Navbar'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import HomePage from "./pages/HomePage/HomePage"

function App() {
  return (
    <div > 
      <Theme>
      <Navbar/>
      <HomePage/>
      </Theme>
      
    </div>
  );
}

export default App
