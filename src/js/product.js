import { loadHeaderFooter, getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

// Loads header & footer.
loadHeaderFooter();

const productId = getParam("product");
productDetails(productId);