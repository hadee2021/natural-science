import React from 'react'
import styled from 'styled-components'
import { Bar } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js"
Chart.register(ArcElement,Tooltip,Legend,CategoryScale,LinearScale,BarElement)

const PersonChart = () => {
  const data = {
    labels: [
      '1단원 역학', '1단원 에너지', '2단원 전기에너지', '3단원 파동', 'Purple', 'Orange',
      '1단원 역학', '1단원 에너지', '2단원 전기에너지', '3단원 파동', 'Purple', 'Orange',
      '1단원 역학', '1단원 에너지', '2단원 전기에너지', '3단원 파동', 'Purple', 'Orange',
      '1단원 역학', '1단원 에너지', '2단원 전기에너지', '3단원 파동', 'Purple', 'Orange'
    ],
    datasets: [{
      label: '복습문항 수',
      data: [
        12, 19, 3, 15, 2, 3,
        12, 19, 3, 15, 2, 3,
        12, 19, 3, 5, 12, 3,
        12, 19, 3, 5, 2, 13
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
    <ChartWrapper>
      <div>물리 나의 복습문제</div>
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
`