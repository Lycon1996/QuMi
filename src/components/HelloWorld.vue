<template>
  <div class="hello">
    <h3 style="text-align:center">天禾人二期Part2系统功能与可行性分析</h3>
    <br>
    <article class="">
      <div class="part">
        <h4>1.页面自动分页并标志到指定位置</h4>
        <p style="text-indent: 2em">原来的计划是当跳转到瀑布流列表页时先从第一页加载到所点击数据所在的页数，再滚动到相应的位置。这样做有一个最大的问题
          ，如果所点击的数据所在的页码很靠后时，页面渲染的时间则会变长，同事违背了分页式布局的初衷。所以笔者将思路更改为，当用
          户点击数据，跳转到瀑布流页面时，只加载所在的当前页，上拉和下拉是分别加载上下页的数据，当页码为1时执行刷新。在下面输入
          框中输入一个数字后点击跳转可以查看效果。
        </p>
        <p>
          <input type="number" name="" value="" v-model="id">
          <router-link :to="{ path: '/scrollLoadDemo', query: {id: id}  }">跳转到瀑布流</router-link>
        </p>
      </div>
      <div class="part">
        <h4>2.左滑事件和单击事件冲突</h4>
        <p style="text-indent: 2em">其实在Vue的组件中有许多强大的点击组件去实现左滑功能。但是为了照顾敲到没朋友的小程序，笔者自己封装了左滑事件的判断
        和点击事件的判断。原理其实很简单，原生JS中Click事件其实可分为touchStart,touchMove,touchEnd三个事件。我们通过touchStart中
        点击对应的位置pageX和pageY,去对比touchMove中pageX和pageY,并且自定义一个长度作为滑动的最低距离，根据正负去判断往哪个方向活动
        ,当小于最低滑动距离时则判断位点击事件。<router-link :to="{ path: '/leftScrollDemo', params: {} }">侧滑Demo</router-link>
        </p>
        <p>轻量级touch触发事件组件Github:<a href="https://github.com/qingyangmoke/vue-plugin-touch"  target="view_window">https://github.com/qingyangmoke/vue-plugin-touch</a></p>
      </div>
      <div class="part">
        <h4>3.input框自动调整高度</h4>
        <p style="text-indent: 2em">之前有试过input和textarea，但是效果都不是很好，大部分都是通过JS实现高度自适应。其实contenteditable=“ture”属性可以直接将div转成可编辑的富文本编辑器，
        可以对元素的内容进行编辑。笔者在基于Vue框架下封装了一个公共组件达到双向绑定的效果(div增加了这个属性后并没有value值去对应双向绑定)，但是效果不怎么好，于是
        直接使用点击监听事件去获取元素的innerText值了。</p>
        <p>div模拟textarea文档 <a href="https://blog.csdn.net/zb_ctrl/article/details/76284235" target="view_window">https://blog.csdn.net/zb_ctrl/article/details/76284235</a></p>
        <p style="border-bottom:1px solid #ccc">
          <span>封装组件：</span>
          <diyInput v-model="text"></diyInput>
          <span>value：{{text}}</span>
        </p>
        <p style="margin-bottom:0">
          <span>未封装：</span>
          <div class="text2" contenteditable="true" ref='dom'></div>
          <button type="button" name="button" @click="commit" style="float:left">commit</button>
        </p>
      </div>
      <div class="part">
        <h4>4.表单数据可编辑</h4>
        <p style="text-indent: 2em">移动端中基于better-scroll布局中有一张表需要变成可编辑状态，其实很简单，在初始化better-scroll组件时将click变为true，其次在
        表格元素中添加无边框的input框,并绑定失焦事件则可以动态更新数据。<router-link :to="{ path: '/betterScrollClickDemo', params: {} }">betterScroll点击事件</router-link></p>
      </div>
    </article>
  </div>
</template>

<script>
import diyInput from './inputLineBreakDemo'
export default {
  name: 'HelloWorld',
  components: {
    diyInput
  },
  data () {
    return {
      id: '',
      text: '',
      htmlCode: ''
    }
  },
  created(){
    this.add.call(this.jian, 6, 5)
    this.jian.apply(this.add, [6,5])
  },
  methods: {
    add (a, b) {
      console.log(a+b)
    },
    jian (a, b) {
      console.log(a-b)
    },
    showValue (str) {
      this.object.color = str
      console.log(this.object.color)
    },
    commit () {
      let value = this.$refs.dom.innerText
      alert(value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
h1, h2, h3, h4, h5 {
  /* font-weight: normal; */
  color: #2c3e50;
}
p {
  color: #34495e;
  font-size: 14px;
  line-height: 22px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.part{
  text-align: left;
  display: block;
    float: left;
}
.text2{
  width: 100px;
  float: left;
  border: 1px solid #ccc;
  line-height: 20px;
  min-height: 20px;
  max-height: 60px;
  overflow: auto;
  word-break: break-all;
  outline: none;
  user-select: text;
  white-space: pre-wrap;
  text-align: left;
  -webkit-user-modify: read-write-plaintext-only;
  -webkit-user-select: text;
}
</style>
