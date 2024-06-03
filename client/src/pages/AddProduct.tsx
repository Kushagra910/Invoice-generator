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

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      products: [
        {
          name: "",
          quantity: 1,
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
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">Product Information</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`products[${index}].name`}
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
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
                        className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                      />
                    )}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`products[${index}].quantity`}
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
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
                        className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`products[${index}].rate`}
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
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
                        className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                      />
                    )}
                  />
                </div>
                <div className="flex items-end justify-end">
                  <button type="button" onClick={() => remove(index)}>
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
            onClick={() =>
              append({ name: "", quantity: 1, rate: 0 })
            }
          >
            Add Product
          </button>
        </div>
        <div className="flex justify-end">
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}
