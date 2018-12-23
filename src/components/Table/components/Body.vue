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
      <td class="capitalize description" 
        @dblclick="editItem(item.Description)">
        <label>{{ item.Description }}</label>
        <input type="text" :value="item.Description" v-focus
          @input="e => newDesc = e.target.value"
          @keyup.enter="done(i)" 
          @keyup.esc="editing = false"
          :class="{'editing': Description === item.Description && editing}" 
          >
      </td>
      <td>{{ item.Date }}</td>
      <td>{{ item.Amount }}</td>
      <td>
        <div class="tags has-addons">
          <a :class="[ 'tag' ,Description === item.Description && editing ? 'editing' : 'is-info']"
            @click="editItem(item.Description)">Edit</a>
          <a :class="[ 'tag' ,Description === item.Description && editing ? 'is-success' : 'editing']"
            @click="done(i)">Done</a>
          <a class="tag is-delete" @click="controller.removeOne(i)"></a>
        </div>
        <!-- <a class="delete is-danger" @click="controller.removeOne(i)"></a> -->
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
  mounted () {
    this.$el.addEventListener('keyup', this.keyup)
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
    keyup(e) {
      console.log(e.keyCode)
      if(e.keyCode === 37 || e.keyCode === 39) {
        e.preventDefault()
      }
    },
    editItem(store) {
      this.editing = true
      this.Description = store
    },
    done(index) {
      this.editing = false
      this.controller.updateItem(this.newDesc, index)
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
  },
  beforeDestroy() {
    this.$el.removeEventListener('keyup', this.keyup)
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
td, th {
  padding: .75rem !important;
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
.editing {
  display: none;
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
