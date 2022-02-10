let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    loginForm.classList.remove('active');
    header__menu.classList.remove('active');
}

// let cart = document.querySelector('.shopping-card');

// document.querySelector('#cart-btn').onclick = () =>{
//     cart.classList.toggle('active');
//     searchForm.classList.remove('active');
//     loginForm.classList.remove('active');
//     header__menu.classList.remove('active');
// }

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    header__menu.classList.remove('active');
}


let header__menu = document.querySelector('.header__menu');

document.querySelector('#menu-btn').onclick = () =>{
    header__menu.classList.toggle('active');
    searchForm.classList.remove('active');
    cart.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    header__menu.classList.remove('active');
}

//user icons
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');

window.onload =() => {
    let user = JSON.parse(sessionStorage.user || null);
    if (user != null){
        popuptext.innerHTML =  `login as, ${user.name}`;
        actionBtn.innerHTML = 'log out';
        actionBtn.addEventListener('click', () =>{
            sessionStorage.clear();
            location.reload();
        })
    }else{
        popuptext.innerHTML= 'log in to place order';
        actionBtn.innerHTML= 'log in';
        actionBtn.addEventListener('click', () =>{
            window.location.href = "/login";
        })
    }
}