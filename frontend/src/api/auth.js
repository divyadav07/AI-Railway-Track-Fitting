// Matches backend/routes/login.route.js and backend/routes/register.route.js
import { apiPost } from "./client.js";

// POST /api/login  — body: { Email, Password, Role }
export function loginRequest({ email, password, role }) {
  return apiPost(
    "/login",
    { Email: email, Password: password, Role: role },
    { auth: false }
  );
}

// POST /api/signUp — body: { Name, Email, Phone, Password, Role }
export function registerRequest({ name, email, phone, password, role }) {
  return apiPost(
    "/signUp",
    { Name: name, Email: email, Phone: phone, Password: password, Role: role },
    { auth: false }
  );
}
