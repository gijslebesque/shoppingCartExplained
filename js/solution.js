window.onload = function() {
  //Adding event listeners
  addGetPriceEvent();
  addDeleteProdEvent();
  addProdEvent();
};

//Check all the inputfields and add an change event
function addGetPriceEvent() {
  const inputFields = document.getElementsByClassName("quantity");
  //Only need to add EventListener to last element of the array
  const lastInputField = inputFields[inputFields.length - 1];
  lastInputField.addEventListener("change", function() {
    let product = this.closest(".product");
    //Update price receives the html row with product info
    //And the current value of the inputfield
    updatePriceByProduct(product, this.value);
  });
}

function updatePriceByProduct(product, quantity) {
  //product = html row of the product
  const priceProduct = parseFloat(product.querySelector(".price").innerText);
  const subTotalPrice = priceProduct * quantity;
  const subTotalElement = product.querySelector(".subtotal");
  subTotalElement.innerText = subTotalPrice.toFixed(2);

  getTotalPrice();
}

function getTotalPrice() {
  //First get all the subtotal prices.
  const subTotalPrices = document.getElementsByClassName("subtotal");

  //variable to store the sum of subtotals
  let totalPrice = 0;
  for (let i = 0; i < subTotalPrices.length; i++) {
    //looping and adding the subtotalprice to sum
    totalPrice += parseFloat(subTotalPrices[i].innerText);
  }
  //set the total price with sum
  document.getElementById("total-price").innerText = totalPrice.toFixed(2);
}

function addDeleteProdEvent() {
  //Check all the inputfield and add click event
  const deleteButtons = document.getElementsByClassName("btn-delete");
  const lastDeleteButton = deleteButtons[deleteButtons.length - 1];
  lastDeleteButton.addEventListener("click", function() {
    //Find whole row and remove from DOM
    this.closest(".product").remove();
    //Call total price again to update price
    getTotalPrice();
  });
}

function addProdEvent() {
  const addProdBtn = document.getElementById("addProd");

  addProdBtn.addEventListener("click", function() {
    let newProdName = document.getElementById("newProdName");
    let newProdPriceElement = document.getElementById("newProdPrice");

    //Can only add product if there's user input
    if (!newProdName.value || !newProdPriceElement.value) return false;

    //Need to parse string here
    const newProdPrice = parseFloat(newProdPriceElement.value).toFixed(2);

    //Call addProduct with input values
    addProductWithClass(newProdName.value, newProdPrice);

    //Set value of input field to empty again
    newProdName.value = "";
    newProdPriceElement.value = "";
  });
}
function addProduct(newProdName, newProdPrice) {
  //newProdName and newProdPrice are inputfield values

  //Create a new element and set innerHTML. EWvery row should have the same structure.
  const newProduct = document.createElement("article");
  //Give same class
  newProduct.className = "product";
  newProduct.innerHTML = `
      <div class="title">
        ${newProdName}
      </div>
      <div>$ <span class="price">${newProdPrice}</span></div>
      <div>
        QNTY
        <input class="quantity" type="number" value="0" />
      </div>
      <div>$ <span class="subtotal">0.00</span></div>
      <button class="btn btn-delete">Delete</button>`;

  //Append the element to DOM.
  document.getElementById("product-container").appendChild(newProduct);

  //Attach eventListeners
  addGetPriceEvent();
  addDeleteProdEvent();
}

//Using a class contructor

function addProductWithClass(newProdName, newProdPrice) {
  debugger;
  const product = new Product(newProdName, newProdPrice, "article", "product");
  product.addToDom("product-container");
}

class Product {
  constructor(prodName, prodPrice, elementType, elementClassName) {
    this.prodName = prodName;
    this.prodPrice = prodPrice;
    this.htmlElement = document.createElement(elementType);
    this.htmlElement.className = elementClassName;
    this.htmlElement.innerHTML = `
    <div class="title">
      ${this.prodName}
    </div>
    <div>$ <span class="price">${this.prodPrice}</span></div>
    <div>
      QNTY
      <input class="quantity" type="number" value="0" />
    </div>
    <div>$ <span class="subtotal">0.00</span></div>
    <button class="btn btn-delete">Delete</button>`;
  }
  addToDom(domNode) {
    const parent = document.getElementById(domNode);
    parent.appendChild(this.htmlElement);
  }
}
