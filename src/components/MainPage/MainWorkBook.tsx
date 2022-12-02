 /* eslint-disable */ 
import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../core/query'
import { Fab } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useRecoilState } from 'recoil'
import { IsQuestionBookUpdateAtom } from '../../core/Atom'
import { useQuestionBookList } from '../../core/query'
import SubjectButton from '../button/SubjectButton'
import WorkBookCard from './components/WorkBookCard'


const MainWorkBook = () => {
  const navigate = useNavigate()
  const { id: userId = '' } = useParams()
  const { user } = useUser(userId)

  const subjectArr = ['물리','화학']
  const [tabSubject, setTabSubject] = useState<string>('물리')

  const { questionBookList } = useQuestionBookList(tabSubject)

  // 수정 여부
  const [questionBookUpdate, setQuestionBookUpdate] = useRecoilState(IsQuestionBookUpdateAtom)

  // 새로추가
  const goToWorkBookForm = () => {
    setQuestionBookUpdate(false) // 수정이 아니다.
    navigate(`/main/${userId}/workbook/form`)
  }

  return (
    <WorkBookWrapper>
      <WorkBookHeader>
        {subjectArr.map((subject,i) => (
          <SubjectButton
            key={i}
            subject={subject}
            setTabSubject={setTabSubject}
          />
        ))}
      </WorkBookHeader>
      <WorkBookBody>
        {questionBookList.map((questionBook: QuestionBook) => (
          <WorkBookCard
            key={questionBook.id}
            questionBook={questionBook}
            userId={userId}
            isAdmin={user?.author}
          />
        ))}
      </WorkBookBody>
      {user?.author &&
        <Fab
          color="primary"
          sx={{
            position :"fixed",
            right: 20,
            bottom: 20
          }}
          onClick={() => goToWorkBookForm()}
        >
          <Add fontSize="large" />
        </Fab>
      }
    </WorkBookWrapper>
  )
}

export default MainWorkBook

const WorkBookWrapper = styled.div`
  
`

const WorkBookHeader = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 40px;

  > div:first-child {
    display: flex;
    align-items: center;
    margin-right: 15px;
    font-weight: bold;
    font-size: 20px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 40px;

    > div:first-child,
    > div > button {
      font-size: 18px;
    }
  }
`
const WorkBookBody = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 40px;

  @media screen and (max-width: 868px) {
    justify-content: center;
  }
`