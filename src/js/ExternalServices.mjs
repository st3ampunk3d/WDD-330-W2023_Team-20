// const baseURL = import.meta.env.VITE_SERVER_URL;
const baseURL = "https://wdd330-backend.onrender.com/";
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payment){
    const option = {
      method: "post",
      header: {
        "content-type": "application/jason"
      },
      body: JSON.stringify(payment),
    };
    return await fetch(baseURL + "checkout/", option).then(convertToJson);
  }
}