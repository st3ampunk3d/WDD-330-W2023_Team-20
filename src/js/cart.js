import ShoppingCart from "./ShoppingCart.mjs";
import {
  getLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

loadHeaderFooter();

const dataSource = getLocalStorage("so-cart")
const listElement = document.querySelector(".product-list")
const myList = new ShoppingCart(dataSource, listElement)

myList.init()
