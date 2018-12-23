
## [Demo](http://tablue.surge.sh/)

## Approach
```
This component is based on DI(dependency injection) pattern utilizing Vue's provide/inject feature where Parent
provides only public api to children so children can validate their local state or notify parent of change in 
their state.
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Run your tests
```
yarn test
```

### Compiles and minifies for production
```
yarn build
```

### Deployment
```
surge /path/to/dist/directory
```

## Usage
Please look for `Table` component inside `App.vue`

### Follow-up Questions
1: How long did you spend on the test? Would you do anything differently if you had more time?

Ans: On Average it took me 7 days to build this component. I would refactor this component to make it more robust by adding useful features i.e. `date-range` filter to search in specific time slot. Given more time, I would efficiently streamline the whole flow.

2: In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?

Ans: By isolating each feature independent of data-table and makeing data-table more configurable because right now search, pagination is integrated into it . Also, I would convert universal features into their own components i.e. `search` so they can be pluggable into other scenarios too.

3: What is one CSS property that you recently learned about that helped you solve a problem?

Ans: Recently I was building a project i.e. [LUV](https://letusvue.app) where I needed to animate letters so by googling I came to know about `css variables`.
