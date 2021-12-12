import { build } from '../src'
import visibleCode from '../src/plugins/plugin-visible-code'
import cleanComment from '../src/plugins/plugin-clean-comment'

build({
  sources: [
    { input: './example/demo.js', output: './example/demo.new.js' },
    { input: './example/demo.js' } // output缺失则不会写入code到文件，会返回code string
  ],
  plugins: [
    visibleCode({
      filter: (attrs) => attrs.lib.value !== 'XBridge'
    }),
    cleanComment({
      removeBlankBlock: false,
      removeBlockElement: true,
      removeCommentElement: false,
      removeVoidElement: false
    })
  ]
}).then((res) => {
  // console.log(res)
  console.log('build complete.')
}).catch(err => {
  console.log('build errors', err)
})