const express = require('express');
const request = require('request');  
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(express.static('public'));


app.use(bodyParser.json());


app.route('/api/sendData')
  .post((req, res) => {
    const dataFromFrontend = req.body.data;
    console.log('Data received from frontend:', dataFromFrontend);

    var program = {
      script: dataFromFrontend["code"],
      language: dataFromFrontend["type"],
      versionIndex: "4",
      clientId: "",  
      clientSecret: "" // 
    };

 
    request({
      url: 'https://api.jdoodle.com/v1/execute',
      method: "POST",
      json: program
    },
    function (error, response, body) {
      if (error) {
        console.log('Error:', error);
        return res.status(500).json({ message: 'Error occurred while executing code', error });
      }
      console.log('JDoodle API Response:', body);
      res.json(body); 
    });
  });


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');  
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
