import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import HomePage from './pages/HomePage/HomePage.jsx';
import WeatherPage from './pages/WeatherPage/WeatherPage.jsx';
import { WeatherGen } from './components/Weather/Weather.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/login/login.jsx';
import Gallery from './components/Gallery/Gallery.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<HomePage/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='weather-gallery' element={<Gallery/>}/>
      <Route loader={WeatherGen}  path='weather' element={<WeatherPage/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
