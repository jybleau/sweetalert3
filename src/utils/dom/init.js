import globalState from '../../globalState.js'
import { swalClasses } from '../classes.js'
import { isNodeEnv } from '../isNodeEnv.js'
import { error } from '../utils.js'
import { addClass, getDirectChildByClass, removeClass, setInnerHtml } from './domUtils.js'
import { getContainer, getPopup } from './getters.js'

const sweetHTML = `
 <div aria-labelledby="${swalClasses.title}" aria-describedby="${swalClasses['html-container']}" class="${swalClasses.popup}" tabindex="-1">
   <button type="button" class="${swalClasses.close}"></button>
   <ul class="${swalClasses['progress-steps']}"></ul>
   <div class="${swalClasses.icon}"></div>
   <img class="${swalClasses.image}" />
   <h2 class="${swalClasses.title}" id="${swalClasses.title}"></h2>
   <div class="${swalClasses['html-container']}" id="${swalClasses['html-container']}"></div>
   <input class="${swalClasses.input}" id="${swalClasses.input}" />
   <input type="file" class="${swalClasses.file}" />
   <div class="${swalClasses.range}">
     <input type="range" />
     <output></output>
   </div>
   <select class="${swalClasses.select}" id="${swalClasses.select}"></select>
   <div class="${swalClasses.radio}"></div>
   <label class="${swalClasses.checkbox}">
     <input type="checkbox" id="${swalClasses.checkbox}" />
     <span class="${swalClasses.label}"></span>
   </label>
   <textarea class="${swalClasses.textarea}" id="${swalClasses.textarea}"></textarea>
   <div class="${swalClasses['validation-message']}" id="${swalClasses['validation-message']}"></div>
   <div class="${swalClasses.actions}">
     <div class="${swalClasses.loader}"></div>
     <button type="button" class="${swalClasses.confirm}"></button>
     <button type="button" class="${swalClasses.deny}"></button>
     <button type="button" class="${swalClasses.cancel}"></button>
   </div>
   <div class="${swalClasses.footer}"></div>
   <div class="${swalClasses['timer-progress-bar-container']}">
     <div class="${swalClasses['timer-progress-bar']}"></div>
   </div>
 </div>
`.replace(/(^|\n)\s*/g, '')

/**
 * @returns {boolean}
 */
const resetOldContainer = () => {
  const oldContainer = getContainer()
  if (!oldContainer) {
    return false
  }

  oldContainer.remove()
  removeClass(
    [document.documentElement, document.body],
    [swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['has-column']]
  )

  return true
}

const resetValidationMessage = () => {
  globalState.currentInstance.resetValidationMessage()
}

const addInputChangeListeners = () => {
  const popup = getPopup()

  const input = getDirectChildByClass(popup, swalClasses.input)
  const file = getDirectChildByClass(popup, swalClasses.file)
  /** @type {HTMLInputElement} */
  const range = popup.querySelector(`.${swalClasses.range} input`)
  /** @type {HTMLOutputElement} */
  const rangeOutput = popup.querySelector(`.${swalClasses.range} output`)
  const select = getDirectChildByClass(popup, swalClasses.select)
  /** @type {HTMLInputElement} */
  const checkbox = popup.querySelector(`.${swalClasses.checkbox} input`)
  const textarea = getDirectChildByClass(popup, swalClasses.textarea)

  input.oninput = resetValidationMessage
  file.onchange = resetValidationMessage
  select.onchange = resetValidationMessage
  checkbox.onchange = resetValidationMessage
  textarea.oninput = resetValidationMessage

  range.oninput = () => {
    resetValidationMessage()
    rangeOutput.value = range.value
  }

  range.onchange = () => {
    resetValidationMessage()
    rangeOutput.value = range.value
  }
}

/**
 * @param {string | HTMLElement} target
 * @returns {HTMLElement}
 */
const getTarget = (target) => (typeof target === 'string' ? document.querySelector(target) : target)

/**
 * @param {SweetAlertOptions} params
 */
const setupAccessibility = (params) => {
  const popup = getPopup()

  popup.setAttribute('role', params.toast ? 'alert' : 'dialog')
  popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive')
  if (!params.toast) {
    popup.setAttribute('aria-modal', 'true')
  }
}

/**
 * @param {HTMLElement} targetElement
 */
const setupRTL = (targetElement) => {
  if (window.getComputedStyle(targetElement).direction === 'rtl') {
    addClass(getContainer(), swalClasses.rtl)
  }
}

/**
 * Add modal + backdrop to DOM
 *
 * @param {SweetAlertOptions} params
 */
export const init = (params) => {
  // Clean up the old popup container if it exists
  const oldContainerExisted = resetOldContainer()

  if (isNodeEnv()) {
    error('SweetAlertBee requires document to initialize')
    return
  }

  const container = document.createElement('div')
  container.className = swalClasses.container
  if (oldContainerExisted) {
    addClass(container, swalClasses['no-transition'])
  }
  setInnerHtml(container, sweetHTML)

  container.dataset['swal2Theme'] = params.theme

  const targetElement = getTarget(params.target)
  targetElement.appendChild(container)

  if (params.topLayer) {
    container.setAttribute('popover', '')
    container.showPopover()
  }

  setupAccessibility(params)
  setupRTL(targetElement)
  addInputChangeListeners()
}
