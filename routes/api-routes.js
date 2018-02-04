//const Find = require("../models/find.js"); 
var db = require("../models");

module.exports = (app) => {

  app.get("/api/getAllItems", (req, res) => {
      
  
    db.Find.findAll({}).then((result) => {
      res.json(result);
    });
});

// Returns th Lat/Lang Array from the DB
// Will be used by the Google Map marker clustering
app.get("/api/getLatLangsFromDB", (req, res) => {
      
  
  db.Find.findAll({}).then((result) => {
    
    
    var testString = result;

    var locationArray = [];

    for(var i=0; i < result.length;i++){
      var singleLocationLatLong = {"lat":result[i].lattitude, "lng":result[i].longitude};
      locationArray.push(singleLocationLatLong);
    }

    
    //console.log(locationArray);
    
    
    res.json(locationArray);
  });
});


    app.get("/api/:item?", (req, res) => {
      
      //Trim the extra spaces and stuff from the requested item
      var strippedItemSearchName = req.params.item.replace(/\s+/g, "").toLowerCase();


      if (strippedItemSearchName){
        db.Find.findAll({
          where:{
            item: strippedItemSearchName
          }
        }).then((result) => {
          return res.json(result);
        }); 
      }
      else {
        db.Find.findAll({}).then((result) => {
          return res.json(result);
        });
      }
    });
    
    

    app.post("/api/new", (req, res) => {
        
        const find = req.body;
    
        //let routeName = Find.item.replace(/\s+/g, "").toLowerCase();
        
        // Strip the spaces and extra white space from the passed in item name

        var shortItemName = find.item.replace(/\s+/g, "").toLowerCase();

        db.Find.create({
          //routeName: routeName,
          user: find.user,
          item: shortItemName,
          description: find.description,
          longitude: find.longitude,
          lattitude:find.lattitude,
          reward: find.reward,
          isLost: find.isLost
        });

        res.send(true);
      });
}