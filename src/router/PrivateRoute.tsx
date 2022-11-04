import React from 'react'
import QuestionForm from '../components/MainPage/QuestionForm'
import { Navigate, useParams } from 'react-router-dom'
import { useUser } from '../core/query'

const PrivateRoute = () => {
  const { id: userId = '' } = useParams()
  const { user } = useUser(userId)

  return (
    user?.author === true ? <QuestionForm/> : <Navigate to="/"/>
  )
}

export default PrivateRoute