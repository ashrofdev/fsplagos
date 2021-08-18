import React from 'react';

const Orders = () => {
    return (
        <div className="orders">
            <h2>Orders </h2>

            <div className="table">
                <nav>
                    <ul>
                        <li>All</li>
                        <li>Unfufiled</li>
                        <li>Fufiled</li>
                        <li>Canceled</li>
                    </ul>
                </nav>

                <table>
                    <thead>
                        <tr>
                            <td>S/N</td>
                            <hd>Product name</hd>
                            <hd>Delivery Type</hd>
                            <td>Order Date</td>
                            <td>Release Date</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
};

export default Orders;