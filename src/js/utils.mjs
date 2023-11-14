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

    if (action == "add") {
      cartArray.push(data)
    } else {
      const index = cartArray.map(item => item.Id).indexOf(data)
      cartArray.splice(index, 1)
    }
    

    localStorage.setItem(key, JSON.stringify(cartArray));
    console.log(cartArray.length)
    updateCartIcon()
    animateCartIcon()
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

export function getParams(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplates(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function updateCartIcon() {
  const cartArray = getLocalStorage("so-cart")

  console.log("triggered")
  document.querySelector(".badge").setAttribute("value", cartArray.length)
}

function animateCartIcon() {
  let element = document.getElementById("cart-icon")
  element.style.transition="all 1s"
  element.style.fill="red"
  element.style.width="30px"
  element.setAttribute("transform", "rotate(15)")
  setTimeout(function() {
    element.setAttribute("transform", "rotate(-15)")
  }, 500)
  setTimeout(function() {
    element.setAttribute("transform", "rotate(0)")
  }, 1000)
  setTimeout(function() {
    element.style.fill="black"
    element.style.width="25px"
  }, 2000)
  setTimeout(function() {
    element.style.setProperty('transition', 'initial')
  }, 3000)
}