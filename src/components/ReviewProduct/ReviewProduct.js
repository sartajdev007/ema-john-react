import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ReviewProducts.css'

const ReviewProduct = ({ product, handleRemoveItem }) => {
    const { id, name, price, quantity, img } = product;
    return (
        <div className='review-item'>
            <div className='review-img'>
                <img src={img} alt="" />
            </div>
            <div className="review-container">
                <div className="review-details">
                    <p>{name}</p>
                    <p><small>Quantity:{quantity}</small></p>
                    <p><small>Price: ${price}</small></p>
                </div>
                <div className='delete-container'>
                    <button onClick={() => handleRemoveItem(id)}>
                        <FontAwesomeIcon className='delete-icon' icon={faTrashAlt}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewProduct;