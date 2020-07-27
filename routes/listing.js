var express = require('express');
const fetch = require("node-fetch");
var router = express.Router();

// Go to map page with GET method
// Show all first museums found by the server
router.get('/', function (req, res, next) {
  // Create the query
  var dataString = JSON.stringify({
    query: `
  
  
    
    {
      poi 
          (size:100,
          filters:[
					{ 
						rdf_type :  {_in: [
						"https://www.datatourisme.gouv.fr/ontology/core#Museum"						
						]  
					}
					}
          ])
          
          {
        total
        results {
          hasContact{
            schema_telephone}
            
            

          rdf_type
          _uri
          hasTheme {
            rdfs_label {
              value
            }
          }
          dc_identifier
          rdfs_label {
            value
          }
          isLocatedAt {
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
      // Create the query with the content of dataString
      body: dataString
    })
    // If fetch is working, convert response to json
    .then(r => r.json())
    .then(data =>
      res.render('listing', {
        page: 'Listing',
        menuId: 'listing',
        dataQuery: data.data.poi.results
      }));
});

// Go to map page with POST method
// Show all first museums found with the following query by the server
router.post('/', function (req, res, next) {
  // If something is researched
  if (req.body.searchBar != "") {
    // Create the query
    var dataString = JSON.stringify({
      query: `
      {
        poi(
          filters: 
          [
            {
              rdf_type :  
              {_in: ["https://www.datatourisme.gouv.fr/ontology/core#Museum"]}
            },
            {
              isLocatedAt: 
              {schema_address: 
                {schema_addressLocality: {_eq: "`+ req.body.searchBar +`"}}
              }
            }
          ]) {
          total
          results {
            rdf_type
            _uri
            hasTheme {
              rdfs_label {
                value
              }
            }
            dc_identifier
            rdfs_label {
              value
            }
            isLocatedAt {
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
  } else {
    // Make the query to get all museums
    var dataString = JSON.stringify({
      query: `
      {
        poi 
            (size:100,
            filters:[
            { 
              rdf_type :  {_in: [
              "https://www.datatourisme.gouv.fr/ontology/core#Museum"						
              ]  
            }
            }
            ])
            
            {
          total
          results {
            rdf_type
            _uri
            hasTheme {
              rdfs_label {
                value
              }
            }
            dc_identifier
            rdfs_label {
              value
            }
            isLocatedAt {
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
  }
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
    // Go to the Listing page with a parameter containing the result of the query
    .then(data =>
      res.render('listing', {
        page: 'Listing',
        menuId: 'listing',
        dataQuery: data.data.poi.results
      }));
});


module.exports = router;