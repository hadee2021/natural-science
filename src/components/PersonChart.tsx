 /* eslint-disable */ 
import React, { useMemo }  from 'react'
import styled from 'styled-components'
import { getSubjectFontColor } from '../module/styleFunc'
import { Bar } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js"
Chart.register(ArcElement,Tooltip,Legend,CategoryScale,LinearScale,BarElement)
import { useCheckQuestionList } from '../core/query' 
import { groupBy } from 'lodash'

interface Props {
  userId: string
  subject: string
}

interface SubjectFont {
  subject: string
}

const PersonChart = ({ userId, subject }: Props) => {

  const {
    checkQuestionList
  } = useCheckQuestionList(userId, subject, 'questionNumber', 'asc')

  const checkObj = groupBy(checkQuestionList, 'step')
  const checkStepEntries:[string, object[]][] = useMemo(
    () => Object.entries(checkObj),
    [[...checkQuestionList]]
  )
  checkStepEntries.sort((a,b) => {
    return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0
  })


  const data = {
    labels: [
      "단원 문제"
    ],
    datasets: [{
      label: '복습문항 수',
      data: [
        1
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }]
  }

  checkStepEntries.map(([step, checkQuestionList]) =>{
    let len = checkQuestionList?.length
    data.labels.push(step)
    data.datasets[0].data.push(len)
  })

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  }

  return (
    <ChartWrapper
      subject={subject}
    >
      <div className="chart-title">{subject} 복습문제</div>
      <Bar
        data={data}
        options={options}
      />
    </ChartWrapper>
  )
}

export default PersonChart

const ChartWrapper = styled.div`
  width: 75%;
  margin-left: 90px;
  margin-bottom: 50px;

  .chart-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    ${({subject}: SubjectFont) => getSubjectFontColor(subject)}
  }

  @media screen and (max-width: 900px) {
    margin-left: 70px;
  }

  @media screen and (max-width: 768px) {
    margin-left: 50px;
    .chart-title {
      font-size: 18px;
    }
  }

  @media screen and (max-width: 560px) {
    .chart-title {
      font-size: 16px;
    }
  }
`