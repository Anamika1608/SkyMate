import './App.css'
import Navbar from './components/Navbar/Navbar'
import '@radix-ui/themes/styles.css';
import Footer from "./components/Footer/Footer"
import { Outlet } from "react-router-dom"
// import { ThemeProvider } from './context/theme';
import { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {

  const [themeMode, setThemeMode] = useState("light");

  const darkTheme = () => {
    setThemeMode("dark");
  }
  const lightTheme = () => {
    setThemeMode("light");
  }

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark");
    document.querySelector('html').classList.add(themeMode);
  }, [themeMode])

  return (
    <GoogleOAuthProvider clientId='1084852529883-rid09673rjsvcq40gbrl472rsbjs7s0p.apps.googleusercontent.com'>
      <AuthProvider>
        <div >
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </AuthProvider>
    </GoogleOAuthProvider>


    // <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>

    // </ThemeProvider>

  );
}

export default App
