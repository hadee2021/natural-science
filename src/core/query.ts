import { fireStore, getDefaultConverter } from '../core/firestore'
import { 
  collection, where, query, doc, QueryConstraint, orderBy, OrderByDirection
} from 'firebase/firestore'
import { nanoid } from 'nanoid'
import { 
  useFirestoreQueryData,
  useFirestoreDocumentMutation,
  useFirestoreDocumentData,
  useFirestoreDocumentDeletion
} from "@react-query-firebase/firestore"
import { hash } from './util'
import { useMemo } from 'react'
import { useDeepCompareMemo } from 'use-deep-compare'

const ROOT_USER = 'users'
const userConverter = getDefaultConverter<User>()
const EMPTY_USER_ID = 'EMPTY_USER_ID'
const CHECK_QUESTION_SUBJECT = '체크한 과목'
const EMPTY_QUESTION_SUBJECT = 'EMPTY_QUESTION_SUBJECT'
const CHECK_QUESTION_LIST = '체크한 문제'

const ROOT_QUESTION = 'questions'
const questionConverter = getDefaultConverter<Question>()
const EMPTY_SUBJECT = 'EMPTY_SUBJECT'
const STEP_LIST = '단원'
const EMPTY_STEP = 'EMPTY_STEP'
const QUESTION_LIST = '문제'
const EMPTY_QUESTION_ID = 'EMPTY_QUESTION_ID'

const ROOT_QUESTIONBOOK = 'questionBook'
const questionBookConverter = getDefaultConverter<QuestionBook>()
const EMPTY_QUESTIONBOOK_SUBJECT = 'EMPTY_QUESTIONBOOK_SUBJECT'
const QUESTION_BOOK = '문제집'
const EMPTY_QUESTIONBOOK_ID = 'EMPTY_QUESTIONBOOK_ID'

const getUserCollectionRef = () => (
  collection(fireStore, ROOT_USER).withConverter(userConverter)
)

const getUserDocRef = (userId: string) => (
  doc(fireStore, ROOT_USER, userId || EMPTY_USER_ID).withConverter(userConverter)
)

const getUserCheckCollectionRef = (userId: string, questionSubject: string) => {
  return collection(
    fireStore,
    ROOT_USER,
    userId || EMPTY_USER_ID,
    CHECK_QUESTION_SUBJECT,
    questionSubject || EMPTY_QUESTION_SUBJECT,
    CHECK_QUESTION_LIST
  )
}

const getUserCheckDocRef = (userId: string, questionSubject: string, questionId: string) => {
  return doc(
    fireStore,
    ROOT_USER,
    userId || EMPTY_USER_ID,
    CHECK_QUESTION_SUBJECT,
    questionSubject || EMPTY_QUESTION_SUBJECT,
    CHECK_QUESTION_LIST,
    questionId || EMPTY_QUESTION_ID
  )
}

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

const getQuestionBookCollectionRef = (subject: Subject | string) => {
  return collection(
    fireStore,
    ROOT_QUESTIONBOOK,
    subject || EMPTY_QUESTIONBOOK_SUBJECT,
    QUESTION_BOOK
  ).withConverter(questionBookConverter)
}

