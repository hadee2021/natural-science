 /* eslint-disable */ 
import React, { useContext } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import styled from 'styled-components'
import CheckQuestionCard from './CheckQuestionCard'
import { checkQuestionListContext } from '../../module/questionContext'
//import { checkSortContext } from '../../module/checkSortContext'

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
  

  /** 정렬을 임시방편으로 가져와서 진행 => query.ts에서 작동*/
  //const { sortKey, order } = useContext(checkSortContext)
  // checkQuestionList.sort((a, b) => {
  //   if(order === 'desc') return b[sortKey] - a[sortKey]
  //   return a[sortKey] - b[sortKey]
  // })

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

  @media screen and (max-width: 520px) {
    .carousel > button {
      display: none;
    }
  }
`