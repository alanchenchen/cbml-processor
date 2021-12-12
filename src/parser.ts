import { parse as cbmlParse } from 'cbml'
import { IParserOptions } from 'cbml/lib/cbml'
import { CBMLNode } from './index.type'

/**
 * 解析代码片段包含的 CBML 元素
 * 
 * @param code
 * @param opts
 * @returns CBMLRootEle
 */
export const parseCBMLEle = (code: string, opts: IParserOptions): CBMLNode => {
  try {
    const res: any =  cbmlParse(code, opts)
    return res
  } catch (error) {
    throw new Error(error)
  }
}