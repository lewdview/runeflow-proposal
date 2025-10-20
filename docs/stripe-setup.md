# Stripe Integration Setup Guide

This guide walks through the complete Stripe setup for the RuneFlow MVP $300 Quick-Start offering, including checkout configuration, webhook handling, and local testing.

---

## 1. Create Your Stripe Account & API Keys

1. **Sign up** at [stripe.com](https://stripe.com) if you haven't already
2. **Navigate to** Dashboard → Developers → API keys
3. **Copy your keys:**
   - **Publishable Key:** Starts with `pk_test_` (test mode) or `pk_live_` (production)
   - **Secret Key:** Starts with `sk_test_` (test mode) or `sk_live_` (production)

**⚠️ Security:** Never commit your Secret Key to version control. It will be stored in backend environment variables only.

---

## 2. Create a Price for the $300 MVP Tier

1. **Navigate to** Dashboard → Products
2. **Click** "Create product"
3. **Product details:**
   - **Name:** `MVP Quick-Start - 3-5 Day Build`
   - **Description:** `Automated single workflow, setup, and 30-min launch call`
   - **Type:** Physical or Service (doesn't matter for this use case)

4. **Add pricing (one-time charge):**
   - **Price:** $300.00
   - **Billing period:** One-time
   - **Currency:** USD

5. **Copy the Price ID** (format: `price_xxxxxxxxxxxxx`) — you'll need this shortly

---

## 3. Configure Frontend Environment

### Step 1: Copy the env template

```bash
cp src/env.example.js src/env.local.js
```

### Step 2: Fill in your values

Edit `src/env.local.js`:

```javascript
window.ENV = {
  STRIPE_PUBLISHABLE_KEY: 'pk_test_YOUR_ACTUAL_KEY_HERE',
  MVP_PRICE_ID: 'price_YOUR_ACTUAL_PRICE_ID_HERE',
  WEBHOOK_URL: 'https://your-domain.tld/api/stripe-webhook',  // Update after deployment
};
```

**Important:** `env.local.js` is in `.gitignore` and will never be committed.

---

## 4. Backend Webhook Setup

The webhook receives payment confirmation events from Stripe. Choose your hosting platform:

### Vercel (Recommended for this project)

**File:** `api/stripe-webhook.js`

```javascript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const rawBody = await getRawBody(req);
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Webhook Error' });
  }

  // Handle checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Payment successful:', {
      sessionId: session.id,
      amount: session.amount_total,
      customer: session.customer_email,
    });

    // TODO: Mark payment as received in your database
    // TODO: Trigger email workflow to send onboarding details
  }

  res.json({ received: true });
}

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(Buffer.from(data));
    });
    req.on('error', reject);
  });
}
```

**Environment variables to set in Vercel:**
- `STRIPE_SECRET_KEY`: Your sk_test_* or sk_live_* key
- `STRIPE_WEBHOOK_SECRET`: Your webhook signing secret (see below)
- `MVP_PRICE_ID`: The price_* ID you created above (for validation)

### Netlify Functions

**File:** `netlify/functions/stripe-webhook.js`

```javascript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature'];
  const rawBody = event.body;

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return { statusCode: 400, body: 'Webhook Error' };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    console.log('Payment successful:', {
      sessionId: session.id,
      amount: session.amount_total,
      customer: session.customer_email,
    });

    // TODO: Mark payment in your database
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
```

---

## 5. Configure Stripe Webhook Endpoint

### Get Your Webhook Signing Secret

1. **Navigate to** Dashboard → Developers → Webhooks
2. **Click** "Add endpoint"
3. **Endpoint URL:** `https://your-domain.tld/api/stripe-webhook`
4. **Events to listen for:** Select only `checkout.session.completed`
5. **Copy the Signing Secret** (format: `whsec_xxxxxxxxxxxxx`)

### Store the Secret

Add to your hosting platform's environment variables:
- **Key:** `STRIPE_WEBHOOK_SECRET`
- **Value:** Your `whsec_*` signing secret

---

## 6. Local Testing with Stripe CLI

### Install Stripe CLI

```bash
# macOS with Homebrew
brew install stripe/stripe-cli/stripe

# Or download from https://stripe.com/docs/stripe-cli
```

### Login to Your Account

```bash
stripe login
```

### Test Mode: Forward Webhooks Locally

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

This will output a signing secret — use this for local testing.

### Make a Test Payment

1. **Visit** `http://localhost:3000#pricing`
2. **Scroll to MVP Quick-Start**
3. **Click "Checkout with Stripe"**
4. **Use test card:** `4242 4242 4242 4242`
5. **Any future date** for expiry (e.g., `12/26`)
6. **Any 3-digit CVC** (e.g., `123`)

### Verify Webhook Receipt

Check your terminal where stripe listen is running:

```
2025-01-20 10:15:23 → [POST] https://localhost:3000/api/stripe-webhook [200]
```

---

## 7. Success Flow

### User Journey (Frontend)

1. User lands on pricing section
2. Clicks "Checkout with Stripe" on MVP tier
3. Redirected to Stripe Checkout
4. After successful payment, redirected to:
   ```
   https://your-domain.tld/?onboarding=1&session_id=cs_test_xxxxx
   ```
5. Onboarding welcome modal appears automatically

### Backend Processing

1. Stripe sends `checkout.session.completed` webhook
2. Your webhook handler receives and verifies the signature
3. Marks payment as successful in your database
4. (Optional) Sends confirmation email with onboarding details

---

## 8. Production Deployment Checklist

- [ ] Switch to live Stripe keys (`pk_live_*` and `sk_live_*`)
- [ ] Update `STRIPE_WEBHOOK_SECRET` with production webhook signing secret
- [ ] Update `WEBHOOK_URL` in `src/env.local.js` to production domain
- [ ] Add webhook endpoint to Stripe Dashboard pointing to production URL
- [ ] Test with real card in Stripe Dashboard (use test mode first: 4242…)
- [ ] Monitor webhook logs in Stripe Dashboard
- [ ] Set up email notifications for payment failures
- [ ] Create database table or CRM integration for customer records

---

## 9. Troubleshooting

### "MVP_PRICE_ID not configured"

→ Ensure `src/env.local.js` exists and contains `MVP_PRICE_ID` with a valid `price_*` ID.

### Webhook signature mismatch

→ Verify that `STRIPE_WEBHOOK_SECRET` env var matches the secret shown in Stripe Dashboard.

### Redirect loop after payment

→ Check that `successUrl` in `src/main.js` (line 345) points to the correct domain.

### Modal not appearing after payment

→ Open browser console (F12) and check for errors. Verify `onboarding=1` is in the URL.

---

## 10. Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Checkout Guide](https://stripe.com/docs/payments/checkout)
- [Webhook Security](https://stripe.com/docs/webhooks/signatures)
- [Stripe CLI Guide](https://stripe.com/docs/stripe-cli)

---

**Questions?** Contact webhalla@proton.me
