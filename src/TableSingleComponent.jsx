/* eslint-disable react/prop-types */
const TableSingleComponent = (props) => {
    return (
        <table className="table-fixed text-black border border-black">
            <thead className='bg-[#733BDB] text-white'>
                <tr>
                    {
                        Object.entries(props.item).map(([k]) => {
                            return <th key={k} className=' border-r border-white p-2'>{k}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                <tr>
                    {
                        Object.entries(props.item).map(([k, v]) => {
                            return <td key={k} className=' border-b border-black text-center p-2'>
                                <input type='text' id='seller_phone_number' className='w-full p-2 bg-[#f9f9f9] text-[#3b3b3b] placeholder:text-[#3b3b3b]' placeholder='Seller Phone Number' value={v} />
                            </td>
                        })
                    }
                </tr>
            </tbody>
        </table>
    )
}

export default TableSingleComponent