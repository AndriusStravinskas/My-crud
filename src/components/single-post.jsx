import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import { red } from '@mui/material/colors';


const SinglePost = ({post}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.email.substring(0, 2).toUpperCase()}
          </Avatar>
        }
        title={post.title}
        subheader={`Price: ${post.price}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.image}
        alt={post.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {post.description}
        </Typography>
        <Typography sx={{ pr: 2, mt: 1, fontSize: 10, textAlign: 'end' }} color="text.secondary">
            {post.email}
          </Typography>
      </CardContent>
    </Card>
  )
}

export default SinglePost