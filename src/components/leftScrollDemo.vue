<template lang="html">
  <div class="list">
    <ul>
  		<li data-id="1" v-touch:touchstart="onTouchStart" v-touch:touchmove="onTouchMove" v-touch:touchend="onTouchEnd"><a data-id="1" :class="a1" href="#">侧滑显示删除按钮1<i>删除</i><i>编辑</i></a></li>
  		<li data-id="2" v-touch:touchstart="onTouchStart" v-touch:touchmove="onTouchMove" v-touch:touchend="onTouchEnd"><a data-id="2" :class="a2" href="#">侧滑显示删除按钮2<i>删除</i><i>编辑</i></a></li>
  		<li data-id="3" v-touch:touchstart="onTouchStart" v-touch:touchmove="onTouchMove" v-touch:touchend="onTouchEnd"><a data-id="3" :class="a3" href="#">侧滑显示删除按钮3<i>删除</i><i>编辑</i></a></li>
  	</ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      a1: '',
      a2: '',
      a3: '',
      routerClick: false,
      expansion: null,
      x: '',
      y: '',
      config: {
        x: '',
        y: '',
        X: '',
        Y: '',
        swipeX: '',
        swipeY: ''
      }

    }
  },
  methods: {
    onTouchStart (event) {
      this.x = event.touches[0].pageX;
      this.y = event.touches[0].pageY;
      this.config.swipeX = true;
      this.config.swipeY = true;
      this.routerClick = true;
      if(this.expansion){
          this.a1 = ''
          this.a2 = ''
          this.a3 = ''
      }
    },
    onTouchMove (event) {
      this.config.X = event.touches[0].pageX;
      this.config.Y = event.touches[0].pageY;
      let id = event.target.dataset.id
      if(this.config.swipeX && Math.abs(this.config.X - this.x) - Math.abs(this.config.Y - this.y) > 0){
          event.stopPropagation();
          if(this.config.X - this.config.x > 20){//右滑
              event.preventDefault();
              if(id === '1'){this.a1 = ''}
              if(id === '2'){this.a2 = ''}
              if(id === '3'){this.a3 = ''}
              this.routerClick = false;
          }
          if(this.x - this.config.X > 20){//左滑
              event.preventDefault();
              if(id === '1'){this.a1 = 'swipeleft'}
              if(id === '2'){this.a2 = 'swipeleft'}
              if(id === '3'){this.a3 = 'swipeleft'}
              this.expansion = true
              this.routerClick = false;
          }
          this.config.swipeY = false;
      }
      if(this.config.swipeY && Math.abs(this.config.X - this.config.x) - Math.abs(this.config.Y - this.config.y) < 0){
          this.config.swipeX = false;
          this.config.routerClick = false;
      }
    },
    onTouchEnd (event) {
      console.log(this.routerClick)
      if(this.routerClick){
        console.log('点击事件触发')
        this.config = {
          x: '',
          y: '',
          X: '',
          Y: '',
          swipeX: '',
          swipeY: ''
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
*{margin:0;padding:0;}

li{list-style:none;}
i{font-style:normal;}
a{color:#393939;text-decoration:none;}
.list{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
	overflow:hidden;
	padding-left:.3rem;
	border-top:1px solid #ddd;
	}
.list li{
	overflow:hidden;
	width:145%;
	border-bottom:1px solid #ddd;
	}
.list li a{
	display:block;
	height:3rem;
	line-height:3rem;
	-webkit-transition:all 0.3s linear;
	transition:all 0.3s linear;}
.list li i{
	float:right;
	width:15%;
	text-align:center;
	background:#E2421B;
	color:#fff;
	}
.swipeleft{
	transform:translateX(-30%);
	-webkit-transform:translateX(-30%);
	}
</style>
