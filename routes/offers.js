var express = require('express');
const fetch = require("node-fetch");
var router = express.Router();

// This is not possible to go to the offers page if we don't go on it by the Listing page
// So redirect on the listing page
router.get('/', function (req, res, next) {
  res.redirect('/listing');
})

// Go to the offers page with the POST method
// Here we go to the page from the Listing page while selecting a museum from the list
router.post('/', function (req, res, next) {
  console.log(req.body.offersId);
  // Create the query
  var dataString = JSON.stringify({
    query: `  
        {
          poi(filters: [{dc_identifier:{_eq:` + req.body.offersId + `}}]) 
          {
            total
            results {
              rdf_type
              rdfs_label{value}
              hasDescription{
              shortDescription{value}
                
              }
              hasCommunicationContact{schema_telephone}
              _uri
              hasTheme {
                rdfs_label {
                  value
                }
              }
              dc_identifier
             
              hasContact{
              schema_telephone}
              
              
              isLocatedAt {
                schema_openingHoursSpecification{schema_dayOfWeek{rdf_type}}
                schema_geo {
                  schema_latitude
                  schema_longitude
                }
                schema_address {
                  schema_addressLocality
                  schema_postalCode
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
      body: dataString
    })
    // If fetch is working, convert response to json
    .then(r => r.json())
    // Go to the offers page with a parameter containing the result of the query
    .then(data =>
      res.render('offers', {
        page: 'offre',
        menuId: 'offre',
        poiId: req.body.offersId,
        dataQuery: data.data.poi.results
      }));
});
/*end of GraphQL call*/

module.exports = router;