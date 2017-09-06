/* Fill out these functions using Mongoose queries*/
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */
mongoose.Promise = global.Promise;
mongoose.connect(config['db']['uri']);

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
   Listing.find({name: 'Library West'}, function(err, listing) {
    console.log("\n#########FIND LIBRARY WEST###########\n");
    if (err) throw err;

    console.log(listing);
   });
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
   Listing.findOne({code: 'CABL'}, function(err, listing) {
    console.log("\n#########REMOVE CABLE###########\n");
    if (err) throw err;

    console.log(listing);

    listing.remove(function(err) {
      if (err) throw err;
    });
   });
};
var updatePhelpsLab = function() {
  /*
    Phelps Laboratory's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
   Listing.findOneAndUpdate({name: 'Phelps Laboratory'}, {'address': 'Phelps Lab, Gainesville, FL 32603'}, function(err, listing) {
    console.log("\n#########UPDATE PHELPS LAB###########\n");
    if (err) throw err;

    console.log(listing);
   })
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
   Listing.find({}, function(err, listings) {
    console.log("\n#########RETRIEVE ALL LISTINGS###########\n");
    if (err) throw err;

    console.log(listings);
   });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
