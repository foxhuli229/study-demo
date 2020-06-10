<script>
import request from '@/utils/request'
export default {
  functional: true,
  render(h, ctx) {
    console.log(ctx)
    let vnode = ''
    switch (ctx.props.type) {
      case 'el-input':
        vnode = ctx.children
        break
      case 'el-select':
        let options = ctx.props.optionConfig.options
        vnode = options.map(res => h('el-option', {
          attrs: {
            value: res[ctx.data.attrs.optionConfig.optionProps.value],
            label: res[ctx.data.attrs.optionConfig.optionProps.label]
          }
        }))
        break
    }
    return h(ctx.props.type, {
      model: ctx.data.model,
      attrs: {
        ...ctx.data.attrs.props
      },
      on: {
        ...ctx.data.on
      }
    }, vnode)
  }
}
</script>