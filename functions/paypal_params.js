exports.handler = function(event, context, callback) {
  // Setup development environment (live or sandbox)
  // In the future, we would like this to be set automatically via environment variables set using deploy context
  const env = process.env.PAYPAL_ENV; // Set in Netlify UI
  console.log(`Using ${env} environment`);

  // Grab the PayPal key we need depending on which dev environment we are in
  const client = env === 'live' ? process.env.PAYPAL_LIVE_ID : process.env.PAYPAL_SANDBOX_ID;
  const params = {
    env,
    client,
  };

  // Log data to Netlify functions terminal for debugging purposes
  console.log(`Environment Parameters:`);
  console.log(params);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(params),
  });
};
