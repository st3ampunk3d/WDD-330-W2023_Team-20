import { setLocalStorage } from "./utils.mjs";
// import {findProductById} from "./utils.mjs"

function htmlTemplate(product){
    const template = `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <div class="box">
      <img
        class="divider"
        src="${product.Images['PrimaryLarge']}"
        alt="${product.NameWithoutBrand}"/>
      <div class="ribbon-container">
        <span class="ribbon">%${((1-(product.FinalPrice / product.SuggestedRetailPrice))*100).toFixed(0)} OFF</span>
      </div>
    </div>
    <p class="price"><s class="discount">$${product.SuggestedRetailPrice}</s> - $${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`

    return template;
}
export default class ProductDetails{

    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    
    async init(){
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails(".divider")
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addToCart.bind(this));

    }
    addToCart(){
      setLocalStorage("so-cart", this.product);
    
    }
    
    renderProductDetails(element){
      const main = document.querySelector(element);
      main.insertAdjacentHTML("afterbegin", htmlTemplate(this.product));
    }
}
