import React from 'react'
import QuestionForm from '../components/MainPage/QuestionForm'
import { Navigate } from 'react-router-dom'

const PrivateRoute = () => {
  return (
    true ? <QuestionForm/> : <Navigate to="/"/>
  )
}

export default PrivateRoute