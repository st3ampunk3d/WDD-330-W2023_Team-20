import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductListing.mjs";

const data = new ProductData("tents");
const element = document.querySelector(".product-list");
const listData = new ProductListing("tents",data,element)

listData.init();