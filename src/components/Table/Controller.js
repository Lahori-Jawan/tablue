/* 
 * install 'Better Comments' extension i.e. VSCode 
 * to highlight the comments 
*/

 export default {
  data: () => ({
    tableData: [],  //* should be lowercase for easy search
    search: '',
    ascendingOrder: true,
    rowsPerPage: 10,
    selected: [],
    from: 0,
    page: 1,
    end: 1,
    allChecked: false,
    editing: ''
  }),
  computed: {
    perPage: {
      get () { return this.rowsPerPage },
      set (value) { 
        typeof value === 'string' ? this.end = this.tableData.length : ''
        this.rowsPerPage = value
       }
    },
    searchText: {
      get () { return this.search.toLowerCase() },
      set (value) { this.search = value }
    },
    totalPages() {
      return typeof this.rowsPerPage === 'string' ? 0 : Math.ceil(this.tableData.length / this.rowsPerPage)
    },
  },
  methods: {
    renderData() {
      // this.getSelectedStatus
      console.log('new page')
      return this.search.length ? this.find() : this.getPageData()
    },
    register (item) {
      this.tableData.push(item)
    },
    find() {  //* use regex.test for performance boost or String.indexOf
      return this.tableData.filter(object => [...Object.values(object)].some(item => item.includes(this.searchText)))
    },
    getPageData () {
      //? case of 'All' filter
      if(typeof this.rowsPerPage === 'string') return this.tableData
      this.from = this.rowsPerPage * (this.page-1)
      this.end = this.rowsPerPage * this.page
      //? case of Edges i.e. max/min
      //! a potential bug may be lurking here in the 'end' state for 'All/string' case
      this.from < 0 || this.from > this.tableData.length ? (this.from = 0, this.end = this.rowsPerPage) : ''
      let pageData = this.tableData.slice(this.from,this.end);
      this.checkSelectedPageStatus(pageData)
      return pageData
    },
    checkSelectedPageStatus(items=[]) {
      let status = items.every((item,i) => this.selected.includes(this.getCorrectIndex(i)))
      this.allChecked = status
    },
    sortOrder(column='Date') {
      let that = this
      this.tableData = this.tableData.sort(function(a,b) {
        // if(column === 'ID') return    //? disable sorting by ID 
        a = a[column], b = b[column]
        if(column === 'Date') {
          a=new Date(a); b=new Date(b);
        } else if(column !== 'Amount') {
          return that.ascendingOrder ? a.localeCompare(b) : b.localeCompare(a)
        }
        return that.ascendingOrder ? a-b : b-a
      });
      this.ascendingOrder = !this.ascendingOrder
    },
    removeAll() {
      if(!this.selected.length) throw new Error('No Item Index Provided');
      this.selected.sort((a, b) => a - b);   //? so the array index doesn't get messed up after each removal
      while(this.selected.length) this.tableData.splice(this.selected.pop(),1);
      this.allChecked = false
    },
    removeOne(index=Number) {
      if(index < 0 || index > this.tableData.length) throw new RangeError('Item did not match', 'Controller.js', 74);
      this.tableData.splice(this.getCorrectIndex(index),1);
    },
    /* 
    ? we need to find actual index (in accordance with dataTable) to start indexing by adding state 'from' 
    ? into selected item's 'index' (which belongs to v-for in template) because we are only sending 
    ? new array of data i.e. slice() whereas removing from main data source i.e. dataTable
    */
    getCorrectIndex(index) {
      return this.from + index;
    },
    toggleOne(value=Number) {
      if(isNaN(value)) throw new TypeError('value should be of type Number', 'Controller.js', 86)
      value = this.getCorrectIndex(value)
      this.selected.includes(value) ? this.selected.splice(this.selected.indexOf(value),1): this.selected.push(value)
    },
    toggelAll() {
      let items = this.tableData.slice(this.from, this.end)
      let [idx1, idx2] = [this.selected.indexOf(this.from), this.selected.indexOf(this.end-1)]
      items.map((item,i) => {
        if(this.allChecked) return this.selected.splice(idx1, idx2)
        this.selected.push(this.getCorrectIndex(i))
      })
      this.allChecked = !this.allChecked
    },
    next () {
      this.page < this.totalPages ? this.page++ : ''
    },
    prev () {
      this.page > 1 ? this.page-- : ''
    },
    updateItem(description='', index=Number) {
      if(!description.length) return
      this.tableData[this.getCorrectIndex(index)].Description = description
    }
  },
  provide() {
    return {
      handler: {
        // selected: this.selected,
        register: this.register,
        renderData: this.renderData,
        sortOrder: this.sortOrder,
        
        removeItems: this.removeItems,
        // toggleSelected: this.toggleSelected
      }
    }
  },
  reactiveProvide: {
    name: 'reactiveDependency',
    include: [
      'editing',
      'allChecked',
      'selected',
      'perPage', 
      'renderData',
      'getCorrectIndex',
      'toggleOne', 
      'removeAll',
      'removeOne',
      'updateItem'
    ]
  },
  // watch: {
  //   tableData (watch) {
  //     console.log({watch})
  //     // unwatch()
  //   }
  // }
}