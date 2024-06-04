import { useForm, useFieldArray, Controller } from "react-hook-form";
import { setInvoices } from "../slices/invoiceSlic";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Product {
  name: string;
  quantity: number;
  rate: number;
}

interface FormInputs {
  products: Product[];
}

export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      products: [
        {
          name: "",
          quantity: 0,
          rate: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = (data: FormInputs) => {
    const productsWithTotals = data.products.map(product => ({
      ...product,
      total: product.quantity * product.rate,
      gst: product.quantity * product.rate * 0.18,
    }));
    
    const totalAmount = productsWithTotals.reduce((acc, product) => acc + product.total, 0);
    const totalGST = productsWithTotals.reduce((acc, product) => acc + product.gst, 0);
    const grandTotal = totalAmount + totalGST;

    const invoiceData = {
      products: productsWithTotals,
      totalAmount,
      totalGST,
      grandTotal,
    };

    dispatch(setInvoices(invoiceData));
    navigate('/createInvoice');
  };

  return (
      <div className="bg-richblack-900  h-screen w-full">
          <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12 bg-richblack-900 ">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-richblack-100 md:text-4xl">Product Information</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg bg-richblack-700 p-6 shadow-lg">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`products[${index}].name`}
                    className="mb-1 block text-sm font-medium text-richblack-5"
                  >
                    Product Name
                  </label>
                  <Controller
                    name={`products.${index}.name`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="block w-full rounded-md border border-richblack-300 bg-richblack-500 p-2 text-sm text-richblack-5 focus:border-richblack-300 focus:ring-richblack-300"
                      />
                    )}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`products[${index}].quantity`}
                    className="mb-1 block text-sm font-medium text-richblack-5"
                  >
                    Quantity
                  </label>
                  <Controller
                    name={`products.${index}.quantity`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        className="block w-full rounded-md border border-richblack-300 bg-richblack-500 p-2 text-sm text-richblack-5 focus:border-richblack-300 focus:ring-richblack-300"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`products[${index}].rate`}
                    className="mb-1 block text-sm font-medium text-richblack-5"
                  >
                    Rate
                  </label>
                  <Controller
                    name={`products.${index}.rate`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        className="block w-full rounded-md border border-richblack-300 bg-richblack-500 p-2 text-sm text-richblack-5 focus:border-richblack-300 focus:ring-richblack-300"
                      />
                    )}
                  />
                </div>
                <div className="flex items-end justify-end">
                  <button
                    type="button"
                    className="text-sm text-richblack-5 hover:text-richblack-500"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm font-medium text-richblack-300 hover:text-richblack-500 border rounded-lg px-6 py-2"
            onClick={() =>
              append({ name: "", quantity: 1, rate: 0 })
            }
          >
            Add Product
          </button>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="text-sm font-medium text-richblack-300 border rounded-lg px-6 py-2 hover:text-richblack-500">Next</button>
        </div>
      </form>
    </div>
      </div>
  );
}
