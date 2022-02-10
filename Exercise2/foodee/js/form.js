// redirect to home page if user logged in




const loader = document.querySelector('.loader');


const submitBtn = document.querySelector('.submit-btn');
const name = document.querySelector('#name') || null;
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const number = document.querySelector('#number') || null;


submitBtn.addEventListener('click', ()=>{
    if(name != null){
        if(name.value.length < 3){
            showAlert('name must be 3 letters long');
        } else if(!email.value.length){
            showAlert('enter your mail');
        } else if(password.value.length < 6){
            showAlert('password should be 8 letters long');
        } else if(!number.value.length){
            showAlert('enter your phone number');
        } else if(!Number(number.value) || number.value.length < 10){
            showAlert('invalid number, please enter valid one');
        } else {
            loader.style.display = 'block';
            sendData('/signup',{
                name: name.value,
                email: email.value,
                password: password.value,
                number: number.value,
                seller: false
            })
        }
    } else{
        //login page
        if(!email.value.length || !password.value.length){
            showAlert('fill your account');
        } else{
            loader.style.display = 'block';
            sendData('/login',{
                email: email.value,
                password: password.value,
            })
        }
    }
})
