/**
 * @typedef { import('./SweetAlert').SweetAlert } SweetAlert
 * @typedef { import('sweetalertbee').SweetAlertOptions } SweetAlertOptions
 * @typedef { import('sweetalertbee').SweetAlertCustomClass } SweetAlertCustomClass
 * @typedef { import('sweetalertbee').SweetAlertIcon } SweetAlertIcon
 * @typedef { import('sweetalertbee').SweetAlertInput } SweetAlertInput
 * @typedef { import('sweetalertbee').SweetAlertResult } SweetAlertResult
 * @typedef { import('sweetalertbee').SweetAlertOptions['inputValue'] } SweetAlertInputValue
 */

/**
 * @typedef { import('./utils/Timer').default } Timer
 * @typedef { import('./utils/EventEmitter').default } EventEmitter
 */

/**
 * @typedef GlobalState
 * @property {SweetAlert} [currentInstance]
 * @property {Element | null} [previousActiveElement]
 * @property {Timer} [timeout]
 * @property {EventEmitter} [eventEmitter]
 * @property {NodeJS.Timeout} [restoreFocusTimeout]
 * @property {(this: HTMLElement, event: KeyboardEvent) => any} [keydownHandler]
 * @property {HTMLElement | (Window & typeof globalThis)} [keydownTarget]
 * @property {boolean} [keydownHandlerAdded]
 * @property {boolean} [keydownListenerCapture]
 * @property {Function} [swalCloseEventFinishedCallback]
 */

/**
 * @typedef DomCache
 * @property {HTMLElement} popup
 * @property {HTMLElement} container
 * @property {HTMLElement} actions
 * @property {HTMLElement} confirmButton
 * @property {HTMLElement} denyButton
 * @property {HTMLElement} cancelButton
 * @property {HTMLElement} loader
 * @property {HTMLElement} closeButton
 * @property {HTMLElement} validationMessage
 * @property {HTMLElement} progressSteps
 */

/**
 * @typedef
 * { | 'container'
 *   | 'shown'
 *   | 'height-auto'
 *   | 'iosfix'
 *   | 'popup'
 *   | 'modal'
 *   | 'no-backdrop'
 *   | 'no-transition'
 *   | 'toast'
 *   | 'toast-shown'
 *   | 'show'
 *   | 'hide'
 *   | 'close'
 *   | 'title'
 *   | 'html-container'
 *   | 'actions'
 *   | 'confirm'
 *   | 'deny'
 *   | 'cancel'
 *   | 'footer'
 *   | 'icon'
 *   | 'icon-content'
 *   | 'image'
 *   | 'input'
 *   | 'file'
 *   | 'range'
 *   | 'select'
 *   | 'radio'
 *   | 'checkbox'
 *   | 'label'
 *   | 'textarea'
 *   | 'inputerror'
 *   | 'input-label'
 *   | 'validation-message'
 *   | 'progress-steps'
 *   | 'active-progress-step'
 *   | 'progress-step'
 *   | 'progress-step-line'
 *   | 'loader'
 *   | 'loading'
 *   | 'styled'
 *   | 'top'
 *   | 'top-start'
 *   | 'top-end'
 *   | 'top-left'
 *   | 'top-right'
 *   | 'center'
 *   | 'center-start'
 *   | 'center-end'
 *   | 'center-left'
 *   | 'center-right'
 *   | 'bottom'
 *   | 'bottom-start'
 *   | 'bottom-end'
 *   | 'bottom-left'
 *   | 'bottom-right'
 *   | 'grow-row'
 *   | 'grow-column'
 *   | 'grow-fullscreen'
 *   | 'rtl'
 *   | 'timer-progress-bar'
 *   | 'timer-progress-bar-container'
 *   | 'scrollbar-measure'
 *   | 'icon-success'
 *   | 'icon-warning'
 *   | 'icon-info'
 *   | 'icon-question'
 *   | 'icon-error'
 *   | 'draggable'
 *   | 'dragging'
 * } SwalClass
 */

/**
 * @typedef {(eventName: string) => void} EventHandler
 * @typedef {EventHandler[]} EventHandlers
 * @typedef {Record<string, EventHandlers>} Events
 */
