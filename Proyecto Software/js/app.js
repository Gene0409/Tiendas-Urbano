let users = JSON.parse(localStorage.getItem("users")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function register(){
let name=document.getElementById("name").value;
let email=document.getElementById("email").value;
let pass=document.getElementById("pass").value;

users.push({name,email,pass});
localStorage.setItem("users",JSON.stringify(users));

alert("Usuario creado");
location.href="login.html";
}

function login(){
let email=document.getElementById("email").value;
let pass=document.getElementById("pass").value;

let user=users.find(u=>u.email===email && u.pass===pass);

if(user){
localStorage.setItem("activeUser",JSON.stringify(user));
alert("Bienvenido "+user.name);
location.href="index.html";
}else{
alert("Error");
}
}

function addToCart(name,price){
cart.push({name,price});
localStorage.setItem("cart",JSON.stringify(cart));
alert("Agregado al carrito");
}

function loadCart(){
let table=document.getElementById("cartTable");
let total=0;

cart.forEach(p=>{
total+=p.price;
table.innerHTML+=`
<tr>
<td>${p.name}</td>
<td>${p.price}</td>
</tr>`;
});

document.getElementById("total").innerText=total;
}

function pay(){
orders.push({
id:Date.now(),
items:cart,
total:cart.reduce((a,b)=>a+b.price,0)
});

localStorage.setItem("orders",JSON.stringify(orders));

cart=[];
localStorage.removeItem("cart");

alert("Pago realizado");
location.href="pedidos.html";
}

function loadOrders(){
let div=document.getElementById("orders");

orders.forEach(o=>{
div.innerHTML+=`
<div class="card">
<h3>Pedido ${o.id}</h3>
<p>Total: ${o.total}</p>
</div>`;
});
}