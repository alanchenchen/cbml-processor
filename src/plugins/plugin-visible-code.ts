import { CBMLNode, } from '../index.type'
import { Attributes } from 'cbml/lib/ast'
import { emptyTextNode } from '../constant'

interface VisibleCodeOpt {
  filter?: (attrs: Attributes) => boolean;
}

const visibleTag = 'visible'

/**
 * 控制CBML注释元素是否展示内代码的插件，CBML注释元素必须为visible标签
 * 
 * @param opts.visible 是否显示CBML注释元素的内代码，回调函数参数是attrs对象，默认返回true
 * @returns CBMLRootNode
 */
const visibleCodePlugin = ({
  filter = () => true
}: VisibleCodeOpt = {}) => {
  return async (CBMLRootNode: CBMLNode) => {
    try {
      CBMLRootNode.body.forEach((node, i) => {
        const { type, body, tag, attributes } = node
        const [textChild] = body || [{ type }]
        // 仅当匹配tag为visible，且当前节点只有一个子节点(CBML文本元素)
        if (
          tag === visibleTag &&
          body.length === 1 &&
          textChild.type === 'TextNode'
        ) {
          // 如果匹配CBML复合注释元素或CBML块元素，并且filter为true。则转换当前节点为CBML文本元素，并打上pin注释
          if (
            (type === 'CommentElement' && filter(attributes)) ||
            type === 'BlockElement' && filter(attributes)
          ) {
            const { pin } = attributes
            const text = pin ? `// ${pin.value}${textChild.content}` : textChild.content
            CBMLRootNode.body[i] = emptyTextNode({
              content: text
            })
          }
          // 如果匹配CBML块元素，并且filter为false，则注释掉子节点的文本
          else if (
            type === 'BlockElement' &&
            !filter(attributes)
          ) {
            CBMLRootNode.body[i].body[0].content = `/*${textChild.content}*/`
          }
        }
      })
      return CBMLRootNode
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default visibleCodePlugin