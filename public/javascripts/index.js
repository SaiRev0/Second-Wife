document.getElementById("veg").addEventListener("click", veg);

document.getElementById("non_veg").addEventListener("click", non_veg);

document.getElementById("all").addEventListener("click", all);

function veg() {
  document.getElementById("chicken").classList.add("hidden");
  document.getElementById("dosa").classList.remove("hidden");
  document.getElementById("maggi").classList.remove("hidden");
  document.getElementById("special").classList.remove("hidden");
  document.getElementById("paneer").classList.remove("hidden");
  document.getElementById("vegetable").classList.remove("hidden");
  document.getElementById("south-indian").classList.remove("hidden");

  document.querySelectorAll(".veg").forEach((item) => {
    item.classList.remove("hidden");
  });
  document.querySelectorAll(".non-veg").forEach((item) => {
    item.classList.add("hidden");
  });
}

function non_veg() {
  document.getElementById("paneer").classList.add("hidden");
  document.getElementById("vegetable").classList.add("hidden");
  document.getElementById("south-indian").classList.add("hidden");
  document.getElementById("chicken").classList.remove("hidden");
  document.getElementById("maggi").classList.add("hidden");
  document.getElementById("special").classList.add("hidden");
  document.getElementById("dosa").classList.add("hidden");
  document.querySelectorAll(".non-veg").forEach((item) => {
    item.classList.remove("hidden");
  });
  document.querySelectorAll(".veg").forEach((item) => {
    item.classList.add("hidden");
  });
}

function all() {
  document.getElementById("paneer").classList.remove("hidden");
  document.getElementById("vegetable").classList.remove("hidden");
  document.getElementById("south-indian").classList.remove("hidden");
  document.getElementById("chicken").classList.remove("hidden");
  document.getElementById("dosa").classList.remove("hidden");
  document.getElementById("maggi").classList.remove("hidden");
  document.getElementById("special").classList.remove("hidden");

  document.querySelectorAll(".non-veg").forEach((item) => {
    item.classList.remove("hidden");
  });
  document.querySelectorAll(".veg").forEach((item) => {
    item.classList.remove("hidden");
  });
}

document.querySelectorAll(".add-to-cart").forEach((item) => {
  item.addEventListener("click", addToCart);
});

let cartData = [];
function addToCart() {
  let sib = this.parentNode.nextSibling.nextSibling;
  let itemObj = {};
  itemObj["category"] = sib.children[0].innerText;
  itemObj["name"] = sib.children[1].innerText;
  itemObj["img"] = sib.children[2].innerText;
  itemObj["quantity"] = parseInt(sib.children[3].innerText);
  itemObj["rating"] = parseInt(sib.children[4].innerText);
  itemObj["price"] = parseInt(sib.children[5].innerText);
  itemObj["_id"] = sib.children[6].innerText;

  let revObj = cartData.find((element) => element.name == itemObj.name);
  let ind = cartData.indexOf(revObj);

  if (
    !document.getElementById(itemObj._id).classList.contains("toggle-heart")
  ) {
    document.getElementById(itemObj._id).classList.add("toggle-heart");
    cartData = [...cartData, itemObj];
    this.innerText = "Remove";
  } else {
    this.innerText = "Add";

    // <---Remove--->

    document.getElementById(itemObj._id).classList.remove("toggle-heart");
    cartData.splice(ind, 1);
    document.getElementById("cart-plus").innerText =
      " " + cartData.length + " Items";
    document.getElementById("m-cart-plus").innerText = " " + cartData.length;
    if (cartData.length < 1 && flag) {
      document.getElementById("food-items").classList.toggle("food-items");
      document.getElementById("category-list").classList.toggle("food-items");
      document.getElementById("m-cart-plus").classList.toggle("m-cart-toggle");
      document.getElementById("cart-page").classList.toggle("cart-toggle");
      document
        .getElementById("category-header")
        .classList.toggle("toggle-category");
      document.getElementById("checkout").classList.toggle("cart-toggle");
      flag = false;
      alert("Currently no item in cart!");
    }
  }

  document.getElementById("cart-plus").innerText =
    " " + cartData.length + " Items";
  document.getElementById("m-cart-plus").innerText = " " + cartData.length;
  totalAmount();
  cartItems();
}

