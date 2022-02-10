let openEdition;


const createProduct = (data) => {

    openEdition = () => {
        sessionStorage.tempProduct = JSON.stringify(data);
        location.href= `/add-product/${data.id}`
    }

    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += `
    <div class="category__item">
    <img src=" ${data.images[0] || 'images/no image.png'} " alt="" class="category__image" />
    <h3 class="category__name">${data.name}</h3>
    <div class="product-image">
      
      <button class="card-action-btn edit-btn" onclick="openEdition()"><img src="images/edit.png" alt=""></button>
      <button class="card-action-btn open-btn" onclick="location.href ='/${data.id}' "><img src="images/open.png" alt=""></button>
      <button class="card-action-btn delete-btn" onclick="openDeletePopup('${data.id}')"><img src="images/delete.png" alt=""></button>
    </div>
  </div>
    `;
}

const openDeletePopup = (id) => {
    let deleteAlert = document.querySelector('.delete-alert');
    deleteAlert.style.display = "flex";

    let closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => deleteAlert.style.display = null);

    let deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteItem(id))
}

const deleteItem = (id) => {
    fetch('/delete-product', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id:id})
    }) .then(res => res.json())
    .then (data =>{
        if(data == 'success'){
            location.reload();
        } else{
            showAlert('some error occured while deleting the product. Try Again');
        }
    })
}