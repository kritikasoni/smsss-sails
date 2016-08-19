/**
 * ImageController
 *
 * @description :: Server-side logic for managing ImageControllers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const uuid = require('node-uuid');
const path = require('path');
module.exports = {
  /**
   * Upload image of the Medicine
   *
   * (POST /medicines/image/upload)
   */
  uploadMedicineImage: function (req, res) {
    const allowedTypes = ['image/jpeg', 'image/png'];
    const allowDirectory = 'assets/images/medicines';
    const uploadOptions = {
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000,
      dirname: path.resolve(sails.config.appPath, allowDirectory),
      saveAs: (file, cb)=> {
        const extension = file.filename.split('.').pop();
        // generating unique filename with extension
        const fileName = `${uuid.v4()}.${extension}`;

        // validate allowed extensions
        if(allowedTypes.includes(file.headers['content-type'])) {
          cb(null,fileName);
        }
        else{
          cb(new Error("not allowed file extension"),null);
        }
      }
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
        const fileDirectory = uploadedFiles[0].fd.split(path.sep);
        const imageUrl = `${sails.getBaseURL()}/${fileDirectory[fileDirectory.length - 3]}/${fileDirectory[fileDirectory.length - 2]}/${fileDirectory[fileDirectory.length - 1]}`;
        return res.ok({url:imageUrl});
      });
  }
};
