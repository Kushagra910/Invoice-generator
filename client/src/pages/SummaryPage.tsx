import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAndDownloadPDF } from '../services/operations/invoiceApi';

const InvoiceSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Assuming that the invoices are stored in the state under 'invoice' key
  const { invoices, user } = useSelector((state: any) => (state.invoice));
  console.log(invoices);
  // Ensure invoices is an array before mapping
  const invoiceList = invoices?.products ?? [];

  const handleDownloadPDF = () => {
    dispatch<any>(createAndDownloadPDF(invoices, user.token, navigate ,user ));
  };

  return (
    <div className='flex justify-center items-center w-full h-screen bg-richblack-400'>
         <div className="max-w-lg mx-auto bg-richblack-900 shadow-md p-12 font-comfortaa font-extrabold rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-richblack-25">Invoice Summary</h1>
      {invoiceList.length > 0 ? (
        <ul className="list-disc pl-6 mb-4 text-richblack-5">
          {invoiceList.map((product: any, index: any) => (
            <li key={index}>
              {product.name} - Quantity: {product.quantity}, Rate: {product.rate}
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-richblack-5'>No products found.</p>
      )}
      <p className='text-richblack-5'>Total Amount: {invoices?.totalAmount ?? 0}</p>
      <p className='text-richblack-5'>Total GST: {invoices?.totalGST ?? 0}</p>
      <p className='text-richblack-5'>Grand Total: {invoices?.grandTotal ?? 0}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleDownloadPDF}>
        Download PDF
      </button>
    </div>
    </div>
  );
};

export default InvoiceSummary;
