const bcrypt = require('bcrypt');
var express = require('express');
var app = express();
var itemRoutes = express.Router();
var paypal = require('paypal-rest-sdk');
// Require Location model in our routes module
var Location = require('../models/Location');
var Contact = require('../models/Contact');
var User = require('../models/User');
// configure paypal with the credentials you got when you created your paypal app
paypal.configure({
  'mode': 'sandbox', //sandbox or live 
  'client_id': 'ASuSVjF0SBeq27k3OLHJ-w5VjZFY5gfPHaNer8eHFPAEf0dE82OVdX81MNcUQkToZ3BSE7PFsmk90wgn', // please provide your client id here 
  'client_secret': 'ELtgpHtSxAAY5S8fsGnJHqGLsfvAf574khtDiXZgPI7J4TxohxQguzlf2yD2I_J77FeLgNiAHieFG44y' // provide your client secret here 
});
// Defined store route
itemRoutes.route('/').get(function (req, res) {
  res.redirect('index_paypal.html'); 
});

itemRoutes.route('/locations/add').post(function (req, res) {
  var location = new Location(req.body);
    location.save()
    .then(location => {
      res.status(200).json({'location': 'Location added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

itemRoutes.route('/users/add').post(function (req, res) {
  var user = new User(req.body);
  let hash = bcrypt.hashSync(user.password,10);
  user.password = hash;
  user.save()
  .then(user => {
    res.status(200).json({'user': 'User added successfully'});
  })
  .catch(err => {
    console.log(err);
    res.status(400).send("unable to save to database");
  });
});
// Defined get data(index or listing) route
itemRoutes.route('/locations').get(function (req, res) {
  Location.find(function (err, locations){
    if(err){
      console.log(err);
    }
    else {
      res.json(locations);
    }
  });
});

itemRoutes.route('/authenticate').post(function (req, res) {
  var user = req.body;
  var msg = "Invalid Username";
  User.find({'username': user.username }).exec().then(function(dbuser) { 
    if(bcrypt.compareSync(user.password,dbuser[0].password)) {
      console.log(dbuser);
      res.json(dbuser);
    } else {
      msg = "Invalid Password";
      res.json({message : msg});
    }
  }).catch(function(err) {
    res.json({message : msg});
    console.log(err);
  })
});

itemRoutes.route('/contacts/add').post(function (req, res) {
  var contact = new Contact(req.body);
    contact.save()
    .then(contact => {
      res.status(200).json({'contact': 'Contact added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

itemRoutes.route('/contacts').get(function (req, res) {
  Contact.find(function (err, contacts){
    if(err){
      console.log(err);
    }
    else {
      res.json(contacts);
    }
  });
});

// Defined edit route
itemRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Item.findById(id, function (err, item){
    res.json(item);
  });
});

//  Defined update route
itemRoutes.route('/update/:id').post(function (req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      item.name = req.body.name;
      item.price = req.body.price;

      item.save().then(item => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
itemRoutes.route('/delete/:id').get(function (req, res) {
  Item.findByIdAndRemove({_id: req.params.id}, function(err, item){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

itemRoutes.route('/buy').get(function (req, res) {
  var payment = {
    "intent": "authorize",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://127.0.0.1:4000/success",
      "cancel_url": "http://127.0.0.1:4000/err"
    },
    "transactions": [{
      "amount": {
        "total": 39.00,
        "currency": "USD"
      },
      "description": " a book on mean stack "
    }],
  }

  createPay( payment ).then( ( transaction ) => {
    var id = transaction.id; 
    var links = transaction.links;
    var counter = links.length; 
    while( counter -- ) {
      if ( links[counter].method == 'REDIRECT') {
// redirect to paypal where user approves the transaction 
        return res.redirect( links[counter].href )
      }
    }
  }).catch( ( err ) => { 
    console.log( err ); 
    res.redirect('/err');
  });  

});

itemRoutes.route('/success').get(function (req, res) {
  console.log(req.query); 
  res.redirect('./success.html'); 
});

itemRoutes.route('/err').get(function (req, res) {
  console.log(req.query); 
  res.redirect('./err.html'); 
});

// helper functions 
var createPay = ( payment ) => {
  return new Promise( ( resolve , reject ) => {
    paypal.payment.create( payment , function( err , payment ) {
    if ( err ) {
      reject(err); 
    }
    else {
      resolve(payment); 
    }
    }); 
  });
}           

module.exports = itemRoutes;