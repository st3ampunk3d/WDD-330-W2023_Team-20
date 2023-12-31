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
      const index = cartArray.findIndex((item) => item.Id == data.Id)
      cartArray.splice(index, 1)
    }
    

    localStorage.setItem(key, JSON.stringify(cartArray));
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

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback,
) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data)
  }
}

async function loadTemplate(path) {
  const res = await fetch(path)
  const template = await res.text()
  return template
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html")
  const headerElement = qs("#main-header")
  const footerTemplate = await loadTemplate("../partials/footer.html")
  const footerElement = qs("#main-footer")

  renderWithTemplate(headerTemplate, headerElement)
  renderWithTemplate(footerTemplate, footerElement)

  window.onload = updateCartIcon();

  document
  .getElementById("search")
    .addEventListener("input", ()=>{
      searchItem();
    })

}
export function searchItem(){

  var search = document.getElementById("search").value;
var category  = ["tents", "backpacks", "sleeping-bags", "hammocks"]
        
const mainElement = document.querySelector(".search-results");

async function getData(category){
    const data = await fetch(`https://wdd330-backend.onrender.com/products/search/${category}`)
        if (data.ok) {
            const dataJson = await data.json()
            const result = dataJson.Result;
            return result
        }else{
            throw{name: "serviceError", message: jsonResponse}
        }
}
 
let filter = async (category) => {
    
    let API = await getData(category);
    let display = API.filter((object)=>{
        if(object.Name.toLowerCase().includes(search.toLowerCase())){
            return object;
        }else{
          return {Name: `Not found`, FinalPrice: `Not found`}
        }
    }).map((object) => {
        return `
        <a href="../product_pages/index.html?product=${object.Id}">
        <div class="search-result">
        <p>${object.Name}</p>
        <p>Prize: ${object.FinalPrice}</p>
        </div>
        </a>
        <hr>`
    }).join("");

    mainElement.innerHTML = display;
}
category.forEach((element)=>{
  filter(element);

})
}

export function updateCartIcon() {
  const cartArray = getLocalStorage("so-cart")
  document.querySelector(".badge").setAttribute("value", cartArray.length)
}

export function alertMessage (message, scroll = true) {
  const alert = document.createElement('div')
  const main = document.querySelector("main")
  alert.classList.add('alert')

  alert.innerHTML = `${message}<span>X</span>`

  alert.addEventListener('click', (e) => {
    if (e.target.tagName == "SPAN") {
      main.removeChild(alert)
    }
  })
  main.prepend(alert)
  if (scroll) window.scrollTo(0,0)
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