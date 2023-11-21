import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkoutCart = new CheckoutProcess("so-cart", ".summary");
checkoutCart.init();

document.querySelector("#zip").addEventListener("blur", checkoutCart.calculateOrderTotal.bind(checkoutCart));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    checkoutCart.checkout();
})
