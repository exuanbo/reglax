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
} = require('..')
const expect = require('chai').expect

describe('reglax', () => {
  it('regex', () => {
    const rex = regex(
      whole(
        or(numeric(7), capture(alpha(0, 3)), extra(matchers.ANY, matchers.LAZY))
      ),
      and(flags.GLOBAL, flags.INSENSITIVE)
    )
    expect(rex).to.deep.equal(/^\d{7}|([A-z]{0,3})|.+?$/gi)
  })

  it('wildcard and lazy matchers', () => {
    const rex = or(wildcard('2', matchers.LAZY), extra('4', false))
    expect(rex).to.equal('2*?|4+')
    const anotherRex = or(wildcard('2'), extra('4', true))
    expect(anotherRex).to.equal('2*|4+?')
  })

  it('flags', () => {
    expect(flags).to.deep.equal({
      GLOBAL: 'g',
      MULTI_LINE: 'm',
      INSENSITIVE: 'i',
      STICKY: 'y',
      UNICODE: 'u'
    })
  })

  it('capture/group', () => {
    expect(capture('test')).to.equal('(test)')
    expect(capture('')).to.equal('')
    expect(capture()).to.equal('')
    expect(capture('\\d+', 'number')).to.equal('(?<number>\\d+)')
    expect(capture('\\d+', {})).to.equal('(\\d+)')
    expect(group('test')).to.equal('(?:test)')
    expect(group()).to.equal('')
  })

  it('ALL', () => expect(matchers.ALL).to.equal('(.|\\s)'))

  it('Repeat', () => {
    expect(repeat('8')).to.equal('8')
    expect(repeat('8', 1)).to.equal('8{1}')
    expect(repeat('8', 1, 2)).to.equal('8{1,2}')
    expect(repeat('8', 1, Infinity)).to.equal('8{1,}')
  })

  it('Look ahead/behind', () => {
    expect(look.ahead('8')).to.equal('(?=8)')
    expect(look.ahead.positive('8')).to.equal('(?=8)')
    expect(look.ahead.negative('8')).to.equal('(?!8)')
    expect(look.behind('8')).to.equal('(?<=8)')
    expect(look.behind.positive('8')).to.equal('(?<=8)')
    expect(look.behind.negative('8')).to.equal('(?<!8)')
  })
})
