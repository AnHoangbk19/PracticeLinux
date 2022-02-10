const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

document.querySelector('.header__back-btn').onclick = () => {
    window.location.href = "./index.html";
}

// Get total price
const pricels = localStorage.getItem('TotalPrice')
const price = $('.payment__total-price');
price.innerHTML = pricels + '$'

const paymentList = $('.payment__methods-lists')
const atmPayment = $('#atm')
const atmOptions = $('.atm-options')
const creditPayment = $('#credit-debit')
const creditCard = $('.credit-debit-card')

// Handle event about atm option
function showATM() {
    atmOptions.classList.add('actived')
    paymentList.style.display = 'none'
}
function turnOffATM() {
    atmOptions.classList.remove('actived')
    paymentList.style.display = 'block'
}
atmPayment.onchange = () => {
    if (atmPayment.checked) showATM()
    else turnOffATM()
}

function backToPayment() {
    turnOffATM()
    turnOffCreditCard()
}

// Handle event about Credit/Debit card
function showCreditCard() {
    creditCard.classList.add('actived')
    paymentList.style.display = 'none'
}
function turnOffCreditCard() {
    creditCard.classList.remove('actived')
    paymentList.style.display = 'block'
}
creditPayment.onchange = () => {
    if (creditPayment.checked) showCreditCard()
    else turnOffCreditCard()
}


// Handle check bank
const atmItems = $$('.atm-img-wrap')
var isChecked = false
var preIndex

atmItems.forEach((atmItem, index) => {
    atmItem.onclick = (e) => {
        if (this.isChecked) {
            atmItems[preIndex].classList.remove('actived')
            var elem = $('.checked')
            elem.parentNode.removeChild(elem)
            isChecked = !isChecked
        }
        atmItem.classList.add('actived')
        atmItem.innerHTML += '<span class="checked">&#10003;</span>'
        isChecked = !isChecked
        preIndex = index
    }
})