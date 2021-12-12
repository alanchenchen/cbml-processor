const { readFile } = require('fs/promises')
const { parseCBMLEle } = require('../lib/parser')
const { resolve } = require('path')

let BlockEle
let TextEle
let VoidEle
let CommentEle

beforeAll(async () => {
  const demoPath = resolve(__dirname, './parse.demo.js')
  const code = await readFile(demoPath, { encoding: 'utf-8' })
  const { body } = parseCBMLEle(code)
  CommentEle = body[0]
  TextEle = body[1]
  VoidEle = body[2]
  BlockEle = body[4]
})

describe('test CBML parser', () => {
  test('parse CBML CommentElement', async () => {
    expect(CommentEle).toHaveProperty('type', 'CommentElement')
    expect(CommentEle).toHaveProperty('tag', 'visible')
    expect(CommentEle).toHaveProperty('attributes', {
      lib: {
        value: 'golang',
        quoted: `'`
      }
    })
  })

  test('parse CBML TextNode', async () => {
    expect(TextEle).toHaveProperty('type', 'TextNode')
    expect(TextEle.content).toMatchSnapshot()
  })

  test('parse CBML VoidElement', async () => {
    expect(VoidEle).toHaveProperty('type', 'VoidElement')
    expect(VoidEle).toHaveProperty('tag', 'do')
    expect(VoidEle).toHaveProperty('attributes', {})
  })

  test('parse CBML BlockElement', async () => {
    expect(BlockEle).toHaveProperty('type', 'BlockElement')
    expect(BlockEle).toHaveProperty('tag', 'block')
    expect(BlockEle).toHaveProperty('attributes', {})
  })

  test('parse return null while with null code', () => {
    expect(parseCBMLEle()).toBeNull()
  })
})