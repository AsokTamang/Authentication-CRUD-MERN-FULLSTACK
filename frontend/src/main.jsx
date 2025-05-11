import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router'
import Create from './operations/create.jsx'
import Delete from './operations/delete.jsx'
import Get from './operations/get.jsx'
import Update from './operations/update.jsx'
import Home from './Dashboard/crud.jsx'
import Signin from './Authentication/signin.jsx'
import Signup from './Authentication/signup.jsx'
import { ErrorBoundary } from '../components/errorboundary.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
    <BrowserRouter>
    <ErrorBoundary>
    <Routes>
    <Route path='/' element={<Signin/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/home' element={<Home/>}/>
      <Route path='/create' element={<Create/>}/>
    <Route path='/get' element={<Get/>}/>
    <Route path='/delete' element={<Delete/>}/>
     <Route path='/update' element={<Update/>}/>

    </Routes>
    </ErrorBoundary>
    </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
)
