import { setLocalStorage } from "./utils.mjs";

function htmlTemplate(product){
    const template = `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <div class="box">
      <div class="slider">
      </div>
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
        console.log(this.product)
        this.renderProductDetails(".main-body")
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addToCart.bind(this));
        
        this.sliderControls()

    }
    addToCart(){
      setLocalStorage("so-cart", this.product);
    
    }

    sliderControls() {
      const slides = document.querySelectorAll(".slide");
      const nextSlide = document.querySelector(".btn-next");
      const prevSlide = document.querySelector(".btn-prev");

      // current slide counter
      let curSlide = 0;
      // maximum number of slides
      let maxSlide = slides.length - 1;
      
      // add event listener and navigation functionality
      nextSlide.addEventListener("click", function () {
        // check if current slide is the last and reset current slide
        if (curSlide === maxSlide) {
          curSlide = 0;
        } else {
          curSlide++;
        }
      
      //   move slide by -100%
        slides.forEach((slide, indx) => {
          slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
        });
      });

      prevSlide.addEventListener("click", function () {
        // check if current slide is the first and reset current slide to last
        if (curSlide === 0) {
          curSlide = maxSlide;
        } else {
          curSlide--
        }
      
        //   move slide by 100%
        slides.forEach((slide, indx) => {
          slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
        });
      });
    }
  
    
    renderProductDetails(element){
      const main = document.querySelector(element);
      main.insertAdjacentHTML("afterbegin", htmlTemplate(this.product));
      this.generateImageSlider(".slider")
    }

    generateImageSlider(element){
      const images = [this.product.Images["PrimaryLarge"]]
      const extraImages = this.product.Images["ExtraImages"]
      const slider = document.querySelector(element)
      var slide = ""
      

      if (extraImages != null) {
        extraImages.forEach((item) => {
          images.push(item.Src)
        })

        images.sort()

        images.forEach((image) => {
          slide = `<div class="slide">
          <img class="divider"
            src="${image}"
            alt="${this.product.NameWithoutBrand}"/>
          </div>`
          slider.insertAdjacentHTML("beforeEnd", slide)
        })
        slider.insertAdjacentHTML("beforeEnd", `<button class="sldr-btn btn-next">></button><button class="sldr-btn btn-prev"><</button>`)
      } else {
        slide = `<div class="slide">
          <img class="divider"
            src="${this.product.Images["PrimaryLarge"]}"
            alt="${this.product.NameWithoutBrand}"/>
          </div>`
        slider.insertAdjacentHTML("beforeEnd", slide)
      }}
}