export default {
  props: {
    type: {
      type: String,
      default: '',
      validator: (value) => ['head', 'foot'].includes(value)
    },
    titles: {
      type: Array,
      default: []
    }
  },
  computed: {
    getTH() {
      let th = []
      for(const title in this.titles) {
        th.push(createElement('th', title))
      }
      return th
    }
  },
  render(createElement) {
    
    let tr = createElement('tr',[this.getTH])
    return createElement(`t${this.type}`,tr)
  }
}