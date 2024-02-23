/**
 * Answer type
 */
export interface answer {
    active: boolean
    description: string,
    id: number,
    order: number,
    questionId: number,
}

/**
 * Question type
 */
export interface question {
    active: boolean,
    answers: answer[]
    description: string,
    id: number,
    order: number,
    questionnaireId: number,
}

/**
 * Questioner Type
 */
export interface questionnaire {
    active: boolean
    description: string,
    id: number,
    name: string,
    questions: question[],
}

/**
 *  Reply question type
 */
export interface replyQuestioner {
    answers: string[],
    emailAddress: string,
    questionnaireId: number,
    questions: string[]
}

/**
 * Analysis type
 */
export interface analysis {
    analysis: string
}

/**
 * Analysis parsed type
 */
export interface analisysParsed {
    content: string,
    role: string,
}