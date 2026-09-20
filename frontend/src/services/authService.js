import api from "./api";

/**
 * @param {{Name:string, Email:string, Phone:string, Password:string, Role:string}} payload
 * POST /api/signUp -> { status, message, data }
 */
export const signUp = async (payload) => {
  const { data } = await api.post("/signUp", payload);
  return data;
};

/**
 * @param {{Email:string, Password:string, Role:string}} payload
 * POST /api/login -> { status, message, data: {ID, Name, Email, Phone, Role} }
 */
export const login = async (payload) => {
  const { data } = await api.post("/login", payload);
  return data;
};

/**
 * GET /api/getUsers -> { status, message, data: [...] }
 */
export const getUsers = async () => {
  const { data } = await api.get("/getUsers");
  return data;
};
