import React, { Component } from "react";
import Loading from '../../UI/Spinner/Spinner'
class Cart extends Component {
  state = {
    cartProducts: null,
    totalPrice: null,
  };
  componentDidMount() {
    const url = "http://localhost:3002/cart?token="+localStorage.token;
    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        this.setState({
          cartProducts: resData.products,
          totalPrice: resData.totalPrice,
        });
      });
  }

  deleteCartItemHandler = (e, productId) =>{
    e.preventDefault();
    const url = 'http://localhost:3002/cart-delete';
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        prodId: productId,
        token: localStorage.token
      })
    }).then(res=>res.json()).then(resData=>{const tempCart = [...this.state.cartProducts];
      let tempPrice = this.state.totalPrice;
      const length = tempCart.length
      for(let i=0; i<length; i++){
        if(tempCart[i].id.toString()===productId.toString()){
          tempPrice-=tempCart[i].price;
          if(tempCart[i].qty>1){
            tempCart[i].qty-=1
            
          }
          else{
            tempCart.splice(i, 1);
          
          }
          break;
        }
      }
      this.setState({
        cartProducts: tempCart,
        totalPrice: tempPrice
      })
    })
  }
    

  render() {
    let cart = null;
    let priceDash = null;
    if (this.state.cartProducts && this.state.totalPrice) {
      cart = this.state.cartProducts.map((products) => {
        return (
          <tr>
            <td>{products.title}</td>
            <td>{products.qty}</td>
            <td>{products.price}</td>
            <td>
              <form action="/cart-delete" method="POST">
                <button onClick={(e)=>this.deleteCartItemHandler(e, products.id)} type="submit" class="delbtn">
                  {" "}
                  Remove{" "}
                </button>
                <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
              </form>
            </td>
          </tr>
        );
      });

      priceDash = (
        <div class="Total">
          <h1>Total Price: &nbsp;&#x20B9;</h1>
          <h1>{this.state.totalPrice}</h1>
        </div>
      );
    return (
      <main>
        <table class="table">
          <tr>
            <th>Product</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Controls</th>
          </tr>

          {cart}
        </table>
        {priceDash}

        <form action="/order" method="POST">
          <button class="btn">
            CheckOut <i class="far fa-credit-card"></i>
          </button>
          <input type="hidden" value="true" name="Checkout" />
          <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
        </form>
      </main>
    );

}
    else{
        return Loading;
    }
  }
}

export default Cart;
