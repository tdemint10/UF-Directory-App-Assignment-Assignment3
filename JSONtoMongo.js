'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */
mongoose.Promise = global.Promise;
mongoose.connect(config['db']['uri']);
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
fs.readFile('listings.json', 'utf8', function(err, data) {
  var listingData = JSON.parse(data)['entries'];

  for (var i = 0; i < listingData.length; i++) {
    var currListing = listingData[i];

    var listing = new Listing({
      code: currListing['code'],
      name: currListing['name'],
      coordinates: {
        latitude: currListing['coordinates'] ? currListing['coordinates']['latitude'] : null,
        longitude: currListing['coordinates'] ? currListing['coordinates']['longitude'] : null
      },
      address: currListing['address']
    });

    listing.save(function(err) {
      if (err) throw err;
    });
  }

  console.log('SUCCESS!'); 
});

/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */