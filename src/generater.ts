import { CBMLNode } from './index.type'
import { languageCommentLocFlag } from './constant'

/**
 * 基于CBML-AST的CBMLNodeList递归生成code block string
 * 
 * @param CBMLNodeList
 * @param codeBlockList
 * @todo 需要优化成尾递归
 */
const generateCodeRecursivly = (
  CBMLNodeList: CBMLNode[],
  codeBlockList: string[]
) => {
  try {
    for (const CBMLChildNode of CBMLNodeList) {
      const {
        type,
        attributes,
        tag,
        body,
        language,
        content
      } = CBMLChildNode
      if (type === 'TextNode') {
        codeBlockList.push(content.trim())
      } else {
        let commentLeftCode = ''
        let commentRightCode = ''

        const attrCode = Object.entries(attributes).reduce((total, item) => {
          const key = item[0]
          const val = item[1]
          return total += ` ${key}=${val.quoted}${val.value}${val.quoted}`
        }, '')

        switch (type) {
          case 'BlockElement':
            commentLeftCode =
              languageCommentLocFlag(language).start +
              `<${tag}` +
              attrCode +
              '>' +
              languageCommentLocFlag(language).end

            commentRightCode =
              languageCommentLocFlag(language).start +
              `</${tag}>` +
              languageCommentLocFlag(language).end
            break
          case 'CommentElement':
            commentLeftCode =
              languageCommentLocFlag(language).start +
              `<${tag}` +
              attrCode +
              '>'

            commentRightCode =
              `</${tag}>` +
              languageCommentLocFlag(language).end
            break
          case 'VoidElement':
            commentLeftCode =
              languageCommentLocFlag(language).start +
              `<${tag}` +
              attrCode +
              ` />` +
              languageCommentLocFlag(language).end

            commentRightCode = undefined
            break
        }

        codeBlockList.push(commentLeftCode)
        // 如果存在body，则递归补充到数组
        if (Array.isArray(body)) {
          generateCodeRecursivly(body, codeBlockList)
        }
        // 如果需要右侧闭合代码，则push，VoidElement不需要，因为自闭合
        if (commentRightCode !== undefined) {
          codeBlockList.push(commentRightCode)
        }
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * 基于CBML的AST tree，生成code string
 * 
 * @param CBMLRootNode
 * @returns
 */
export const generateCode = (CBMLRootNode: CBMLNode): string => {
  try {
    const genCodeList: string[] = [];
    generateCodeRecursivly(CBMLRootNode.body, genCodeList)
    return genCodeList.join('\r\n')
  } catch (error) {
    console.log('generate code errors: ', error)
    throw new Error(error)
  }
}
