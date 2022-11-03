import React from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuestionList } from '../core/query'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import QuestionCard from '../components/StudyPage/QuestionCard'
import CloseIcon from '@material-ui/icons/Close';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1201 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1200, min: 761 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 760, min: 0 },
    items: 1
  }
}

const Study = () => {
  const { 
    id: userId = '',
    subject = '',
    step = ''
  } = useParams()

  const { questionList } = useQuestionList(subject, step)

  const navigate = useNavigate()

  return (
    <StudyWrapper>
      <StudyContainer>
        <div className="close-btn">
          <CloseIcon
            onClick={() => navigate(`/main/${userId}/principle`)}
          />
        </div>
        <Carousel responsive={responsive} className="carousel">
          {questionList.length !== 0
          ? questionList.map((question: Question) => (
            <QuestionCard 
              key={question.id}
              question={question}
            />
          ))
          : <div>아직 문제가 없네요....</div>
        }
        </Carousel>
      </StudyContainer>
    </StudyWrapper>
  )
}

export default Study

const StudyWrapper = styled.div`
  background-color: aliceblue;
  height: 100vh;
  display: flex;
`

const StudyContainer = styled.div`
  background-color: white;
  margin: 35px 25px;
  border-radius: 9px;
  padding: 30px;
  overflow: auto;
  flex: 1;

  .close-btn {
    > svg {
      cursor: pointer;
    }
  }
`