import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");

document.querySelector(".title").textContent =
    category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ");

productList(".product-list", category); 