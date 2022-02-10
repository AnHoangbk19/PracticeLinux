let loader = document.querySelector('.loader');
let user = JSON.parse(sessionStorage.user || null);

const becomeSellerElement =document.querySelector('.become-seller');
const productListingElement =document.querySelector('.product-listing');
const applyForm = document.querySelector('.apply-form');
const showApplyFormBtn = document.querySelector('#apply-btn');

window.onload = () => {
    if(user){
        if(!user.seller){
            becomeSellerElement.classList.remove('hive');
 
        } else{
            loader.style.display = 'block';
            setupProducts();
            productListingElement.classList.remove('hive');
        }

    } else {
        location.replace('/login');
    }
}


showApplyFormBtn.addEventListener('click', () => {
    becomeSellerElement.classList.add('hive');
    applyForm.classList.remove('hive');
})


//form submission

const applyFormButton = document.querySelector('#apply-form-btn');
const businessName = document.querySelector('#business-name');
const address = document.querySelector('#business-add');
const about = document.querySelector('#about');
const number = document.querySelector('#number');

applyFormButton.addEventListener('click', ()=>{
    if(!businessName.value.length || !address.value.length || !about.value.length || !number.value.length){
        showAlert('fill all input');
    }else {
        loader.style.display = 'block';
        sendData('/seller',{
            name: businessName.value,
            address: address.value,
            about: about.value,
            number: number.value,
            email: JSON.parse(sessionStorage.user).email
        })
    }
})

const setupProducts = () => {
    fetch('/get-products',{
        method: 'post',
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify({email: user.email})
    })
    .then(res => res.json())
    .then(data => {
        loader.style.display = null;
        productListingElement.classList.remove('hide');
        if(data == 'no products'){
            let emptySvg = document.querySelector('no-product-imgage');
            emptySvg.classList.remove('hive');
        }else{
            data.forEach(product => createProduct(product));
        }
    } );
}