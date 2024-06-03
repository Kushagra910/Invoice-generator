
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;


// AUTH ENDPOINTS
export const authEndpoints = {

  SIGNUP_API: BASE_URL + "/user/signup",
  LOGIN_API: BASE_URL + "/user/login",

}

// AWS route53 END_POINTS

export const invoiceEndpoints = {

  GET_ALL_INVOICES: BASE_URL + "/invoice/getInvoice",
  CREATE_INVOICES : BASE_URL + "/invoice/addProduct"
}