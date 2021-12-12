import { Source, PluginFunc, CBMLNode, BuildReturn } from './index.type'

import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'

import { parseCBMLEle } from './parser'
import { generateCode } from './generater'

/**
 * 根据单个文件的配置项，顺序执行插件，并生成目标文件
 * 
 * @param source.input
 * @param source.output
 * @param plugins
 * @returns
 */
export const runTask = async ({ input, output }: Source, plugins: PluginFunc[]): Promise<BuildReturn> => {
  try {
    const inputPath = resolve(process.cwd(), input)
    const inputCode = await readFile(inputPath, { encoding: 'utf-8' })
    let CBMLRootEle: any = parseCBMLEle(inputCode, {
      range: true,
      source: false
    })

    for (const pluginFunc of plugins) {
      // 运行插件，操作AST
      const res = await pluginFunc(CBMLRootEle as CBMLNode, inputCode)
      if (res) {
        CBMLRootEle = res
      }
    }
    const outputCode = generateCode(CBMLRootEle as CBMLNode)
    if (output) {
      await writeFile(resolve(process.cwd(), output), outputCode)
    }
    return {
      input,
      output,
      outputCode
    }
  } catch (error) {
    return Promise.reject(error)
  }
}