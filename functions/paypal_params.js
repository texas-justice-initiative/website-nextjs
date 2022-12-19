/* eslint-disable no-console */
exports.handler = function (event, context, callback) {
  // Setup development environment (production or sandbox)
  // In the future, we would like this to be set automatically via environment variables set using deploy context
  const env = process.env.PAYPAL_ENV; // Set in Netlify UI
  console.log(`Using ${env} environment`);

  // Grab the PayPal key we need depending on which dev environment we are in
  const params = {
    env,
    client: {
      sandbox: process.env.PAYPAL_SANDBOX_ID,
      production: process.env.PAYPAL_LIVE_ID,
    },
  };

  // Log data to Netlify functions terminal for debugging purposes
  console.log(params);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(params),
  });
};