const getQuestionBookDocRef = (subject: Subject | string, questionBookId: string) => {
  return doc(
    fireStore,
    ROOT_QUESTIONBOOK,
    subject || EMPTY_QUESTIONBOOK_SUBJECT,
    QUESTION_BOOK,
    questionBookId || EMPTY_QUESTIONBOOK_ID
  ).withConverter(questionBookConverter)
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
        author: false
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

/** User 체크한 문제 추가 */

export const useAddCheckQuestion = (userId: string, questionSubject: string, questionId: string) => {
  const checkDocRef = getUserCheckDocRef(userId, questionSubject, questionId)

  const { mutate, ...result } = useFirestoreDocumentMutation(checkDocRef, { merge: true })

  return {
    ...result,
    questionId,
    addCheckQuestion(questionForm: Question, options?: Parameters<typeof mutate>[1]) {
      mutate({ ...questionForm, id: questionId}, options)
    }
  }
}
/** User 체크한 문제 가져오기 */

export const useCheckQuestionList = (userId: string, questionSubject: string, sortKey:string, order:OrderByDirection) => {
  const checkCollectionRef = getUserCheckCollectionRef(userId, questionSubject)
  
  const queryConstraints = useDeepCompareMemo(() => {
    const constraints: QueryConstraint[] = []
    constraints.push(orderBy(sortKey, order))

    return constraints
  },[sortKey, order])

  // const constraints: QueryConstraint[] = []
  // constraints.push(orderBy(sortKey, order))
  // const queryConstraints = constraints

  const ref = query(
    checkCollectionRef,
    ...queryConstraints
  )

  const {
    data: checkQuestionList = [],
    dataUpdatedAt,
    ...result
  } = useFirestoreQueryData(
    [ROOT_USER, userId, CHECK_QUESTION_SUBJECT, questionSubject, CHECK_QUESTION_LIST],
    ref,
    { subscribe: true },
    { enabled: Boolean(userId) },
  )

  // 가져와서 정렬 
  checkQuestionList.sort((a: { [sortKey:string]: number }, b: { [sortKey:string]: number }) => {
    if(order === 'desc') return b[sortKey] - a[sortKey]
    return a[sortKey] - b[sortKey]
  })

  return useMemo(() =>{
    return {
      checkQuestionList,
      dataUpdatedAt,
      ...result,
    }
  },[dataUpdatedAt])
}

/** User 체크한 문제 삭제 */

export const useDeleteCheckQuestion = (userId: string, questionSubject: string, questionId: string, sortKey:string ,order: OrderByDirection) => {
  const checkDocRef = getUserCheckDocRef(userId, questionSubject, questionId)

  const {
    refetch: refetchCheckQuestionList
  } = useCheckQuestionList(userId, questionSubject, sortKey, order)

  const { mutate, ...result } = useFirestoreDocumentDeletion(checkDocRef, {
    onSuccess() {
      refetchCheckQuestionList()
    }
  })

  return {
    ...result,
    deleteCheckQuestion(options?: Parameters<typeof mutate>[1]) {
      if(!questionId || questionId === EMPTY_QUESTION_ID) return
      mutate(undefined, options)
    }
  }

}



/** 문제 추가 및 수정 */

export const useEditQuestion = (subject: Subject | string, step: string, questionId?: string) => {
  const questionDocId = questionId  ?? nanoid(5)
  const questionDocRef = getQuestionDocRef(subject, step, questionDocId)

  const { mutate, ...result } = useFirestoreDocumentMutation(questionDocRef, { merge: true })

  return {
    ...result,
    questionDocId,
    editQuestion (questionForm: Question, options?: Parameters<typeof mutate>[1]) {
      mutate({ ...questionForm, id: questionDocId}, options)
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

/** 문제집 추가 및 수정 */

export const useEditQuestionBook = (subject: Subject | string, questionBookId?: string) => {
  const questionBookDocId = questionBookId ?? nanoid(5)
  const questionBookDocRef = getQuestionBookDocRef(subject, questionBookDocId)

  const { mutate, ...result } = useFirestoreDocumentMutation(questionBookDocRef, { merge: true })
  
  return {
    ...result,
    questionBookDocId,
    editQuestionBook(questionBookForm: QuestionBook, options?: Parameters<typeof mutate>[1]) {
      mutate({...questionBookForm, id: questionBookDocId}, options)
    }
  }
}

/** 과목별 문제집 가져오기 */

export const useQuestionBookList = (subject: Subject | string) => {
  const questionBookCollectionRef = getQuestionBookCollectionRef(subject)

  const constraints: QueryConstraint[] = []
  constraints.push(orderBy('questionBookSeq', 'asc'))
  const queryConstraints = constraints

  const ref = query(
    questionBookCollectionRef,
    ...queryConstraints
  )

  const {
    data: questionBookList = [],
    dataUpdatedAt,
    ...result
  } = useFirestoreQueryData(
    [ROOT_QUESTIONBOOK, subject, QUESTION_BOOK],
    ref,
    { subscribe: true },
    { enabled: Boolean(subject) },
  )

  questionBookList.sort((a: { questionBookSeq: number }, b: { questionBookSeq: number }) => {
    return a.questionBookSeq - b.questionBookSeq
  })

  return useMemo(() => {

    return {
      questionBookList,
      dataUpdatedAt,
      ...result,
    }
  },[dataUpdatedAt])

}

/** 과목별 문제집 삭제 */

export const useDeleteQuestionBook = (subject: Subject | string, questionBookId = EMPTY_QUESTIONBOOK_ID) => {
  const questionBookDocRef = getQuestionBookDocRef(subject, questionBookId)
  const {
    refetch: refetchQuestionBookList,
  } = useQuestionBookList(subject)

  const { mutate, ...result } = useFirestoreDocumentDeletion(questionBookDocRef, {
    onSuccess() {
      refetchQuestionBookList()
    }
  })

  return {
    ...result,
    deleteQuestionBook(options?: Parameters<typeof mutate>[1]) {
      if(!questionBookId || questionBookId === EMPTY_QUESTIONBOOK_ID) return
      mutate(undefined, options)
    }
  }
}
