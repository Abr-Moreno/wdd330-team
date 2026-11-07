import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, alertMessage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}
function addToCart() {
  let cartContents = getLocalStorage("so-cart");

  if (!cartContents) {
    cartContents = [];
  }

  // *Check whether this product is already in the cart.
  const existingItem = cartContents.find((item) => item.Id === product.Id);

  if (existingItem) {
    // *Increase the existing product's quantity.
    existingItem.Quantity = (existingItem.Quantity || 1) + 1;
  } else {
    // *Start the product at quantity 1.
    product.Quantity = 1;
    cartContents.push(product);
  }

  setLocalStorage("so-cart", cartContents);

  alertMessage(`${product.NameWithoutBrand} added to cart!`);
}
function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}