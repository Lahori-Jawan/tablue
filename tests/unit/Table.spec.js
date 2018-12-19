import { shallowMount, mount } from '@vue/test-utils';
import Table from '@/components/Table';
import { Body } from '@/components/Table/components';
import Controller from '@/components/Table/Controller.js'

const data = [
  {ID: 1, Name: 'nk', Description: 'Dummy desc', Date: '2018-1-01', Amount: '999'},
  {ID: 2, Name: 'mk', Description: 'Dummy desc mk', Date: '2017-3-01', Amount: '1499'},
  {ID: 3, Name: 'tk', Description: 'Dummy desc tk', Date: '2019-10-01', Amount: '199'},
]
const titles = ['ID', 'Name', 'Description', 'Date','Amount']
let tableData = []
const reactiveDependency = {
  loading: false,
  allChecked: false,
  selected: [],
  register (data) {
    tableData.push(data)
  },
  sortOrder: () =>{},
  perPage: () =>{}, 
  renderData: () => tableData,
  getValidIndex: (i) => i,
  toggleOne: () =>{}, 
  removeAll: () =>{},
  removeOne: (i) =>{},
  updateItem: (desc, i) =>{}
}

describe('Table has titles only', () => {
  it('has no row', () => {
    const wrapper = shallowMount(Table,{
      propsData: {
        titles,
      },
      stubs: []
    })
    expect(wrapper.contains('tr')).toBe(false)
  })
})

describe('Table has data', () => {
  it('has data', () => {
    const wrapper = shallowMount(Table,{
      propsData: {
        data
      },
      stubs: {
        'Body': true
      }
    })
    expect(wrapper.props().data.length > 1).toBe(true)
  })
})

describe('Table has reactive Body rows', () => {
  it('has table row', () => {
    const wrapper = mount(Table,{
      propsData: {
        data
      },
      provide: {
        reactiveDependency
      }
    })
    expect(wrapper.find(Body).contains('tr')).toBeTruthy()
  })
})

describe('Table has no Edit functionality', () => {
  it('has table row', () => {
    const wrapper = mount(Table,{
      propsData: {
        data
      },
      stubs: {
        'Body': true
      }
    })
    expect(wrapper.html().includes('type="checkbox"')).toBeFalsy()
  })
})

describe('Table has Edit functionality', () => {
  it('has table row', () => {
    const wrapper = mount(Table,{
      propsData: {
        hasCheckbox: true,
        data
      },
      stubs: {
        'Body': true
      }
    })
    expect(wrapper.html().includes('type="checkbox"')).toBeTruthy()
  })
})
