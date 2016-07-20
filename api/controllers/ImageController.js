/**
 * ImageControllerController
 *
 * @description :: Server-side logic for managing Imagecontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * Upload image of the Medicine
   *
   * (POST /medicines/image/upload)
   */
  uploadMedicineImage: function (req, res) {
    const uploadOptions = {
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000
    };
    req
      .file('image')
      .upload(uploadOptions,function whenDone(err, uploadedFiles) {
        if (err) {
          return res.negotiate(err);
        }
        // If no files were uploaded, respond with an error.
        if (uploadedFiles.length === 0){
          return res.badRequest('No file was uploaded');
        }
        return res.ok({fd:uploadedFiles[0].fd});
      });
  },
  /**
   * Download image of the Medicine with the specified id
   *
   * (GET /medicines/image/:id)
   */
  getMedicineImage : function (req, res) {
    req.validate({
      id: 'string'
    });
    Medicine.findOne(req.param('id')).exec(function (err, medicine){
      if (err) return res.negotiate(err);
      if (!medicine) return res.notFound();

      // Medicine has no image uploaded.
      // (should have never have hit this endpoint and used the default image)
      if (!medicine.image) {
        return res.notFound();
      }

      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk(/* optional opts */);

      // Stream the file down
      fileAdapter.read(medicine.image)
        .on('error', function (err){
          return res.serverError(err);
        })
        .pipe(res);
    });
  }
};
