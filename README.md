<a href="https://github.com/jybleau/sweetalertbee">
  <img src="./assets/swal3-logo.png" width="498" alt="SweetAlertBee">
</a>

<br>

SweetAlert Bee is a direct replacement for SweetAlert2 without security and ethical issues.

A beautiful, responsive, customizable, accessible (WAI-ARIA) replacement <br> for JavaScript's popup boxes. Zero dependencies.


NB: This repository is maintained in sync with SweetAlert2.
---

## Installation

### NPM Registry

`npm install sweetalertbee`

`yarn add sweetalertbee`

### JsDelivr

```html
<script src="
https://cdn.jsdelivr.net/npm/sweetalertbee/dist/sweetalertbee.all.min.js
"></script>
```

## Basic examples

A basic message

```js
Swal.fire("SweetAlertBee is working!");
```

A dialog with three buttons

```js
Swal.fire({
  title: "Do you want to save the changes?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Save",
  denyButtonText: `Don't save`
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    Swal.fire("Saved!", "", "success");
  } else if (result.isDenied) {
    Swal.fire("Changes are not saved", "", "info");
  }
});
```


---

## Documentation

The SweetAlert2 documentation applies to SweetAlertBee

* [Usage](https://sweetalert2.github.io/#usage)
* [Examples](https://sweetalert2.github.io/#examples)
* [Recipe gallery](https://sweetalert2.github.io/recipe-gallery/)