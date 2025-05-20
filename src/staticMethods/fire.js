/**
 * Main method to create a new SweetAlert popup
 *
 * @param  {...SweetAlertOptions} args
 * @returns {Promise<SweetAlertResult>}
 */
export function fire(...args) {
  return new this(...args)
}
