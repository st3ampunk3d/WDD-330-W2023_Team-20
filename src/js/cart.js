import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="removeFromCart" data-id="${item.Id}">X<span>
</li>`;

  return newItem;
}

renderCartContents();

function removeFromCart(product) {
  setLocalStorage("so-cart", product, "remove");
}
// add to cart button event handler
async function removeFromCartHandler(e) {
  removeFromCart(e.target.getAttribute("data-id"));
  location.reload();
}

// add listener to Add to Cart button
const allCartItems = document.querySelectorAll(".removeFromCart");

allCartItems.forEach(function (item) {
  item.addEventListener("click", removeFromCartHandler);
});
