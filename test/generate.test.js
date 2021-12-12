const { readFile } = require('fs/promises')
const { resolve } = require('path')
const { parseCBMLEle } = require('../lib/parser')
const { generateCode } = require('../lib/generater')

let CBMLRootEle

beforeAll(async () => {
  const demoPath = resolve(__dirname, './parse.demo.js')
  const code = await readFile(demoPath, { encoding: 'utf-8' })
  CBMLRootEle = parseCBMLEle(code)
})

describe('test CBML generater', () => {
  test('generate CBML Snapshot', () => {
    expect(generateCode(CBMLRootEle)).toMatchSnapshot()
  })
})