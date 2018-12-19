<template>
  <nav class="pagination is-rounded" role="navigation" aria-label="pagination" v-if="totalPages">
    <a class="pagination-previous" @click="prev()">Previous</a>
    <a class="pagination-next" @click="next()">Next page</a>
    <ul class="pagination-list">
      <!-- First $max links -->
      <li v-for="p in first3" :key="p">
        <a class="pagination-link" :class="{'is-current': p === getActivePage }" aria-label="Goto page 1" 
         @click="setPage(p)">
          {{ p }}
        </a>
      </li>
      <!-- must ellipse -->
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <!-- middle links if available -->
      <li v-if="getMiddle3Numbers.length" v-for="p in getMiddle3Numbers" :key="p+'i'">
        <a class="pagination-link" :class="{'is-current': p === getActivePage }" aria-label="Goto page 1" 
         @click="setPage(p)">
          {{ p }}
        </a>
      </li>
      <!-- optional ellipse if middle links available -->
      <li v-if="getMiddle3Numbers.length"><span class="pagination-ellipsis">&hellip;</span></li>
      <!-- last link -->
      <li v-for="(p,i) in renderLastNumber" :key="renderLastNumber[i]+'i'">
        <a class="pagination-link" :class="{'is-current': renderLastNumber[i] === getActivePage  }" aria-label="Goto page 1" 
         @click="setPage(p)">
          {{ p === 1 ? totalPages : p }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  loops3: ['','',''],
  created() {
    console.log('loops3', this.$options.loops3)
    // [...Array(this.totalPages)]
    // for(const i = 0; i< this.totalPages; i++) {
    //   console.log(i+1)
    // }
  },
  props: {
    next: {
      type: Function,
      required: false
    },
    prev: {
      type: Function,
      required: false
    },
    setPage: {
      type: Function,
      required: false
    },
    current: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      first3: 3,
      last3: 0,
      max: [...Array(3)]
    }
  },
  computed: {
    getActivePage () {
      return this.current ? this.current : 1
    },
    getFirstLastNumbers () {
      return [this.first3, this.last3] = this.max.some((item,i) => i+1 === this.current) ? [this.max.length, 1] : [1,this.getLast3Numbers]
      // return [this.first3, this.last3]
    },
    getLast3Numbers () {
      let last = (this.totalPages-this.max.length) + 1
      return this.max.some((item,i) => (last+i) === this.current) ? 3 : 1
    },
    getMiddle3Numbers () {
      // this.first3 = this.max.length //? overrite array returned by .some function 
      let middleNumbers = [this.current-1, this.current, this.current+1]
      return JSON.stringify(this.getFirstLastNumbers) === JSON.stringify([1,1]) ? middleNumbers : []
    },
    renderLastNumber () {
      return this.last3 === 1 ? {1: this.totalPages} : this.max.map((item,i) => this.totalPages-i ).reverse()
    },
    hasPrev() {
      return this.current > 1
    },
    hasNext() {
      return this.current < this.totalPages
    },
  }
}
</script>

<style scoped>
.pagination.is-rounded .pagination-link {
  font-size: 0.85rem
}
</style>

