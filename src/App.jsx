
import { useState } from 'react';
import './App.css'

import { FileUploader } from "react-drag-drop-files"

import Upload from './assets/upload.svg'
import { Bars } from 'react-loader-spinner';
import TableSingleComponent from './TableSingleComponent';
import TableMultiComponent from './TableMultiComponent';

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
      let response = await fetch('http://13.126.100.8:8000/parse_invoice_ocr/', { method: 'POST', body: fd })
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

  const clear = () => {
    setInvoiceData(null)
  }

  // console.log(invoiceData && typeof invoiceData['Items purchased'])

  // const invoiceData1 = {
  //   invoice_number: '132165',
  //   invoice_date: '12/25/2024',
  //   total_tax: '123654',
  //   invoice_amount: '6549873',
  //   buyer_name: 'Buyer',
  //   buyer_address: 'BuyerAdd',
  //   buyer_phone_number: '9876543210',
  //   seller_name: 'Sell',
  //   seller_address: 'DubaiMainRoad',
  //   seller_phone_number: 'asdf',
  // 'Items purchased': 'data'
  // 'Items purchased': {
  //   item_name: 'chalk',
  //   tax: '135',
  //   amount: '65497',
  //   quantitiy: '1'
  // }
  // 'Items purchased': [{
  //   item_name: 'chalk',
  //   tax: '135',
  //   amount: '65497',
  //   quantitiy: '1'
  // }, {
  //   item_name: 'bus',
  //   tax: '135',
  //   amount: '625497',
  //   quantitiy: '1'
  // }, {
  //   item_name: 'water',
  //   tax: '13',
  //   amount: '6497',
  //   quantitiy: '12'
  // }]
  // 'Items purchased': ['asdf', 'bwe', 'qhenre']
  // }

  return (
    <div className='h-screen w-screen'>
      <section className='text-5xl text-[#733BDB] font-bold w-full p-10 text-center'>
        <h1>Naidu Hall</h1>
        <p className='text-xl text-slate-950 font-light'>Invoice Parser</p>
      </section>
      <section className='p-5 flex flex-col items-center'>
        <div className='flex flex-col items-start max-w-fit md:max-w-[800px]'>
          {/* <div className='bg-red-600 flex items-start py-2'>
            <input type="file" onChange={handleFileChange} />
          </div> */}
          <div className='bg-[#dddddd] flex flex-row p-2 justify-between w-full rounded-3xl hover:bg-[#c9c9c9]'>
            <FileUploader handleChange={handleFileChange} name="file" label={'Drag and Drop Files Here'} id='fileUpload'>
              <div className='flex flex-row items-center cursor-pointer px-3 flex-grow min-w-[250px] sm:min-w-[450px] md:min-w-[650px]'>
                <img src={Upload} height={40} width={40} />
                <div className='flex flex-col items-start p-4 '>
                  <h4 className='text-base sm:text-2xl text-black '>{file ? file.name : 'Drag and drop invoice file here'}</h4>
                  <p className='text-xs line-clamp-1 text-black '>PDF, PNG, JPG, JPEG, DOCS</p>
                </div>
              </div>
            </FileUploader>
            <div className='w-full flex justify-center items-center'>
              <button onClick={invoiceParse} disabled={file === null} className='font-mono text-lg border border-black text-black disabled:border-gray-100 disabled:text-gray-100 p-2 rounded-lg cursor-pointer'>
                <div>{isLoading ? <Bars
                  height="40"
                  width="80"
                  color="#text-slate-950"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                /> : 'Process'}</div>
              </button>
            </div>
          </div>
        </div>
      </section>
      {
        invoiceData !== null &&
        <section className=' sm:p-10 p-4'>
          <h1 className='text-4xl font-bold text-center p-6 text-[#733BDB]'>Invoice Details</h1>
          <div className='flex flex-col gap-5'>

            <section className='flex flex-col md:flex-row md:gap-3'>
              <section className='flex flex-col md:flex-row gap-3 justify-between w-full'>
                <div>
                  <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="invoice_number" className='text-sm text-[#3b3b3b]'>Invoice Number</label>
                    <input type='text' id='invoice_number' className='w-full p-2 bg-[#f9f9f9] border-b border-[#3b3b3b] text-[#3b3b3b] placeholder:text-[#3b3b3b]' placeholder='Invoice Number' value={invoiceData.invoice_number} />
                  </div>
                  <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="invoice_date" className='text-sm text-[#3b3b3b]'>Invoice Date</label>
                    <input type='text' id='invoice_date' className='w-full p-2 bg-[#f9f9f9] border-b border-[#3b3b3b] text-[#3b3b3b] placeholder:text-[#3b3b3b]' placeholder='Invoice Date' value={invoiceData.invoice_date} />
                  </div>
                </div>
                <div>
                  <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="total_tax" className='text-sm text-[#3b3b3b]'>Total Tax</label>
                    <input type='text' id='total_tax' className='w-full p-2 bg-[#f9f9f9] border-b border-[#3b3b3b] text-[#3b3b3b] placeholder:text-[#3b3b3b]' placeholder='Total Tax' value={invoiceData.total_tax} />
                  </div>
                  <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="invoice_amount" className='text-sm text-[#3b3b3b]'>Invoice Amount</label>
                    <input type='text' id='invoice_amount' className='w-full p-2 bg-[#f9f9f9] border-b border-[#3b3b3b] text-[#3b3b3b] placeholder:text-[#3b3b3b]' placeholder='Invoice Amount' value={invoiceData.invoice_amount} />
                  </div>
                </div>
              </section>
            </section>
            <section className='flex flex-col md:flex-row md:gap-3'>
              <div className='flex flex-grow flex-col'>
                <h4 className='text-[#733BDB] font-light font-mono text-lg'>Buyer Details</h4>
                <section className='flex flex-grow flex-col p-2 border-slate-400 border rounded-md shadow-lg'>
                  <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="buyer_name" className='text-sm text-[#3b3b3b]'>Buyer Name/Consignee</label>
                    <input type='text' id='buyer_name' className='w-full p-2 bg-[#f9f9f9] border-b border-[#3b3b3b] text-[#3b3b3b] placeholder:text-[#3b3b3b]' placeholder='Buyer Name/Consignee' value={invoiceData.buyer_name} />
                  </div>
                  <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="buyer_address" className='text-sm text-[#3b3b3b]'>Buyer Address</label>
                    <input type='text' id='buyer_address' className='w-full p-2 bg-[#f9f9f9] border-b border-[#3b3b3b] text-[#3b3b3b] placeholder:text-[#3b3b3b]' placeholder='Buyer Address' value={invoiceData.buyer_address} />
                  </div>
                  <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="buyer_phone_number" className='text-sm text-[#3b3b3b]'>Buyer Phone Number</label>
                    <input type='text' id='buyer_phone_number' className='w-full p-2 bg-[#f9f9f9] border-b border-[#3b3b3b] text-[#3b3b3b] placeholder:text-[#3b3b3b]' placeholder='Buyer Phone Number' value={invoiceData.buyer_phone_number} />
                  </div>
                </section>
              </div>
              <div className='flex flex-grow flex-col'>
                <h4 className='text-[#733BDB] font-light font-mono text-lg'>Buyer Details</h4>
                <section className='flex flex-grow flex-col p-2 border-slate-400 border rounded-md shadow-lg'>
                  <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="seller_name" className='text-sm text-[#3b3b3b]'>Seller Name</label>
                    <input type='text' id='seller_name' className='w-full p-2 bg-[#f9f9f9] border-b border-[#3b3b3b] text-[#3b3b3b] placeholder:text-[#3b3b3b]' placeholder='Seller Name' value={invoiceData.seller_name} />
                  </div>
                  <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="seller_address" className='text-sm text-[#3b3b3b]'>Seller Address</label>
                    <input type='text' id='seller_address' className='w-full p-2 bg-[#f9f9f9] border-b border-[#3b3b3b] text-[#3b3b3b] placeholder:text-[#3b3b3b]' placeholder='Seller Address' value={invoiceData.seller_address} />
                  </div>
                  <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="seller_phone_number" className='text-sm text-[#3b3b3b]'>Seller Phone Number</label>
                    <input type='text' id='seller_phone_number' className='w-full p-2 bg-[#f9f9f9] border-b border-[#3b3b3b] text-[#3b3b3b] placeholder:text-[#3b3b3b]' placeholder='Seller Phone Number' value={invoiceData.seller_phone_number} />
                  </div>
                </section>
              </div>
            </section>
            <section>
              <h4 className='text-[#733BDB] font-light font-mono text-lg'>Items Details</h4>
              <section className='flex flex-grow flex-col p-2 border-slate-400 border rounded-md shadow-lg'>
                <div className='flex flex-col w-full gap-1'>
                  <label htmlFor="Items purchased" className='text-sm text-[#3b3b3b]'>Items purchased</label>
                  {
                    typeof invoiceData['Items purchased'] === 'object' &&
                    typeof invoiceData['Items purchased'] !== 'string' &&
                    Array.isArray(invoiceData['Items purchased']) &&
                    typeof invoiceData['Items purchased'][0] === 'object' &&
                    typeof invoiceData['Items purchased'][0] !== 'string' &&
                    !Array.isArray(typeof invoiceData['Items purchased'][0]) &&
                    <TableMultiComponent items={invoiceData['Items purchased']} />
                  }
                  {typeof invoiceData['Items purchased'] === 'object' && typeof invoiceData['Items purchased'] !== 'string' ?
                    Array.isArray(invoiceData['Items purchased']) ?
                      invoiceData['Items purchased'].map((item, index) => {
                        if (typeof item === 'string') {
                          return <input type='text' id='seller_phone_number' className='w-full p-2 bg-[#f9f9f9] border-b border-[#3b3b3b] text-[#3b3b3b] placeholder:text-[#3b3b3b]' key={index} placeholder={'Items' + index} value={item} />
                        }
                        else if (typeof item === 'object' && Array.isArray(item)) {
                          item.map((subitem) => {
                            return <input type='text' id='seller_phone_number' className='w-full p-2 bg-[#f9f9f9] border-b border-[#3b3b3b] text-[#3b3b3b] placeholder:text-[#3b3b3b]' key={index} placeholder={'Items' + index} value={subitem} />
                          })
                        }
                      }) :
                      <TableSingleComponent item={invoiceData['Items purchased']} />
                    : typeof invoiceData['Items purchased'] === 'string' ? <></> :
                      Object.entries(invoiceData['Items purchased']).map(([k, v]) => {
                        return <p key={k}>The key {k} has a value of {v}</p>
                      })}
                  {/* String */}
                  {typeof invoiceData['Items purchased'] === 'string' && <input type='text' id='Items purchased' className='w-full p-2 bg-[#f9f9f9] border-b border-[#3b3b3b] text-[#3b3b3b] placeholder:text-[#3b3b3b]' placeholder='Items purchased' value={invoiceData['Items purchased']} />}

                </div>
              </section>
            </section>
          </div>
          <div className='py-6 flex flex-row w-full justify-center gap-10'>
            <button className='bg-[#733BDB] hover:bg-[#673eb3] rounded-xl px-6 py-3 text-2xl font-bold font-mono' onClick={clear}>Clear</button>
            <button className='bg-[#733BDB] hover:bg-[#673eb3] rounded-xl px-6 py-3 text-2xl font-bold font-mono' onClick={() => { console.log('saved') }}>Save</button>
          </div>
        </section>
      }
    </div>
  )
}

export default App
