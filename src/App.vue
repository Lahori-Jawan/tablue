<template>
  <div id="app" class="container">
    <input type='file' accept='image/*' @change='openFile'>
    <Table hasCheckbox hasFooter :options="[5, 10, 15, 'ALL']" :titles="titles" :data="tableData" />
  </div>
</template>

<script>
import Table from './components/Table/';
import Papa from 'papaparse';

export default {
  name: 'app',
  data: () => ({
    titles: [],
    tableData: []
  }),
  methods: {
    openFile (event) {
      var input = event.target;
      var reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.onload = () => {
        this.parseCSV(reader.result);
      };
    },
    parseCSV(str) {
      Papa.parse(str, {
        // header: true,
        download: true,
        skipEmptyLines: true,
        complete: (csv) => {
          if(csv.errors.length) return new Error('Error in file')
          let [titles, ...data] = csv.data
          let obj = {};
          data.map(d => {   // convert to Object from Array
            for (const [index, value] of titles.entries()) {
              Object.assign(obj,{[value]: d[index]})
            }
            this.tableData.push(obj)
            obj = {}
          })
          this.titles.push(...titles)
          // this.tableData.push(...data)
          // console.log({data})
        }
      });
    }
  },
  components: {
    Table
  }
}
</script>

<style>
@import url('~bulma/css/bulma.css');
</style>
