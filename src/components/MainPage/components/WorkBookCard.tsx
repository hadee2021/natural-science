 /* eslint-disable */ 
import React, { useState } from 'react'
import styled from 'styled-components'
import Atropos from 'atropos/react'
import { Button, IconButton } from '@mui/material'
import { EditOutlined, Close } from '@mui/icons-material'
import { useRecoilState } from 'recoil'
import { IsQuestionBookUpdateAtom, questionBookDataAtom } from '../../../core/Atom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import WorkBookCardModal from './WorkBookCardModal'
import { useNavigate } from 'react-router-dom'
import { useDeleteQuestionBook } from '../../../core/query'

interface Props {
  questionBook: QuestionBook
  isAdmin: boolean
  userId: string
}

const WorkBookCard = ({ questionBook, isAdmin, userId }: Props) => {
  const navigate = useNavigate()

  //수정
  const [questionBookData, setQuestionBookData] = useRecoilState(questionBookDataAtom)
  const [questionBookUpdate, setQuestionBookUpdate] = useRecoilState(IsQuestionBookUpdateAtom)

  const onUpdate = (questionBook: QuestionBook) => {
    setQuestionBookData({
      ...questionBookData,
      id: questionBook.id,
      subject: questionBook.subject,
      imgSrc: questionBook.imgSrc,
      questionBookSeq: questionBook.questionBookSeq,
      questionBookTitle: questionBook.questionBookTitle,
      questionBookPrice: questionBook.questionBookPrice,
      questionBookDetail: questionBook.questionBookDetail,
      questionBookShop: questionBook.questionBookShop,
      questionBookpdf: questionBook.questionBookpdf
    })
    setQuestionBookUpdate(true)
    navigate(`/main/${userId}/workbook/form`)
  }
  //

  // 삭제
  const {
    deleteQuestionBook,
    isLoading: isDeleting,
  } = useDeleteQuestionBook(questionBook.subject, questionBook.id)

  const onDelete = () => {
    if(isDeleting) return
    deleteQuestionBook()
  }
  //

  const [openModal, setOpenModal] = useState(false)

  const modalClose = () => {
    setOpenModal(false)
  }

  const goToShop = () => {
    window.open(questionBook.questionBookShop)
  }
  return (
    <CardWrapper>
      <div className="book-seq">
        <span>{questionBook.questionBookSeq}</span>
        {isAdmin &&
          <CardAdminNav>
            <IconButton
              size="small" 
              color="secondary"
              onClick={() => onUpdate(questionBook)}
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
      </div>
      <div className="book-img">
        <Atropos shadow={false}>
          <img 
            src={questionBook.imgSrc} 
            data-atropos-offset="5"
            width={240}
            height={300}
            onClick={() => setOpenModal(true)}
          />
        </Atropos>
      </div>
      <div className="book-title">
        <span>{questionBook.questionBookTitle}</span>
      </div>
      <div className="book-price">
        <FontAwesomeIcon icon={faCartShopping} style={{ color: "#F05A4E"}}/>
        <span>
          {questionBook.questionBookPrice
            .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          } 원
        </span>
      </div>
      <Button
        variant="contained"
        size="small"
        onClick={() => goToShop()}
      >
        구매하기
      </Button>
      {openModal &&
        <WorkBookCardModal
          modalClose={modalClose}
          questionBook={questionBook}
        />
      }
    </CardWrapper>
  )
}

export default WorkBookCard

const CardWrapper = styled.div`
  width: 240px;

  .book-seq {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .book-seq > span:first-child {
    align-self: center;
    border: 1px solid #2E7DDE;
    background-color: #2E7DDE;
    color: white;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
  }

  .book-img {
    height: 340px;

    img {
      cursor: pointer;
    }
  }

  .book-title {
    span {
      font-size: 18px;
      font-weight: bold;
      word-break: break-all;
    }
  }

  .book-price {
    margin-top: 10px;
    margin-bottom: 15px;

    span {
      font-weight: bold;
      margin-left: 10px;
      color: #2E7DDE;
    }
  }
`

const CardAdminNav = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 80%;

  @media screen and (max-width: 520px) {
    width: 60%;
  }
`