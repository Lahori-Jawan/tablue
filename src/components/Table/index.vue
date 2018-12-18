<template>
  <div>
    <!-- Configurations -->
    <!-- search -->
    <input type="text" v-model.lazy="searchText" v-debounce="250">
    <!-- filter -->
    <select v-model="perPage" v-if="options.length">
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <!-- delete all -->
    <a :class="{'delete': true, 'no-click':!selected.length}" @click="removeAll()">&nbsp;</a>
    <!-- pagination -->
    <div class="pagination">
      <a class="prev" @click="prev()">Prev</a>
      <a v-for="p in totalPages" :key="p" @click="page=p"> {{ p }}</a>
      <a class="next" @click="next()" style="padding-left: 2.5rem">Next</a>
    </div>
    <!-- Table -->
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <Head :titles="titles" v-on:order="sortOrder" v-if="titles.length" v-on:toggelAll="toggelAll" />
      <Body :data="data" />
      <Footer v-if="hasFooter" :titles="titles" />
    </table>
    <!-- <Titles type="head" :titles="titles" /> -->
  </div>
</template>

<script>
import Controller from './Controller.js';
import debounce from '../../3rdparty/v-debounce.js';
import {Head, Body, Footer} from './components';

export default {
  name: 'Table',
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
    Head, 
    Body, 
    Footer,
  }
}
</script>

<style scoped>
.no-click {
  pointer-events: none;
}
</style>

