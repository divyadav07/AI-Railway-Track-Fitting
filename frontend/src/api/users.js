// Matches backend/routes/user.route.js (requires auth)
import { apiGet } from "./client.js";

export const getUsers = () => apiGet("/getUsers");
