// formulaire
var nameError = document.getElementById("name-error")
var phoneError = document.getElementById("phone-error")
var emailError = document.getElementById("Email-error")
var messageError = document.getElementById("message-error")
var submitError = document.getElementById("submit-error")

function validateName(){
    var name= document.getElementById("contact-name").value

    if(name.length == 0){
        nameError.innerHTML="Name is required"
        return false
    }
    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameError.innerHTML=" Write full name"
        return false
    }
    nameError.innerHTML= '<i class="fa fa-check-circle-o" aria-hidden="true"></i>'
    return true
}

function validatePhone(){
    var phone= document.getElementById("contact-phone").value
    console.log(phone)
    if(phone.length !== 8){
        phoneError.innerHTML="Phone number should be 8 digites"
        return false
    }
    if(!phone.match(/^[0-9]{8}$/)){
        phoneError.innerHTML= "Phone number is invalid"
        return flase
    }
    phoneError.innerHTML= '<i class="fa fa-check-circle-o" aria-hidden="true"></i>'
    return true
}

function validateEmail(){
   var email= document.getElementById("contact-email").value
   console.log(email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
   if(email.length==0){
    emailError.innerHTML= "Email is required"
   }else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
    console.log("hhh")
    emailError.innerHTML= "Email is invalid"
   } else{
    emailError.innerHTML= '<i class="fa fa-check-circle-o" aria-hidden="true"></i>'

   }
   return true
}
function validateMessage(){
    var message= document.getElementById("contact-message").value
   var required = 30
   var left = required - message.length
   if (left>0){
    messageError.innerHTML=left+ "more characters required"
    return false;
   }
   messageError.innerHTML= '<i class="fa fa-check-circle-o" aria-hidden="true"></i>'
   return true
}

function validateForm(){
    if(!validateName() || !validatePhone()|| !validateMessage() || !validateEmail()){
        submitError.innerHTML = "please fix error to submit"
        return false
    }
}
// cart
let cartIcons=document.querySelector("#cartIcon")
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
    var cartContent=document.getElementsByClassName("cart-content")[0]
    var cartBoxes= cartContent.getElementsByClassName("cart-box")
    var total=0
    for (var i=0; i<cartBoxes.length; i++){
    var cartBox= cartBoxes[i]
    var priceElement=cartBox.getElementsByClassName("cart-price")[0]
    var quantityElement= cartBox.getElementsByClassName("cart-quantity")[0]
    var price = parseFloat ( priceElement.innerText.replace("$",""))
    var quantity = quantityElement.value
    total= total+ (price*quantity)
}
  if (total !==0){
    alert(" Your order is registred")
    var cartContent= document.getElementsByClassName("cart-content")[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
}
if (total ==0){
    alert( "Please ADD Product to the Cart")
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
    var cartBoxes= cartContent.getElementsByClassName("cart-box")
    var total=0
    for (var i=0; i<cartBoxes.length; i++){
    var cartBox= cartBoxes[i]
    var priceElement=cartBox.getElementsByClassName("cart-price")[0]
    var quantityElement= cartBox.getElementsByClassName("cart-quantity")[0]
    var price = parseFloat ( priceElement.innerText.replace("$",""))
    var quantity = quantityElement.value
    total= total+ (price*quantity)
}
    document.getElementsByClassName ("Total-price") [0].innerText= "$"+ total

}
