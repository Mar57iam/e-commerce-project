import React from 'react'
import style from './ProtectedRoute'
import { Navigate } from 'react-router-dom'



export default function ProtectedRoute(props) {

  if(localStorage.getItem('userToken')){
          return props.children
  } else {
          return <Navigate to={'/login'} />
  }
  return (
    <>
      <h1>ProtectedRoute</h1>
    </>
  )
}
