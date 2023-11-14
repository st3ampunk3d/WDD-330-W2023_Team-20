import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParams } from "./utils.mjs";

const category = getParams('category')
const dataSource = new ProductData()
const listElement = document.querySelector('.product-list')
const myList = new ProductList(category, dataSource, listElement)

myList.init();
