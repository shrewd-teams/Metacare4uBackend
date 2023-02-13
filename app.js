require("module-alias/register");
require("dotenv").config();

const {
	Subscribe
} = require("@models");


const express = require("express");
const app = express();
const { json } = require("express");
const cors = require("cors");
const corsOptions = require("./src/config/corsOptions");
const createError = require("http-errors");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// Cross Origin Resource Sharing - third party middleware
app.use(cors(corsOptions));

// built-in middleware for json

app.use("/stripe", express.raw({ type: "*/*" }));


app.use(express.json());

// ROUTE
const api = require("./src/routes/api");
app.use("/api/v1", api);
// END ROUTE

// SWAGGER

const swaggerDoc = require("swagger-ui-express");
const swaggerDocumentation = require("@utils/swagger");

app.use("/swagger-docs", swaggerDoc.serve);
app.use("/swagger-docs", swaggerDoc.setup(swaggerDocumentation));
// END SWAGGER

// DEFAULT ROUTES
// app.use(async (req, res, next) => {
//     next(createError.NotFound("This route does not exist"));
// });
app.use('/images', express.static('images'));
// app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.send({
//         error: {
//             message: err.message,
//         },
//     });
// });
// END DEFAULT ROUTES

app.post("/pay", async (req, res) => {
  try {
    const {packId,userId, name,payableAmount,countryCode} = req.body;
    let currency="";
    if(countryCode ==="IN")
    {
      currency="INR";
    }
    else
    {
     currency="USD";
    }

    if (!name) return res.status(400).json({ message: "Please enter a name" });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(payableAmount * 100),
      currency: currency,
      payment_method_types: ["card"],
      metadata: {name:name,payableAmount:payableAmount,packId:packId,userId:userId, },
    });
    const clientSecret = paymentIntent.client_secret;
    const paymentId=paymentIntent.id;

    res.json({ message: "Payment initiated", clientSecret , paymentId});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }

  // Event when a payment is initiated
  if (event.type === "payment_intent.created") {
    console.log(event.data.object.id);
  }
  // Event when a payment is succeeded
  if (event.type === "payment_intent.succeeded") {
    await storeDetails(event.data.object.metadata,event.data.object.id);
    console.log(`${event.data.object.metadata.name} succeeded payment!`);
    // fulfilment
  }
  res.json({ ok: true });
});

const storeDetails=async (data,id)=>{

  console.log(data)

  const dataInsert = await Subscribe.create({
		        pack_id: data.packId,
            user_id: data.userId,
            payable_amount: data.payableAmount,
            payment_id:id,
	});

  
return true;

}


module.exports = app;
