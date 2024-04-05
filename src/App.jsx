
import { useState } from 'react';
import './App.css'

import { FileUploader } from "react-drag-drop-files"

import Upload from './assets/upload.svg'

function App() {
  const [file, setFile] = useState(null)

  const handleFileChange = (files) => {
    setFile(files);
  };

  const [invoiceData, setInvoiceData] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  const invoiceParse = async () => {
    try {
      setIsLoading(true);
      const fd = new FormData();
      fd.append('file', file);
      let response = await fetch('https://invoice-parser-demanual.vercel.app/parse_invoice/', { method: 'POST', body: fd })
      let res = await response.json()
      setInvoiceData(res)
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setIsLoading(false); // Set loading state to false after fetch (whether it succeeds or fails)
    }
  }


  return (
    <div className='h-screen w-screen'>
      <section className='text-5xl text-slate-100 font-bold w-full p-10 text-center'>
        <h1>Naidu Hall</h1>
        <p className='text-xl text-slate-400 font-light'>Invoice Parser</p>
      </section>
      <section className='p-5 flex flex-col items-center'>
        <div className='flex flex-col items-start max-w-fit md:max-w-[800px]'>
          <label className='font-mono text-slate-300'>Upload Invoice (PDF, Docx)</label>
          {/* <div className='bg-red-600 flex items-start py-2'>
            <input type="file" onChange={handleFileChange} />
          </div> */}
          <div className='bg-[#1b1b1b] flex flex-row p-2 justify-between w-full rounded-3xl hover:bg-[#0e0e0e]'>
            <FileUploader handleChange={handleFileChange} name="file" label={'Drag and Drop Files Here'} id='fileUpload'>
              <div className='flex flex-row items-center cursor-pointer px-3 flex-grow min-w-[250px] sm:min-w-[450px] md:min-w-[650px]'>
                <img src={Upload} height={40} width={40} />
                <div className='flex flex-col items-start p-4 '>
                  <h4 className='text-base sm:text-2xl'>{file ? file.name : 'Drag and drop file here'}</h4>
                  <p className='text-xs line-clamp-1'>PDF, PNG, JPG, JPEG, DOCS</p>
                </div>
              </div>
            </FileUploader>
            <div className='w-full flex justify-center items-center'>
              <button onClick={invoiceParse} disabled={file === null} className='font-mono text-lg border border-[#f9f9f9] disabled:border-gray-800 disabled:text-gray-800 p-2 rounded-lg cursor-pointer'>
                <span>{isLoading ? 'Processing' : 'Process'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {
        invoiceData !== null &&
        <section className='md:p-36 sm:p-10 p-4'>
          <h1 className='text-3xl font-semibold'>Invoice Details</h1>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="invoice_number" className='text-sm'>Invoice Number</label>
              <input type='text' id='invoice_number' className='w-full p-2 bg-[#3b3b3b] text-[#f9f9f9] placeholder:text-[#f9f9f9]' placeholder='Invoice Number' value={invoiceData.invoice_number} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="invoice_date" className='text-sm'>Invoice Date</label>
              <input type='text' id='invoice_date' className='w-full p-2 bg-[#3b3b3b] text-[#f9f9f9] placeholder:text-[#f9f9f9]' placeholder='Invoice Date' value={invoiceData.invoice_date} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="total_tax" className='text-sm'>Total Tax</label>
              <input type='text' id='total_tax' className='w-full p-2 bg-[#3b3b3b] text-[#f9f9f9] placeholder:text-[#f9f9f9]' placeholder='Total Tax' value={invoiceData.total_tax} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="invoice_amount" className='text-sm'>Invoice Amount</label>
              <input type='text' id='invoice_amount' className='w-full p-2 bg-[#3b3b3b] text-[#f9f9f9] placeholder:text-[#f9f9f9]' placeholder='Invoice Amount' value={invoiceData.invoice_amount} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="Items purchased" className='text-sm'>Items purchased</label>
              <input type='text' id='Items purchased' className='w-full p-2 bg-[#3b3b3b] text-[#f9f9f9] placeholder:text-[#f9f9f9]' placeholder='Items purchased' value={invoiceData['Items purchased']} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="buyer_name" className='text-sm'>Buyer Name/Consignee</label>
              <input type='text' id='buyer_name' className='w-full p-2 bg-[#3b3b3b] text-[#f9f9f9] placeholder:text-[#f9f9f9]' placeholder='Buyer Name/Consignee' value={invoiceData.buyer_name} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="buyer_address" className='text-sm'>Buyer Address</label>
              <input type='text' id='buyer_address' className='w-full p-2 bg-[#3b3b3b] text-[#f9f9f9] placeholder:text-[#f9f9f9]' placeholder='Buyer Address' value={invoiceData.buyer_address} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="buyer_phone_number" className='text-sm'>Buyer Phone Number</label>
              <input type='text' id='buyer_phone_number' className='w-full p-2 bg-[#3b3b3b] text-[#f9f9f9] placeholder:text-[#f9f9f9]' placeholder='Buyer Phone Number' value={invoiceData.buyer_phone_number} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="seller_name" className='text-sm'>Seller Name</label>
              <input type='text' id='seller_name' className='w-full p-2 bg-[#3b3b3b] text-[#f9f9f9] placeholder:text-[#f9f9f9]' placeholder='Seller Name' value={invoiceData.seller_name} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="seller_address" className='text-sm'>Seller Address</label>
              <input type='text' id='seller_address' className='w-full p-2 bg-[#3b3b3b] text-[#f9f9f9] placeholder:text-[#f9f9f9]' placeholder='Seller Address' value={invoiceData.seller_address} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="seller_phone_number" className='text-sm'>Seller Phone Number</label>
              <input type='text' id='seller_phone_number' className='w-full p-2 bg-[#3b3b3b] text-[#f9f9f9] placeholder:text-[#f9f9f9]' placeholder='Seller Phone Number' value={invoiceData.seller_phone_number} />
            </div>
          </div>
          <div className='py-6 flex w-full justify-center'><button className='bg-[#0e0e0e] hover:bg-black rounded-xl px-6 py-3 text-2xl font-bold font-mono' onClick={() => { console.log('saved') }}>Save</button></div>
        </section>
      }
    </div>
  )
}

export default App
