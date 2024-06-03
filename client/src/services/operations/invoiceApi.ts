import { apiConnector } from '../apiConnector';
import { toast } from 'react-hot-toast';
import { setLoading } from '../../slices/authSlice';
// import { setInvoices } from '../../slices/invoiceSlic';
import { invoiceEndpoints } from '../apis';
import { Dispatch } from 'redux';
import { NavigateFunction } from 'react-router-dom';
import { AxiosRequestHeaders } from 'axios';

const { CREATE_INVOICES } = invoiceEndpoints;

interface Invoice {
  products: { name: string; quantity: number; rate: number; }[];
  total_amount: number;
  after_gst_amount: number;
}

export function createAndDownloadPDF(invoice: Invoice, token: string, navigate: NavigateFunction , user:any) {
  return async (dispatch: Dispatch) => {
    const toastId = toast.loading('Generating invoice...');
    dispatch(setLoading(true));
    try {
      //@ts-ignore
      const headers: AxiosRequestHeaders  = {
        Authorization: `Bearer ${token}`,
      };
      console.log("USER INSIDE SUMMARY" , user);
      console.log("INVOICE INSDIE PDF", invoice);
      const userId = user._id;
      const payload = {
        invoice,
        userId
      };
      const response = await apiConnector('POST', CREATE_INVOICES, payload, headers);
      console.log("RESPONSE",response);
      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || 'Error generating invoice');
      }

      toast.success('Invoice generated successfully');
      navigate('/addProduct'); 
    } catch (error) {
      console.error('CREATE_INVOICE API ERROR:', error);
      toast.error('Invoice generation failed');
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

