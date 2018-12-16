<template>
  <td class="capitalize description" @dblclick="() => controller.editing = item.Description"
    :class="{'editing': controller.editing === item.Description}"> 
    <label>{{ item.Description }}</label>
    <!-- <label @dblclick="controller.editDescription(Description, i)">{{ item.Description }}</label> -->
    <input type="text"
      :value="item.Description"
      @change="(e) => controller.doneEdit(e.target.value, i)"
      @keyup.enter="controller.editing = null" 
      @keyup.esc="(controller.cancel = true, controller.editing = null)"
      >
  </td>
</template>

<style>
.description.editing > input {
  display: block;
}
.description > input {
  display: none;
}
.editing {
  display: block;
}
</style>

