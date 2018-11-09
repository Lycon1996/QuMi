<template lang="html">
  <div class="layout">
    <div class="wrapper" ref="storeBScrollWrap">
      <ul class="content">
        <li>
          <p> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
          <p class="spacial"> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
          <p class="spacial"> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
        </li>
        <li>
          <p> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
          <p class="spacial"> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
          <p class="spacial"> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
        </li>
        <li>
          <p> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
          <p class="spacial"> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
          <p class="spacial"> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
        </li>
        <li>
          <p> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
          <p class="spacial"> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
          <p class="spacial"> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
        </li>
        <li>
          <p> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
          <p class="spacial"> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
          <p class="spacial"> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
        </li>
        <li>
          <p> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
          <p class="spacial"> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
          <p class="spacial"> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
        </li>
        <li>
          <p> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
          <p class="spacial"> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
          <p class="spacial"> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
        </li>
        <li>
          <p> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
          <p class="spacial"> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
          <p class="spacial"> <input type="text" name="" value="规格1000kg" :readonly="readonly"> </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      readonly: false,
      storeBScrollWrap: null
    }
  },
  mounted(){
    let opation = {
      scrollX: true
    }
    this.$nextTick(() => {
        this.storeBScrollWrap = new BScroll(this.$refs.storeBScrollWrap, opation)
    })
  }
}
</script>

<style lang="css" scoped>
  .wrapper{
    width: 100%;
    /* padding: 10px; */
    height: 300px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .content{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .content li {
    display: block;
    margin-bottom: 5px;
    width: 500px;
    height: 40px;
  }
  .content li p{
    display: block;
    float: left;
    margin: 0;
    width: 100px;
    height: 40px;
    border: 1px solid #ccc;
    padding: 5px;
    box-sizing: border-box;
  }
  .content li p input{
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
  .spacial{
    border-left: none !important;
  }
</style>
