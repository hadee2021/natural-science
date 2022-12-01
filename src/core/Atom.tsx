import { atom } from 'recoil'

export const questionDataAtom = atom({
  key: 'questionData',
  default: {
    id: '',
    subject: '',
    step: '',
    imgSrc: '',
    questionYear: 2023,
    questionMonth: 3,
    questionNumber: 1,
    questionSequence: 1 as number,
    questionAnswer: 1,
    questionScore: 1
  }
})

export const IsQuestionUpdateAtom = atom({
  key: 'questionUpdate',
  default: false
})

export const IsQuickAddAtom = atom({
  key: 'quickAdd',
  default: false
})

export const ModalImgSrcAtom = atom({
  key: 'ModalImgSrc',
  default: ''
})

export const questionBookDataAtom = atom({
  key: 'questionBook',
  default: {
    id: '',
    subject: '',
    imgSrc: '',
    questionBookSeq: 1,
    questionBookTitle: '',
    questionBookPrice: 0,
    questionBookDetail: '',
    questionBookShop: '',
    questionBookpdf: ''
  }
})

export const IsQuestionBookUpdateAtom = atom({
  key: 'questionBookUpdate',
  default: false
})