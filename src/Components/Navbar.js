import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../Images/ecommerce.jpg'
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {useHistory} from 'react-router-dom'

export const Navbar = ({totalProducts}) => {

    const history = useHistory();

 
    return (
        <div className='navbar'>
            <div className='leftside'>
                <div className='logo'>
                    <img src={logo} alt="logo"/>
                </div>
            </div>
            <div className='rightside'>
               <div className='cart-menu-btn'>
                        <Link className='navlink' to="cart">
                            <Icon icon={shoppingCart} size={20}/>
                        </Link>
                        <span className='cart-indicator'>{totalProducts}</span>
                    </div>
                
                           
                                
            </div>
        </div>

    )
}