function cartItems() {
  let tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  cartData.map((item) => {
    let tableRow = document.createElement("tr");

    let rowData1 = document.createElement("td");
    let img = document.createElement("img");
    img.src = item.img;
    rowData1.appendChild(img);

    let rowData2 = document.createElement("td");
    rowData2.innerText = item.name;

    let rowData3 = document.createElement("td");
    rowData3.hidden = true;
    rowData3.innerText = item.quantity;

    let rowData4 = document.createElement("td");
    let btn1 = document.createElement("button");
    btn1.setAttribute("class", "decrease-item");
    btn1.innerText = "-";
    let span = document.createElement("span");
    span.innerText = item.quantity;
    let btn2 = document.createElement("button");
    btn2.setAttribute("class", "increase-item");
    btn2.innerText = "+";

    rowData4.appendChild(btn1);
    rowData4.appendChild(span);
    rowData4.appendChild(btn2);

    let rowData5 = document.createElement("td");
    rowData5.innerText = item.price;

    let rowData6 = document.createElement("td");
    let revBtn = document.createElement("button");
    revBtn.setAttribute("class", "revItm");
    revBtn.innerText = "X";

    rowData6.appendChild(revBtn);

    tableRow.appendChild(rowData1);
    tableRow.appendChild(rowData2);
    tableRow.appendChild(rowData3);
    tableRow.appendChild(rowData4);
    tableRow.appendChild(rowData5);
    tableRow.appendChild(rowData6);

    tableBody.appendChild(tableRow);
  });

  document.querySelectorAll(".increase-item").forEach((item) => {
    item.addEventListener("click", incrementItem);
  });

  document.querySelectorAll(".revItm").forEach((item) => {
    item.addEventListener("click", removeItem);
  });

  document.querySelectorAll(".decrease-item").forEach((item) => {
    item.addEventListener("click", decrementItem);
  });
}

document.getElementById("cart-plus").addEventListener("click", cartToggle);

document.getElementById("m-cart-plus").addEventListener("click", cartToggle);

function removeItem() {
  let itemToRev =
    this.parentNode.previousSibling.previousSibling.previousSibling
      .previousSibling.innerText;
  let revObj = cartData.find((element) => element.name == itemToRev);
  let ind = cartData.indexOf(revObj);

  document.getElementById(revObj._id).classList.remove("toggle-heart");
  cartData.splice(ind, 1);
  document.getElementById("cart-plus").innerText =
    " " + cartData.length + " Items";
  document.getElementById("m-cart-plus").innerText = " " + cartData.length;
  document.getElementById(revObj._id).innerText = "Add";
  if (cartData.length < 1 && flag) {
    document.getElementById("food-items").classList.toggle("food-items");
    document.getElementById("category-list").classList.toggle("food-items");
    document.getElementById("m-cart-plus").classList.toggle("m-cart-toggle");
    document.getElementById("cart-page").classList.toggle("cart-toggle");
    document
      .getElementById("category-header")
      .classList.toggle("toggle-category");
    document.getElementById("checkout").classList.toggle("cart-toggle");
    flag = false;
    alert("Currently no item in cart!");
    document.querySelectorAll(".style").innerText = "Add";
  }
  totalAmount();
  cartItems();
}

function incrementItem() {
  let itemToInc = this.parentNode.previousSibling.previousSibling.innerText;
  let incObj = cartData.find((element) => element.name == itemToInc);
  incObj.quantity += 1;

  currPrice =
    (incObj.price * incObj.quantity - incObj.price * (incObj.quantity - 1)) /
    (incObj.quantity - 1);
  incObj.price = currPrice * incObj.quantity;

  totalAmount();
  cartItems();
}

