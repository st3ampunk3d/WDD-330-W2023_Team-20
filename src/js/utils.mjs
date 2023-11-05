// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  var cartArray = JSON.parse(localStorage.getItem(key) || "[]");
  if (cartArray == null) {
    cartArray = [];
  }
  return cartArray;
}
// save data to local storage
export function setLocalStorage(key, data, action = "add") {
  try {
    let cartArray = JSON.parse(localStorage.getItem(key) || "[]");

    if (!Array.isArray(cartArray)) {
      cartArray = []; // Initialize as an empty array if it's not an array
    }

    if (action === "add") {
      cartArray.push(data);
    } else {
      const index = cartArray.findIndex((item) => item.Id === data.Id);
        cartArray.splice(index, 1);
    }

    localStorage.setItem(key, JSON.stringify(cartArray));
  } catch (error) {
    console.error(error);
  }
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
