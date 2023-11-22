import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".summary");
checkout.init();

document
    .querySelector("#zip")
    .addEventListener("blur", checkout.claculateOrderTotal.bind(checkout))

document
    .querySelector("#checkout")
    .addEventListener("click", (e) => {
        e.preventDefault()
        checkout.checkout()
    })
