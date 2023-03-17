import { Box, Button, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import FormToCreatePost from './form'
import SinglePost from './single-post'

const PostsPage = ({setLoginUser}) => {
  const nav = useNavigate()
  const [getPosts, setPosts] = React.useState([])

  const addPost = async (post) => {
    const userSecret = localStorage.getItem('userSecret')

    if (userSecret) {
      post.secret = userSecret
      await axios.post('http://localhost:3600/userPost', post)
        .then((res) => {
          console.log('addPost', [...getPosts ,res.data.userCreateNewPost])
          setPosts([...getPosts, res.data.userCreateNewPost])
        }).catch((err) => {
          console.log(err.message)
        })
    } else {
      nav('/')
      setLoginUser('You have to login first')
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3600/allPosts');
      setPosts(res.data.getAllPosts)
      console.log('useEffect', res.data.getAllPosts)
      
    }
    fetchData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userSecret');
    nav('/')
    setLoginUser('Oflline')
  }

  return (
    <Box sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
      height: '300vh'
    }}>
      <Button onClick={handleLogout}>LogOut</Button>

      <FormToCreatePost create={addPost} />
      {getPosts.map((post) => (<SinglePost key={post.postId} post={post} />))}



    </Box>
  )
}

export default PostsPage