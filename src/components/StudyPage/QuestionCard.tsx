 /* eslint-disable */ 
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import OMR from '../OMR'
import { Button, IconButton } from '@mui/material'
import { EditOutlined, Close } from '@mui/icons-material'
import { useRecoilState } from 'recoil'
import { questionDataAtom, IsQuestionUpdateAtom } from '../../core/Atom'
import { useDeleteQuestion, useAddCheckQuestion, useUser } from '../../core/query'
import StarsIcon from '@material-ui/icons/Stars'

interface Props {
  question: Question
}

const QuestionCard = ({question}:Props) => {
  const { 
    id: userId = '',
    subject = '',
    step = '',
    subjectId = ''
  } = useParams()
  const navigate = useNavigate()

  const [omrMarking, setOmrMarking] = useState<boolean[]>([false, false, false, false, false])
  const [showAnswer, setShowAnwser] = useState<boolean>(false)

  // 수정
  const[questionData, setQuestionData] = useRecoilState(questionDataAtom)
  const[questionUpdate, setQuestionUpdate] = useRecoilState(IsQuestionUpdateAtom)
    

  const onUpdate = (question: Question) => {
    setQuestionData({
      ...questionData,
      id: question.id,
      subject: subjectId,
      step: question.step,
      imgSrc: question.imgSrc,
      questionYear: question.questionYear,
      questionMonth: question.questionMonth,
      questionNumber: question.questionNumber,
      questionSequence: question.questionSequence,
      questionAnswer: question.questionAnswer,
      questionScore: question.questionScore
    })
    setQuestionUpdate(true)
    navigate(`/main/${userId}/form`)
  }
  //

  // 삭제
  const {
    deleteQuestion,
    isLoading: isDeleting,
  } = useDeleteQuestion(subject,step,question.id)

  const onDelete = () => {
    if(isDeleting) return
    deleteQuestion()
  }

  // 체크 문항
  const { 
    addCheckQuestion,
    isLoading: isAdding
  } = useAddCheckQuestion(userId, question.id)

  const onCheck = () => {
    if(isAdding) return
    addCheckQuestion({...question})
  }

  // 권한
  const { user } = useUser(userId)


  return (
    <QuestionCardWrapper>
      <CardHeader>
        <div className="question-title">
          <span>{question.questionYear} 학년도 </span>
          <span>{question.questionMonth} 월</span>
          <span>
            {question.questionMonth === ( 11 || "11" ) ? "수능" 
              : question.questionMonth === ( 6 || "6" || 9 || "9" ) ? "평가원" : "교육청"
            }
          </span>
          <span>{question.questionNumber} 번 </span>
        </div>
        <div className="answer-confirm">
          <Button
            variant="contained"
            disabled={!(omrMarking.some((_) =>_))}
            onClick={() => setShowAnwser(true)}
            size="small" 
          >
            정답 확인
          </Button>
          <div className="answer-div">
            답 :
            {showAnswer && (omrMarking.some((_) =>_)) &&
              <span className="answer">
              {question.questionAnswer}
            </span>
            }
          </div>
        </div>
      </CardHeader>
      <CardNav>
        <div className="space">
          <Button onClick={onCheck}> 
            <StarsIcon/> 복습 추가
          </Button>
        </div>
        <NavBody>
          <OMR
            omrMarking={omrMarking}
            setOmrMarking={setOmrMarking}
          />
        </NavBody>
      </CardNav>
      {user?.author &&
        <CardAdminNav>
          <IconButton
            size="small" 
            color="secondary"
            onClick={() => onUpdate(question)}
          >
            <EditOutlined fontSize="small"/>
          </IconButton>
          <IconButton
            size="small"
            onClick={onDelete}
            sx={{marginLeft : 1}}
          >
            <Close fontSize="small"/>
          </IconButton>
        </CardAdminNav>
      }
      <CardBody>
        <img src={question.imgSrc}/>
      </CardBody>
    </QuestionCardWrapper>
  )
}

export default QuestionCard

const QuestionCardWrapper = styled.div`
  margin-top: 25px;
`
const CardHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 20px;

  .question-title {
    color: #2F74C0;
    > span {
      margin: 0 5px;
    }
  }

  .answer-confirm {
    display: flex;
    margin-left: 20px;
    gap: 20px;
  }

  .answer-div {
    align-self: center;
    font-size: 15px;
  }

  .answer {
    margin: 0 10px;
    border: 1px solid black;
    padding: 0px 6px;
    border-radius: 50%;
    width: 24px;
    height: 24px;
  }

  
  @media screen and (max-width: 768px) {
    .question-title {
      font-size: 15px;
    }
  }

  @media screen and (max-width: 650px) {
    flex-flow: column;
    align-items: center;
    gap: 15px;
  }

  @media screen and (max-width: 520px) {
    margin-bottom: 5px;
  }

`

const CardNav = styled.div`
  display: flex;
  margin-bottom: 20px;

  .space {
    width: 45%;
  }
  
  @media screen and (max-width: 1024px) {
    .space {
      width: 40%;
    }
  }

  @media screen and (max-width: 768px) {
    .space {
      width: 38%;
    }
  }

  @media screen and (max-width: 550px) {
    flex-flow: column;
    align-items: center;
    .space {
      width: 120px;
    }
  }

`
const CardAdminNav = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 80%;
  margin: 0 auto;
  @media screen and (max-width: 520px) {
    width: 60%;
  }
`

const NavBody = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;

  @media screen and (max-width: 550px) {
    justify-content: center;
  }
`

const CardBody = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 768px) {
    img {
      width: 400px;
    }
  }

  @media screen and (max-width: 520px) {
    img {
      width: 300px;
    }
  }

  @media screen and (max-width: 400px) {
    img {
      width: 250px;
    }
  }
`