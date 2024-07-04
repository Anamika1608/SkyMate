
import './App.css'
import Navbar from './components/Navbar/Navbar'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

function App() {
  return (
    <div>
      <Theme>
      <Navbar/>
      </Theme>
      
    </div>
  );
}

export default App
