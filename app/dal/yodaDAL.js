/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* yodaDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function yodaDAL() {
		
    }

	/**
     * get yoda by id
     * @param  {Integer}   yodaId
     * @param  {Function} callback
     */
    yodaDAL.prototype.get = function(yodaId, callback) {
        dbContext.yoda.find(yodaId).success(function(yoda) {
            callback(yoda);
        });
    };

    /**
     * get all yoda
     * @param  {Function} callback
     */
    yodaDAL.prototype.getAll = function(callback) {
        dbContext.yoda.findAll({order: 'id DESC'}).success(function(yodas) {
            callback(yodas);
        });
    };

    /**
     * save yoda
     * @param  {Object}   yoda
     * @param  {Function} callback
     */
    yodaDAL.prototype.save = function(yoda, callback) {
        var yoda = dbContext.yoda.build(yoda);
        yoda.save().success(function(yoda) {
            callback(yoda);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a yoda
     * @param  {Object}   yoda
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    yodaDAL.prototype.update = function(yoda, attributes, callback){
        yoda.updateAttributes(attributes).success(function (updatedyoda) { 
            callback(updatedyoda);
        }); 
    };

    /**
     * delete an yoda
     * @param  {Integer}   yodaId
     * @param  {Function} callback
     */
    yodaDAL.prototype.remove = function(yodaId, callback) {   
        dbContext.yoda.find(yodaId).success(function(yoda) {
			yoda.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = yodaDAL;
})();