// ============================================================================
// ENVIRONMENT CONFIGURATION - RuneFlow Stripe Integration
// ============================================================================
// Copy this file to env.local.js and fill in your actual values
// DO NOT commit env.local.js to version control
//
// Usage:
// 1. Copy env.example.js to env.local.js
// 2. Add your Stripe publishable key, MVP price ID, and webhook URL
// 3. env.local.js will be loaded before main.js automatically

window.ENV = {
  // Stripe Publishable Key (safe to expose; test key starts with pk_test_)
  STRIPE_PUBLISHABLE_KEY: 'pk_test_YOUR_PUBLISHABLE_KEY_HERE',

  // Stripe Price ID for the $300 MVP (NOT Product ID)
  // Create a one-time payment Price in your Stripe Dashboard and copy the ID (price_xxx format)
  MVP_PRICE_ID: 'price_YOUR_MVP_PRICE_ID',

  // Webhook URL where Stripe will send checkout.session.completed events
  // Point this to your backend webhook handler after deployment
  WEBHOOK_URL: 'https://your-domain.tld/api/stripe-webhook',
};
