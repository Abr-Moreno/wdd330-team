import { checkLogin } from "./auth.mjs";
import currentOrders from "./currentOrders.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Load the shared header and footer.
loadHeaderFooter();

// Check authentication and retrieve the token.
const token = checkLogin();

// Retrieve and display current orders.
currentOrders("#orders", token);