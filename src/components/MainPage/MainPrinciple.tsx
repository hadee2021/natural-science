import React, { useEffect, useState } from 'react'
import { subjectObj } from '../../module/subjectData'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { useRecoilState } from 'recoil'
import { questionDataAtom, IsQuestionUpdateAtom } from '../../core/Atom'
import { useQuestionList } from '../../core/query'


const MainPrinciple = () => {
  const navigate = useNavigate()
  const { id: userId = '' } = useParams()

  const [tabSubject, setTabSubject] = useState<Subject>('physical')

  const goToStudy = (step: string) => {
    navigate(`/study/${userId}/${subjectObj[tabSubject].subject}/${step}/${tabSubject}`)
  }

  //// 빠른추가 ////
  const [questionData, setQuestionData] = useRecoilState(questionDataAtom)
  const [questionUpdate, setQuestionUpdate] = useRecoilState(IsQuestionUpdateAtom)


  const quickAdd = (step: string) => {
    setQuestionData({
      id: '',
      subject: tabSubject,
      step: step,
      imgSrc: '',
      questionYear: 2023,
      questionMonth: 3,
      questionNumber: 1,
      questionSequence: 1,
      questionAnswer: 1,
      questionScore: 1
    })
    setQuestionUpdate(true) // 수정의 로직 사용
    navigate(`/main/${userId}/form/${subjectObj[tabSubject].subject}/${step}`)
  }

  return (
    <PrincipleWrapper>
      <PrincipleHeader>
        {subjectObj.subjects.map((subject,i) => (
          <div key={i} onClick={() => setTabSubject(subject.id as Subject)}>
            {subject.name}
          </div>
        ))}
      </PrincipleHeader>
      <PrincipleList>
        {subjectObj[tabSubject].steps.map((step, i) => (
          <div key={i}>
            <span onClick={() => goToStudy(step)}>
              {step}
            </span>
            <Button onClick={() => quickAdd(step)}>
              빠른 추가
            </Button>
          </div>
        ))}
      </PrincipleList>
    </PrincipleWrapper>
  )
}

export default MainPrinciple

const PrincipleWrapper = styled.div`

`

const PrincipleHeader = styled.div`
  display: flex;
  margin: 25px 0;

  > div {
    margin: 0 20px;
    padding: 10px 20px;
    border: 1px solid orangered;
    border-radius: 10px;
    cursor: pointer;
  }
`

const PrincipleList = styled.div`
  padding: 0 20px;

  > div {
    padding: 15px 0;
    margin: 10px 0;
    border-bottom: 1px solid #d9d9d9;

    display: flex;
    justify-content: space-between;
    
    > span {
      cursor: pointer;
      align-self: center;
    }

  }
`