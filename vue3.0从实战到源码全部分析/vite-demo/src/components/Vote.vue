<template>
  <div>
    <h3>标题</h3>
    <div>
        <p>支持人数: {{supNum}}</p>
        <p>反对人数: {{oppNum}}</p>
        <p>支持率： ---</p>
        <button @click="changeClick(1)">支持</button>
        <button @click="changeClick(0)">反对</button>
    </div>
  </div>
</template>

<script>
import {watchEffect, ref, reactive, toRefs} from 'vue';

export default {
    props: {
        title: {
            type: String
        }
    },
    /**
     * 初始化props和beforeCreate之间
     * 在create之前，beforeCreate之前
     */
    setup(props) {
        //基于poxy代理的响应式数据
        console.log(props);
        let supNum = ref(0);
        let oppNum = ref(0);
        const state = reactive({
            supNum: 0,
            oppNum: 0,
        })
        
        function changeClick(lx) {
            lx === 1 ? supNum.value++ : oppNum.value++ 
        }

        //把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref ，和响应式对象 property 一一对应。
        // toRefs(state);
        return {supNum, oppNum, ... toRefs(state),  changeClick}
    }
};
</script>

<style></style>
