//node js
//importing using require
//CORS is used to connect our frontend and backend, our token function will send a response to our backend and to counter the response we use cors
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
	"sk_test_51LSuXxAKnwZ9m1lyKd1sGUlYZm2Jc99KUBrZAnuAamewc8OCpLD0axvymTijVotk43oljcM6TOEBdfUoGoxgQTts00tjniz6kh"
);

// call express and cors
const app = express();
app.use(cors());

// convert express to json format
app.use(express.json());

// Send a response. (require, response) to front end
app.get("/", (req, res) => {
	res.send("Welcome to our Ecommer Store");
});

app.post("/checkout", async (req, res) => {
	let error;
	let status;
	try {
		const { cart, token } = req.body;
		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id,
		});
		const key = uuidv4();
		const charge = await stripe.charges.create(
			{
				amount: cart.totalPrice * 100,
				currency: "usd",
				customer: customer.id,
				receipt_email: token.email,
				description: "products descriptions here",
				shipping: {
					name: token.card.name,
					address: {
						line1: token.card.address_line1,
						line2: token.card.address_line2,
						city: token.card.address_city,
						country: token.card.address_country,
						postal_code: token.card.address_zip,
					},
				},
			},
			{ idempotencyKey: key }
		);
		status = "success";
	} catch (error) {
		console.log(error);
		status = "error";
	}
	res.json({ status });
});

// Define a port to our backend
app.listen(8080, () => {
	console.log("Your app is running on port no. 8080");
});

//Now to start our nodejs app, in terminal write: "node server"
//webpage: localhost:8080
