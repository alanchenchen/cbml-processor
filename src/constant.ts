import { Language } from 'cbml/lib/ast'
import { EmptyCBMLNode, CBMLNode } from './index.type'

const commnetLocFlag: Record<Language, { start: string; end: string }> = {
  c: {
    start: '/*',
    end: '*/'
  },
  pascal: {
    start: '(*',
    end: '*)'
  },
  xml: {
    start: '<!--',
    end: '-->'
  },
  python: {
    start: `'''`,
    end: `'''`
  },
  lua: {
    start: '--[[',
    end: ']]'
  },
  cbml: {
    start: '/*',
    end: '*/'
  }
}

export const languageCommentLocFlag = (language: Language) => {
  return commnetLocFlag[language]
}

// 空状态的CBML节点
export const emptyCBMLNode: CBMLNode = {
  type: 'CBMLElement',
  attributes: {},
  tag: '',
  language: 'cbml',
  body: [],
  content: '',
}

// 空状态的Block节点
export const emptyBlockNode = (opt: EmptyCBMLNode = {
  tag: '',
  attributes: {},
  body: [],
}): CBMLNode => {
  return {
    type: 'BlockElement',
    tag: opt.tag,
    attributes: opt.attributes,
    body: opt.body,
  }
}

// 空状态的Text节点
export const emptyTextNode = (opt: EmptyCBMLNode = {
  content: '',
}): CBMLNode => {
  return {
    type: 'TextNode',
    content: opt.content,
  }
}