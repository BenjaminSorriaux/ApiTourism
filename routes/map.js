var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");

// Go to map page with GET method
// With this method we show the location of MULTIPLE museums on the map with their name
router.get('/', function (req, res, next) {
  var dataString = JSON.stringify({
    query: `    
        {
          poi 
              (size:500,
              filters:[
                        { 
                            rdf_type :  {_in: [
                            "https://www.datatourisme.gouv.fr/ontology/core#Museum"						
                            ]  
                        }
                        }
              ])
              
              {
             results {                          
              dc_identifier
              rdfs_label {
                value
              }
              isLocatedAt {
                schema_geo {
                  schema_latitude
                  schema_longitude
                }
              }
            }
          }
        }
        `
  });
  // Query the following server
  fetch('http://vps.cours-diiage.com:8080', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Create the query with the content of dataString
      body: dataString
    })
    // If fetch is working, convert response to json
    .then(r => r.json())
    // Go to the map page with a parameter which contain the result of the query
    .then(data =>
      res.render('map', {
        page: 'Map',
        menuId: 'map',
        dataQuery: data.data.poi.results,
      }));

});
/*end of GraphQL call*/

// Go to map page with POST method
// With this, we go to the map to show the location of ONE museum
router.post('/', function (req, res, next) {
  res.render('map', {
    page: 'Map',
    menuId: 'map',
    // Get latitude and longitude from the form linked to the map
    latitude: req.body.displayMapLatitude,
    longitude: req.body.displayMapLongitude,
    // Get the name of the selected museum
    name: req.body.displayName,
    // Create an empty dataQuery
    dataQuery: []
  });

});

module.exports = router;