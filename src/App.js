import React, { Suspense, useEffect } from 'react'
import { HashRouter, BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode, colorMode } = useColorModes(
    'coreui-free-react-admin-template-theme',
  )
  const storedTheme = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('callOnTimeInterval', true)
    localStorage.setItem('baccaratCallOnTimeInterval', true)
    localStorage.setItem('andarBaharCallOnTimeInterval', true)
    localStorage.setItem('currentShoe', "")
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = localStorage.getItem('coreui-free-react-admin-template-theme')
    if (theme) {
      setColorMode(theme)
      dispatch({ type: 'set', theme })
    } else if (isColorModeSet()) {
      dispatch({ type: 'set', theme: colorMode })
    } else {
      setColorMode(storedTheme)
      dispatch({ type: 'set', theme: storedTheme })
    }
  }, [colorMode, dispatch, isColorModeSet, setColorMode, storedTheme])

  // 👇 Use HashRouter in production, BrowserRouter in development
  const Router = process.env.NODE_ENV === 'development' ? BrowserRouter : HashRouter

  return (
    <Router>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
