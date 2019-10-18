exports.handler = function(event, context, callback) {
  const data = {
    // env: process.env.NODE_ENV, For future use, once deploy context is figured out
    client: process.env.PAYPAL_SANDBOX_ID,
  };

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(data),
  });
};
