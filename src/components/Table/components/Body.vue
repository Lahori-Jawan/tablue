<template>
  <tbody>
    <tr v-if="controller.loading">
      <div class="overlay">Loading</div>
    </tr>
    <!-- <tr v-for="(item,i) in paymentData" :key="(item.ID+(new Date().getMilliseconds()))"> -->
    <tr v-for="(item,i) in controller.renderData()" :key="`${item.ID}${(new Date().getMilliseconds())}`" v-else>
      <th>
        <input :id="item.ID" type="checkbox" @change="controller.toggleOne(i)"
          :checked="controller.selected.includes(controller.getCorrectIndex(i))" >
        <!-- <input :id="item.ID" type="checkbox" :checked="controller.selected.includes(i)" @change="controller.toggleSelected(i)"> -->
      </th>
      <th class="uppercase">
        <label :for="item.ID">
          {{ item.ID }}
        </label>
      </th>
      <td class="capitalize">{{ item.Name }}</td>
      <td class="capitalize description" @dblclick="editItem(item.Description)">
        <label>{{ item.Description }}</label>
        <input :class="{'editing': Description === item.Description && editing}" type="text" 
          :value="item.Description"
          v-focus
          @input="e => newDesc = e.target.value"
          @keyup.enter="controller.updateItem(newDesc, i)" 
          @keyup.esc="editing = false"
          >
      </td>
      <td>{{ item.Date }}</td>
      <td>{{ item.Amount }}</td>
      <td @click="controller.removeOne(i)">x{{i}}</td>
    </tr>
  </tbody>
</template>
<script>
export default {
  inject: {
    handler: 'handler',
    controller: 'reactiveDependency'
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    editing: false,
    Description: '',
    newDesc: ''
  }),
  methods: {
    editItem(store) {
      this.editing = true
      this.Description = store
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    }
  },
  computed: {
    // paymentData: {
    //   get: function() { return this.handler.paymentData() }
    // },
    rowsPerPage: {
      get: function() { return this.handler.rowsPerPage }
    }
  },
  watch: {
    data (oldobj, newobj) {
      let objects = JSON.parse(JSON.stringify(newobj));   // don't mutate props
      objects.map(obj => {
        for(let prop in obj) {
          typeof obj[prop] === 'string' && prop !== 'Date' ? obj[prop] = obj[prop].toLowerCase() : ''
        }
        this.handler.register(obj)
        this.handler.sortOrder()
      })
    }
  }
}
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
.uppercase {
  text-transform: uppercase;
}
td {
  position: relative;
  vertical-align: middle;
}
td label {
  display: block;
  font-weight: 400;
}
td  input {
  display: none;
}
td input.editing {
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  height: 100%;
}
tr {
  font-size: .925rem;
}
.table.is-narrow td, 
.table.is-narrow th {
  padding: .5em;
}
</style>
