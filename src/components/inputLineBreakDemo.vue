<template>
  <div class="edit-div"
       v-html="innerText"
       :contenteditable="canEdit"
       @focus="isLocked = true"
       @blur="isLocked = false"
       @input="changeText">
  </div>
</template>
<script>
    export default{
        name: 'editDiv',
        props: {
            value: {
                type: String,
                default: ''
            },
            canEdit: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                innerText: this.value,
                isLocked: false
            }
        },
        watch: {
            'value'(){
                console.log(this.value)
                var range = window.getSelection()
                range.collapseToEnd()
                if (!this.isLocked || !this.innerText) {
                    this.innerText = this.value;
                }
            }
        },
        methods: {
            changeText(){
              this.$nextTick(() => {
                setTimeout(() => {
                  this.$emit('input', this.$el.innerHTML)
                },5)
              })

            }
        }
    }
</script>
<style lang="css" scoped>
    .edit-div {
        width: 100px;
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
