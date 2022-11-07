import React from 'react'
import { useParams } from 'react-router-dom'
import { useCheckQuestionList } from '../../core/query'
import { groupBy } from 'lodash'
import { useMemo } from "react"
import CheckGroup from './CheckGroup'
import { checkQuestionListContext } from '../../module/questionContext'


const MainReview = () => {
  const { 
    id: userId = ''
  } = useParams()

  const {
    checkQuestionList
  } = useCheckQuestionList(userId)

  let checkObj = groupBy(checkQuestionList, 'step')
  const checkStepEntries = useMemo(
    () => Object.entries(checkObj),
    [[...checkQuestionList]]
  )

  


  return (
    <div>
      {checkStepEntries.map(([step, checkQuestionList]) => (
        <checkQuestionListContext.Provider value={checkQuestionList as Question[]}>
          <CheckGroup
            key={step}
            step={step}
          />
        </checkQuestionListContext.Provider>
      ))}
    </div>
  )
}

export default MainReview