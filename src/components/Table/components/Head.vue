<template>
  <thead>
    <tr>
      <th v-for="(title, i) in titles" :key="i" v-html="title" v-if="title.length"
        @click="$emit('order',title)"></th>
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
}
</script>

<style scoped>
thead {
  background: #f2f2f2d9;
}
th {
  cursor: pointer;
}
</style>

