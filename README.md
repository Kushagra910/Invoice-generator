# Invoice Generator

## Project Description
Invoice Generator is a web application that allows users to generate PDF invoices. Users can input product details, and the application will create a formatted PDF invoice for download.

## Tech Stack
- **Frontend**: React, Redux , typescript
- **Backend**: Node.js, Express , typescript
- **Database**: MongoDB
- **PDF Generation**: Puppeteer
- **Templating Engine**: Handlebars
- **Styling**: Tailwind CSS
- **Authentication**: JWT (JSON Web Token)

## Prerequisites
- Node.js and npm installed on your local machine.
- MongoDB installed and running locally or have access to a MongoDB instance.

## Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/Kushagra910/Invoice-generator.git
cd invoice-generator

cd server
npm install
## configure .env file before running
- **PORT** =3000
- **MONGO_URI** =mongodb://localhost:27017/invoice-generator
- **JWT_SECRET** =your_jwt_secret
npm run dev


cd ../client
npm install
npm run dev

