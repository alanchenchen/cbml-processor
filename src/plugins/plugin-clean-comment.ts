import { CBMLNode } from '../index.type'

interface CleanCommentOpts {
  removeBlankBlock?: boolean;
  removeBlockElement?: boolean;
  removeVoidElement?: boolean;
  removeCommentElement?: boolean;
}

/**
 * 删除CBML注释代码的插件，由于会影响到其余插件，所有可选项默认都为false，建议放到plugins尾部执行
 * 
 * @param opts.removeBlankBlock 是否删除空白行
 * @param opts.removeBlockElement 是否删除CBML块元素，块注释内可包含所有元素
 * @param opts.removeVoidElement 是否删除CBML自闭合元素
 * @param opts.removeCommentElement 是否删除CBML注释元素
 * @returns CBMLRootNode
 */
const cleanCBMLPlugin =  ({
  removeBlankBlock = false,
  removeBlockElement = false,
  removeVoidElement = false,
  removeCommentElement = false
}: CleanCommentOpts = {}) => {
  return async (CBMLRootNode: CBMLNode) => {
    try {
      CBMLRootNode.body.forEach((node, i) => {
        const shouldRemoveNode =
          node.type === 'CBMLElement' ||
          (node.type === 'BlockElement' && removeBlockElement) ||
          (node.type === 'VoidElement' && removeVoidElement) ||
          (node.type === 'CommentElement' && removeCommentElement)

        if (shouldRemoveNode) {
          CBMLRootNode.body.splice(i, 1)
        }
        if (removeBlankBlock) {
          CBMLRootNode.content = CBMLRootNode.content?.trim() || ''
        }
      })
      return CBMLRootNode
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default cleanCBMLPlugin