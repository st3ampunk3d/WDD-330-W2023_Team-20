import { getLocalStorage, setLocalStorage, updateCartIcon } from "./utils.mjs"
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices()

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
      convertedJSON = {};
  
    formData.forEach((value, key) => {
      convertedJSON[key] = value;
    });
  
    return convertedJSON;
  }

function packageItems(items) {
    const simpleItems = items.map((item) => {
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name
        }
    })
    return simpleItems
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key
        this.outputSelector = outputSelector
        this.list = []
        this.itemTotal = 0
        this.shipping = 0
        this.tax = 0
        this.orderTotal = 0
    }

    init() {
        this.list = getLocalStorage(this.key)
        this.generateOrderSummary()
    }

    generateOrderSummary() {
        const subtotal = document.querySelector(this.outputSelector + " #subtotal")
        const itemamounts = this.list.map((item) => item.FinalPrice)
        this.itemTotal = itemamounts.reduce((sum, item) => sum +item)
        subtotal.innerText = `$${this.itemTotal}`
    }

    claculateOrderTotal() {
        this.shipping = 10 + (this.list.length - 1) *2
        this.tax = (this.itemTotal * 0.06).toFixed(2)
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        ).toFixed(2)
        this.displayOderTotals()
    }

    displayOderTotals() {
        const shipping = document.querySelector(this.outputSelector + " #shipping")
        const tax = document.querySelector(this.outputSelector + " #tax")
        const orderTotal = document.querySelector(this.outputSelector + " #order-total")

        shipping.innerText = `$${this.shipping}`
        tax.innerText = `$${this.tax}`
        orderTotal.innerText = `$${this.orderTotal}`
    }

    async checkout() {
        const formElement = document.forms["billing-info"];
    
        const json = formDataToJSON(formElement);

        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);

        try {
          const res = await services.checkout(json);
          console.log(res);
          setLocalStorage("so-cart", [], "remove")
          updateCartIcon()
          location.assign("/checkout/success.html")
        } catch (err) {
          console.log(err);
        }

    }
}