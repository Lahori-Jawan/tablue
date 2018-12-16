<template>
  <tfoot>
    <tr>
      <th v-for="(title, i) in titles" :key="i" v-html="title"></th>
    </tr>
  </tfoot>
</template>

<script>
import th from '../mixin.js';
export default {
  mixins: [th]
}
</script>

