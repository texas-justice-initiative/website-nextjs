/* eslint-disable no-console */
exports.handler = function(event, context, callback) {
  // Setup development environment (production or sandbox)
  // In the future, we would like this to be set automatically via environment variables set using deploy context
  const env = process.env.MAPS_API; // Set in Netlify UI
  console.log(`Using ${env} environment`);

  // Grab the Google Maps API key we need depending on which dev environment we are in
  const params = {
    env,
    client: {
      sandbox: process.env.MAPS_API,
      production: process.env.MAPS_API,
    },
  };

  // Log data to Netlify functions terminal for debugging purposes
  console.log(params);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(params),
  });
};
