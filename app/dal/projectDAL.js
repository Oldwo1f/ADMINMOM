/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
* ProjectDAL class
*/
(function () {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
    * Constructor.
    */
    function ProjectDAL() {
		
    }

	/**
     * get Project by id
     * @param  {Integer}   ProjectId
     * @param  {Function} callback
     */
    ProjectDAL.prototype.get = function(ProjectId, callback) {
        dbContext.project.find(ProjectId).success(function(Project) {
            callback(Project);
        });
    };

    /**
     * get all Project
     * @param  {Function} callback
     */
    ProjectDAL.prototype.getAll = function(callback) {
        dbContext.project.findAll({order: 'id DESC'}).success(function(Projects) {
            callback(Projects);
        });
    };
    /**
    * Get multi Project by id.
    * @param {where} - condition
    * @param {callback} - callback function. 
    */
    ProjectDAL.prototype.getMulti = function (where, callback) {
        dbContext.project.findAll(where).success(function (projets) {
            callback(projets);
        });
    };
    /**
     * save Project
     * @param  {Object}   Project
     * @param  {Function} callback
     */
    ProjectDAL.prototype.save = function(Project, callback) {
        console.log('Project')
        console.log(Project)
        dbContext.project.find(Project.id).success(function(project) {
            project.name = Project.name;
            project.description = Project.description;
            project.save().success(function(proj) {
               callback(proj);  
            });
        });
        
        
        // .success(function(Project) {
        //     callback(Project);
        // }).error(function(error) {
        //     callback({message: error});
        // });
    };
    /**
     * save Project
     * @param  {Object}   Project
     * @param  {Function} callback
     */
    ProjectDAL.prototype.createNew = function(Project, callback) {
        console.log('Project')
        console.log(Project)
        dbContext.project.create(Project).success(function(project) {
            callback(project)
            // project.save().success(function(proj) {
            //     callback(proj);  
            // });
        });
        
        
        // .success(function(Project) {
        //     callback(Project);
        // }).error(function(error) {
        //     callback({message: error});
        // });
    };

    /**
     * edit a Project
     * @param  {Object}   Project
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    ProjectDAL.prototype.update = function(Project, attributes, callback){
        Project.updateAttributes(attributes).success(function (updatedProject) { 
            callback(updatedProject);
        }); 
    };

    /**
     * delete an Project
     * @param  {Integer}   ProjectId
     * @param  {Function} callback
     */
    ProjectDAL.prototype.remove = function(ProjectId, callback) {   
        dbContext.Project.find(ProjectId).success(function(Project) {
			Project.destroy().success(function() {
				callback();
			});
        })
    };

    module.exports = ProjectDAL;
})();