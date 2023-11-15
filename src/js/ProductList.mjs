import { renderListWithTemplates } from "./utils.mjs";

function productCardTemplate(product) {

    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
    <div class="box">
    <img src="${product.Images['PrimaryMedium']}" alt="${product.NameWithoutBrand}">
        <div class="ribbon-container">
            <span class="ribbon">${((1-(product.FinalPrice / product.SuggestedRetailPrice))*100).toFixed(0)}% OFF</span>
        </div>
    </div>
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="price"><s class="discount">$${product.SuggestedRetailPrice}</s> - $${product.FinalPrice}</p>
      </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);

    document
    .getElementById("sort")
    .addEventListener("change", this.sortOrder.bind(this));

    this.renderList(list);
  }

  async sortOrder() {
    let list = await this.dataSource.getData(this.category);

    var e = document.getElementById("sort");
    var option = e.options[e.selectedIndex].text;
    console.log(option)
    list.sort((a,b) => {
      let fa = a.NameWithoutBrand.toLowerCase()
      let fb = b.NameWithoutBrand.toLowerCase()
    
      if (option == "Price") {
        console.log("sorting by price")
         return Number(a.FinalPrice) - Number(b.FinalPrice)
      }
      if (option == "Brand") {
        console.log("sorting by Brand")
        fa = a.Brand.Name.toLowerCase()
        fb = b.Brand.Name.toLowerCase()
      }
      if (option == "Name") {
        console.log("default sort")
      }
    
      return fa.localeCompare(fb)
    })
    document.querySelector(".product-list").innerHTML = ""
    this.renderList(list)
  }

  renderList(list) {
    renderListWithTemplates(productCardTemplate, this.listElement, list);
    document.querySelector(".title").innerHTML = this.category;
  }
}