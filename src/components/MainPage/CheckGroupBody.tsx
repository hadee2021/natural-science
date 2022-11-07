import React, { useContext } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import styled from 'styled-components'
import CheckQuestionCard from './CheckQuestionCard'
import { checkQuestionListContext } from '../../module/questionContext'

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

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CheckGroupBody = ({ setOpenModal}: Props) => {
  const checkQuestionList = useContext(checkQuestionListContext)
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

export default CheckGroupBody

const CarouselContainer = styled.div`
  .carousel > ul > li{
    display: flex;
    justify-content: center;
  }
`