<template>
  <nav class="pagination is-rounded" role="navigation" aria-label="pagination" v-if="totalPages">
    <a class="pagination-previous" @click="prev()" @keydown.left="prev()" autofocus :disabled="!hasPrev">Previous</a>
    <a class="pagination-next" @click="next()" @key.right="next()" :disabled="!hasNext">Next page</a>
    
    <ul class="pagination-list">
      <!-- First $max links -->
      <li v-for="p in first" :key="p">
        <a class="pagination-link" :class="{'is-current': p === getActivePage }" 
        :aria-label="`Goto page ${p}`" @click="setPage(p)">
          {{ p }}
        </a>
      </li>
      <!-- must ellipse -->
      <li v-if="last !== 0"><span class="pagination-ellipsis">&hellip;</span></li>
      <!-- middle links if available -->
      <template v-if="getMiddle3Numbers.length">
        <li v-for="p in getMiddle3Numbers" :key="p+'i'">
          <a class="pagination-link" :class="{'is-current': p === getActivePage }" 
          :aria-label="`Goto page ${p}`" @click="setPage(p)">
            {{ p }}
          </a>
        </li>
        <!-- optional ellipse if middle links available -->
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <!-- last $max links -->
      </template>
      <li v-for="(p,i) in last" :key="renderLastNumber[i]+'i'">
        <a class="pagination-link" :class="{'is-current': renderLastNumber[i] === getActivePage  }" 
        :aria-label="`Goto page ${renderLastNumber[i]}`"
        @click="setPage(renderLastNumber[i])">
          {{ renderLastNumber[i] }}
        </a>
      </li>
      <!-- <li v-for="id in users" :key="id" :set="item = getUserData(id)">
        <img :src="item.avatar" /><br />
        🏷️ {{ item.name }}<br />
        🔗 {{ item.homepage }}
      </li> -->
    </ul>
  </nav>
</template>

<script>
//  ?  We need to satisfy these 3 conditions:
//* 1: 1,2,3,---, $last
//* 2: 1,---, $last1, $last2, $last3
//* 3: 1,---, $middle1, $middle2, $middle3,---, $last
export default {
  created() {
    if(!this.keyboard) return
    document.addEventListener('keyup', this.keyup)
  },
  props: {
    keyboard: {
      type: Boolean,
      default: false
    },
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
      first: 3,
      last: 0,
      max: [...Array(3)],
      lastEdge: null
    }
  },
  computed: {
    getActivePage () {
      return this.current ? this.current : 1
    },
    getFirstLastNumbers () {
      if (this.totalPages < 5) return this.checkForSimplePagination()
      return [this.first, this.last] = this.max.some((item,i) => i+1 === this.current) ? [this.max.length, 1] : [1,this.getLastNumbers]
    },
    getLastNumbers () {
      this.lastEdge = (this.totalPages - this.max.length) + 1  //? +1 converts index to value for comparison
      return this.max.some((item,i) => (this.lastEdge+i) === this.current) ? 3 : 1
    },
    getMiddle3Numbers () {
      let middleNumbers = [this.current-1, this.current, this.current+1]
      // return JSON.stringify(this.getFirstLastNumbers) === JSON.stringify([1,1]) ? middleNumbers : []
      return JSON.stringify(this.getFirstLastNumbers) === JSON.stringify([1,1]) ? middleNumbers : this.getNextNumber
    },
    renderLastNumber () {
      return this.last === 1 ? {0: this.totalPages} : Object.assign({},this.max.map((item,i) => this.totalPages-i ).reverse())
    },
    getNextNumber () {
      if(this.totalPages === this.max.length) return []
      if(this.getActivePage === this.max.length) {
        return [this.getActivePage + 1]
      } else if(this.last > 1 && this.getActivePage === this.lastEdge) {
        return [this.getActivePage - 1]
      } else {
        return []
      }
    },
    hasPrev() {
      return this.getActivePage > 1
    },
    hasNext() {
      return this.getActivePage < this.totalPages
    },
  },
  methods: {
    checkForSimplePagination () {
        this.first = this.totalPages
        this.last = 0
    },
    keyup(e) {
      // Todo:: upgrade to latest spec i.e. e.key and degrade back to e.keyCode
      if(e.defaultPrevented) return
      if(e.keyCode === 37 || e.keyCode === 39) {
        e.keyCode === 37 ? this.prev() : this.next()
      }
    }
  },
  beforeDestroy() {
    this.$el.removeEventListener('keyup', this.keyup)
  }
}
</script>

<style scoped>
.pagination.is-rounded .pagination-link {
  font-size: 0.8rem
}

.pagination {
  justify-content: flex-end;
}

.pagination-list {
  flex-grow: 0;
}

</style>

