import { fireStore, getDefaultConverter, storage } from '../core/firestore'
import { 
  collection, where, query, doc, QueryConstraint, orderBy, DocumentReference
} from 'firebase/firestore'
import { nanoid } from 'nanoid'
import { 
  useFirestoreQueryData,
  useFirestoreDocumentMutation,
  useFirestoreDocumentData,
  useFirestoreDocumentDeletion,
  useFirestoreTransaction
} from "@react-query-firebase/firestore"
import { hash } from './util'
import { useMemo } from 'react'
import { groupBy } from 'lodash'

const ROOT_USER = 'users'
const userConverter = getDefaultConverter<User>()
const EMPTY_USER_ID = 'EMPTY_USER_ID'

const ROOT_QUESTION = 'questions'
const questionConverter = getDefaultConverter<Question>()
const EMPTY_SUBJECT = 'EMPTY_SUBJECT'
const STEP_LIST = '단원'
const EMPTY_STEP = 'EMPTY_STEP'
const QUESTION_LIST = '문제'
const EMPTY_QUESTION_ID = 'EMPTY_QUESTION_ID'

const getUserCollectionRef = () => (
  collection(fireStore, ROOT_USER).withConverter(userConverter)
)

const getUserDocRef = (userId: string) => (
  doc(fireStore, ROOT_USER, userId || EMPTY_USER_ID).withConverter(userConverter)
)

const getQuestionCollectionRef = (subject: Subject | string, step: string) => {
  return collection(
    fireStore,
    ROOT_QUESTION,
    subject || EMPTY_SUBJECT,
    STEP_LIST,
    step || EMPTY_STEP,
    QUESTION_LIST
  ).withConverter(questionConverter)
}

const getQuestionDocRef = (subject: Subject | string, step: string, questionId: string) => {
  return doc(
    fireStore,
    ROOT_QUESTION,
    subject || EMPTY_SUBJECT,
    STEP_LIST,
    step || EMPTY_STEP,
    QUESTION_LIST,
    questionId || EMPTY_QUESTION_ID
  ).withConverter(questionConverter)
}


/** User 생성 */

export const useCreateUser = () => {
  const userId = nanoid(5)
  const userDocRef = getUserDocRef(userId)
  const { mutate, ...result } = useFirestoreDocumentMutation(userDocRef)

  return {
    ...result,
    userId,
    createUser(userName: string, userPwd: string) {
      mutate({
        id: userId,
        name: userName,
        pwd: hash(userPwd),
        author: false,
        checkQuestion: []
      })
    },
  }
}

/** User 확인 */

export const useFindUser = (userName = '', userPwd = '') => {
  const userCollectionRef = getUserCollectionRef()
  const userCollectionQuery = query(
    userCollectionRef,
    where('name', '==', userName),
    where('pwd', '==', hash(userPwd)),
  )
  const {
    data: userList = [],
    isSuccess,
    ...result
  } = useFirestoreQueryData([ROOT_USER, userName, userPwd], userCollectionQuery, undefined, {
    cacheTime: 0
  })
  return {
    user: userList[0],
    isSuccess,
    ...result,
  }
}

/** User 상세 정보  id로 필드값 객체묶음 받아오기*/

export const useUser = (userId : string) => {
  const userDocRef = getUserDocRef(userId)
  const {
    data: user,
    ...result
  } = useFirestoreDocumentData([ROOT_USER, userId], userDocRef)
  return {
    user,
    ...result
  }
}

/** User 체크한 문제 추가 및 삭제*/
export const useEditUser = (userId: string) => {
  const userDocId = userId
  const userDocRef = getUserDocRef(userId)

  const { mutate, ...result } = useFirestoreDocumentMutation(userDocRef, { merge: true })

  return {
    ...result,
    userDocId,
    editUser(userForm: User, options?: Parameters<typeof mutate>[1]) {
      mutate({ ...userForm }, options)
    }
  }
}


/** 문제 추가 및 수정 */

export const useEditQuestion = (subject: Subject | string, step: string, questionId?: string) => {
  const qustionDocId = questionId  ?? nanoid(5)
  const questionDocRef = getQuestionDocRef(subject, step, qustionDocId)

  const { mutate, ...result } = useFirestoreDocumentMutation(questionDocRef, { merge: true })

  return {
    ...result,
    qustionDocId,
    editQuestion (questionForm: Question, options?: Parameters<typeof mutate>[1]) {
      mutate({ ...questionForm, id: qustionDocId}, options)
    }
  }
}


/** 단원별 문제들 가져오기 */

export const useQuestionList = (subject: Subject | string, step: string) => {
  const questionCollectionRef = getQuestionCollectionRef(subject, step)

  const constraints: QueryConstraint[] = []
  constraints.push(orderBy('questionSequence', 'asc'))
  const queryConstraints = constraints

  const ref = query(
    questionCollectionRef,
    ...queryConstraints
  )

  const {
    data: questionList = [],
    dataUpdatedAt,
    ...result
  } = useFirestoreQueryData(
    [ROOT_QUESTION, subject, STEP_LIST, step, QUESTION_LIST],
    ref,
    { subscribe: true },
    { enabled: Boolean(step) },
  )
  questionList.sort((a: { questionSequence: number }, b: { questionSequence: number }) => {
    return a.questionSequence - b.questionSequence
  })

  return useMemo(() => {

    return {
      questionList,
      dataUpdatedAt,
      ...result,
    }
  },[dataUpdatedAt])
}

/** 문제 삭제 */
export const useDeleteQuestion = (subject: Subject | string, step: string, questionId = EMPTY_QUESTION_ID) => {
  const questionDocRef = getQuestionDocRef(subject, step, questionId)

  const {
    refetch: refetchQuestionList,
  } = useQuestionList(subject, step)
  const { mutate, ...result } = useFirestoreDocumentDeletion(questionDocRef, {
    onSuccess() {
      refetchQuestionList()
    }
  })

  return {
    ...result,
    deleteQuestion(options?: Parameters<typeof mutate>[1]) {
      if(!questionId || questionId === EMPTY_QUESTION_ID) return
      mutate(undefined, options)
    }
  }
}
