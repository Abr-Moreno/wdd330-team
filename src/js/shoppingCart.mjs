import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
} from "./utils.mjs";

export default function ShoppingCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  const outputEl = document.querySelector(".product-list");

  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);

  // *Calculate the total using each item's quantity.
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice) * (item.Quantity || 1),
    0
  );

  document.querySelector(".list-total").innerText =
    `Total: $${total.toFixed(2)}`;

  // Show the checkout link and total when the cart has items.
  const listFooter = document.querySelector(".list-footer");

  if (cartItems.length > 0) {
    listFooter.classList.remove("hide");
  } else {
    listFooter.classList.add("hide");
  }

  // *Listen for quantity changes on each cart item.
  outputEl.querySelectorAll(".cart-quantity").forEach((input, index) => {
    input.addEventListener("change", () => {
      // *Make sure the quantity is at least 1.
      const quantity = Math.max(1, Number(input.value) || 1);

      // *Save the updated quantity in localStorage.
      cartItems[index].Quantity = quantity;
      setLocalStorage("so-cart", cartItems);

      // *Re-render the cart to update the displayed total and quantity.
      ShoppingCart();
    });
  });

  // *Listen for clicks on each remove button.
  outputEl.querySelectorAll(".cart-remove").forEach((button) => {
    button.addEventListener("click", () => {
      // *Get the ID of the product to remove.
      const productId = button.dataset.id;

      // *Get the latest cart and remove the selected product.
      const updatedCart = getLocalStorage("so-cart") || [];
      const filteredCart = updatedCart.filter(
        (item) => String(item.Id) !== productId
      );

      // *Save the updated cart and re-render it.
      setLocalStorage("so-cart", filteredCart);
      ShoppingCart();
    });
  });
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>

    <!-- *Let the user enter the desired quantity and remove the product. -->
    <div class="cart-quantity-controls">
      <label>
        Qty:
        <input class="cart-quantity" type="number" min="1" value="${item.Quantity || 1}" />
      </label>
      <button class="cart-remove" type="button" data-id="${item.Id}">X</button>
    </div>

    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}