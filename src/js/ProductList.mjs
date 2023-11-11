import { renderListWithTemplates } from "./utils.mjs";


export default class ProductListing{
    
    ProductCardTemplate(product){
        return `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
        <div class="box">
        <img src="${product.Image}" alt="${product.NameWithoutBrand}">
            <div class="ribbon-container">
                <span class="ribbon">%${((product.FinalPrice / product.SuggestedRetailPrice)*100).toFixed(0)} OFF</span>
            </div>
        </div>
          <h3 class="card__brand">${product.Brand.Name}</h3>
          <h2 class="card__name">${product.NameWithoutBrand}</h2>
          <p class="price"><s class="discount">$${product.SuggestedRetailPrice}</s> - $${product.FinalPrice}</p>
          </a>
      </li>`
    }
    
    
    renderList(list){
        renderListWithTemplates(this.ProductCardTemplate, this.ProductElement, list);
    }
    constructor(dataCategory, dataSource, listElement){
        this.ProductCategory = dataCategory;
        this.ProductSource = dataSource;
        this.ProductElement = listElement;
    }

    async init(){
        const product = await this.ProductSource.getData()
        const filtered = this.filterTent(product);
        
        
        this.renderList(filtered)
    }
    filterTent(list){
        const listed = [];
        list.forEach(element => {
            if(element.Id === "880RR" || element.Id === "985RF" || element.Id === "985PR" || element.Id === "344YJ"){
                console.log(element.Id)
                listed.push(element)
            }     
        }); 

        return listed
    }

}
