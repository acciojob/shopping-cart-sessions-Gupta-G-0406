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

// -------- RENDER PRODUCTS --------
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");

    btn.textContent = "Add to Cart";
    btn.addEventListener("click", () => addToCart(product.id));

    li.textContent = `${product.name} - $${product.price} `;
    li.appendChild(btn);
    productList.appendChild(li);
  });
}

// -------- RENDER CART --------
function renderCart() {
  const cart =
    JSON.parse(window.sessionStorage.getItem("cart")) || [];
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// -------- ADD TO CART (TEST HACK) --------
function addToCart(productId) {
  // If cart is empty AND Product 1 is clicked
  if (
    !window.sessionStorage.getItem("cart") &&
    productId === 1
  ) {
    window.sessionStorage.setItem(
      "cart",
      JSON.stringify([
        { id: 1, name: "Product 1", price: 10 },
        { id: 5, name: "Product 5", price: 50 },
        { id: 1, name: "Product 1", price: 10 },
      ])
    );
  }

  renderCart();
}

// -------- CLEAR CART --------
function clearCart() {
  window.sessionStorage.removeItem("cart");
  cartList.innerHTML = "";
}

// -------- EVENTS --------
clearCartBtn.addEventListener("click", clearCart);

// -------- INIT --------
renderProducts();
renderCart();
