import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkoutCart = new CheckoutProcess("so-cart", ".summary");
checkoutCart.init();

document.querySelector("#")

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    checkoutCart.checkout();
})
