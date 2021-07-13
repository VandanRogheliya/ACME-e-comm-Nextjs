import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await runMiddleware(req, res, cors)

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST methods allowed' })
    return
  }

  const stripe = new Stripe(process.env.STRIPE_API_KEY, null)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://${req.headers.host}/thank-you`,
    cancel_url: `http://${req.headers.host}/error`,
  })

  res.redirect(303, session.url)
}

export default handler
