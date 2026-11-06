import englishJson from '../../../../data/english-questions.json'
import generalJson from '../../../../data/general-questions.json'
import type { ExamData, ExamMeta, Question, Subject } from '@/types/quiz'

interface NestedExamFile {
  subject: Subject
  exam: ExamMeta & { questions: Question[] }
}

interface FlatExamFile {
  subjectid: string
  title: string
  examid: string
  title_exam: string
  order: number
  questionCount: number
  questions: Question[]
}

export interface SubjectGroup {
  subject: Subject
  exams: ExamData[]
}

const englishUnitTranslations: Record<string, string> = {
  'Unit 1: The English Alphabet & Letter Forms':
    'الوحدة الأولى: الحروف الإنجليزية وأشكالها',
  'Unit 2: Subject Pronouns & Sentence Structure':
    'الوحدة الثانية: ضمائر الفاعل وبنية الجملة',
  'Unit 3: Possessive Adjectives': 'الوحدة الثالثة: صفات الملكية',
  'Unit 4: Present Tense - Verb to Be':
    'الوحدة الرابعة: المضارع - فعل الكينونة (to be)',
  'Unit 5: Past Tense - Verb to Be':
    'الوحدة الخامسة: الماضي - فعل الكينونة (to be)',
  'Unit 6: Definite Article (The)': 'الوحدة السادسة: أداة التعريف (The)',
  'Unit 7: Question Words & Answers': 'الوحدة السابعة: أدوات الاستفهام والإجابات',
  'Unit 8: Common Verbs & Meanings': 'الوحدة الثامنة: الأفعال الشائعة ومعانيها',
  'Unit 9: Days of the Week': 'الوحدة التاسعة: أيام الأسبوع',
  'Unit 10: Food, Drink & Restaurant Vocabulary':
    'الوحدة العاشرة: مفردات الطعام والشراب والمطاعم',
  'Unit 11: Colors Vocabulary': 'الوحدة الحادية عشرة: مفردات الألوان',
  'Unit 12: Numbers & Money': 'الوحدة الثانية عشرة: الأرقام والنقود',
  'Unit 13: Common Nouns & Places':
    'الوحدة الثالثة عشرة: الأسماء الشائعة والأماكن',
}

function getUnitNumber(unit: string): number {
  const match = unit.match(/Unit\s+(\d+)/i)
  return match?.[1] ? Number(match[1]) : Number.MAX_SAFE_INTEGER
}

function getUnitTitle(unit: string): string {
  return englishUnitTranslations[unit] ?? unit
}

function splitEnglishUnits(raw: NestedExamFile): ExamData[] {
  const grouped = new Map<string, Question[]>()

  for (const question of raw.exam.questions) {
    const unitQuestions = grouped.get(question.unit)

    if (unitQuestions) {
      unitQuestions.push(question)
    } else {
      grouped.set(question.unit, [question])
    }
  }

  return [...grouped.entries()]
    .sort(([firstUnit], [secondUnit]) => {
      return getUnitNumber(firstUnit) - getUnitNumber(secondUnit)
    })
    .map(([unit, questions], index) => {
      const unitNumber = getUnitNumber(unit)
      const order =
        unitNumber === Number.MAX_SAFE_INTEGER ? index + 1 : unitNumber
      const title = getUnitTitle(unit)

      return {
        subject: {
          id: raw.subject.id,
          title: 'الإنجليزية',
        },
        exam: {
          id: `${raw.subject.id}-unit-${order}`,
          title,
          order,
          questionCount: questions.length,
        },
        questions: questions.map((question) => ({
          ...question,
          unit: title,
        })),
      }
    })
}

function normalizeGeneralExam(raw: FlatExamFile): ExamData {
  return {
    subject: {
      id: raw.subjectid,
      title: raw.title,
    },
    exam: {
      id: raw.examid,
      title: raw.title_exam,
      order: raw.order,
      questionCount: raw.questions.length,
    },
    questions: raw.questions,
  }
}

const englishExams = splitEnglishUnits(englishJson as unknown as NestedExamFile)
const generalExam = normalizeGeneralExam(generalJson as unknown as FlatExamFile)

export const exams: ExamData[] = [...englishExams, generalExam]

export const defaultExam = englishExams[0] ?? generalExam

export function getExamById(examId: string): ExamData | undefined {
  return exams.find((exam) => exam.exam.id === examId)
}

export function getSubjectGroups(): SubjectGroup[] {
  const groups = new Map<string, SubjectGroup>()

  for (const exam of exams) {
    const group = groups.get(exam.subject.id)

    if (group) {
      group.exams.push(exam)
    } else {
      groups.set(exam.subject.id, {
        subject: exam.subject,
        exams: [exam],
      })
    }
  }

  return [...groups.values()]
}
