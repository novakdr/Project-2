const Find = require("../models/find.js"); 

module.exports = (app) => {

    app.get("/api/:item?", (req, res) => {
      if (req.params.item){
        Find.findOne({
          where:{
            item: req.params.item
          }
        }).then((result) => {
          return res.json(result);
        }); 
      }
      else {
        Find.findAll({}).then((result) => {
          return res.json(result);
        });
      }
    }); 

    app.post("/api/new", (req, res) => {
        
        const find = req.body;
    
        let routeName = Find.item.replace(/\s+/g, "").toLowerCase();
        
        Find.create({
          routeName: routeName,
          user: find.user,
          item: find.item,
          description: find.description,
          longitutde: find.longitutde,
          lattitude:find.lattitude,
          reward: find.reward,
          isLost: find.isLost
        });
      });
}