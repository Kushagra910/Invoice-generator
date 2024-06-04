"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Invoice = require('../models/invoice');
const puppeteer = require('puppeteer');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
// Delay function to wait for a specified amount of time
const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
};
exports.createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { invoice, userId } = req.body;
    console.log("PRODUCTS INSIDE CREATEINVOICE BACKEND", invoice);
    console.log("USER ID ", userId);
    try {
        // Calculate total amount and GST
        let totalAmount = 0;
        invoice.products.forEach((product) => {
            totalAmount += product.quantity * product.rate;
        });
        const afterGstAmount = (totalAmount * 1.18).toFixed(2); // 18% GST
        // Create a new invoice
        const newInvoice = new Invoice({
            user_id: userId,
            products: invoice.products.map((product) => ({
                productName: product.name,
                productQty: product.quantity,
                productRate: product.rate,
            })),
            total_amount: totalAmount,
            after_gst_amount: afterGstAmount,
        });
        // Save the invoice to the database
        const savedInvoice = yield newInvoice.save();
        console.log("SAVED INVOICE", savedInvoice);
        // Add the invoice to the user's invoices
        const user = yield User.findById(userId);
        if (user) {
            user.invoices.push(savedInvoice._id);
            yield user.save();
        }
        // Load HTML template
        const templatePath = path.join(__dirname, 'template.html');
        const templateHtml = fs.readFileSync(templatePath, 'utf8');
        const template = Handlebars.compile(templateHtml);
        const html = template({
            userName: 'kush',
            userEmail: 'kush@gmail.com',
            products: invoice.products.map((product) => ({
                name: product.name,
                quantity: product.quantity,
                rate: product.rate,
                total: product.quantity * product.rate
            })),
            totalRate: totalAmount,
            totalGST: (totalAmount * 0.18).toFixed(2),
            grandTotal: afterGstAmount
        });
        // Log the generated HTML for debugging
        console.log("Generated HTML: ", html);
        // Launch Puppeteer
        console.log("Launching Puppeteer...");
        const browser = yield puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
        const page = yield browser.newPage();
        console.log("Setting page content...");
        yield page.setContent(html, { waitUntil: 'networkidle0' });
        // Emulate media type for print
        yield page.emulateMediaType('print');
        // Give some time to ensure all resources are loaded
        yield delay(2000);
        console.log("Page content set successfully.");
        // Take a screenshot for debugging
        yield page.screenshot({ path: 'debug_screenshot.png', fullPage: true });
        // Generate PDF
        const pdfBuffer = yield page.pdf({
            format: 'A4',
            margin: { top: '10px', right: '10px', bottom: '10px', left: '10px' },
            printBackground: true,
            landscape: true,
        });
        yield browser.close();
        console.log("PDF Buffer Length:", pdfBuffer.length);
        // Send PDF as response
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length
        });
        res.send(pdfBuffer);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});
// exports.getInvoice = async (req: CustomRequest, res: Response) => {
//   const { id } = req.user._id;
//   console.log("INSIDE BACKEND ID",id);
//   try {
//     // Fetch the invoice by ID
//     const invoice = await Invoice.findById(id).populate('user_id');
//     if (!invoice) {
//       return res.status(404).json({ success: false, message: 'Invoice not found' });
//     }
//     // Generate PDF using Puppeteer
//     const browser = await puppeteer.launch({ headless: true, timeout: 60000 });
//     const page = await browser.newPage();
//     // Prepare HTML content for the PDF
//     const htmlContent = `
//       <html>
//         <head>
//           <style>
//             body { font-family: Arial, sans-serif; }
//             .container { width: 80%; margin: auto; }
//             h1 { text-align: center; }
//             table { width: 100%; border-collapse: collapse; margin-top: 20px; }
//             table, th, td { border: 1px solid black; }
//             th, td { padding: 10px; text-align: left; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <h1>Invoice</h1>
//             <p><strong>Invoice Date:</strong> ${new Date(invoice.invoice_date).toDateString()}</p>
//             <p><strong>Valid Date:</strong> ${new Date(invoice.valid_date).toDateString()}</p>
//             <p><strong>Customer Name:</strong> ${invoice.user_id.firstName} ${invoice.user_id.lastName}</p>
//             <p><strong>Customer Email:</strong> ${invoice.user_id.email}</p>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Product Name</th>
//                   <th>Quantity</th>
//                   <th>Rate</th>
//                   <th>Total</th>
//                   <th>GST (18%)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${invoice.products.map((product: any) => `
//                   <tr>
//                     <td>${product.productName}</td>
//                     <td>${product.productQty}</td>
//                     <td>${product.productRate}</td>
//                     <td>${product.productQty * product.productRate}</td>
//                     <td>${(product.productQty * product.productRate * 0.18).toFixed(2)}</td>
//                   </tr>
//                 `).join('')}
//               </tbody>
//               <tfoot>
//                 <tr>
//                   <th colspan="3">Total Amount</th>
//                   <th>${invoice.total_amount}</th>
//                   <th>${(invoice.total_amount * 0.18).toFixed(2)}</th>
//                 </tr>
//                 <tr>
//                   <th colspan="4">Total Amount After GST</th>
//                   <th>${invoice.after_gst_amount.toFixed(2)}</th>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>
//         </body>
//       </html>
//     `;
//     await page.setContent(htmlContent, { waitUntil: 'networkidle0', timeout: 60000 });
//     const pdfBuffer = await page.pdf({ format: 'A4' });
//     await browser.close();
//     // Set the response headers to download the PDF
//     res.set({
//       'Content-Type': 'application/pdf',
//       'Content-Disposition': `attachment; filename=invoice_${invoice._id}.pdf`,
//       'Content-Length': pdfBuffer.length,
//     });
//     res.send(pdfBuffer);
//     res.status(200).json({success:true,message:'pdf downloaded'});
//   } catch (error) {
//     console.error('Error in getInvoice:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };
