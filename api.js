const axios = require('axios');

const config = {
    headers: {'Authorization': 'Bearer sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912'}
  };

  module.exports.init = function() {};

  exports.getSummitions = (id) =>{
    return new Promise((resolve, reject) => {
        axios.get('https://api.fillout.com/v1/api/forms/'+id+'/submissions',config)
        .then(function (result){
            resolve(result.data);
        })
        .catch(function (error) {
            reject(Error(error));
          })
    });
  };
