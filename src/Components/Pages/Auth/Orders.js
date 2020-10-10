import React, { Component } from 'react'
import Spinner from '../../../UI/Spinner/Spinner'
import './Orders.css'

class Orders extends Component{
    state={
        orders: null
    }

    componentDidMount(){
        const url = 'http://localhost:3002/order?token='+localStorage.token;
        fetch(url).then(res=>res.json()).then(resData=>{
            this.setState({
                orders: [...resData]
            })
        })
        
    }
    render(){
        let orders = <Spinner></Spinner>
        if(this.state.orders){
            orders=this.state.orders.map((order, index)=>{
                let data = order.products.map(prods=><tr>
                    <td className="product-name">

                        {prods.title}

                    </td>

                    <td>
                       {prods.qty}
                    </td>
                    <td>
                        {prods.price}
                    </td>
                </tr>)
                return(
                    <div className="order-card">
            <ul>
                <h1>Order {index+1}</h1>
            </ul>
            <div className="order-list">
                <table>
                    <tr>
                        <th>Product</th>
                        <th>Qty.</th>
                        <th>Price Per Unit</th>
                    </tr>

                    
                    {data}
                    

                </table>
            </div>
            <div className="amount-pane">
            <h1>Amount Paid = &#x20B9;{order.totalPrice}</h1>
        </div>
            <a className="btn" href="order/<%= order.id %>">Download Invoice <i className="fas fa-arrow-down"></i></a>
            
        </div>
                )
            })
        }
        return(
            <main className="order-main">

    
        
        {orders}
        
        
    </main>
        )
    }
}

export default Orders;