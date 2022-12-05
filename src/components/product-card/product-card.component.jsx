import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import './product-card.styles.scss'
import Button from '../button/button.component'

const ProductCard = ({ product }) => {

    const { id, name, imageUrl, price } = product
    const { addItemToCart } = useContext(CartContext)

    const addProductToCart = () => addItemToCart(product)

    return (
        <div key={id} className='product-card-container'>
            <img src={imageUrl} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>&#8377;{price}</span>
            </div>
            <Button buttontype='inverted' onClick={addProductToCart}>Add to Cart</Button>
        </div>
    );
};

export default ProductCard;