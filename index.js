const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

// Routes
app.get('/', homepage);
app.get('/update-cobj', updateForm);
app.post('/update-cobj', updateCObj);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function homepage(req, res) {
    try {
        const response = await axios.get('https://api.hubapi.com/crm/v1/objects/custom', {
        headers: {
            'Authorization': 'Bearer pat-na1-94dee70f-a8ba-4eee-9f37-8c9835729414',
        },
        });

        res.render('index', { customObjects: response.data.results });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching custom objects');
    }
}

function updateForm(req, res) {
    res.render('update', { title: 'Actualizar formulario de objeto personalizado | Integración con HubSpot I Práctica' });
}

async function updateCObj(req, res) {
    const { name, publisher, price } = req.body;

    try {
        const response = await axios.post('https://api.hubapi.com/crm/v1/objects/custom', {
        properties: {
            name: { value: name },
            publisher: { value: publisher },
            price: { value: price },
        },
        }, {
        headers: {
            'Authorization': 'Bearer pat-na1-94dee70f-a8ba-4eee-9f37-8c9835729414',
            'Content-Type': 'application/json',
        },
    });

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating custom object');
    }
}

// * Please include the private app access token in your repo BUT only an access token built in a TEST ACCOUNT. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = '';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/


// * Localhost
