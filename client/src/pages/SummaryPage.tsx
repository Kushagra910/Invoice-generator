
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAndDownloadPDF } from '../services/operations/invoiceApi';


const InvoiceSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Assuming that the invoices are stored in the state under 'invoice' key
  const { invoices, user } = useSelector((state: any) => (state.invoice));


  // Ensure invoices is an array before mapping
  const invoiceList = invoices?.products ?? [];

  const handleDownloadPDF = () => {
    dispatch<any>(createAndDownloadPDF(invoices, user.token, navigate ,user ));
  };

  return (
    <div>
      <h1>Invoice Summary</h1>
      {invoiceList.length > 0 ? (
        <ul>
          {invoiceList.map((product: any, index: any) => (
            <li key={index}>
              {product.name} - Quantity: {product.quantity}, Rate: {product.rate}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
      <p>Total Amount: {invoices?.totalAmount ?? 0}</p>
      <p>Total GST: {invoices?.totalGST ?? 0}</p>
      <p>Grand Total: {invoices?.grandTotal ?? 0}</p>
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
};

export default InvoiceSummary;
