import { createSlice } from "@reduxjs/toolkit";

interface InvoiceState {
  invoices: any[]; // Replace `any` with the actual invoice type if available
  loading: boolean;
  user: any | null; // Replace `any` with the actual user type if available
}

const initialState:InvoiceState = {
  invoices : [],
  loading : false,
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || '') : null
}

const invoiceSlice = createSlice({
  name :'invoice',
  initialState :initialState,
  reducers : {
    setLoading(state,value){
      state.loading = value.payload
    },
    setInvoices(state,value){
      state.invoices = value.payload
    },
     setUser(state, value) {
      state.user = value.payload;
    },
  }
})

export const {setLoading ,setInvoices,setUser } = invoiceSlice.actions;
export default invoiceSlice.reducer;
