<template>
  <input type="text" @input="(e) => $emit('input', e.target.value)">
</template>
