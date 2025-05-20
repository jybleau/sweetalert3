#!/usr/bin/env zx
import { $, echo, fs, glob } from 'zx'
import { eslintFormat } from '@sweetalert2/eslint-config'
import eslintConfig from '../eslint.config.mjs'

echo`1. Build JS ...`
await eslintFormat(glob.sync('src/**/*.js'), eslintConfig)
await $`rollup -c --bundleConfigAsCjs`
echo`OK!`
echo``

echo`2. Build CSS ...`
await $`sass src/sweetalertbee.scss dist/sweetalertbee.css --no-source-map`
await $`sass src/sweetalertbee.scss dist/sweetalertbee.min.css --no-source-map --style=compressed`
echo`OK!`
echo``

echo`3. Build JS+CSS ...`
const css = fs.readFileSync('dist/sweetalertbee.min.css', 'utf8')
const cssInJs = `"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,"${css
  .trim()
  .replace(/"/g, '\\"')}");`
fs.writeFileSync('dist/sweetalertbee.all.js', `${fs.readFileSync('dist/sweetalertbee.js', 'utf-8')}${cssInJs}`)
fs.writeFileSync('dist/sweetalertbee.all.min.js', `${fs.readFileSync('dist/sweetalertbee.min.js', 'utf-8')}${cssInJs}`)
fs.writeFileSync('dist/sweetalertbee.esm.all.js', `${fs.readFileSync('dist/sweetalertbee.esm.js', 'utf-8')}${cssInJs}`)
fs.writeFileSync(
  'dist/sweetalertbee.esm.all.min.js',
  `${fs.readFileSync('dist/sweetalertbee.esm.min.js', 'utf-8')}${cssInJs}`
)
await $`git checkout . >/dev/null 2>&1`
echo`OK!`
echo``