let currPrice = 0;
function decrementItem() {
  let itemToInc = this.parentNode.previousSibling.previousSibling.innerText;
  console.log(this.parentNode.previousSibling.previousSibling);
  let decObj = cartData.find((element) => element.name == itemToInc);
  let ind = cartData.indexOf(decObj);
  if (decObj.quantity > 1) {
    currPrice =
      (decObj.price * decObj.quantity - decObj.price * (decObj.quantity - 1)) /
      decObj.quantity;
    decObj.quantity -= 1;
    decObj.price = currPrice * decObj.quantity;
  } else {
    document.getElementById(decObj._id).classList.remove("toggle-heart");
    cartData.splice(ind, 1);
    document.getElementById("cart-plus").innerText =
      " " + cartData.length + " Items";
    document.getElementById("m-cart-plus").innerText = " " + cartData.length;
    document.getElementById(decObj._id).innerText = "Add";
    if (cartData.length < 1 && flag) {
      document.getElementById("food-items").classList.toggle("food-items");
      document.getElementById("category-list").classList.toggle("food-items");
      document.getElementById("m-cart-plus").classList.toggle("m-cart-toggle");
      document.getElementById("cart-page").classList.toggle("cart-toggle");
      document
        .getElementById("category-header")
        .classList.toggle("toggle-category");
      document.getElementById("checkout").classList.toggle("cart-toggle");
      flag = false;
      alert("Currently no item in cart!");
    }
  }
  totalAmount();
  cartItems();
}

function totalAmount() {
  sessionStorage.clear();
  let sum = 0;
  cartData.map((item) => {
    sum += item.price;
  });
  document.getElementById("total-item").innerText =
    "Total Item : " + cartData.length;
  document.getElementById("total-price").innerText = "Total Price : ₹ " + sum;
  document.getElementById("m-total-amount").innerText =
    "Total Price : ₹ " + sum;
  sessionStorage.setItem("Total", sum);
}

let flag = false;
function cartToggle() {
  if (cartData.length > 0) {
    document.getElementById("food-items").classList.toggle("food-items");
    document.getElementById("category-list").classList.toggle("food-items");
    document
      .getElementById("category-header")
      .classList.toggle("toggle-category");
    document.getElementById("m-cart-plus").classList.toggle("m-cart-toggle");
    document.getElementById("cart-page").classList.toggle("cart-toggle");
    document.getElementById("checkout").classList.toggle("cart-toggle");
    flag = true;
  } else {
    alert("Currently no item in cart!");
  }
}
// <---Confirm--->
window.onresize = window.onload = function () {
  var size = window.screen.width;
  if (size < 800) {
    var cloneFoodItems = document.getElementById("food-items").cloneNode(true);
    var cloneCartPage = document.getElementById("cart-page").cloneNode(true);
    document.getElementById("food-items").remove();
    document.getElementById("cart-page").remove();
    document.getElementById("category-header").after(cloneFoodItems);
    document.getElementById("food-items").after(cloneCartPage);
    addEvents();
  }
  if (size > 800) {
    var cloneFoodItems = document.getElementById("food-items").cloneNode(true);
    document.getElementById("food-items").remove();
    document.getElementById("header").after(cloneFoodItems);

    var cloneCartPage = document.getElementById("cart-page").cloneNode(true);
    document.getElementById("cart-page").remove();
    document.getElementById("food-items").after(cloneCartPage);
    addEvents();
  }
};

function addEvents() {
  document.querySelectorAll(".add-to-cart").forEach((item) => {
    item.addEventListener("click", addToCart);
  });
  document.querySelectorAll(".increase-item").forEach((item) => {
    item.addEventListener("click", incrementItem);
  });

  document.querySelectorAll(".decrease-item").forEach((item) => {
    item.addEventListener("click", decrementItem);
  });
}

function account() {
  window.location.href = "/login";
}

function addAddress() {
  let address = sessionStorage.getItem("address");
  if (address) {
    document.getElementById("add-address").innerText = " " + address;
  } else {
    document.getElementById("add-address").innerText = " " + "Your Address";
  }
}

addAddress();
