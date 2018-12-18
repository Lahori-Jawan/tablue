/* 
 * install 'Better Comments' extension i.e. VSCode 
 * to highlight the comments 
*/

 export default {
  data: () => ({
    tableData: [],  //* should be lowercase for easy search
    searchData: [],
    search: '',
    found: [],
    ascendingOrder: true,
    rowsPerPage: 10,
    selected: [],
    from: 0,
    page: 1,
    end: 1,
    allChecked: false,
  }),
  computed: {
    perPage: {
      get () { return this.rowsPerPage },
      set (value) { 
        typeof value === 'string' ? this.end = this.tableData.length : ''
        console.log('all',value, this.end, this.tableData.length)
        this.rowsPerPage = value
       }
    },
    searchText: {
      get () { return this.search.toLowerCase() },
      set (value) { this.search = value }
    },
    totalPages() {
      return typeof this.rowsPerPage === 'string' ? 1 : this.searchData.length ? this.searchPages : this.allPages
    },
    searchPages () { return Math.ceil(this.searchData.length / this.rowsPerPage) },
    allPages () { return Math.ceil(this.tableData.length / this.rowsPerPage) }
  },
  methods: {
    renderData() {
      return this.search.length > 1 ? this.getSearchData() : this.getPageData()
    },
    register (item) {
      this.tableData.push(item)
    },
    getSearchData() {  //* use regex.test for performance boost or String.indexOf
      this.found = []
      // return this.tableData.filter(object => [...Object.values(object)].some(item => item.includes(this.searchText)))
      this.searchData = this.tableData.filter((object,index) => {
        return [...Object.values(object)].some(item => item.includes(this.searchText)) ? this.found.push(index) : false
      })
      this.found = [...(new Set(this.found))]
      return typeof this.rowsPerPage === 'string' ? this.checkSelectedPageStatus(this.searchData) : this.getCurrentPageData(true)
    },
    getPageData () {
      this.searchData = []
      if(typeof this.rowsPerPage === 'string') return this.checkSelectedPageStatus(this.tableData)
      return this.getCurrentPageData(false)
    },
    getCurrentPageData(search=false) {
      let data =  search ? this.searchData : this.tableData
      this.from = this.rowsPerPage * (this.page-1)
      this.end = this.rowsPerPage * this.page
      this.from < 0 || this.from > data.length ? (this.from = 0, this.end = this.rowsPerPage) : ''
      let pageData = data.slice(this.from, this.end)
      return this.checkSelectedPageStatus(pageData)
    },
    checkSelectedPageStatus(items=[]) {
      let status = items.every((item,i) => this.selected.includes(this.getValidIndex(i)))
      this.allChecked = status
      return items
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
      if(!this.selected.length) throw new Error('No Item Index Provided', 'Controller.js', 87);
      this.selected.sort((a, b) => a - b);   //? so the array index doesn't get messed up after each removal
      while(this.selected.length) { this.tableData.splice(this.selected.pop(),1) }
      this.allChecked = false
    },
    removeOne(index=Number) {
      if(index < 0 || index > this.tableData.length) throw new RangeError('Item did not match', 'Controller.js', 85);
      this.tableData.splice(this.getValidIndex(index),1);
    },
    toggleOne(value=Number) {
      if(isNaN(value)) throw new TypeError('value should be of type Number', 'Controller.js', 83)
      value = this.getValidIndex(value)
      this.selected.includes(value) ? this.selected.splice(this.selected.indexOf(value),1): this.selected.push(value)
    },
    toggelAll() {
      let items = this.tableData.slice(this.from, this.end)
      //* index vs value  
      let [idx1, idx2] = [this.selected.indexOf(this.from), this.selected.indexOf(this.end-1)]
      this.allChecked ? this.selected.splice(idx1, idx2+1) : items.map((item,i) => this.selected.push(this.getValidIndex(i)))
      this.selected = [...[...(new Set(this.selected))].sort((a,b) => a-b)]
      this.allChecked = !this.allChecked
    },
    next () {
      this.page < this.totalPages && this.page++
    },
    prev () {
      this.page > 1 && this.page--
    },
    updateItem(description='', index=Number) {
      if(!description.length) return
      this.tableData[this.getValidIndex(index)].Description = description
    },
    /*
    ? we need to find actual index (in accordance with dataTable) to start indexing by adding state 'from' 
    ? into selected item's 'index' (which belongs to v-for in template) because we are only sending 
    ? new array of data i.e. slice() whereas removing from main data source i.e. dataTable
    */
   /*
   ?  for search, return from 'found' indices 
   */
    getValidIndex(index) {
      return this.searchData.length ? this.found[this.from + index] : this.from + index;
    },
  },
  reactiveProvide: {
    name: 'reactiveDependency',
    include: [
      'allChecked',
      'selected',
      'register',
      'sortOrder',
      'removeItems',
      'perPage', 
      'renderData',
      'getValidIndex',
      'toggleOne', 
      'removeAll',
      'removeOne',
      'updateItem'
    ]
  },
  // watch: {
  //   tableData (data) {
  //     console.log({data})
  //     // unwatch()
  //   }
  // }
}