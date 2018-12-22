<template>
  <tfoot>
    <tr>
      <th v-for="(title, i) in titles" :key="i" v-html="title" @click="$emit('order',title)" 
        v-if="title !== 'check'">
      </th>
    </tr>
  </tfoot>
</template>

<script>
import th from '../mixin.js';
export default {
  mixins: [th]
}
</script>

