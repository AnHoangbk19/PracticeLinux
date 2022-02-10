

let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader');
//checking user
window.onload = () => {
    if(!user){
        location.replace('/login');
    }
}
 //price inputs

 const actualPrice = document.querySelector('#actual-price');
 const discountPercentage = document.querySelector('#discount');
 const sellingPrice = document.querySelector('#sell-price');

 discountPercentage.addEventListener('input', () =>{
     if(discountPercentage.value > 100){
         discountPercentage.value = 90;
     } else {
         let discount = actualPrice.value * discountPercentage.value / 100;
         sellingPrice.value = actualPrice.value - discount;
     }
 }) 

 sellingPrice.addEventListener('input', ()=>{
     let discount = (sellingPrice.value / actualPrice.value) *100;
     discountPercentage.value = 100 - discount;
 })


 //upload image handle
 let uploadImages = document.querySelectorAll('.fileupload');
 let imagePaths = []; // will store all uploaded images paths



 uploadImages.forEach((fileupload, index) => {
    fileupload.addEventListener('change',()=>{
        const file = fileupload.files[0];
        let imageUrl;

        if(file.type.includes('image')){
            fetch('/s3url').then(res => res.json())
            .then(url => {
                fetch( url, {
                    method: 'PUT',
                    headers: new Headers({'Content-Type' : 'multipart/form-data'}),
                    body: file
                }).then(res => {
                    imageUrl = url.split("?")[0];
                    imagePaths[index] = imageUrl;
                    let label =document.querySelector(`label[for=${fileupload.id}]`);
                    label.style.backgroundImage = `url(${imageUrl})`;
                    let productImage = document.querySelector('.product-image');
                    productImage.style.backgroundImage = `url(${imageUrl})`;
                })
            })
        } else {
            showAlert('upload image only');
        }
    })
 })

 // form submission

 const productName = document.querySelector('#product-name');
 const shortLine = document.querySelector('#short-des');
 const des = document.querySelector('#des');
 const tags = document.querySelector('#tags');

 //buttons
 const addProductBtn = document.querySelector('#add-btn');
 const saveDraft = document.querySelector('#save-btn');


 const validateForm = () => {
     if(!productName.value.length){
        return showAlert('enter product name');
     } else if(shortLine.value.length>100 || shortLine.value.length <10){
         return showAlert('short description must be between 10 to 100 letters long');
     } else if(!des.value.length){
         return showAlert('enter detail description about the product');
     } else if (!imagePaths.length){
         return showAlert('upload atleast one product image')
     } else if (!actualPrice.value.length || !discount.value.length || !sellingPrice.value.length){
         return showAlert('you must add pricings');
     } else if (!tags.value.length){
         return showAlert('enter few tags to help ranking your product in search')
     } return true;
 }

 const productData = () => {
     return data = {
         name: productName.value,
         shortDes: shortLine.value,
         des: des.value,
         images: imagePaths,
         actualPrice: actualPrice.value,
         discount: discountPercentage.value,
         sellPrice: sellingPrice.value,
         tags: tags.value,
         email: user.email
     }
 }


 addProductBtn.addEventListener('click',()=>{
     if(validateForm()){
         loader.style.display = 'block';
         let data = productData();
         if(productId){
             data.id = productId;
         }
         sendData('/add-product', data);
     }
 })

 //save draft btn 
 saveDraft.addEventListener('click', () => {
     //check for product name
     if(!productName.value.length){
         showAlert('enter product name');
     }else{
         let data = productData();
         data.draft = true;
         sendData('/add-product', data);
     }
 })

 //exisiting product detail

const setFormsData = (data) => {
    productName.value = data.name;
    shortLine.value = data.shortDes;
    des.value = data.des;
    actualPrice.value = data.actualPrice;
    discountPercentage.value = data.discount;
    sellingPrice.value = data.sellPrice;
    tags.value = data.tags;

    //set up images
    imagePaths=data.images;
    imagePaths.forEach((url, i)=>{
        let label =document.querySelector(`label[for=${uploadImages[i].id}]`);
        label.style.backgroundImage = `url(${url})`;
        let productImage = document.querySelector('.product-image');
        productImage.style.backgroundImage = `url(${url})`;
    })
}


 const fetchProductData = () => {
    //detele the tempProduct form the session
    delete sessionStorage.tempProduct;
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({email: user.email, id: productId})
    })
    .then ((res) => res.json())
    .then(data => {
        setFormsData(data);
    })
    .catch(err => {
        location.replace(err);
    })
} 


 let productId = null;
 if(location.pathname != '/add-product'){
     productId= decodeURI(location.pathname.split('/').pop());

     let productDetail = JSON.parse(sessionStorage.tempProduct || null );
     //fetch the data if product is not in session
    // if (productDetail == null){
         fetchProductData();
    // }
 }

