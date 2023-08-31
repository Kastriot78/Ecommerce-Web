export function TableLoader({ items }: any) {
    return (
        <div className="container section">
            <table width="100%" className="table_loader wishlist_table">
                {
                    [1, 2, 3, 4]?.map((item: any, index:any) => <tbody key={index}>
                        <tr>
                            <th className='col1'>
                                <span></span>
                            </th>
                            <th className='col2'>
                                <span></span>
                            </th>
                            <th className='col3'>
                                <span></span>
                            </th>
                            <th className='col4'>
                                <span></span>
                            </th>
                            <th className='col5'>
                                <span></span>
                            </th>
                            <th className='col6'>
                                <span></span>
                            </th>
                        </tr>
                    </tbody>
                    )}
            </table>
        </div>
    )
}