import { Container, Typography } from '@mui/material'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login'
import PostsPage from './components/posts-page'
import Register from './components/register'

function App() {
  const [loginUser, setLoginUser] = useState('Offline')

  return (
    <BrowserRouter>
    <Typography textAlign='center'>User Logged in: {loginUser}</Typography>
      <Container maxWidth="sm">
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Login setLoginUser={setLoginUser} />} />
          <Route path='/userPost' element={<PostsPage setLoginUser={setLoginUser} />} />
        </Routes>
      </Container>

    </BrowserRouter>
  )
}

export default App
