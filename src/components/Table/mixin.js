export default {
  created () {
    this.$parent.hasCheckbox && this.titles.length ? this.titles.unshift('') : ''
  },
  props: {
    titles: {
      type: Array,
      default: []
    }
  }
}
