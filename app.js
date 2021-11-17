const taxRate = 0.18;
const shippingPrice = 15.0;

window.onload = () => {
    window.localStorage.setItem("taxRate", taxRate);
    localStorage.setItem("shippingPrice", shippingPrice);

    window.sessionStorage.setItem("taxRate", taxRate);
    sessionStorage.setItem("shippingPrice", shippingPrice);

    calculateTotal();
}

let productPlusminus = document.getElementsByClassName('product-plusminus');
console.log(productPlusminus);
[...productPlusminus].forEach((productPlusminus) => {
    //minus
    let productQuantityP = productPlusminus.querySelector('#product-quantity');
    productPlusminus.firstElementChild.addEventListener('click', () => {
        productQuantityP.innerText = parseInt(productQuantityP.innerText) - 1;
        if (productQuantityP.innerText == '0') {
            alert("Produkt wird entfernt!!!");
            productPlusminus.addEventListener('click', function (event) {
                let buttonClicked = event.target
                buttonClicked.parentElement.parentElement.parentElement.remove();
                addCartBtn.style.display = "block";
            });
            //productPlusminus.parentElement.parentElement.remove();
            productLineTotal(productQuantityP);
        }

        productLineTotal(productQuantityP);
    });
    //plus
    productPlusminus.lastElementChild.addEventListener('click', () => {
        productQuantityP.innerText = parseInt(productQuantityP.innerText) + 1;
        if (productQuantityP.innerText > 5) {
            alert("Sie können maximal 5 des gleichen Produkts kaufen!!!");
            productQuantityP.innerText = parseInt(productQuantityP.innerText = 5); // burasi nasil yapilmali sor
            return alert;
        }

        productLineTotal(productQuantityP);
    });
});


const productLineTotal = (productQuantityP) => {
    let productInfo = productQuantityP.parentElement.parentElement;
    const productPrice = parseFloat(productInfo.querySelector('strong').innerText);
    let producttotalPrice = productPrice * parseInt(productQuantityP.innerText);
    let productLinePrice = productInfo.querySelector('.product-line-price');

    productLinePrice.innerText = producttotalPrice.toFixed(2);
    calculateTotal();
}

const calculateTotal = () => {

    let calculateTotalPrices = document.querySelectorAll('.product-line-price');

    let subtotal = 0;
    calculateTotalPrices.forEach((productPrice) => {
        subtotal += parseFloat(productPrice.innerText);
    });

    let taxPrice = subtotal * parseFloat(localStorage.getItem("taxRate"));
    let shipping = (subtotal > 0 ? shippingPrice : 0);
    let cartTotal = subtotal + taxPrice + shipping;


    document.querySelector("#subtotal p:nth-child(2)").innerText = subtotal.toFixed(2);
    document.querySelector("#tax p:nth-child(2)").innerText = taxPrice.toFixed(2);
    document.querySelector("#cardshipping p:nth-child(2)").innerText = shipping.toFixed(2);
    document.querySelector("#cardtotal").lastElementChild.innerText = cartTotal.toFixed(2);

}

// document.querySelectorAll(".remove-product").forEach((removeButton) => {
//     removeButton.addEventListener("click", () => {
//         removeProduct(removeButton);
//     });
// });

// const removeProduct = (removeButton) => {
//     let productDiv = removeButton.parentElement.parentElement.parentElement;
//     productDiv.remove();
//     calculateTotal();
// }

// document.querySelectorAll(".add-product").forEach((addButton) => {
//     addButton.addEventListener("click", () => {
//         addProduct(addButton);
//     });
// });

// const addProduct = (addButton) => {
//     let productDivadd = addButton.parentElement.parentElement.parentElement;
//     productDivadd.add();
//     calculateTotal();
// }



let removeCartBtn = document.getElementsByClassName('remove-product');
//console.log(removeCartBtn);
for (let i = 0; i < removeCartBtn.length; i++) {
    let button = removeCartBtn[i]
    button.addEventListener('click', function (event) {
        let buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove();
        addCartBtn.style.display = "block";
        calculateTotal();
    });
}
let productDiv = removeButton.parentElement.parentElement.parentElement;
let addCartBtn = document.querySelector('.add-product');
for (let i = 0; i < addCartBtn.length; i++) {
    let button = addCartBtn[i]
    button.addEventListener('click', function (event) {
        let buttonClickedadd = event.target
        buttonClickedadd.querySelector(".product__info").appendChild(productDiv);
        calculateTotal();
    });
}