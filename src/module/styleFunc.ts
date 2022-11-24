import { css } from 'styled-components'

export const getSubjectFontColor = (subject: string) => {
  let fontColor
  switch(subject) {
    case "물리":
      fontColor = "#2F74C0"
      break

    case "화학":
      fontColor = "#F79C0F"
      break

    default :
      fontColor = "#2F74C0"
      break
  }
  return css`
    color: ${fontColor};
  `
}

export const getSubjectBgColor = (subject: string) => {
  let bgColor
  switch(subject) {
    case "물리":
      bgColor = "#61dafb6b"
      break

    case "화학":
      bgColor = "#f79c0fc9"
      break

    default :
      bgColor = "#61dafb6b"
      break
  }
  return css`
    background-color: ${bgColor};
  `
}