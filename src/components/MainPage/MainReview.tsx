import React from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../core/query'
import { groupBy } from 'lodash'
import { useMemo } from "react"
import CheckGroup from './CheckGroup'

const MainReview = () => {
  const { 
    id: userId = ''
  } = useParams()

  const { user } = useUser(userId)
  let checkObj = groupBy(user?.checkQuestion, 'step')
  const checkStepEntries = useMemo(
    () => Object.entries(checkObj),
    [user?.checkQuestion]
  )

  return (
    <div>
      {checkStepEntries.map(([step, checkQuestionList]) => (
        <CheckGroup
          key={step}
          step={step}
          checkQuestionList={checkQuestionList as Question[]}
        />
      ))}
    </div>
  )
}

export default MainReview