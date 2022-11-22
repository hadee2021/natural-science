import React from 'react'
import CheckSubject from './CheckSubject'


const MainReview = () => {
  const subjectArr = ['물리','화학']

  return (
    <div>
      {subjectArr.map((subject,i) => (
        <CheckSubject
          key={i}
          subject={subject}
        />
      ))}
    </div>
  )
}

export default MainReview