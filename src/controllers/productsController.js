const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products})
	},

	// Detail - Detail from one product
	detail: (req, res, next) => {
		for(var i = 0; i < products.length; i ++){ 
			if (products[i].id ==  req.params.id ){
				var productos = products[i];
			}
			
		};
		res.render('detail', {productos: productos})
	},
	
	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')  
	},
	
	// Create -  Method to store
	store: (req, res) => {
		var producto_nuevo = req.body;
		//producto_nuevo.id = 18 crear ID
		products.push(producto_nuevo);

		fs.writeFileSync(__dirname + '/../data/productsDataBase.json', JSON.stringify(products) );
		res.redirect('products') 
	},

	// Update - Form to edit
	edit: (req, res) => {
		for(var i = 0; i < products.length; i ++){ 
			if (products[i].id ==  req.params.id ){
				var productos = products[i];
			}
		}
		res.render('product-edit-form', {productos})
	},
	// Update - Method to update
	update: (req, res) => {
		let imagen ; 
		let id ; 
		for(var i = 0; i < products.length; i ++){ 
			if (products[i].id ==  req.params.id ){
				imagen = products[i].image
				id = products[i].id
				//products[i].name = req.body.name;
				products[i] = req.body
				//products[i].price = req.body.price;
				//products[i].discount = req.body.discount;
				//products[i].description = req.body.description;
				products[i].image = imagen;
				products[i].id	= id;
			}
		};
		fs.writeFileSync(__dirname + '/../data/productsDataBase.json', JSON.stringify(products));
		res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		products.filter(function(produ){
			return produ.id != req.params.id
		})
		fs.writeFileSync(__dirname + '/../data/productsDataBase.json', JSON.stringify(products));
		res.redirect('/product')
	}
};

module.exports = controller;