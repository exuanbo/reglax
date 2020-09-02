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
const {
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
} = require('reglax')

// or
import { something } from 'reglax'
```

### API

See generated [typedoc](https://exuanbo.github.io/reglax/modules/_index_.html).

### Examples

[test/index.spec.js](https://github.com/exuanbo/reglax/blob/master/test/index.spec.js) can be a good reference.

```js
regex(
  whole(
    or(numeric(7), capture(alpha(0, 3)), extra(matchers.ANY, matchers.LAZY))
  ),
  and(flags.GLOBAL, flags.INSENSITIVE)
)
// -> /^\d{7}|([A-z]{0,3})|.+?$/gi
```

```js
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

## License

[MIT](https://github.com/exuanbo/reglax/blob/master/LICENSE)

## Donate

<a href="https://www.buymeacoffee.com/exuanbo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" height="38.25px" width="162.75px"></a>
