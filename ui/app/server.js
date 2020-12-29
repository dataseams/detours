const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const next = require('next')
const admin = require('firebase-admin')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev })
const handle = app.getRequestHandler()

const firebase = admin.initializeApp(
  {
    credential: admin.credential.cert(require('./credentials/server')),
  },
  'server'
)

app.prepare().then(() => {
  const server = express()
  const sessionTtl = 60000;
  const sessionFileSecret = "lLImc85gngl45N77"

  server.use(bodyParser.json())
  server.use(
    session({
      secret: sessionFileSecret,
      saveUninitialized: true,
      store: new FileStore({ secret: sessionFileSecret, ttl: sessionTtl }),
      resave: false,
      rolling: true,
      cookie: { maxAge: sessionTtl, httpOnly: true, sameSite: "lax" },
    })
  )

  server.use((req, res, next) => {
    req.firebaseServer = firebase;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

  server.post('/api/login', (req, res) => {
    if (!req.body) return res.sendStatus(400)

    const token = req.body.token
    firebase
      .auth()
      .verifyIdToken(token)
      .then(decodedToken => {
        req.session.decodedToken = decodedToken
        return decodedToken
      })
      .then(decodedToken => res.json({ status: true, decodedToken }))
      .catch(error => res.json({ error }))
  })

  server.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ status: true })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Detours Itinerary View Access',
              images: ['https://i.imgur.com/EHyR2nP.png'],
            },
            unit_amount: 400,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/checkout?success=true`,
      cancel_url: `http://localhost:3000/itinerary?surveyId=${req.body.surveyId}?canceled=true`,
    });
    res.json({ id: session.id });
  });

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on port localhost:${port}`)
  })
})
