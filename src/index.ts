const matchers = {
  ALL: capture(or('.', '\\s')),
  ANY: '.',
  LAZY: '?',
  GROUP: '?:',
  ALPHA: '[A-z]',
  NUMBER: '\\d',
  WORD: '\\w',
  WHITE_SPACE: '\\s',
  START: '^',
  END: '$',
  /**
   * Matches opposite of `matchers`
   *
   * ```js
   * regex(matchers.not.ALPHA) // -> '[^A-z]'
   * ```
   */
  not: {
    ALPHA: '[^A-z]',
    NUMBER: '\\D',
    WORD: '\\W',
    WHITE_SPACE: '\\S'
  }
}

const flags = {
  GLOBAL: 'g',
  MULTI_LINE: 'm',
  INSENSITIVE: 'i',
  STICKY: 'y',
  UNICODE: 'u'
}

/**
 * ```js
 * whole('sentence to match') // -> ^sentence to match$
 * ```
 */
function whole (text: string) {
  return `${matchers.START}${text}${matchers.END}`
}
/**
 * ```js
 * repeat('\\d') // -> \\d
 * repeat('\\d', 8) // -> \\d{8}
 * repeat('\\d', 1, 3) // -> \\d{1,3}
 * repeat('\\d', 1, Infinity) // -> \\d{1,}
 */
function repeat (text: string, start?: number, end?: number) {
  const finish = end ? (end === Infinity ? '' : end) : undefined

  return `${text}${start === undefined ? '' : `{${start}`}${
    finish !== undefined ? `,${finish}` : ''
  }${start === undefined ? '' : '}'}`
}

/**
 * Equivalent to `repeat.bind(null, '\\d')`
 */
const numeric = repeat.bind(null, matchers.NUMBER)
/**
 * Equivalent to `repeat.bind(null, '[A-z]')`
 */
const alpha = repeat.bind(null, matchers.ALPHA)

/**
 * ```js
 * and('a', 'b', 'c') // -> 'abc'
 * ```
 */
function and (...patterns: string[]) {
  return patterns.join('')
}
/**
 * ```js
 * or('a', 'b', 'c') // -> 'a|b|c'
 * ```
 */
function or (...patterns: string[]) {
  return patterns.join('|')
}

/**
 * ```js
 * wildcard('.') // -> '.*'
 * wildcard('.', true) // -> '.*?'
 * ```
 */
function wildcard (text: string, isLazy: boolean = false) {
  return `${text}*${isLazy ? matchers.LAZY : ''}`
}
/**
 * ```js
 * extra('.', matchers.LAZY) // -> '.+?'
 * extra('.', false) // -> '.+'
 * ```
 */
function extra (text: string, isLazy: boolean = false) {
  return `${text}+${isLazy ? matchers.LAZY : ''}`
}

/**
 * ```js
 * capture('\\d+?') // -> (\\d+?)
 * ```
 *
 * or you can name your capture group with `capture(pattern, name)`
 *
 * ```js
 * capture('\\d+?', 'number') // -> (?<number>\\d+?)
 * ```
 */
function capture (text: string, name?: string) {
  return text && text.length
    ? `(${typeof name === 'string' ? `?<${name}>` : ''}${text})`
    : ''
}

/**
 * Similar to a capture(...), but won't keep the capture within the parentheses
 *
 * ```js
 * group('.|\\s') // -> (?:.|\\s)
 * ```
 */
function group (text: string) {
  return text && text.length ? `(${matchers.GROUP}${text})` : ''
}

/**
 * @ignore
 */
const lookPattern = (posOrNeg: boolean, behindOrAhead: boolean) => (
  text: string
) => `(?${behindOrAhead ? '<' : ''}${posOrNeg ? '=' : '!'}${text})`

/**
 * @ignore
 */
const looker = (bOa: boolean) =>
  Object.assign(lookPattern(true, bOa), {
    positive: lookPattern(true, bOa),
    negative: lookPattern(false, bOa)
  })

/**
 * Creates a [negative or positive look-ahead](https://www.stefanjudis.com/today-i-learned/the-complicated-syntax-of-lookaheads-in-javascript-regular-expressions/)
 *
 * ```js
 * look.ahead.positive('Y') === look.ahead('Y') // -> '(?=y)'
 * look.ahead.negative('Y') // -> '(?!y)'
 * look.behind.positive('Y') === look.behind('Y') // -> '(?<=y)'
 * look.behind.negative('Y') // -> '(?<!y)'
 * ```
 */
const look = {
  ahead: looker(false),
  behind: looker(true)
}

/**
 * Equal to `RegExp()` constructor
 */
function regex (pattern: string | RegExp, flag?: string) {
  return new RegExp(pattern, flag)
}

export {
  matchers,
  flags,
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
  look,
  regex
}
