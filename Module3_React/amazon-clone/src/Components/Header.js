import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import "./Header.css";

function Header() {
    return (
        <div className="header">
           <img className="header_logo" src="http://pngimg.com/uploads/amazon/amazon_PNG25.png"/>

           <div className="header_search">
               <input className="header_input" type="text"/>
                <SearchIcon className="search_icon"/>
            </div>

            <div className="header_nav">
                <div className = "header_option">
                    <span className="headerOptionLine1">Hello Guest</span>
                    <span className="headerOptionLine2">Sign In</span>
                </div>

                <div className = "header_option">
                    <span className="headerOptionLine1">Returns</span>
                    <span className="headerOptionLine2">& Orders</span>
                </div>

                <div className = "header_option">
                    <span className="headerOptionLine1">Your</span>
                    <span className="headerOptionLine2">Prime</span>
                </div>

                <div className = "header_option_cart">
                    <ShoppingCartIcon className="cart_icon"/>
                    <span className="cartCount">0</span>
                </div>

            </div>
        </div>
    )
}

export default Header
