exports.handler = function(event, context, callback) {
  const data = {
    name: 'jason',
    foo: [1, 2, 4, 6],
    time: Date.now(),
  };

  console.log('data is ' + JSON.stringify(data));

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(data),
  });
};
