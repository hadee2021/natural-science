import React, { useState } from 'react'
import { Box, Collapse, Typography, IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import styled from 'styled-components'
import { ModalImgSrcAtom } from '../../core/Atom'
import { useRecoilState } from 'recoil'
import { Close } from '@mui/icons-material'
import CheckGroupBody from './CheckGroupBody'
import { getSubjectBgColor } from '../../module/styleFunc'


interface Props {
  subject: string
  step: string
}

interface SubjectBg {
  subject: string
}

const CheckGroup = ({subject, step}: Props) => {
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
        <CheckGroupHeader onClick={() => setOpen(!open)} subject={subject}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" className="step-header">
              {step}
            </Typography>
          </Box>
          {open 
            ? <KeyboardArrowUpIcon /> 
            : <KeyboardArrowDownIcon />
          }
        </CheckGroupHeader>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <CheckGroupBody
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


const CheckGroupHeader = styled.div<SubjectBg>`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  cursor: pointer;
  ${({subject}: SubjectBg) => getSubjectBgColor(subject)}
  padding: 8px 25px;
  margin: 25px 0;
  border-radius: 10px;

  > div:first-child {
    align-self: center;
  }

  @media screen and (max-width: 520px) {
    padding: 8px 20px;
    .step-header{
      font-size: 15px;
    }
  }

  @media screen and (max-width: 420px) {
    padding: 4px 15px;
    .step-header{
      font-size: 10px;
    }
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