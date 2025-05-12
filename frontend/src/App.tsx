import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.scss'
import { useEffect, useState } from 'react'
import IUser from './interfaces/user.model.i'
import client from './api/client'
import { setNavigate } from './utils/navigation'
import IError from './interfaces/error.i'
import Project from './components/project/Project'
import IProject from './interfaces/project.model.i'
import Main from './components/layout/Main'
import Auth from './components/layout/Auth'
import Home from './components/main/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

const nullUser: IUser = {
  id: '',
  login: '',
  password: '',
  name: '',
  email: '',
  info: '',
  projects: [],
  photoUrl: ''
}

function App() {
  const [user, setUser] = useState<IUser>(nullUser);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setNavigate(navigate);
    if (location.pathname === "/" || location.pathname.split("/")[1] === "project") {
      const init = async () => {
        client.get("/user")
          .then(res => {
            setUser(res.data);
          })
          .catch((error: IError) => {
            console.log(error);
          })
      }
  
      init();
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Main user={user}/>}>
        <Route index 
          element={<Home 
          user={user} 
          addProject={(project: IProject) => setUser(prev => ({
            ...prev,
            projects: [...prev.projects, project]
          }))}
        />}/>
        <Route path='project/:id' element={<Project user={user}/>}/>
      </Route>

      <Route path="/" element={<Auth />}>
        <Route path='login' element={<Login setUser={setUser}/>}/>
        <Route path='register' element={<Register/>}/>
      </Route>
    </Routes>
  )
}

export default App
