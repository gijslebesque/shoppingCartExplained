window.onload = function() {
  addEventListeners();

  const addProdBtn = document.getElementById("addProd");

  addProdBtn.addEventListener("click", function() {
    const newProdName = document.getElementById("newProdName").value;
    const newProdPrice = document.getElementById("newProdPrice").value;
    addProdViaClass(newProdName, newProdPrice);
    // addAProduct(newProdName, newProdPrice);
  });
};

function getProductPricePerRow(row, quantity) {
  const priceProd = parseFloat(row.querySelector(".price").innerText);
  const subTotal = priceProd * parseFloat(quantity);
  row.querySelector(".subtotal").innerText = subTotal.toFixed(2);
  getTotalPrice();
}

function getTotalPrice() {
  const allSubtotals = document.getElementsByClassName("subtotal");
  let totalPrice = 0;
  for (let i = 0; i < allSubtotals.length; i++) {
    totalPrice += parseFloat(allSubtotals[i].innerText);
  }
  document.getElementById("total-price").innerText = totalPrice.toFixed(2);
}

function addAProduct(prodName, prodPrice) {
  //Here create element
  const newRow = document.createElement("article");
  newRow.className = "product";
  newRow.innerHTML = ` 
    <div class="title">
      ${prodName}
    </div>
    <div>$ <span class="price">${prodPrice}</span></div>
    <div>
      QNTY
      <input class="quantity" type="number" value="0" />
    </div>
    <div>$ <span class="subtotal">0.00</span></div>
    <button class="btn btn-delete">Delete</button>
  `;

  const parent = document.getElementById("product-container");
  parent.appendChild(newRow);
  addEventListeners();
}

function addProdViaClass(prodName, prodPrice) {
  debugger;
  const product = new Product(prodName, prodPrice);
  product.addToDocument("product-container");
}

function addEventListeners() {
  const quantities = document.getElementsByClassName("quantity");

  quantities[quantities.length - 1].addEventListener("change", function() {
    const productRow = this.closest(".product");
    getProductPricePerRow(productRow, this.value);
  });

  const deleteBTns = document.getElementsByClassName("btn-delete");
  deleteBTns[deleteBTns.length - 1].addEventListener("click", function() {
    const productRow = this.closest(".product");
    productRow.remove();
  });
}

class Product {
  constructor(name, price) {
    this.prodName = name;
    this.prodPrice = price;
    this.element = null;
  }

  createElement() {
    debugger;
    const newRow = document.createElement("article");
    newRow.className = "product";
    newRow.innerHTML = ` 
    <div class="title">
      ${this.prodName}
    </div>
    <div>$ <span class="price">${this.prodPrice}</span></div>
    <div>
      QNTY
      <input class="quantity" type="number" value="0" />
    </div>
    <div>$ <span class="subtotal">0.00</span></div>
    <button class="btn btn-delete">Delete</button>
  `;

    this.element = newRow;
    debugger;
  }

  addToDocument(domNode) {
    debugger;
    this.createElement();
    //this.element -> <article class="product">  </article>
    const parent = document.getElementById(domNode);
    parent.appendChild(this.element);
  }
}

/*
  product = {
    prodName: "a name",
    prodPrice: 88
    createElement: function () {}
    addToDocument : function() {}
  }
*/
