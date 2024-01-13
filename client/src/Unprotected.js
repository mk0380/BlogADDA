import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Unprotected = (props) => {

    const {Component} =props
  
    const navigate = useNavigate();

    useEffect(()=>{
        const user = localStorage.getItem('user')
        if(user){
             navigate('/')
        }
    })

  return (
    <>
      <Component/>
    </>
  )
}

export default Unprotected
