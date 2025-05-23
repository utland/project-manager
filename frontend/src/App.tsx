import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.scss'
import { useEffect, useState } from 'react'
import { setNavigate } from './utils/navigation'
import Project from './components/project/Project'
import Main from './components/layout/Main'
import Auth from './components/layout/Auth'
import Home from './components/main/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from './interfaces/reduxDefault'
import ModalContext, { IModal } from './context/ModalContext'
import { fetchUser } from './redux/slices/userSlice'

function App() {
  const [modal, setModal] = useState<IModal>(null);
  const dispatch = useDispatch<ThunkDispatch>();

  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    setNavigate(navigate);
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      dispatch(fetchUser());
    }
  }, [location.pathname]);

  return (
    <ModalContext.Provider value={{modal, setModal: (modal: IModal) => setModal(modal), closeModal: () => setModal(null)}}>
      <Routes>
        <Route index element={
          <Main>
            <Home />
          </Main>
        }/>
        <Route path='project/:id' element={
          <Main>
            <Project />
          </Main>
        }/>
  
        <Route path="/" element={<Auth />}>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
        </Route>
      </Routes>   
    </ModalContext.Provider>
  )
}

export default App
