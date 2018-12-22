<template>
  <thead>
    <tr>
      <th v-for="(title, i) in titles" :key="i" @click="sort(title)" 
        v-if="title !== 'check'" :class="{'active-column': clicked === title}">
        <span :class="{'arrow': true, 'top': !controller.ascendingOrder}" v-html="title"></span>
      </th>
      <th v-else>
        <input type="checkbox" :checked="controller.allChecked" @change="$emit('toggelAll')">
      </th>
    </tr>
  </thead>
</template>

<script>
import th from '../mixin.js';
export default {
  mixins: [th],
  inject: {
    controller: 'reactiveDependency'
  },
  data: () => ({
    clicked: 'Date'
  }),
  methods: {
    sort (title) {
      this.clicked = title
      this.$emit('order',title)
    }
  }
}
</script>

<style scoped>
thead {
  background: #f2f2f2d9;
}
th {
  cursor: pointer;
}

.arrow {
  position: relative;
}
.active-column .arrow::after,
th:hover .arrow::before,
th:hover .arrow::after {
  opacity: 1;
}
/* .arrow::before, */
.arrow::after {
  content: '';
  opacity: 0;
  position: absolute;
  transition: all .3s;
}
.arrow::before {
    border: 1px solid transparent;
    width: .75rem;
    bottom: .45rem;
    right: -1.14rem;
    border-top: 1px solid;
}
.arrow::after {
  top: .5rem;
  right: -1rem;
  width: .5rem;
  height: .5rem;
  border: 1px solid;
  border-top: 0;
  border-left: 0;
  display: inline-block;
  transform: rotateZ(45deg);
  
}
.arrow.top::after {
  transform: rotateZ(225deg);
}
</style>

