const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./api');

const config = {
    headers: {'Authorization': 'Bearer sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912'}
  };


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','GET');
    next();
  });
  app.get('/:formId/filteredResponses', async (req, res) => { 

    await api.getSummitions(req.params.formId).then((results) => {

        const filters = req.query.filter;
        const result = {
          "responses": [],
          "totalResponses": 0,
	        "pageCount": 1

        };

        results.responses.forEach((respons, index) =>{

          let filtered = respons.questions;

          filters.forEach((filter)=>{

            if(filter.condition == 'equals'){
              filtered = filtered.filter(q => q.id == filter.id && q.value == filter.value);
            }

            if(filter.condition == 'does_not_equal'){
              filtered = filtered.filter(q => q.id == filter.id && q.value != filter.value);
            }

            if(filter.condition == 'greater_than'){
              filtered = filtered.filter(q => q.id == filter.id && q.value > filter.value);
            }

            if(filter.condition == 'less_than'){
              filtered = filtered.filter(q => q.id == filter.id && q.value < filter.value);
            }

          })


          if(filtered.length > 0){
            let question = {
              "questions": filtered,
              "submissionId": respons.submissionId,
              "submissionTimel": respons.submissionTimel
            }
            result.responses.push(question);
          }
        });

        result.totalResponses = result.responses.length;
        res.status(200).send(result);

    });

  });
  

app.use((req, res, next) => {
    res.send('<h1>Software engineering screen: Check API return request</h1>');
});


const server = http.createServer(app);
server.listen(3000);