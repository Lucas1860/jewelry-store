let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Подвеска «Медуза»',
        image: '1.0.jpg',
        price: 18000
    },
    {
        id: 2,
        name: 'Подвеска «Пагода»',
        image: '2.0.jpg',
        price: 15000
    },
    {
        id: 3,
        name: 'Подвеска «Инь-Ян»',
        image: '3.0.jpg',
        price: 19800
    },
    {
        id: 4,
        name: 'Подвеска «Масверк»',
        image: '4.0.jpg',
        price: 16000
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.0.jpg',
        price: 22000
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.0.jpg',
        price: 12000
    }
];


function openn(num){
    if (num === 1)
        window.open("page/page1.html", "_blank");
    else if (num === 2)
        window.open("page/page2.html", "_blank");
    else if (num === 3)
        window.open("page/page3.html", "_blank");
    else if (num === 4)
        window.open("page/page4.html", "_blank");
    else if (num === 5)
        window.open("page/page5.html", "_blank");
    else if (num === 6)
        window.open("page/page6.html", "_blank");
}

let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div'); 
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img onclick=openn(${value.id}) src="img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

