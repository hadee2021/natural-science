import React from 'react'
import styled from 'styled-components'
import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'

interface Props {
  modalClose: () => void
  questionBook: QuestionBook
}

const WorkBookCardModal = ({ modalClose, questionBook }: Props) => {
  return (
    <ModalWrapper>
      <ModalBody>
        <div className="close-btn">
          <IconButton
            size="small"
            sx={{color: "white"}}
            onClick={modalClose}
          >
            <Close fontSize="large"/>
          </IconButton>
        </div>
        <ModalContent>
          <ModalContentHeader>
            <img 
              src={questionBook.imgSrc}
              width={240}
              height={300}
            />
            <div className="modal-book-data">
              <p className="modal-book-title">
                {questionBook.questionBookTitle}
              </p>
              <div className="modal-book-detail">
                <span>
                  {questionBook.questionBookDetail}
                </span>
              </div>
            </div>
          </ModalContentHeader>
          <div className="modal-book-pdf">
            <span>PDF 맛보기</span>
            <embed
              src={questionBook.questionBookPdf}
            />
          </div>
        </ModalContent>
      </ModalBody>
    </ModalWrapper>
  )
}

export default WorkBookCardModal

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
`
const ModalBody = styled.div`
  display: flex;
  flex-flow: column;

  .close-btn {
    align-self: flex-end;
    margin-bottom: 10px;
  }

  > div:last-child::-webkit-scrollbar {
    width: 10px;
  }

  > div:last-child::-webkit-scrollbar-thumb {
    background-color: #14a3e6;
    border-radius: 10px;
  }

  > div:last-child::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  @media screen and (max-width: 520px) {
    img {
      width: 400px;
    }
  }

  @media screen and (max-width: 420px) {
    img {
      width: 300px;
    }
  }
`

const ModalContent = styled.div`
  background-color: white;
  width: 830px;
  height: 80vh;
  overflow: auto;
  padding: 30px 60px;
  padding-bottom: 50px;


  .modal-book-pdf {
    > span {
      font-size: 18px;
      font-weight: bold;
    }
    embed {
      margin-top: 13px;
      width: 100%;
      height: 800px;
    }
  }

  @media screen and (max-width: 1100px) {
    width: 700px;
  }

  @media screen and (max-width: 900px) {
    width: 550px;
  }

  @media screen and (max-width: 750px) {
    width: 400px;
  }

  @media screen and (max-width: 600px) {
    width: 300px;
  }

  @media screen and (max-width: 450px) {
    width: 200px;
  }
`

const ModalContentHeader = styled.div`
  display: flex;
  gap: 60px;
  margin-top: 30px;
  margin-bottom: 50px;

  .modal-book-data {
    flex: 1;
  }

  .modal-book-title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 0;
  }

  .modal-book-detail {
    height: 80%;
    background-color: #F7F8F9;
    border-radius: 9px;
    padding: 10px;
  }

  @media screen and (max-width: 900px) {
    .modal-book-detail {
      font-size: 15px;
    }
  }

  @media screen and (max-width: 750px) {
    flex-flow: column;
    > img {
      order: 2;
      align-self: center;
    }
  }

  @media screen and (max-width: 600px) {
    > img {
      width: 230px;
    }
  }

  @media screen and (max-width: 450px) {
    .modal-book-title {
      font-size: 17px;
    }
    .modal-book-detail {
      font-size: 14px;
      width: 100%;
    }
  }
`