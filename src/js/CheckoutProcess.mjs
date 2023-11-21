import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const service = new ExternalServices();

function formDataJason(formElement){
    const formJson = new FormData(formElement);
    const convertedJSON = {};

    formJson.forEach(function(value, key){
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
        this.list = getLocalStorage(this.key);
        this.calculateOrderSummery();
    }
    calculateOrderSummery(){
            const  sumItem= document.querySelector("#cartTotal");
            const subNum = document.querySelector("#subNum");
            
            subNum.textContent = this.list.length;
            const amount =  this.list.map((item)  => item.FinalPrice);
            this.itemTotal = amount.reduce((item, sum) =>  sum + item );
            sumItem.textContent =`$${this.itemTotal}`
    }
    calculateOrderTotal(){
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * .06).toFixed(2);
        this.orderTotal = (
        parseFloat(this.itemTotal) + 
        parseFloat(this.tax) + 
        parseFloat(this.shipping)).toFixed(2);
        this.displayOrder(); 
    }
    displayOrder(){
        const shipping = document.querySelector( "#shipping");
        const taxTotal = document.querySelector( "#taxTotal");
        const orderTotal = document.querySelector( "#orderTotal");
        shipping.textContent  = `$${this.shipping}`;
        taxTotal.textContent  = `$${this.tax}`;
        orderTotal.textContent  = `$${this.orderTotal}`;
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
            const res = await service.checkout(json);
            console.log(res)
        } catch (error) {
                console.log(error);
        }

    }
}