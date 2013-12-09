/*
* Dependencies
*/
var MembershipFilters = require('../../middleware/membershipFilters');
var ProjectDAL           = require('../dal/projectDAL');
var ImageDAL           = require('../dal/imageDAL');
var async           = require('async');


/**
* ProjectController class
*/
(function () {
    /**
    * Attributes.
    */

    var projectDal = new ProjectDAL();
    var imageDal = new ImageDAL();
    var filters = new MembershipFilters();


    /**
    * Constructor.
    * @param {app} - express app.
    */
    function ProjectController(app) {
        this.routes(app);
    }

    /**
     * Controller routes
     * @param  {express} app
     */
    ProjectController.prototype.routes = function(app) {
        

//GET
        app.get('/project', this.projectPage);
        app.get('/project/getAllProjects', this.getAllProjects);
        app.post('/project/add', this.addProject);
        app.get('/project/edit', this.renderEditProject);
//POST
        app.post('/project/removeProject', this.removeProject);
        app.post('/project/editPost', this.editProject);
        app.get('/project/getAllImagesOfProject/:id', this.getAllImagesOfProject);

         
        
    };
  
     /**
    * [httpget]
    * getProjectPage method.
    */
    ProjectController.prototype.projectPage = function (req, res){
         res.render('project/index');
    }
     /**
    * [httpget]
    * getProjectPage method.
    */
    ProjectController.prototype.renderEditProject = function (req, res){
         res.render('project/edit');
    }
     /**
    * [httpget]
    * getAllProjects method.
    */
    ProjectController.prototype.getAllProjects = function(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });

        projectDal.getAll(function(projects) {
            res.write(JSON.stringify(projects));
            res.end();
        });

    
    };     /**
    * [httpget]
    * getAllImagesOfProject method.
    */
    ProjectController.prototype.getAllImagesOfProject = function(req, res) {
        
        console.log(req.params.id); 
        res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });

        imageDal.getAllImageOfProject(req.param.id, function(images) {
            res.write(JSON.stringify(images));
            res.end();
        });

    
    };
        /**
    * [httppost]
    * addProject post action.
    */
    ProjectController.prototype.addProject = function(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
        var rep ={};
        rep.success = false;
        if (req.body.name ) {

                        var newProjet = {};
                        newProjet.name = req.body.name;
                        newProjet.description = req.body.description

                        projectDal.createNew(newProjet, function (data) {
                            req.flash('flash', 'Projet ajouter !');
                            rep.project = data;
                            rep.success = true;
                            res.write(JSON.stringify(rep));
                            res.end();
                        });
             
        }
        else {
            rep.errors = { input :"name",
                            msg :'Le nom du projet est obligatoire'};
            res.write(JSON.stringify(rep));
            res.end();
        }
    };

    /**
    * [httppost]
    * editProject post action.
    */
    ProjectController.prototype.editProject = function(req, res) {
        console.log('editProject'); 
        var rep ={};
        console.log(req.body); 
        if (req.body.project ) {

            var editProjet = req.body.project;
            projectDal.save(editProjet, function (data) {
                req.flash('flash', 'Projet modifier !');
               console.log('hehey')
                res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
                res.write(JSON.stringify(data));
                res.end();
            });

        }
        else {
            res.writeHead(404, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
        console.log('hehey error')
            rep.errors = { input :"name",msg :'aucun projet'};
            res.write(JSON.stringify(rep));
            res.end();
        }
    };
    /**
    * [httpget]
    * removeProject.
    */
    ProjectController.prototype.removeProject = function  (req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*" });
        var rep=req.body;
        projectDal.getMulti({ where: { id: req.body } },function(projects) {
            var tab =[];
            async.map(projects, function(project,callback) {
                project.destroy().success(function() {
                    return callback();
                });

            },function(error, results) {
                console.log(error)
                if(error)
                {
                    console.log('assync error each'); 
                }
                console.log('all succeed');
                res.write('success');
                res.end();
            });

        });

    };
 


    module.exports = ProjectController;
})();