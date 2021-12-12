import { ProcessorConfig, BuildReturn } from './index.type'

import { runTask } from './helper'

/**
 * 执行构建流程
 * 
 * @param config
 * @returns
 */
export const build = async (config: ProcessorConfig): Promise<BuildReturn[]> => {
  try {
    const { sources, plugins } = config
    const tasks: Array<Promise<BuildReturn>> = []
    for (const entry of sources) {
      tasks.push(runTask(entry, plugins))
    }
    return Promise.all(tasks)
  } catch (error) {
    return Promise.reject(error)
  }
}

export { parseCBMLEle } from './parser'
export { generateCode } from './generater'