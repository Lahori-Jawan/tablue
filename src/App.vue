<template>
  <div id="app" class="container">
    <div class="content" v-if="!tableData.length">
      <input type='file' accept='image/*' @change='openFile'> 
      <blockquote class="blockquote">
      Please download this 
      <a target="_blank" href="https://docs.google.com/spreadsheets/d/1eBsATYdeISUGjdBr0SzNhY5Ur9mkl0u11tfhxn2Y1WE/edit?usp=sharing">
      data
      </a>
      as <code>.csv</code> file and upload it to see it in Data table
    </blockquote>
    </div>

    <!-- Data-table component -->
    <Table hasCheckbox hasFooter hasKeyboard 
      :options="[5, 10, 15, 'ALL']" 
      :titles="titles" 
      :data="tableData" 
      />
    
    <!-- Annotation -->
    <div class="layout" v-if="tableData.length">
      <div class="layout-left">
        <div class="layout-item">
          <strong>Description</strong>: Double click on any item's <code>description</code> column to edit it. Press <code>Enter</code> to submit changes
          or <code>Esc</code> to cancel
        </div>
        <div class="layout-item">
          <strong>Order</strong>: Click on any title except actions to set the order by <code>Ascending</code> or <code>Descending</code>
        </div>
        <div class="layout-item">
          <strong>Big Cross Button</strong>: Remove one or more selected items at a time
        </div>
        <div class="layout-item">
          <strong>Filter</strong>: Select number of rows to display 
        </div>
        <div class="layout-item">
          <strong>Search</strong>: Search for record in any column
        </div>
        <div class="layout-item">
          <strong>Pagination</strong>: Use <code>&larr;</code>/<code>&rarr;</code> arrow keys to tranverse through record. <b>note</b> this feature is 
          currently available for one table per page only.
        </div>
      </div>
    </div>
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

.container {
  padding-top: 1rem;
}
.layout strong {
  color: crimson;
}
.blockquote {
  margin-top: 1rem;
}
</style>
