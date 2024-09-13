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
import { GoogleOAuthProvider } from '@react-oauth/google';
import useAuth from './context/AuthContext.jsx';

import HomePage from './pages/HomePage/HomePage.jsx';
import WeatherPage from './pages/WeatherPage/WeatherPage.jsx';
import { WeatherGen } from './components/Weather/Weather.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/login/login.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import { PrivateRoute } from './PrivateRoute.jsx';
import UploadForm from './components/Upload/UploadForm.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import PostDetail from './components/Post/PostDetail.jsx';
const GoogleAuthWrapper = () => {
  return (
    <GoogleOAuthProvider clientId="1084852529883-rid09673rjsvcq40gbrl472rsbjs7s0p.apps.googleusercontent.com">
      <Login />
    </GoogleOAuthProvider>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<HomePage />} />
      <Route path='login' element={<GoogleAuthWrapper />} />
      <Route path='register' element={<Register />} />
      <Route path='weather-gallery' element={
        <PrivateRoute>
          <Gallery />
        </PrivateRoute>
      } />
      <Route path='post/:id' element={<PostDetail />} />
      <Route path='upload' element={<UploadForm />} />
      <Route path='profile' element={<Dashboard />} />

      <Route />
      {/* <Route loader={WeatherGen}  path='weather' element={<WeatherPage/>} /> */}
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
