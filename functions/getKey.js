exports.handler = function(event, context, callback) {
  // Setup development environment (production or development)
  // In the future, we would like this to be set automatically via environment variables set using deploy context
  const env = process.env.DEV_ENV;
  console.log(`Using ${env} environment.`);

  // Grab the PayPal key we need depending on which dev environment we are in
  const client = env === 'production' ? process.env.PAYPAL_LIVE_ID : process.env.PAYPAL_SANDBOX_ID;
  const data = {
    client,
  };

  // Log data to Netlify functions terminal for debugging purposes
  console.log(data);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(data),
  });
};
