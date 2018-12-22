<template>
  <tbody>
    <tr v-if="!renderData.length">
      <td colspan="100%">
        <div class="not-found title">Sorry, could not find data :(</div>
      </td>
    </tr>
    <tr v-for="(item,i) in renderData" :key="item.ID+'i'" v-else>
      <th>
        <input :id="item.ID" type="checkbox" @change="controller.toggleOne(i)"
          :checked="controller.selected.includes(controller.getValidIndex(i))" >
      </th>
      <th class="uppercase">
        <label :for="item.ID">
          {{ item.ID }}
        </label>
      </th>
      <td class="capitalize">{{ item.Name }}</td>
      <td class="capitalize description" @dblclick="editItem(item.Description)">
        <label>{{ item.Description }}</label>
        <input type="text" :value="item.Description" v-focus
          @input="e => newDesc = e.target.value"
          @keyup.enter="controller.updateItem(newDesc, i)" 
          @keyup.esc="editing = false"
          :class="{'editing': Description === item.Description && editing}" 
          >
      </td>
      <td>{{ item.Date }}</td>
      <td>{{ item.Amount }}</td>
      <td>
        <a @click="editItem(item.Description)">Edit</a>
        <span>&nbsp;</span>
        <a class="delete is-danger" @click="controller.removeOne(i)"></a>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  inject: {
    controller: 'reactiveDependency'
  },
  created () {
    this.registerOnParent(this.data)
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
    registerOnParent(data) {
      let objects = JSON.parse(JSON.stringify(data));   // don't mutate props
      objects.map(obj => {
        for(let prop in obj) {
          typeof obj[prop] === 'string' && prop !== 'Date' ? obj[prop] = obj[prop].toLowerCase() : ''
        }
        this.controller.register(obj)
      })
      this.controller.sortOrder()
    }
  },
  directives: {
    focus: {
      componentUpdated(el) {
        el.focus()
      },
    }
  },
  computed: {
    renderData () {
      return this.controller.renderData()
    }
  },
  watch: {
    data (latestData) {
      this.registerOnParent(latestData)
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

.description > label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 260px;
}
.not-found {
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff3860;
  color: #fff;
  border-left: .5rem solid #f80637;
}
</style>
