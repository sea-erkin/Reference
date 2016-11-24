/*
The following snippet shows two important concepts in saving data to a mongo database using the mongoose ORM.

We can create repeatable database methods such as "DecrementSubdocScoreById" and keep these in our database model
class so that this logic can be repeated anywhere else in the server side controller. model.decrementSubdocScoreById()
In this specific model we also show how one would go about updating a sub document of a main document. Fairly straightforward 
but not much documentation existed on this method so I wanted to share.

This prevents code duplication and practices separation of concerns which will make the code much easier to maintain or modify.

*/

// document model class
collectionSchema.statics.decrementsubdocScoreById = function decreasesubdoc (collectionId, subdocId, callback) {
  this.findById(collectionId, function(err, collection) {
    if (err) console.log("error finding collection");
    else {
      var subdoc = collection.subdocs.filter(function (subdoc) {
        return subdoc._id.equals(subdocId);
      })[0];

      subdoc.score -= 1;

      collection.save(callback);
    }
  });
};

// server controller class
Collection.decrementsubdocScoreById(collectionId, subdocId, function  (err, data) {
  handleError(err);
  doStuffWith(data);
});
