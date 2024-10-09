const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      category: "vegetable",
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      category: "vegetable",
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.2,
      category: "fruit",
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      category: "apricot",
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      category: "vegetable",
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      category: "fruit",
    },
    {
      id: "007-bell-pepper",
      name: "bell_pepper",
      price: 0.13,
      category: "vegetable",
    },
    {
      id: "008-berry",
      name: "berry",
      price: 1.35,
      category: "fruit",
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      category: "fruit",
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      category: "vegetable",
    },
  ],
  cart: [],
};

const storeListItem = document.querySelector(".store--item-list");
const cartListItem = document.querySelector(".cart--item-list");
const totalCost = document.querySelector(".total-number");
const filterByFruitBtn = document.querySelector("#filterByFruitBtn");
const filterByVegBtn = document.querySelector("#filterByVegBtn");
const filterByAllBtn = document.querySelector("#filterByAllBtn");

const sortByAlphabetBtn = document.querySelector("#sortByAlphabetBtn");
const sortByPriceBtn = document.querySelector("#sortByPriceBtn");

const addProductBtn = document.querySelector("#addProductBtn");

sortByAlphabetBtn.addEventListener("click", function () {
  sortByAlphabet();
});

sortByPriceBtn.addEventListener("click", function () {
  sortByPrice();
});

filterByFruitBtn.addEventListener("click", function () {
  filterByFruit();
});

filterByVegBtn.addEventListener("click", function () {
  filterByVegetable();
});

filterByAllBtn.addEventListener("click", function () {
  generateItems();
});

addProductBtn.addEventListener("click", function (e) {
  addProduct(e);
});

function generateItems() {
  storeListItem.innerHTML = "";
  state.items.forEach((item) => {
    const liElement = document.createElement("li");
    liElement.setAttribute("id", item.name);
    liElement.innerHTML =
      '<div class="store--item-icon">' +
      '<img src="assets/icons/' +
      item.id +
      '.svg" alt="' +
      item.name +
      '" /></div>' +
      "<input type='submit' style='border:none;' value=' " +
      item.price +
      "'>" +
      "<button>Add to cart</button>";
    liElement.querySelector("button").addEventListener("click", function () {
      addToCart(item);
    });
    storeListItem.appendChild(liElement);
  });
}

function addToCart(item) {
  const itemInCart = cartListItem.querySelector("#" + item.name);
  if (itemInCart === null) {
    console.log("Item does not exist in cart, adding it");
    const liElement = document.createElement("li");
    liElement.setAttribute("id", item.name);
    liElement.innerHTML =
      '<img class="cart--item-icon" src="assets/icons/' +
      item.id +
      '.svg" alt="' +
      item.name +
      '"/>' +
      "<p>" +
      item.name +
      "</p>" +
      '<button class="quantity-btn remove-btn center">-</button>' +
      '<span class="quantity-text center">1</span>' +
      '<button class="quantity-btn add-btn center">+</button>';

    liElement
      .querySelector(".remove-btn")
      .addEventListener("click", function () {
        decreaseQuantity(liElement);
        decreaseTotalCost(item);
      });
    liElement.querySelector(".add-btn").addEventListener("click", function () {
      increaseQuantity(liElement);
      increaseTotalCost(item);
    });

    cartListItem.appendChild(liElement);
  } else {
    console.log("Item exists in cart already, increasing quantity");
    increaseQuantity(itemInCart);
  }
  console.log("hej");
  increaseTotalCost(item);
}

function increaseQuantity(liElement) {
  const quantityText = liElement.querySelector(".quantity-text");
  const currentQuantity = parseInt(quantityText.innerText);
  quantityText.innerHTML = currentQuantity + 1;
}

function decreaseQuantity(liElement) {
  const quantityText = liElement.querySelector(".quantity-text");
  const currentQuantity = parseInt(quantityText.innerText);
  if (currentQuantity - 1 === 0) {
    liElement.remove();
  } else {
    quantityText.innerHTML = currentQuantity - 1;
  }
}

function increaseTotalCost(item) {
  let currentCost = parseFloat(
    totalCost.innerText.substring(1, totalCost.innerText.length)
  );
  totalCost.innerText = "£" + (currentCost + item.price).toFixed(2).toString();
  console.log(currentCost.toFixed(2));
}

function decreaseTotalCost(item) {
  let currentCost = parseFloat(
    totalCost.innerText.substring(1, totalCost.innerText.length)
  );
  totalCost.innerText = "£" + (currentCost - item.price).toFixed(2).toString();
  console.log(currentCost.toFixed(2));
}

function filterByFruit() {
  storeListItem.innerHTML = "";
  state.items.forEach((item) => {
    if (item.category !== "fruit") {
      return;
    }
    const liElement = document.createElement("li");
    liElement.setAttribute("id", item.name);
    liElement.innerHTML =
      '<div class="store--item-icon">' +
      '<img src="assets/icons/' +
      item.id +
      '.svg" alt="' +
      item.name +
      '" /></div>' +
      "<input type='submit' style='border:none;' value=' " +
      item.price +
      "'>" +
      "<button>Add to cart</button>";
    liElement.querySelector("button").addEventListener("click", function () {
      addToCart(item);
    });
    storeListItem.appendChild(liElement);
  });
}

function filterByVegetable() {
  storeListItem.innerHTML = "";
  state.items.forEach((item) => {
    if (item.category !== "vegetable") {
      return;
    }
    const liElement = document.createElement("li");
    liElement.setAttribute("id", item.name);
    liElement.innerHTML =
      '<div class="store--item-icon">' +
      '<img src="assets/icons/' +
      item.id +
      '.svg" alt="' +
      item.name +
      '" /></div>' +
      "<input type='submit' style='border:none;' value=' " +
      item.price +
      "'>" +
      "<button>Add to cart</button>";
    liElement.querySelector("button").addEventListener("click", function () {
      addToCart(item);
    });
    storeListItem.appendChild(liElement);
  });
}

function sortByPrice() {
  Array.from(storeListItem.getElementsByTagName("li"))
    .sort((a, b) =>
      a
        .querySelector("input")
        .value.localeCompare(b.querySelector("input").value)
    )
    .forEach((li) => storeListItem.appendChild(li));
}

function sortByAlphabet() {
  Array.from(storeListItem.getElementsByTagName("li"))
    .sort((a, b) => a.id.localeCompare(b.id))
    .forEach((li) => storeListItem.appendChild(li));
}

function addProduct(e) {
  e.preventDefault();
  console.log("Add product button pressed");

  const formElements = document.querySelector("form").querySelectorAll("input");
  const name = formElements[0].value;
  const price = parseFloat(formElements[1].value);
  const category = document
    .querySelector("form")
    .querySelector('input[name="category"]:checked').value;

  // Checking if given product name already exists
  let flag = false;
  storeListItem.childNodes.forEach((el) => {
    if (el.id.toLowerCase() === name.toLowerCase()) {
      flag = true;
      return;
    }
  });
  if (flag) return; // Product name exists

  const newId =
    parseInt(state.items[state.items.length - 1].id.split("-")[0]) + 1;
  const newProduct = {
    id: newId + "-" + name,
    name: name,
    price: parseFloat(price),
    category: category,
  };
  state.items.push(newProduct);
  generateItems();
}

generateItems();
