import React, { useState } from 'react'
import { Card, CardContent,IconButton, Box } from '@mui/material'
import {  useDeleteCheckQuestion } from '../../core/query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Close } from '@mui/icons-material'
import { ModalImgSrcAtom } from '../../core/Atom'
import { useRecoilState } from 'recoil'

interface Props {
  question: Question,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CheckQuestionCard = ({question, setOpenModal} : Props) => {

  const { 
    id: userId = ''
  } = useParams()

  // 체크문항 해제
  const { 
    deleteCheckQuestion,
    isLoading: isDeleting,
  } = useDeleteCheckQuestion(userId, question.id)

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
              <span>{question.questionYear} 학년도 </span>
              <span>{question.questionMonth} 월</span>
              <span>{question.questionNumber} 번</span>
            </div>
            <IconButton
              size="small"
              onClick={onCheckDelete}
              sx={{marginLeft : 1}}
            >
              <Close fontSize="small"/>
            </IconButton>
          </CardHeader>
          <Box>
            <img 
              className="question-mini-img"
              src={question.imgSrc} 
              width={250}
              onClick={() => openImg(question.imgSrc)}
            />
          </Box>
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
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  color: #2F74C0;
  margin-bottom: 10px;

  .number-title {
    align-self: center;

    > span {
      margin: 0 3px;
    }
  }
`