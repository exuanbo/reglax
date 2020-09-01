const typescript = require('@rollup/plugin-typescript')
const pkg = require('./package.json')

export default {
  input: 'src/index.ts',
  plugins: [typescript()],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'auto'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ]
}
