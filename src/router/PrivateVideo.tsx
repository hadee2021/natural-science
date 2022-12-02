import React from 'react'
import VideoForm from '../components/form/VideoForm'
import { Navigate, useParams } from 'react-router-dom'
import { useUser } from '../core/query'

const PrivateVideo = () => {
  const { id: userId = '' } = useParams()
  const { user } = useUser(userId)

  return (
    user?.author === true ? <VideoForm/> : <Navigate to="/"/>
  )
}

export default PrivateVideo