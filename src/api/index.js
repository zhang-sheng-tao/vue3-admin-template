const files = import.meta.globEager('/src/api/*.js')

// const api = {}

const modules = {}

for (const keys in files) {
  let key = keys.replace(/\.js$/, '').split('/src/api/')[1]
  if (key !== 'index') {
    let { default: defaults } = { ...files[keys] }
    modules[key] = defaults
  }
}

// Object.keys(modules).forEach(item => {
//     modules[item]['namespaced'] = true
// })

// const context = require.context('.', true, /\.js$/)
// const api = context
//   .keys()
//   .map(modulePath => {
//     const names = modulePath.split('/')
//     let moduleName = names[2] && names[2].slice(0, -3) // login index undefined
//     if (moduleName) {
//       moduleName = moduleName === 'index' ? names[1] : moduleName
//     }
//     return {
//       modulePath,
//       moduleName
//     }
//   })
//   .filter(module => module.moduleName)
//   .reduce((modules, module) => {
//     modules[module.moduleName] = context(module.modulePath).default
//     return modules
//   }, {})

export default modules
