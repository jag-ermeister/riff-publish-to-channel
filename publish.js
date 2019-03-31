const https = require('http');

module.exports = data => {
  var channel = data.channel;
  var namespace = data.namespace;
  var number = data.number;

  var url = `${channel}-channel.${namespace}.svc.cluster.local`

  console.log(`POSTing ${number} to channel ${channel} in namespace ${namespace}.`)

  doPost(url, number);

  return `POSTed ${number} to channel ${channel} in namespace ${namespace}.`;
}

function doPost(url, number) {
  const options = {
    hostname: url,
    port: 80,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': number.length
    }
  }

  const req = https.request(options, (res) => {
    //console.log(`statusCode: ${res.statusCode}`)
    res.on('data', (d) => {
      process.stdout.write(d)
    })
  })

  req.on('error', (error) => {
    console.error(error)
  })

  req.write(number)
  req.end()
}
