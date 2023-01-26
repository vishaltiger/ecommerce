import React,{useState, useEffect} from 'react'
import {Navbar} from './Navbar'
import { CartProducts } from './CartProducts';


export const Cart = () => { 

    // state of cart products
    const [cartProducts, setCartProducts]=useState([]);

    // getting cart products from firestore collection and updating the state
    useEffect(()=>{
        let newCartProducts = JSON.parse(sessionStorage.getItem('cartProducts'));
        if(newCartProducts && newCartProducts.length>0){
            setCartProducts(newCartProducts);
        }
    },[])


    // getting the qty from cartProducts in a seperate array
    const qty = cartProducts.map(cartProduct=>{
        return cartProduct.qty;
    })

    // reducing the qty in a single value
    const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

    const totalQty = qty.reduce(reducerOfQty,0);

    // getting the TotalProductPrice from cartProducts in a seperate array
    const price = cartProducts.map((cartProduct)=>{
        return cartProduct.TotalProductPrice;
    })

    // reducing the price in a single value
    const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;

    const totalPrice = price.reduce(reducerOfPrice,0);

    // global variable
    let Product;
    
    // cart product increase function
    const cartProductIncrease=(cartProduct)=>{
        // console.log(cartProduct);
        let newCartProducts =  cartProducts;
        Product=cartProduct;
        Product.qty=Product.qty+1;
        Product.TotalProductPrice=Product.qty*Product.price;
        newCartProducts.map(prod=>{
            if(prod.id==cartProduct.id){
                prod = Product;
            }
            return prod;
        })
        setCartProducts(newCartProducts);
        sessionStorage.setItem('cartProducts',JSON.stringify(newCartProducts));
      
    }

    // cart product decrease functionality
    const cartProductDecrease =(cartProduct)=>{
        let newCartProducts =  cartProducts;
        Product=cartProduct;
        if(Product.qty > 1){
            Product.qty=Product.qty-1;
            Product.TotalProductPrice=Product.qty*Product.price;
             // updating in database
             newCartProducts.map(prod=>{
                if(prod.id==cartProduct.id){
                    prod = Product;
                }
                return prod;
            })
            setCartProducts(newCartProducts);
            sessionStorage.setItem('cartProducts',JSON.stringify(newCartProducts));
        }
    }


   
    return (
        <>
            <Navbar totalProducts={cartProducts.length} />           
            <br></br>
            {cartProducts.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Cart</h1>
                    <div className='products-box cart'>
                        <CartProducts cartProducts={cartProducts}
                           cartProductIncrease={cartProductIncrease}
                           cartProductDecrease={cartProductDecrease}
                        />
                    </div>
                    <div className='summary-box'>
                        <h5>Cart Summary</h5>
                        <br></br>
                        <div>
                        Total No of Products: <span>{totalQty}</span>
                        </div>
                        <div>
                        Total Price to Pay: <span>$ {totalPrice}</span>
                        </div>
                        <br></br>
                         <h6 className='text-center'
                        style={{marginTop: 7+'px'}}>OR</h6>                                                                                                                                          
                    </div>                                    
                </div>
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'>No products to show</div>
            ) }       
                            
        </>
    )
}