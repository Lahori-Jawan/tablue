<template>
  <div class="table-container box" :class="{'no-data': !data.length}">
    <div class="card">
      <Select v-bind="{options}" v-model="perPage" v-if="options.length" />
      <Delete :class="{'no-click':!selected.length}" v-bind="{removeAll}" />
      <Search v-model.lazy="searchText" :disabled="!tableData.length" />
    </div>
    <Table>
      <Head :titles="titles" v-on:order="sortOrder" v-on:toggelAll="toggelAll" v-if="titles.length" />
      <Body :data="data" />
      <Footer :titles="titles" v-if="hasFooter" />
    </Table>
    <Pagination :current="page" :keyboard="hasKeyboard" :totalPages="totalPages" v-bind="{next, prev, setPage}" />
  </div>
</template>

<script>

import Controller from './Controller.js';
import {Table, Head, Body, Footer, Pagination, Delete, Search, Select} from './components';

export default {
  name: 'Dablue',
  extends: Controller,
  created () {
    if(!this.options.length) return
    this.rowsPerPage = this.options [0]
  },
  props: {
    hasKeyboard: {
      type: Boolean,
      default: false
    },
    hasCheckbox: {
      type: Boolean,
      default: false
    },
    titles: {
      type: Array,
      default: () => []
    },
    hasFooter: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    // rowPerPage: {
    //   type: Number,
    //   default: 10
    // }
  },
  components: {
    Table,
    Head, 
    Body, 
    Footer,
    Pagination,
    Delete,
    Search,
    Select
  }
}
</script>

<style scoped>

.table-container.no-data {
  display: none;
}

.table-container {
  margin-top: 1rem;
  display: flex;
  padding: 1rem;
  flex-direction: column;
}

#app .card {
  display: flex;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: .3rem;
}

.column.right {
  padding-left: 0;
  padding-right: 0;
}

.table-bottom {
  flex-grow: 1;
  display: flex;
  flex-direction: row-reverse;
}

#app .no-click {
  pointer-events: none;
  background: rgba(217, 172, 181, 0.21176470588235294);
}

</style>
