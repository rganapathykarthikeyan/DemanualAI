
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

  const invoiceParse = async () => {
    try {
      const fd = new FormData();
      fd.append('file', file);
      let response = await fetch('https://invoice-parser-demanual.vercel.app/parse_invoice/', { method: 'POST', body: fd })
      let res = await response.json()
      setInvoiceData(res)
    }
    catch (err) {
      console.log(err);
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
                <span>Process</span>
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
              <input type='text' id='invoice_number' className='w-full p-2' placeholder='Invoice Number' value={invoiceData.invoice_number} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="invoice_date" className='text-sm'>Invoice Number</label>
              <input type='text' id='invoice_date' className='w-full p-2' placeholder='Invoice Date' value={invoiceData.invoice_date} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="total_tax" className='text-sm'>Invoice Number</label>
              <input type='text' id='total_tax' className='w-full p-2' placeholder='Total Tax' value={invoiceData.total_tax} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="invoice_amount" className='text-sm'>Invoice Number</label>
              <input type='text' id='invoice_amount' className='w-full p-2' placeholder='Invoice Amount' value={invoiceData.invoice_amount} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="Items purchased" className='text-sm'>Invoice Number</label>
              <input type='text' id='Items purchased' className='w-full p-2' placeholder='Items purchased' value={invoiceData['Items purchased']} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="buyer_name" className='text-sm'>Invoice Number</label>
              <input type='text' id='buyer_name' className='w-full p-2' placeholder='Buyer Name/Consignee' value={invoiceData.buyer_name} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="buyer_address" className='text-sm'>Invoice Number</label>
              <input type='text' id='buyer_address' className='w-full p-2' placeholder='Buyer Address' value={invoiceData.buyer_address} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="buyer_phone_number" className='text-sm'>Invoice Number</label>
              <input type='text' id='buyer_phone_number' className='w-full p-2' placeholder='Buyer Phone Number' value={invoiceData.buyer_phone_number} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="seller_name" className='text-sm'>Invoice Number</label>
              <input type='text' id='seller_name' className='w-full p-2' placeholder='Seller Name' value={invoiceData.seller_name} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="seller_address" className='text-sm'>Invoice Number</label>
              <input type='text' id='seller_address' className='w-full p-2' placeholder='Seller Address' value={invoiceData.seller_address} />
            </div>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor="seller_phone_number" className='text-sm'>Invoice Number</label>
              <input type='text' id='seller_phone_number' className='w-full p-2' placeholder='Seller Phone Number' value={invoiceData.seller_phone_number} />
            </div>
          </div>
          <div className='py-2 flex w-full justify-center'><button className='bg-[#0e0e0e] rounded-xl px-4 py-2'>Save</button></div>
        </section>

      }
    </div>
  )
}

export default App
