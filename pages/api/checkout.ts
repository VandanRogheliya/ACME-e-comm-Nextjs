import { CartItemWithProductType } from '@lib/types/common'
import { parseCartItemsForCheckoutPage } from '@lib/util/common'
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST methods allowed' })
    return
  }

  const cartItems: CartItemWithProductType[] = req.body.cartItems
  const uid: string = req.body.uid

  const stripe = new Stripe(process.env.STRIPE_TEST_API_KEY, null)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: parseCartItemsForCheckoutPage(cartItems),
    mode: 'payment',
    success_url: `http://${req.headers.host}/thank-you?uid=${uid}`,
    cancel_url: `http://${req.headers.host}/error`,
  })

  res.json({ url: session.url })
  res.statusCode = 200
}

export default handler
