import React from 'react'


export const IndividualCartProduct = ({cartProduct}) => {

    return (
        <div className='product'>
            <div className='product-img'>
                <img src={cartProduct.thumbnail} alt="product-img"/>
            </div>
            <div className='product-text title'>{cartProduct.title}</div>
            <div className='product-text description'>{cartProduct.description}</div>
            <div className='product-text price'>$ {cartProduct.price}</div>
            <span>Quantity</span>
            <div className='product-text cart-price'>$ {cartProduct.TotalProductPrice}</div>       
        </div>
    )
}
