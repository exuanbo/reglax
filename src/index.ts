const ALPHA = '[A-z]'
const NOT_ALPHA = '[^A-z]'
const WORD = '\\w'
const NOT_WORD = '\\W'
const NUMBER = '\\d'
const NOT_NUMBER = '\\D'
const WHITE_SPACE = '\\s'
const NOT_WHITE_SPACE = '\\S'
const ANY = '.'
const START = '^'
const END = '$'
const LAZY = '?'
const GROUP = '?:'

const whole = (text: string) => `${START}${text}${END}`
const repeat = (text: string, start?: number, end?: number) => {
  const finish = end ? (end === Infinity ? '' : end) : undefined

  return `${text}${start === undefined ? '' : `{${start}`}${
    finish !== undefined ? `,${finish}` : ''
  }${start === undefined ? '' : '}'}`
}

const numeric = repeat.bind(null, NUMBER)
const alpha = repeat.bind(null, ALPHA)

const and = (...patterns: string[]) => patterns.join('')
const or = (...patterns: string[]) => patterns.join('|')

const wildcard = (text: string, isLazy: boolean = false) =>
  `${text}*${isLazy ? LAZY : ''}`
const extra = (text: string, isLazy: boolean = false) =>
  `${text}+${isLazy ? LAZY : ''}`

const capture = (text: string, name?: string) =>
  text && text.length
    ? `(${typeof name === 'string' ? `?<${name}>` : ''}${text})`
    : ''

const group = (text: string) => (text && text.length ? `(${GROUP}${text})` : '')

const ALL = capture(or(ANY, WHITE_SPACE))

const look = (posOrNeg: boolean, behindOrAhead: boolean) => (text: string) =>
  `(?${behindOrAhead ? '<' : ''}${posOrNeg ? '=' : '!'}${text})`

const looker = (bOa: boolean) =>
  Object.assign(look(true, bOa), {
    positive: look(true, bOa),
    negative: look(false, bOa)
  })

const regex = (pattern: string | RegExp, flag?: string) =>
  new RegExp(pattern, flag)

export default {
  whole,
  repeat,
  alpha,
  numeric,
  and,
  or,
  wildcard,
  extra,
  capture,
  group,
  look: {
    ahead: looker(false),
    behind: looker(true)
  },
  matchers: {
    ALL,
    ANY,
    LAZY,
    GROUP,
    ALPHA,
    NUMBER,
    WORD,
    WHITE_SPACE,
    START,
    END,
    not: {
      ALPHA: NOT_ALPHA,
      NUMBER: NOT_NUMBER,
      WORD: NOT_WORD,
      WHITE_SPACE: NOT_WHITE_SPACE
    }
  },
  flags: {
    GLOBAL: 'g',
    MULTI_LINE: 'm',
    INSENSITIVE: 'i',
    STICKY: 'y',
    UNICODE: 'u'
  },
  regex
}
