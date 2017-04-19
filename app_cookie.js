var express = require('express')
const app = express()
var cookieParser = require('cookie-parser')

app.use(cookieParser('2389sjflskjsfklj'));

var products = {
  1:{title:'The history of web1'},
  2:{title:'The next web'}
};

app.get('/cart/:id', function(req, res){
  var id = req.params.id;
  if(req.cookies.cart){
    var cart = req.cookies.cart;
  } else{
    var cart = {};
  }
  if(!cart[id]){
    cart[id] = 0
  }
  console.log(cart)
  cart[id] = parseInt(cart[id])+1
  res.cookie('cart', cart);
  res.redirect('/cart');
});

app.get('/cart', function(req, res){
  var cart = req.cookies.cart;
  if(!cart){
    res.send('Empty!');
  }else {
    var output =''
    console.log(cart)
    for(var id in cart){
      output += `<li>${products[id].title} (${cart[id]})</li>`
    }
  }
    res.send(`
      <h1>Cart</h1>
      <ul>${output}</ul>
      <a href='/products'>Products List</a>`);
})

// cart = {
//   1: 1
//   2: 1
// }

app.get('/products', function(req, res){
  var output = '';
  for(var name in products){
    output += `
    <li>
      <a href="/cart/${name}">${products[name].title}</a>
      </li>`
  }
  res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
})


app.get('/count', (req, res)=>{
  if(req.signedCookies.count){
    var count = parseInt(req.signedCookies.count);}
  else{
    var count =0;
  }
  count = count+1
  res.cookie('count', count, {signed: true});
  res.send('count : '+count);
})



app.listen(3003, function(){
  console.log('Connected 3003 port!!!')
})
