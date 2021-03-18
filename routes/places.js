const express = require('express');
const router = express.Router();
const Place = require('../models/storagePlaces');
//const Tag = require('../models/Tags.model')




router.post('/addPlace', (req,res,next) => {
  const {name, coordinates, address, category} = req.body; 
  Place.create({ name, coordinates, address, category, user: req.session.user._id})
  .then(() => {
    res.redirect('/favoritesPlaces');
  })
  .catch(err => {
    
    next(err);
  })
}); 

// GET to the list of the favorites places 
router.get('/favoritesPlaces', (req,res,next) => {
  console.log("USER PLEASE BE HERE",req.session.user._id)
  Place.find({ user: req.session.user._id}).then(places => {
    console.log("HERE ARE THE PLACES", places)
    // places.forEach((place) => {
    //   newMarker(place.coordinates)
    // })
    // })
    res.render('user/placeList', {places});
  })
  .catch(err => {
    next(err);
  })
})

//To add the marker when we create a new place 
router.get('/api/favoritesPlaces', (req,res,next) => {
  console.log("USER PLEASE BE HERE",req.session.user._id)
  Place.find({ user: req.session.user._id}).then(places => {
    console.log("HERE ARE THE PLACES", places)
    // places.forEach((place) => {
    //   newMarker(place.coordinates)
    // })
    // })
    res.json({data : places});
  })
  .catch(err => {
    next(err);
  })
})


//To  change the marker when we create a tag 
//router.get('/api/favoritesPlaces', (req,res,next))

//To filter the places on the home page 
router.post('/favoritesPlaces/filter', (req,res,next) => {
  console.log(typeof req.body.tag, "FILTER HERE")
  Place.find().then((placesFromDB) => {
    console.log(placesFromDB)
    let filter = []; 
    placesFromDB.forEach(place => {
    console.log(typeof place.tag, 'CONSOLE LOG PLACE.TAG')
      if (place.tag === req.body.tag) {
        filter.push(place)
      }
    })
    res.render("user/placeList.hbs", {places : filter})
    console.log(filter, "FILTER ARRAY HERE")
  })
})


// //GET to a specific place 
 router.get("/favoritesPlaces/:id", (req,res, next) => {
  const placeId = req.params.id; 
  console.log(placeId);
  Place.findById(placeId).then(place => {
     res.render('user/placeDetails', {place});
   }).catch(err => {
    next(err);
    })
 });


//Delete a place 
router.post('/favoritesPlaces/:id/delete', (req, res,next) => {
  const placeId = req.params.id; 
  console.log('HEEEEEEERE', placeId)
 Place.findByIdAndDelete(placeId)
   .then(()=> {
     console.log('DELETEDDDDDDD')
      res.redirect('/favoritesPlaces')
    })
    .catch(err => {
       next(err);
   })
   })



 // GET edit 
 router.get('/favoritesPlaces/:id/edit', (req, res) => {
  const placeId = req.params.id;
  console.log('THAT WORK!!!!!!!');
  Place.findById(placeId)
    .then(placeFromDB => {
      console.log(placeFromDB);
      res.render('user/placeEdit.hbs', { place: placeFromDB });
    })
})

// POST edit // Take this route for the edit query marker
router.post('/favoritesPlaces/:id/edit', (req, res) => {
  const placeId = req.params.id;
  const {description, rating, tag } = req.body; 
  Place.findByIdAndUpdate(placeId, {
    description: description,
    tag: tag,
    rating: rating
    
  })
    .then(place => {
      console.log(place)
      res.redirect(`/favoritesPlaces/${place._id}`);

    })
    .catch(err => {
      console.log(err);
    })
})

//find a method to edit the tag with category-string and color string to then 
//in the mapbox.Js create a query that when we save the edit will 
//upload the color of the tag



//function to get the tag category and color to update the marker 



module.exports = router;