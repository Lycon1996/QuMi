<template lang="html">
  <div class="wrapper" ref="scrollDom">
    <ul class="content">
      <li v-for="(index,item) in renderList" :id="sign + index" @click="show">
        第{{index}}条数据{{item}}
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      renderList: [],
      scrollDom: null,
      sign: 'li_',
      pageNo: 0,
      pageSize: 6,
      firstPageNo: 0,
      lastPageNo: 0,
    }
  },
  created () {

  },
  mounted () {
    this.$nextTick(() => {
      let opation = {
        click: true,
        pullUpLoad: {
          threshold: -30 // 当上拉距离超过30px时触发 pullingUp 事件
        },
        pullDownRefresh: {
          threshold: 30, // 下拉距离超过30px触发pullingDown事件
          stop: 20 // 回弹停留在距离顶部20px的位置
        }
      }
      this.scrollDom = new BScroll(this.$refs.scrollDom, opation)
      let index = this.$route.query.id
      this.getPageNo(index)
      //绑定上拉加载执行函数
      this.scrollDom.on('pullingUp', () => {
        console.log("上拉加载")
        this.lastPageNo++
        this.delayArrayUpdate(index, this.lastPageNo, this.pageSize, 'load', false)

      })
      //绑定下拉加载和刷新函数
      this.scrollDom.on('pullingDown', () => {
        if(this.firstPageNo > 0){
          this.delayArrayUpdate(index, this.firstPageNo, this.pageSize, 'refresh', false)
          this.firstPageNo--
        }else{
          this.renderList = []
          this.firstPageNo = 1
          this.lastPageNo = 1
          this.pageNo = 1
          this.delayArrayUpdate(index, 1, this.pageSize, 'refresh', false)
        }
      })
    })
  },
  methods: {
    // 获取页码
    getPageNo (n) {
      let remainder = n % 6
      if(remainder === 0){
        this.pageNo = n / 6
        this.firstPageNo = n / 6 - 1
        this.lastPageNo = n / 6 + 1
      }else{
        this.pageNo = Math.floor(n / 6) + 1
        this.firstPageNo = Math.floor(n / 6)
        this.lastPageNo = Math.floor(n / 6) + 2
      }
      this.delayArrayUpdate(n, this.pageNo, this.pageSize, 'load', true)
    },

    delayArrayUpdate (n, pageNo, pageSize, type, isFirst) {  //请求数据
      console.log(n, pageNo, pageSize, type, isFirst)
      setTimeout(() => {  //模拟请求延时
        if(type === 'load'){ //在数组后添加数据
          for(let j = (pageNo - 1) * pageSize + 1; j <= (pageNo - 1) * pageSize + pageSize; j++){
            this.renderList.push(j)
          }
          this.scrollDom.finishPullUp() // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
          // this.scrollDom.refresh()
        }else if(type === 'refresh'){ //在数组钱添加函数
          for(let j = (pageNo - 1) * pageSize + pageSize; j >= (pageNo - 1) * pageSize + 1; j--){
            this.renderList.unshift(j)
          }
          this.scrollDom.finishPullDown()
          // this.scrollDom.refresh()
        }
        if(isFirst){
          this.$nextTick(() =>{
            this.scrollMark(n)
          })
        }else{
          this.$nextTick(() =>{
            this.scrollDom.refresh()
          })
        }
      },500)

      setTimeout(() => {
        this.scrollDom.refresh()
      },0)
    },
    scrollMark (n) { //滚动定位
      var index = 0
      if( n <= 6 ){
        index = n - 1
      }else{
        if(n % 6 == 0){
          index = 5
        }else{
          index = n % 6 - 1
        }
      }
      console.log(index)
      setTimeout(() => { //异步执行
        let dom = document.getElementsByTagName('li')[index]
        this.scrollDom.scrollToElement(dom, 500, true, true)
      },0)
    },
    show () {
      console.log('触发了点击事件');
    }
  }
}

</script>

<style lang="css" scoped>
  .wrapper{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }
  .content{
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: auto;
  }
  .content li {
    height: 149px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    line-height: 50px;
    color: #666;
  }
</style>
