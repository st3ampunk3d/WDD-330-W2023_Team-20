
import { loadHeaderFooter, alertMessage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".summary");
checkout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", checkout.claculateOrderTotal.bind(checkout));

document.forms["billing-info"].addEventListener("submit", (e) => {
  e.preventDefault();
  const form = document.forms["billing-info"];
  const chk_status = form.checkValidity();
  if (chk_status) {
    checkout.checkout();
  } else {
    const fname = document.querySelector("#fname");
    const lname = document.querySelector("#lname");
    const street = document.querySelector("#street");
    const city = document.querySelector("#city");
    const state = document.querySelector("#state");
    const zip = document.querySelector("#zip");
    const cardNumber = document.querySelector("#cc");
    const expiration = document.querySelector("#exp");
    const ccv = document.querySelector("#ccv");

    const fields = [
      fname,
      lname,
      street,
      city,
      state,
      zip,
      cardNumber,
      expiration,
      ccv,
    ];

    fields.forEach((field) => {
      if (!field.validity.valid) {
        const text = form.querySelector(`label[for=${field.id}]`).textContent;
        alertMessage(`Invalid ${text}`);
      }
    });
  }
});
