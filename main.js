// cart
let cartIcon=document.querySelector("#cartIcon")
let cart=document.querySelector(".cart")
let closeCart=document.querySelector("#close-cart")


cartIcon.onclick= function(){
cart.classList.add("active")
cart.classList.remove("remove")
}

closeCart.onclick= function(){
    cart.classList.add("remove")
    cart.classList.remove("active")
    
    }
 if(document.readyState=="loading") {
    document.addEventListener('DOMContentLoaded',ready)
 }
 else{ ready()
}
//remove Items From Cart
function ready(){
var removeCartButtons= document.getElementsByClassName("cart-remove")
console.log (removeCartButtons)
for (var i=0;i<removeCartButtons.length; i++){
    var button= removeCartButtons[i]
    button.addEventListener('click', removeCartItem)
}
var quantityInputs=document.getElementsByClassName("cart-quantity")
for(var i=0; i<quantityInputs.length;i++){
var input= quantityInputs[i]
input.addEventListener("change", quantityChanged)
}
//add carrt
var addCart=document.getElementsByClassName("add-cart")
for(var i=0; i<addCart.length;i++){
    var button= addCart[i]
    button.addEventListener('click', addCardClicked)
}
document.getElementsByClassName("Btn-buy")[0].addEventListener("click",buyButtonClicked)
}
//Buy Button
function buyButtonClicked(){
    alert(" Your order is registred")
    var cartContent= document.getElementsByClassName("cart-content")[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}
function removeCartItem(event){
    var buttonClicked= event.target
    buttonClicked.parentElement.remove()
    updateTotal()
}
// Quantity changes

function quantityChanged(event){
   var input= event.target 
   if( isNaN(input.value)|| input.value<=0){
    input.value =1
   }
   updateTotal()
}

// Add to caart
function addCardClicked(event){
    var button= event.target
    var shopProducts= button.parentElement
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText
    var price = shopProducts.getElementsByClassName("price")[0].innerText
    var productImage =  shopProducts.getElementsByClassName("product-image")[0].src
    console.log(title,productImage, price)
    addProductTocart(title,price,productImage)
    updateTotal()
}
function addProductTocart(title,price,productImage){
    var cartshopBox = document.createElement("div")
    cartshopBox.classList.add("cart-box")
    var cartItems = document.getElementsByClassName("cart-content")[0]
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title")
    for (var i=0; i<cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText== title){
        alert("You have already add this one");
        return;
        }
    }
    

   var cartboxContent=`  <img src="${productImage}" alt="" class="cart-image">
                         <div class="detail-box">
                             <div class="cart-product-title">${title}</div>
                             <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                         </div>
                           <!--remove cart-->
                              <i class='bx bxs-trash-alt cart-remove'></i> `;

 cartshopBox.innerHTML = cartboxContent
cartItems.append(cartshopBox)
cartshopBox.getElementsByClassName(" cart-remove")[0].addEventListener("click", removeCartItem)
cartshopBox.getElementsByClassName(" cart-quantity")[0].addEventListener("change", quantityChanged )
}

// Update Total
function updateTotal(){
    var cartContent=document.getElementsByClassName("cart-content")[0]
    console.log(cartContent)
    var cartBoxes= cartContent.getElementsByClassName("cart-box")
    console.log(cartBoxes)
    var total=0
    for (var i=0; i<cartBoxes.length; i++){
    var cartBox= cartBoxes[i]
    var priceElement=cartBox.getElementsByClassName("cart-price")[0]
    console.log(priceElement)
    var quantityElement= cartBox.getElementsByClassName("cart-quantity")[0]
    console.log(quantityElement)
    var price = parseFloat ( priceElement.innerText.replace("$",""))
    var quantity = quantityElement.value
    total= total+ (price*quantity)
}
    document.getElementsByClassName ("Total-price") [0].innerText= "$"+ total

}
