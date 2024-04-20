/* eslint-disable react/prop-types */
const TableMultiComponent = (props) => {
    return (
        <table className="table-fixed text-black border border-black">
            <thead className='bg-[#733BDB] text-white'>
                <tr>
                    {
                        Object.entries(props.items[0]).map(([k]) => {
                            return <th key={k} className=' border-r border-white p-2'>{k}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {props.items.map((item, index) => (
                    <tr key={index}>
                        {Object.values(item).map((value, index) => (
                            <td key={index} className=' border-b border-black text-center p-2'>
                                <input type='text' id='seller_phone_number' className='w-full p-2 bg-[#f9f9f9] text-[#3b3b3b] placeholder:text-[#3b3b3b]' placeholder='Seller Phone Number' value={value} />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableMultiComponent