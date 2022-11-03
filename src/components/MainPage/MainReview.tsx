import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useUser } from '../../core/query'
import { groupBy } from 'lodash'
import { useMemo } from "react"

const MainReview = () => {
  const { 
    id: userId = ''
  } = useParams()

  const { user } = useUser(userId)
  console.log('user', user)
  let checkObj = groupBy(user?.checkQuestion, 'step')
  const checkStepEntries = useMemo(
    () => Object.entries(checkObj),
    [user?.checkQuestion]
  )
  console.log('checkStepEntries', checkStepEntries)
  

  return (
    <div>MainReview</div>
  )
}

export default MainReview