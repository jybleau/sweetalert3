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
if (typeof this !== 'undefined' && this.SweetAlertBee){\
this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.SweetAlertBee\
}`

const output = {
  format: 'umd',
  name: 'SweetAlertBee',
  file: 'dist/sweetalertbee.js',
  banner,
  footer,
}
const outputEsm = {
  format: 'es',
  file: 'dist/sweetalertbee.esm.js',
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
  input: 'src/sweetalertbee.js',
  output: [
    output,
    outputEsm,
    {
      ...output,
      file: 'dist/sweetalertbee.min.js',
      plugins: [terser()],
    },
    {
      ...outputEsm,
      file: 'dist/sweetalertbee.esm.min.js',
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
