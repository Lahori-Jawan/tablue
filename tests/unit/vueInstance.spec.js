import { shallowMount, mount } from '@vue/test-utils';
import {Head,Footer} from '@/components/Table/components';
import Table from '@/components/Table';

const components = [Head, Footer]
const reactiveDependency = {
  loading: false,
  allChecked: false,
  selected: [],
  register: () =>{},
  sortOrder: () =>{},
  perPage: () =>{}, 
  renderData: () =>[],
  getValidIndex: (i) => i,
  toggleOne: () =>{}, 
  removeAll: () =>{},
  removeOne: (i) =>{},
  updateItem: (desc, i) =>{}
}

const titles = ['ID', 'Name', 'Description', 'Date','Amount']

describe('Header/Footer', () => {
  components.forEach(component => {
    it('is a Vue instance', () => {
      const wrapper = mount(component, {
        provide: {
          reactiveDependency
        }
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })
})

describe('Table.vue', () => {
  components.forEach(component => {
    it('is a Vue instance', () => {
      const wrapper = mount(component, {
        propsData: {
          titles
        },
        provide: {
          reactiveDependency
        }
      })
      expect(wrapper.contains('th')).toBeTruthy()
    })
  })
  // it('renders props.msg when passed', () => {
  //   const msg = 'new message'
  //   const wrapper = shallowMount(Table, {
  //     propsData: { msg }
  //   })
  //   expect(wrapper.text()).toMatch(msg)
  // })
})
