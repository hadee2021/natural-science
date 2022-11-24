import React, { useState } from 'react'
import SubjectButton from '../button/SubjectButton'
import CheckSubject from './CheckSubject'
import styled from 'styled-components'


const MainReview = () => {
  const subjectArr = ['물리','화학']
  const [tabSubject, setTabSubject] = useState<string>('물리')
  return (
    <div>
      <ReviewHeader>
        <div>과목 :</div>
        {subjectArr.map((subject,i) => (
          <SubjectButton
            key={i}
            subject={subject}
            setTabSubject={setTabSubject}
          />
        ))}
      </ReviewHeader>
      <CheckSubject
        subject={tabSubject}
      />
    </div>
  )
}

export default MainReview

const ReviewHeader = styled.div`
  display: flex;
  margin-top: 15px;

  > div:first-child {
    display: flex;
    align-items: center;
    margin-right: 15px;
    font-weight: bold;
    font-size: 20px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 40px;

    > div:first-child,
    > div > button {
      font-size: 18px;
    }
  }
`