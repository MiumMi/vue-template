<template>
  <div
  class="t-record"
  @touchstart="tsHandle"
  @touchend="teHandle"
  @touchmove="tmHandle"
  ref="tRecord">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tRecord',
  props: {
    record: {
      type: String,
      default: 'xRecord'
    },
    isDrag: Boolean
  },
  mounted () {
    this.refRecord = this.$refs.tRecord
  },
  data () {
    return {
      refRecord: null,
      dragTarget: null,
      dragKey: -1,
      toucheObject: null,
      positionArr: []

    }
  },
  methods: {
    getParentNode (node) {
      if (node !== window && node.getAttribute('class') !== 't-recorditem') {
        return this.getParentNode(node.parentNode)
      } else {
        return node
      }
    },
    tsHandle (e) {
      e.stopPropagation()
      e.preventDefault()
      if (!this.isDrag) return
      this.toucheObject = e.touches[0]
      let node = this.toucheObject.target
      this.dragTarget = this.getParentNode(node)
      this.dragTarget.style.zIndex = '100'
      this.dragTarget.style.transition = 'none'
      this.dragKey = this.dragTarget.getAttribute('record-key')
    },
    tmHandle (e) {
      e.stopPropagation()
      e.preventDefault()
      if (!this.isDrag) return
      let touche = e.touches[0]
      if (this.dragTarget) {
        let moveDistance = touche.pageY - this.toucheObject.pageY
        let nowY = Number(this.dragTarget.getAttribute('transform-Y'))
        this.dragTarget.style.transform = `translate(${0}px, ${nowY + moveDistance}px)`
        this.positionArr.forEach((d, i) => {
          let item = d.item
          if (item.key === this.dragKey) {
            if (this.positionArr.length !== i + 1 && nowY + moveDistance + item.height > this.positionArr[i + 1].position + this.positionArr[i + 1].item.height / 2) {
              let tempitem = this.positionArr[i + 1].item
              this.positionArr[i + 1].item = item
              this.positionArr[i].item = tempitem

              let children = this.refRecord.children
              if (children.length === 0) return false
              children = Array.from(children)
              for (let j = children.length - 1; j > -1; j--) {
                let data = children[j]
                let key = data.getAttribute('record-key')
                if (key === tempitem.key) {
                  data.style.transform = `translate(${0}px, ${d.position}px)`
                  data.setAttribute('transform-Y', d.position)
                }
              }
            }
            if (i !== 0 && nowY + moveDistance < this.positionArr[i - 1].position + this.positionArr[i - 1].item.height / 2) {
              let tempitem = this.positionArr[i - 1].item
              this.positionArr[i - 1].item = item
              this.positionArr[i].item = tempitem
              let children = this.refRecord.children
              if (children.length === 0) return false
              children = Array.from(children)
              for (let j = children.length - 1; j > -1; j--) {
                let data = children[j]
                let key = data.getAttribute('record-key')
                if (key === tempitem.key) {
                  data.style.transform = `translate(${0}px, ${d.position}px)`
                  data.setAttribute('transform-Y', d.position)
                }
              }
            }
          }
        })
      }
    },
    teHandle (e) {
      e.stopPropagation()
      e.preventDefault()
      if (!this.isDrag) return
      let handleArr = (this.dragTarget.style.transform).split(',')
      let pxArr = handleArr[1].split('px')
      this.dragTarget.style.transform = `translate(${0}px, ${pxArr[0]}px)`
      this.dragTarget.setAttribute('transform-Y', pxArr[0])
      this.dragTarget.style.zIndex = '0'
      this.dragTarget.style.transition = 'all .3s'
      this.dragTarget = null
      this.dragKey = -1
      this.toucheObject = null
      let list = []
      this.positionArr.forEach((d, i) => {
        let item = d.item
        list.push(item.key)
        let children = this.refRecord.children
        if (children.length === 0) return false
        children = Array.from(children)
        for (let j = children.length - 1; j > -1; j--) {
          let data = children[j]
          let key = data.getAttribute('record-key')
          if (key === item.key) {
            data.style.transform = `translate(${0}px, ${d.position}px)`
            data.setAttribute('transform-Y', d.position)
          }
        }
      })
      this.$emit('onDragend', list)
    },
    dragHandle () {
      let children = this.refRecord.children
      if (children.length === 0) return false
      children = Array.from(children)
      this.positionArr = []
      for (let i = children.length - 1; i > -1; i--) {
        let d = children[i]
        d.style.position = 'absolute'
        d.style.transform = `translate(${0}px, ${d.offsetTop}px)`
        d.setAttribute('transform-Y', d.offsetTop)
        this.positionArr.unshift({
          index: i,
          position: d.offsetTop,
          item: {
            key: d.getAttribute('record-key'),
            height: d.clientHeight
          }
        })
        d.style.top = '0px'
        d.style.transition = 'all .3s'
      }
    },
    cancelHandle () {
      let children = this.refRecord.children
      if (children.length === 0) return false
      children = Array.from(children)
      for (let i = children.length - 1; i > -1; i--) {
        let d = children[i]
        d.style.position = 'relative'
        d.style.transform = `none`
        d.style.top = 'auto'
        d.style.transition = 'none'
      }
    }
  },
  watch: {
    isDrag (val, oldval) {
      if (val) {
        this.dragHandle()
      } else {
        this.cancelHandle()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import './index.scss';
</style>
