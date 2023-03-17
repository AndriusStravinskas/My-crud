import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './form.css'

const FormToCreatePost = ({ create }) => {

  const titleInput = React.useRef()
  const imageInput = React.useRef()
  const descriptionInput = React.useRef()
  const priceInput = React.useRef()

  const handleClick = async (event) => {
    event.preventDefault();

    const userForm = {
      title: await titleInput.current.value,
      image: await imageInput.current.value,
      description: await descriptionInput.current.value,
      price: await priceInput.current.value,
    }

    create(userForm);

  }

  return (
    <form className='form-card '>
      <input type="text" placeholder='title' ref={titleInput} />
      <input type="text" placeholder='image' ref={imageInput} />
      <input type="text" placeholder='description' ref={descriptionInput} />
      <input type="number" placeholder='price' ref={priceInput} />
      <button type='submit' onClick={handleClick} className="btn-from">Add product</button>
    </form>
  )
}

export default FormToCreatePost