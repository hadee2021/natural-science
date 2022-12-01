import React from 'react'
import WorkBookForm from '../components/form/WorkBookForm'
import { Navigate, useParams } from 'react-router-dom'
import { useUser } from '../core/query'

const PrivateWorkBook = () => {
  const { id: userId = '' } = useParams()
  const { user } = useUser(userId)

  return (
    user?.author === true ? <WorkBookForm/> : <Navigate to="/"/>
  )
}

export default PrivateWorkBook