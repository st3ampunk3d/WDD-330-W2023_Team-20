import { getLocalStorage, renderListWithTemplates, setLocalStorage } from "./utils.mjs";

function cartCardTemplate(product) {
    return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
    <img
      src="${product.Images}"
      alt="${product.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${product.Name}</h2>
  </a>
  <p class="cart-card__color">${product.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty:<input class="updateCart" type="number"  min="0"></p>
  <p class="cart-card__price">$${product.FinalPrice}</p>
  <span><span class="removeFromCart" data-id="${product.Id}">X</span>
</li>`;
}

export default class ShoppingCart {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource
        this.listElement = listElement
    }
    async init() {
        const [map, list] = this.consolidateDuplicates(this.dataSource)
        this.renderList(list)

        document.querySelector(".cartTotal").innerHTML = `Total: $${cartTotal(getLocalStorage("so-cart"))}`

        const removeItem = document.querySelectorAll('.removeFromCart')
        removeItem.forEach( (item, index) => {
          item.addEventListener("click", function removefromCart() {
            var quantity = map.get(list[index].Id)
            let i = 0
            while (i < quantity) {
              setLocalStorage("so-cart", list[index], "remove")
              document.querySelector(".cartTotal").innerHTML = `Total: $${cartTotal(getLocalStorage("so-cart"))}`
              i++
            }
            location.reload()
          })
        })

        const updateQuantity = document.querySelectorAll('.updateCart')

        updateQuantity.forEach( (item, index) => {
          var quantity = map.get(list[index].Id)
          item.setAttribute("value", quantity)
          item.addEventListener('input', function updateThings() {
            quantity = map.get(list[index].Id)
            if (quantity < item.value) {
              console.log(item.value, quantity)
              var toAdd = Number(item.value)-quantity
              let i = 0
              while (i < toAdd) {
                setLocalStorage("so-cart", list[index], "add")
                document.querySelector(".cartTotal").innerHTML = `Total: $${cartTotal(getLocalStorage("so-cart"))}`
                i++
              }
            } else if (quantity > item.value) {
              console.log("decrease")
              const toRemove = quantity-item.value
              let i = 0
              while (i < toRemove) {
                setLocalStorage("so-cart", list[index], "remove")
                document.querySelector(".cartTotal").innerHTML = `Total: $${cartTotal(getLocalStorage("so-cart"))}`
                i++
              }
            } else {
              console.log("No Change")
            }
            item.setAttribute("value", item.value)
            map.set(list[index].Id, item.value)
          })
        })
    }

    renderList(list) {
        renderListWithTemplates(cartCardTemplate, this.listElement, list)
    }

    consolidateDuplicates(dataSource) {
      var jsonArray = dataSource;
      var map = new Map();
      let unique = {};
      let newArray = [];
    
      for (var i = 0; i < jsonArray.length; i++) {
        let objId = jsonArray[i]["Id"];
        unique[objId] = jsonArray[i];
        if (!map.get(jsonArray[i].Id)) {
          map.set(jsonArray[i].Id, 1);
        } else {
          map.set(jsonArray[i].Id, map.get(jsonArray[i].Id) + 1);
        }
      }
    
      for (i in unique) {
        newArray.push(unique[i]);
      }
    
      return [map, newArray];
    }
}

function cartTotal(item) {
  let price = 0;
  item.map((items) => {
    price = price + items.FinalPrice;
  });
  return price.toFixed(2);
}