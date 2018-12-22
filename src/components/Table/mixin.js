export default {
  created () {
    if(!this.titles.length) return
    this.titles.push('actions')
    this.$parent.hasCheckbox ? this.titles.unshift('check') : this.titles.unshift('')
  },
  props: {
    titles: {
      type: Array,
      default: () => []
    }
  }
}
