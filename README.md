# reglax

> ☕ Relax and write some Regex

[![npm](https://img.shields.io/npm/v/reglax.svg?style=flat-square)](https://www.npmjs.com/package/reglax)
[![Travis CI](https://img.shields.io/travis/com/exuanbo/reglax/master.svg?style=flat-square)](https://travis-ci.com/github/exuanbo/reglax)
[![David](https://img.shields.io/david/dev/exuanbo/reglax.svg?style=flat-square)](https://david-dm.org/exuanbo/reglax)
[![License](https://img.shields.io/github/license/exuanbo/reglax.svg?style=flat-square)](https://github.com/exuanbo/reglax/blob/master/LICENSE)

Creates regular expressions that are composable, reusable, and commentable.

## Usage

```sh
npm install reglax
```

```js
const reglax = require('reglax')
// or
import reglax from 'reglax'
```

### API

See generated [typedoc](https://exuanbo.github.io/reglax/).

### Examples

[test/index.spec.js](https://github.com/exuanbo/reglax/blob/master/test/index.spec.js) can be a good reference.

```javascript
// found in `graphql-types-drivers-license`

// Matches all New York Driver's licenses
regex(
  or(
    and(alpha(1), numeric(7)),
    and(alpha(1), numeric(18)),
    and(numeric(8, 9)),
    and(numeric(16)),
    and(alpha(8))
  )
)
// -> /[A-z]{1}\d{7}|[A-z]{1}\d{18}|\d{8,9}|\d{16}|[A-z]{8}/
```

```javascript
// matches GraphQL queries/mutations

regex(
  and(
    capture(
      and(
        capture(or(...GQL_TYPES)),
        extra(SPACE),
        extra(WORD),
        extra(SPACE),
        wildGroup(and('on', extra(SPACE), extra(WORD)))
      )
    ),
    wildcard(SPACE),
    wildGroup(
      and(
        extraGroup(and('{', extraGroup(CHARS))),
        extraGroup(and('}', extraGroup(CHARS)))
      )
    ),
    '}'
  ),
  flags.GLOBAL
)

// -> /((fragment|query|mutation|subscription)\s+\w+\s+(on\s+\w+)*)\s*(({(\s|\w|(".*")|:|,|\.|\)|\()+)+(}(\s|\w|(".*")|:|,|\.|\)|\()+)+)+}/g
```
