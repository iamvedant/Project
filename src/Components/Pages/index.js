import React, { Component } from 'react'
import Spinner from '../../UI/Spinner/Spinner'
import './index.css'
import Pagination from '../Layout/Pagination'
class Index extends Component{
    state={
        isLoading: true,
        pageChangeLoading: false,
        products: null,
        currPage: this.props.location.search.slice(1).split('=')[1],
        pages: null
    }
    componentDidMount(){
        if(!this.state.currPage){
            this.setState({
                currPage: 1
            })
        }
        this.loadPosts();
    }
     addToCartHandler = (e, productId) =>{
         e.preventDefault();
        const url = 'http://localhost:3002/cart';
         fetch(url,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    productId: productId,
                    token: localStorage.token
                })
            })
     }
    loadPosts = () =>{
        // console.log(this.state.currPage);
        if(!this.state.isLoading){
            this.setState({pageChangeLoading: true}, ()=>{fetch("http://localhost:3002/?page="+this.state.currPage).then(res=>{
                return(res.json())
            }).then(resData=>{
                this.setState({
                    products: resData.products,
                    isLoading: false,
                    pageChangeLoading: false,
                    pages: resData.pages
                }
            );
        })});
        }
        else{
            fetch("http://localhost:3002/?page="+this.state.currPage).then(res=>{
            return(res.json())
        }).then(resData=>{
            this.setState({
                products: resData.products,
                isLoading: false,
                pageChangeLoading: false,
                pages: resData.pages
            }
        );
    })
        }
        
}

    pageChangeHandler = (page) =>{
        console.log(this.props);
        this.setState({
            currPage: page
        },()=>{this.loadPosts()})
        
        
    }
    render(){
        let cards = <Spinner/>
        if(!this.state.isLoading){
            if(this.state.products.length===0){
                cards = <h1>No Products</h1>
            }
            else{
                cards = this.state.products.map((products)=>{
                    return(
                        <article key={products._id} className="card product-item">
                        <header className="card__header">
                            <h1 className="product__title">{products.title}</h1>
                        </header>
                        <div className="card__image">
                            <img className="cardimg" src={"http://localhost:3002"+products.url} alt="A Book"></img>
                        </div>
                        <div className="card__content">
                            <h2 className="product__price"><del>&#x20B9;{products.mrp}</del>&nbsp;&#x20B9;{products.price}</h2>
                            <p className="product__description">{products.description}</p>
                        </div>
                        <div className="card__actions">
                            <form action="/cart" method="post">
                                <button onClick={(e)=>this.addToCartHandler(e, products._id)} type="submit" className="btn">Add To Cart</button>

                                <input type="hidden" name="_csrf" value="<%= csrfToken %>"></input>
                            </form>
                        </div>
                    </article>
                    )
                })
            }
        }
        return(
            <main>
                <div className="grid">
                    {cards}
                </div>
                <Pagination load={this.state.pageChangeLoading} clicked={this.pageChangeHandler} currPage={this.state.currPage} pages={this.state.pages} nextPage={this.state.pages<(+this.state.currPage+2)?this.state.pages:+this.state.currPage+2} prevPage={(this.state.currPage-2)>=2?this.state.currPage-2:2}></Pagination>
            </main>

        )
    }

    
}

export default Index;