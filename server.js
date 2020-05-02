const express = require('express');
const methodOverride = require('method-override');
const db = require('./models')

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////
app.get('/', (req, res) => {
	db.widget.findAll()
	.then(widget => {
		res.render('index', { widget: widget })	
	})
})

app.post('/', (req, res) => {
    db.widget.create({
    	description: req.body.description,
    	quantity: req.body.quantity,
	})
    .then((post) => {
        res.redirect('/')
    })
})

app.delete('/:id', (req, res) => {
    db.widget.destroy({
        where: { id: req.params.id}
    })
    .then(() => {
        res.redirect('/')
	})
})


// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);
