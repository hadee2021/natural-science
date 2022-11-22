 /* eslint-disable */ 
import React, { useContext } from 'react'
import { Card, CardContent,IconButton } from '@mui/material'
import {  useDeleteCheckQuestion } from '../../core/query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Close } from '@mui/icons-material'
import { ModalImgSrcAtom } from '../../core/Atom'
import { useRecoilState } from 'recoil'
import { checkSortContext } from '../../module/checkSortContext'

interface Props {
  question: Question,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CheckQuestionCard = ({question, setOpenModal} : Props) => {

  const { 
    id: userId = ''
  } = useParams()

  // 체크문항 해제
  
  const {sortKey, order} = useContext(checkSortContext)
  
  const { 
    deleteCheckQuestion,
    isLoading: isDeleting,
  } = useDeleteCheckQuestion(userId, question.subject, question.id, sortKey, order)

  const onCheckDelete = () => {
    if(isDeleting) return
    deleteCheckQuestion()
  }
  //


  const [modalImgSrc, setModalImgSrc] = useRecoilState(ModalImgSrcAtom)
  const openImg = (imgSrc: string) => {
    setModalImgSrc(imgSrc)
    setOpenModal(true)
  }

  return (
    <CardContainer>
      <Card className="question-card">
        <CardContent>
          <CardHeader>
            <div className="number-title">
              <div>
                <span>{question.questionYear} 학년도 </span>
              </div>
              <div>
                <span>{question.questionMonth} 월</span>
                <span>{question.questionNumber} 번</span>
              </div>
            </div>
            <IconButton
              size="small"
              onClick={onCheckDelete}
              sx={{marginLeft : 1}}
            >
              <Close fontSize="small"/>
            </IconButton>
          </CardHeader>
          <ImgBox>
            <img 
              className="question-mini-img"
              src={question.imgSrc} 
              width={250}
              onClick={() => openImg(question.imgSrc)}
            />
          </ImgBox>
        </CardContent>
      </Card>
      
    </CardContainer>
  )
}

export default CheckQuestionCard

const CardContainer = styled.div`
  .question-card {
    width: 300px;
    height: 400px;
    margin: 0 10px;
  }
  .question-mini-img {
    cursor: pointer;
    border: 1px solid black;
    padding: 5px;
    border-radius: 10px;
  }
  .number-title {
    align-self: center;
    display: flex;
    gap: 5px;

    > div > span {
      margin: 0 3px;
    }
  }

  @media screen and (max-width: 620px) {
    .question-card {
      width: 250px;
      height: 300px;
    }
    .number-title {
      font-size: 15px;
    }
    .question-mini-img {
      width: 200px;
    }
  }

  @media screen and (max-width: 490px) {
    .question-card {
      width: 200px;
      height: 250px;
    }
    .number-title {
      font-size: 10px;
    }
    .question-mini-img {
      width: 150px;
    }
  }

  @media screen and (max-width: 420px) {
    .question-card {
      width: 150px;
      height: 200px;
    }
    .number-title {
      font-size: 10px;
      flex-flow: column;
    }
    .question-mini-img {
      width: 100px;
    }
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  color: #2F74C0;
  margin-bottom: 10px;
`

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
`