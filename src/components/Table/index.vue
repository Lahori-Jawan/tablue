<template>
  <div class="box">
    <!-- Configurations -->
    <!-- search -->
    <Search v-model.lazy="searchText" v-debounce="500" />
    <!-- filter -->
    <select v-model="perPage" v-if="options.length">
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <Delete :class="{'no-click':!selected.length}" v-bind="{removeAll}" />
    <Table>
      <Head :titles="titles" v-on:order="sortOrder" v-if="titles.length" v-on:toggelAll="toggelAll" />
      <Body :data="data" />
      <Footer v-if="hasFooter" :titles="titles" />
    </Table>
    <Pagination :current="page" :totalPages="totalPages" v-bind="{next, prev, setPage}" />
  </div>
</template>

<script>
import debounce from '@/3rdparty/v-debounce.js';
import Controller from './Controller.js';
import {Table, Head, Body, Footer, Pagination, Delete, Search} from './components';

export default {
  name: 'Dablue',
  extends: Controller,
  created () {
    this.rowsPerPage = this.rowPerPage
  },
  props: {
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
    rowPerPage: {
      type: Number,
      default: 10
    }
  },
  directives:{
    debounce
  },
  components: {
    Table,
    Head, 
    Body, 
    Footer,
    Pagination,
    Delete,
    Search
  }
}
</script>

<style scoped>
.no-click {
  pointer-events: none;
}
</style>
