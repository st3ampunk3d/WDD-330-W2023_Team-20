import { setLocalStorage, getLocalStorage, updateCartIcon } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const [quantities, uniqueItems] = itemQuantity(cartItems);
  const htmlItems = uniqueItems.map((item) =>
    cartItemTemplate(item, quantities)
  );
  let htmlTotal = `Total: $${cartTotal(cartItems)}`;
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  document.querySelector(".cartTotal").innerHTML = htmlTotal;
}

function cartItemTemplate(item, quantites) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images['PrimarySmall']}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${quantites.get(item.Id)}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span><span class="removeFromCart" data-id="${item.Id}">X</span>
  <span class="decrement" data-id="${item.Id}"> - </span>
  <span class="addToCart" data-id="${item.Id}"> + </span></span>
</li>`;

  return newItem;
}

function cartTotal(item) {
  let price = 0;
  item.map((items) => {
    price = price + items.FinalPrice;
  });
  return price.toFixed(2);
}

renderCartContents();

function removeFromCart(product) {
  setLocalStorage("so-cart", product, "remove");
}

async function removeFromCartHandler(e) {
  removeFromCart(e.target.getAttribute("data-id"));
  location.reload();
}

const allCartItems = document.querySelectorAll(".removeFromCart");

allCartItems.forEach(function (item) {
  item.addEventListener("click", removeFromCartHandler);
});

function decrementCart(product) {
  setLocalStorage("so-cart", product, "remove");
}

async function decrementCartHandler(e) {
  decrementCart(e.target.getAttribute("data-id"));
  location.reload();
}

const decrementCartItems = document.querySelectorAll(".decrement");

decrementCartItems.forEach(function (item) {
  item.addEventListener("click", decrementCartHandler);
});

function itemQuantity(data) {
  var jsonArray = data;
  var map = new Map();
  let unique = {};
  let newArray = [];

  for (var i = 0; i < jsonArray.length; i++) {
    let objId = jsonArray[i]["Id"];
    unique[objId] = jsonArray[i];
    if (!map.get(jsonArray[i].Id)) {
      map.set(jsonArray[i].Id, 1);
    } else {
      map.set(jsonArray[i].Id, map.get(jsonArray[i].Id) + 1);
    }
  }

  for (i in unique) {
    newArray.push(unique[i]);
  }

  return [map, newArray];
}

window.onload = updateCartIcon;
