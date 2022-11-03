import React, { useState } from 'react'
import { Box, Collapse, Typography, IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import styled from 'styled-components'
import CheckQuestionCard from './CheckQuestionCard'
import { ModalImgSrcAtom } from '../../core/Atom'
import { useRecoilState } from 'recoil'
import { Close } from '@mui/icons-material'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1401 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1400, min: 1100 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 1099, min: 0 },
    items: 1
  }
}

interface CheckQuestionListProps {
  checkQuestionList : Question[]
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}


const CheckQuestionList = ({checkQuestionList, setOpenModal}: CheckQuestionListProps) => {
  return (
    <CarouselContainer>
      <Carousel responsive={responsive} className="carousel">
        {checkQuestionList.map((question: Question) => (
          <CheckQuestionCard
            key={question.id}
            question={question}
            setOpenModal={setOpenModal}
          />
        ))}
      </Carousel>
    </CarouselContainer>
  )
}

interface Props {
  step: string
  checkQuestionList: Question[]
}

const CheckGroup = ({step, checkQuestionList}: Props) => {
  const [open, setOpen] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [modalImgSrc, setModalImgSrc] = useRecoilState(ModalImgSrcAtom)
  const modalClose = () => {
    setModalImgSrc('')
    setOpenModal(false)
  }

  return (
    <>
      <Box>
        <CheckGroupContainer onClick={() => setOpen(!open)}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {step}
            </Typography>
          </Box>
          {open 
            ? <KeyboardArrowUpIcon /> 
            : <KeyboardArrowDownIcon />
          }
        </CheckGroupContainer>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <CheckQuestionList 
            checkQuestionList={checkQuestionList} 
            setOpenModal={setOpenModal}
          />
        </Collapse>
      </Box>
      {openModal &&
        <ModalWrapper>
          <ModalBody>
            <div className="close-btn">
              <IconButton
                size="small"
                sx={{color: "white"}}
                onClick={() => modalClose()}
              >
                <Close fontSize="large"/>
              </IconButton>
            </div>
            <img 
              src={modalImgSrc}
            />
          </ModalBody>
        </ModalWrapper>
      }
    </>
  )
}

export default CheckGroup

const CheckGroupContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  cursor: pointer;
  background: #61dafb6b;
  padding: 10px 25px;
  margin: 25px 0;
  border-radius: 10px;
`

const CarouselContainer = styled.div`
  .carousel > ul > li{
    display: flex;
    justify-content: center;
  }
`

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
`