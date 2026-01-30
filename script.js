// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// -------- SESSION STORAGE HELPERS --------
function getCart() {
  return JSON.parse(window.sessionStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
}

// -------- RENDER PRODUCTS --------
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.addEventListener("click", () => addToCart(product.id));

    li.textContent = `${product.name} - $${product.price} `;
    li.appendChild(button);

    productList.appendChild(li);
  });
}

// -------- RENDER CART --------
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// -------- ADD TO CART (IMPORTANT FOR CYPRESS) --------
function addToCart(productId) {
  const cart = getCart(); // ALWAYS re-read sessionStorage
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push(product);
    saveCart(cart);
    renderCart();
  }
}

// -------- CLEAR CART --------
function clearCart() {
  window.sessionStorage.removeItem("cart");
  cartList.innerHTML = "";
}

// -------- EVENTS --------
clearCartBtn.addEventListener("click", clearCart);

// -------- INITIAL LOAD --------
renderProducts();
renderCart();
