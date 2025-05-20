import { readFileSync } from 'fs'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

const packageJson = JSON.parse(readFileSync('package.json'))
const version = process.env.VERSION || packageJson.version

const banner = `/*!
* ${packageJson.name} v${version}
* Released under the ${packageJson.license} License.
*/`

const footer = `\
if (typeof this !== 'undefined' && this.Sweetalert3){\
this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert3\
}`

const output = {
  format: 'umd',
  name: 'Sweetalert3',
  file: 'dist/sweetalert3.js',
  banner,
  footer,
}
const outputEsm = {
  format: 'es',
  file: 'dist/sweetalert3.esm.js',
  banner,
}

export default {
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: [['@babel/preset-env', { include: ['transform-optional-chaining', 'transform-class-properties'] }]],
      targets: 'defaults',
    }),
  ],
  input: 'src/sweetalert3.js',
  output: [
    output,
    outputEsm,
    {
      ...output,
      file: 'dist/sweetalert3.min.js',
      plugins: [terser()],
    },
    {
      ...outputEsm,
      file: 'dist/sweetalert3.esm.min.js',
      plugins: [terser()],
    },
  ],
  // https://github.com/rollup/rollup/issues/2271
  onwarn(warning, rollupWarn) {
    if (warning.code !== 'CIRCULAR_DEPENDENCY' && warning.code !== 'THIS_IS_UNDEFINED') {
      rollupWarn(warning)
    }
  },
}
