import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import formatCurrency from './Utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //default export it is used when we need only one function from that file
import{deliveryOptions}from'../data/deliveryoptions.js';

const today = dayjs();
const delivaryDate = today.add(7,'days');
console.log(delivaryDate.format('dddd, MMMM D'));


let cartSummaryHTML = '';

cart.forEach((cartItem)=>{
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product)=>{
    if(product.id === productId){
      matchingProduct = product;
    }
  });

const delieryOptionId = cartItem.deliveryOptionsId;

let deliveryOption;
deliveryOptions.forEach((option)=>{
  if(option.id === delieryOptionId){
    deliveryOption = option;
  }
});

const today = dayjs();
const delivaryDate = today.add(deliveryOption.deliveryDays,'days');
const dateStrings = delivaryDate.format('dddd, MMMM D');

cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateStrings}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${delieryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
  `;
});

function delieryOptionsHTML(matchingProduct,  cartItem){
let html = '';

  deliveryOptions.forEach((deliveryOptions)=>{
    const today = dayjs();
    const delivaryDate = today.add(deliveryOptions.deliveryDays,'days');
    const dateStrings = delivaryDate.format('dddd, MMMM D');


    const priceString = deliveryOptions.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOptions.priceCents)} -`;

    const isChecked = deliveryOptions.id === cartItem.deliveryOptionsId;

    html += `
      <div class="delivery-option">
        <input type="radio"
          ${isChecked ? 'checked': ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateStrings}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
  });
  return html;
}

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link)=>{
    link.addEventListener('click',() => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
    })
  })