// Open Cart 
const cartMenu = document.querySelector('.cart__wrapper');
var totalPrice
function openCart() {
    cartMenu.classList.add('active')
}
function closeCart() {
    cartMenu.classList.remove('active')
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-outline-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('btn-item-add')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

}


function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantitySub(event) {
    var buttonClicked = event.target
    var quantityControl = buttonClicked.parentElement.parentElement
    var quantity = quantityControl.getElementsByClassName('cart-quantity')[0].innerText
    if (quantity > 1) {
            quantityControl.getElementsByClassName('cart-quantity')[0].innerText -= 1
    }
    updateCartTotal()
}

function quantityAdd(event) {
    var buttonClicked = event.target
    var quantityControl = buttonClicked.parentElement.parentElement
    var quantity = quantityControl.getElementsByClassName('cart-quantity')[0].innerText
    quantityControl.getElementsByClassName('cart-quantity')[0].innerText = parseInt(quantity) + 1
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('food-name')[0].innerText
    var price = shopItem.getElementsByClassName('food-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('food-img')[0].src
    var quantity = shopItem.getElementsByClassName('cart-quantity')[0].innerText
    addItemToCart(title, price, imageSrc, quantity)
    shopItem.getElementsByClassName('cart-quantity')[0].innerText = 1
    updatePrice(button)
    updateCartTotal()
}


function updatePrice(buttonClicked) {
    var input = buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement
    var quantity = input.getElementsByClassName('cart-quantity')[0].innerText
    var price = parseFloat(input.getElementsByClassName('food-price')[0].innerText.replace('$', ''))
    total = price * quantity
    input.getElementsByClassName('btn-item-add')[0].innerText = '$' + total
}


function addItemToCart(title, price, imageSrc, quantity) {
    var cartRow = document.createElement('li')
    cartRow.classList.add('cart__item')
    var cartItems = document.getElementsByClassName('cart__list')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart__item-name')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            cartQuantity = cartItemNames[i].parentElement.parentElement.getElementsByClassName('cart-quantity')[0]
            cartQuantity.innerText = parseInt(cartQuantity.innerText) + parseInt(quantity)
            console.log(cartQuantity.innerText, quantity);
            updateCartTotal()
            return
        }
    }
  

    var cartRowContents = `
            <div class="cart__item-img">
                <img src="${imageSrc}" alt="">
            </div>
            <div class="cart__item-info">
                <div class="cart__item-wrap">
                    <h4 class="cart__item-name">${title}</h4>
                    <button class="btn btn-outline-danger mx-1 cart__item-icon">&#10005;</button>
                </div>
                <div class="cart__item-wrap">
                    <span class="cart__item-price">${price}</span>
                    <div class="cart__item-control" onclick="">
                        <div class="cart__item-control-wrap mx-1">
                            <button class="btn-quantity btn-sub">-</button>
                        </div>
                        <span class="cart-quantity">${quantity}</span>
                        <div class="cart__item-control-wrap mx-1">
                            <button class="btn-quantity btn-add">+</button>
                        </div>
                    </div>
                </div>
            </div> `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-outline-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('btn-sub')[0].addEventListener('click', quantitySub)
    cartRow.getElementsByClassName('btn-add')[0].addEventListener('click', quantityAdd)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart__list')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart__item')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart__item-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.innerText
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    localStorage.setItem('TotalPrice', total)
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    document.getElementsByClassName('cart-total-price')[1].innerText = '$' + total
}

const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(()=>{
        alertBox.classList.remove('show');
    },3000);
    return false;
}

// Verify payment
const paymentBtn = document.querySelector('.cart__payment')
paymentBtn.disabled = true

document.querySelector('.cart__payment').onclick = () => {
    window.location.href = "./payment.html";
}
setInterval(checkPayment, 500)
function checkPayment() {
    const totalPrice = document.querySelectorAll('.cart-total-price')[1].textContent;
    if (totalPrice != '$0') paymentBtn.disabled = false
}