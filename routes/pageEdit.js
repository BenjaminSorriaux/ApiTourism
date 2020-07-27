var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var conn = require('../public/javascripts/connectDatabase');

const filterlist = new Array();
const typeList = new Array();
var page;

// Go to the page with GET method
// 
router.get('/', function (req, res, next) {
    console.log(req.session.userId);
    if(!req.session.userId){    
        res.redirect('/signin');
    }

    try {
        // Get id and libelle of filters that can be selected
        conn.query('SELECT * FROM filtertable', function (err, result) {
            if (err) throw err;
            // If we got a result
            result.forEach(myResult => { 
                var alreadyexist = false;
                filterlist.forEach(element => {
                    if (element.filterid == myResult.id) {
                        alreadyexist = true;
                    }
                });
                if (!alreadyexist) {
                    const filter = {
                        filterid : myResult.id,
                        libellé : myResult.Libelle
                    }
                    filterlist.push(filter);  
                }
            });

        });
        // Same as before but for the type
        conn.query('SELECT * FROM type', function (err, result) {
            if (err) throw err;
            // If we got a result
            result.forEach(myResult => { 
            var alreadyexist = false;
            typeList.forEach(element => {
                if (element.typeid == myResult.id) {
                    alreadyexist = true;
                }
            });
            if (!alreadyexist) {
                const type = {
                    typeid: myResult.id,
                    libellé: myResult.libelle
                }
                typeList.push(type);
            }
           
            
            });

        });

      var filters = filterlist;  
      var types = typeList;
      console.log(filters);
      console.log(types);
      const result = [{id : "",TitlePage : "",LibellePage : ""}]
      
      res.render('creationpage',{
        filters ,        
        types , 
        page: 'edit',
        menuId: 'edit',
        result})


    } catch (error) {
        res.redirect('/index');
        console.log(error);
    }
});

router.get('/:idpage',function (req, res , next) {
    console.log(req.params.idpage);
    
    if(!req.session.userId){      
    
        res.redirect('/signin');
    }

    try {             
   
    conn.query('SELECT * FROM filtertable', function (err, result) {
        if (err) throw err;
        // If we got a result
        result.forEach(myResult => { 
            var alreadyexist = false;
            filterlist.forEach(element => {
                if (element.filterid == myResult.id) {
                    alreadyexist = true;
                }
            });
            if (!alreadyexist) {
                const filter = {
                    filterid : myResult.id,
                    libellé : myResult.Libelle
                }
                filterlist.push(filter);  
            }
        });

    });
    conn.query('SELECT * FROM type', function (err, result) {
        if (err) throw err;
        // If we got a result
        result.forEach(myResult => { 
        var alreadyexist = false;
        typeList.forEach(element => {
            if (element.typeid == myResult.id) {
                alreadyexist = true;
            }
        });
        if (!alreadyexist) {
            const type = {
                typeid : myResult.id,
                libellé : myResult.libelle
            }
            typeList.push(type);
        }
        
       
        
        });
    });
    

        conn.query('SELECT * FROM pagetable WHERE pagetable.id = ?',[req.params.idpage], function (err, result) {
            if (err) throw err;
            // If we got a result
            console.log(result)
            res.render('creationpage',{
                filters ,        
                types , 
                page: 'edit',
                menuId: 'edit',
                result});
        });

  var filters = filterlist;  
  var types = typeList;
  console.log(filters);
  console.log(types);
  console.log(page)
  

}
catch(err){
    console.log(err)
};
  


});


router.post('/', function (req , res , next){
  try {
       
   if (req.body.isset == null) {
    conn.query('INSERT INTO pagetable (TitlePage , LibellePage , ContentHtml , Type , Filter) VALUES (?,?,?,?,?)',[req.body.titlePageInput,req.body.libelePageInput,req.body.toedit,req.body.typeselect,req.body.filterselect],function (err, result) {
        if (err) throw err;

        res.render('customPagePreview',{page : 'preview' , menuId : 'preview' , content : req.body.toedit})
    })
   }
   else{
    conn.query('UPDATE pagetable SET TitlePage = ?, LibellePage = ? , ContentHtml = ? , Type = ? , Filter = ? WHERE id = ?',[req.body.titlePageInput,req.body.libelePageInput,req.body.toedit,req.body.typeselect,req.body.filterselect, req.body.isset],function (err, result) {
        if (err) throw err;

        res.render('customPagePreview',{page : 'preview' , menuId : 'preview' , content : req.body.toedit})
    })
   }


    
  } catch (error) {
    res.redirect('/pageEdit');
    console.log(error);
  }
   
});

module.exports = router;