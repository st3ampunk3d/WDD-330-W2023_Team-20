import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const service = new ExternalServices();
function formDataJason(formElement){
    const formJason = new formJason(formElement);
    const convertedJSON = [];
    formJason.forEach(function(value, key){
        convertedJSON[key] = value;
    });

    return convertedJSON;
}
function packageItems(items) {
    const simplifiedItems = items.map((item) => {
      console.log(item);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    return simplifiedItems;
  }
export default class CheckoutProcess{
    constructor(key, outputConstructor){
        this.key = key;
        this.outputConstructor = outputConstructor;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init(){
        this.list = getLocalStorage(this.key)
        this.calculateOrderSummery();
    }
    calculateOrderSummery(){
            const itemTotal = document.querySelector(this.outputConstructor + "#cartTotal");
            const SubNum = document.querySelector(this.outputConstructor + "#SubNum");
            
            SubNum.textContent = this.list.length;
            const amount =  this.list.map((element)  => element.finalPrice);
            this.itemTotal = amount.reduce((item, sum) =>  sum + item );
            itemTotal.textContent =`$${this.itemTotal}`
    }
    calculateOrderTotal(){
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * .06).toFixed(2);
        this.orderTotal = (parseFloat(this.itemTotal) + 
        parseFloat(this.tax) + parseFloat(this.shipping)).toFixed(2);
        this.displayOrder(); 
    }
    displayOrder(){
        const shipping = document.querySelector(this.outputConstructor + "#shipping");
        const taxTotal = document.querySelector(this.outputConstructor + "#taxTotal");
        const orderTotal = document.querySelector(this.outputConstructor + "#orderTotal");
        shipping.textContent = `$${this.shipping}`;
        taxTotal.textContent = `$${this.tax}`;
        orderTotal.textContent = `$${this.orderTotal}`;
    }
    async checkout(){
        const formatedCheckout = document.forms["checkout"];
        const json = formDataJason(formatedCheckout);
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
            const res = await service.checkout(jeson);
            console.log(res)
        } catch (error) {
                console.log(error);
        }

    }
}