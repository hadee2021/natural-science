import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCheckQuestionList } from '../../core/query'
import { groupBy } from 'lodash'
import { useMemo } from "react"
import CheckGroup from './CheckGroup'
import { checkQuestionListContext } from '../../module/questionContext'
import { checkSortContext } from '../../module/checkSortContext'
import { OrderByDirection } from 'firebase/firestore'
import styled, { css } from 'styled-components'

interface Prop {
  subject: string
}

interface SubjectFont {
  subject: string
}


const CheckSubject = ({ subject }: Prop) => {
  const { 
    id: userId = ''
  } = useParams()


  const sortKeys = ['questionYear','questionMonth','questionNumber','questionScore']
  const [sortKey, setSortKey] = useState<string>('questionNumber')
  const orders = ['asc', 'desc']
  const [order, setOrder] = useState<OrderByDirection>('asc')
  const {
    checkQuestionList
  } = useCheckQuestionList(userId, subject, sortKey, order)


  const checkObj = groupBy(checkQuestionList, 'step')
  const checkStepEntries = useMemo(
    () => Object.entries(checkObj),
    [[...checkQuestionList]]
  )


  return (
    <SubjectWrapper>
      <SubjectContainer subject={subject}>
        <span>#{subject}</span>
        <div className="select-box">
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as string)}
          >
            {sortKeys.map((item, i) => (
              <option key={i}>{item}</option>
            ))}
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as OrderByDirection)}
          >
            {orders.map((item, i) => (
              <option key={i}>{item}</option>
            ))}
          </select>
        </div>
      </SubjectContainer>
      {checkStepEntries.map(([step, checkQuestionList]) => (
        <checkQuestionListContext.Provider 
          value={checkQuestionList as Question[]} 
          key={step}
        >
          <checkSortContext.Provider
            value={{sortKey: sortKey, order: order}}
            key={step}
          >
            <CheckGroup
              subject={subject}
              step={step}
            />
          </checkSortContext.Provider>
          
        </checkQuestionListContext.Provider>
      ))}
    </SubjectWrapper>
  )
}

export default CheckSubject

const SubjectWrapper = styled.div`
  margin: 18px 0;
`

const getSubjectContainerColor = (subject: string) => {
  let fontColor
  switch(subject) {
    case "물리":
      fontColor = "#2F74C0"
      break

    case "화학":
      fontColor = "#F79C0F"
      break

    default :
      fontColor = "#2F74C0"
      break
  }
  return css`
    color: ${fontColor};
  `
}


const SubjectContainer = styled.div<SubjectFont>`
  display: flex;

  > span:first-child {
    ${({subject}: SubjectFont) => getSubjectContainerColor(subject)}
    font-size: 20px;
    font-weight: bold;
    margin-right: 15px;
  }

  select {
    margin: 0 15px;
    padding: 5px;
    cursor: pointer;
    border: 1px solid lightgray;
    border-radius: 5px;
  }

  @media screen and (max-width: 768px) {
    font-size: 19px;
    margin: 45px 0;
  }

  @media screen and (max-width: 520px) {
    flex-flow: column;
    gap: 15px;

    .select-box > select:first-child {
      margin-left: 0;
    }
  }
`