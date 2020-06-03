/**
 * 广播事件
 * */
function broadcast(componentName, eventName, params) {
  // 遍历当前组件的子组件,并执行操作
  this.$children.forEach(child => {
    // 先取子组件的名称
    const name = child.$options.name

    // 如果子组件名称等于 componentName,那么子组件触发 eventName 事件,传入参数 params
    // 如果子组件名称不等于 componentName, 那么递归调用,查找孙组件
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      // todo 如果 params 是空数组，接收到的会是 undefined
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}
export default {
  methods: {
    // 触发 componentName 组件的 eventName 事件,参数是 params
    dispatch(componentName, eventName, params) {
      // 找寻当前组件的父组件,如果不存在,那么直接使用根组件,赋值给 parent
      let parent = this.$parent || this.$root
      // 取 parent 组件的名称
      let name = parent.$options.name
      // 传入的componentName为空时，直接去父，不再向上找
      if (componentName) {
        while (parent && (!name || name !== componentName)) { // 如果 parent 存在,但是 parent 名称没有或者不为指定值,那么循环,递归向上查找
          parent = parent.$parent
          if (parent) {
            name = parent.$options.name
          }
        }
      }
      // 如果 parent 存在,那么 parent 触发 eventName 事件并传入参数 params
      // [eventName].concat(params) 这里这么写的原因是,调用 apply 方法,参数是要作为一个数组,一次性传入的,也可以这么写:
      // parent.$emit.call(parent, eventName, params);
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    // 广播事件
    broadcast(componentName, eventName, params) {
      // 调用 broadcast 方法并传入对应的参数
      broadcast.call(this.$root, componentName, eventName, params)
    }
  }
}
