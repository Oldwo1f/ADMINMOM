/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* ImageDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function ImageDAL() {
		
    }

	/**
     * get Image by id
     * @param  {Integer}   ImageId
     * @param  {Function} callback
     */
    ImageDAL.prototype.get = function(ImageId, callback) {
        dbContext.image.find(ImageId).success(function(Image) {
            callback(Image);
        });
    };

    /**
     * get all Image
     * @param  {Function} callback
     */
    ImageDAL.prototype.getAll = function(callback) {
        dbContext.image.findAll({order: 'id DESC'}).success(function(Images) {
            callback(Images);
        });
    };
    /**
    * Get multi Image by id.
    * @param {where} - condition
    * @param {callback} - callback function. 
    */
    ImageDAL.prototype.getAllImageOfProject = function (projId, callback) {
        console.log(projId); 
        dbContext.image.findAll({ where: {ProjectId: projId} }).success(function (images) {
            console.log('success'); 
            callback(images);
        });
    };
    /**
     * save Image
     * @param  {Object}   Image
     * @param  {Function} callback
     */
    ImageDAL.prototype.save = function(Image, callback) {
        console.log('Image')
        console.log(Image)
        dbContext.image.find(Image.id).success(function(image) {
            image.name = Image.name;
            image.description = Image.description;
            image.save().success(function(proj) {
               callback(proj);  
            });
        });
        
        
        // .success(function(Image) {
        //     callback(Image);
        // }).error(function(error) {
        //     callback({message: error});
        // });
    };
    /**
     * save Image
     * @param  {Object}   Image
     * @param  {Function} callback
     */
    ImageDAL.prototype.createNew = function(Image, callback) {
        console.log('Image')
        console.log(Image)
        dbContext.image.create(Image).success(function(image) {
            callback(image)
        });
        
        
        // .success(function(Image) {
        //     callback(Image);
        // }).error(function(error) {
        //     callback({message: error});
        // });
    };

    /**
     * edit a Image
     * @param  {Object}   Image
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    ImageDAL.prototype.update = function(Image, attributes, callback){
        Image.updateAttributes(attributes).success(function (updatedImage) { 
            callback(updatedImage);
        }); 
    };

    /**
     * delete an Image
     * @param  {Integer}   ImageId
     * @param  {Function} callback
     */
    ImageDAL.prototype.remove = function(ImageId, callback) {   
        dbContext.Image.find(ImageId).success(function(Image) {
			Image.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = ImageDAL;
})();