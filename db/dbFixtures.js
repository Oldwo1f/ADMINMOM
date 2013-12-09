/**
 * Using
 */
var DbContext = require(__dirname + '/dbContext');
var UserDal           = require(__dirname + '/../app/dal/userDal');
var ProjectDal           = require(__dirname + '/../app/dal/projectDal');
var passport          = require('passport');
var bcrypt            = require('bcrypt-nodejs');
/**
 * Run fixture function
 */
module.exports = function(){

	var dbContext = new DbContext();
	var userDal = new UserDal();
	var projectDal = new ProjectDal();










	var encryptPassword = function (password, callback){
        bcrypt.genSalt(10, function(err, salt) {
            if (err) console.log('error during encryption');
            bcrypt.hash(password, salt, null, function(err, cryptedPassWord) {
                if(err){ throw err; }
                else{
                    callback(cryptedPassWord);  
                }
            });
        });
    }	
    console.log("... running fixtures ...");

//ADD 2 User
	encryptPassword('totototo', function(hashedpassword){
        var newUser = {};
        newUser.username = 'aa';
        newUser.email = 'alexismom@momcreation.fr'
        newUser.password = hashedpassword;

        userDal.save(newUser, function (data) { console.log('Ajout User : aa [mdp] totototo ')});
    });
    encryptPassword('totototo', function(hashedpassword){
        var newUser = {};
        newUser.username = 'alexis';
        newUser.email = 'alexismomcilovic@momcreation.fr'
        newUser.password = hashedpassword;

        userDal.save(newUser, function (data) { console.log('Ajout User : alexis [mdp] totototo ')});
    });
//ADD 2 Project
    var project = {};
        project.name = 'Mon premier projet';
        project.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        projectDal.createNew(project, function (data) { console.log('Ajout Projet : 1')});
    var project1 = {};
        project1.name = 'Mon second projet';
        project1.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        projectDal.createNew(project1, function (data) { console.log('Ajout Projet : 1')});
    var project3 = {};
        project3.name = 'Mon 3 projet';
        project3.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        projectDal.createNew(project3, function (data) { console.log('Ajout Projet : 1')});
    var project4 = {};
        project4.name = 'Mon 4 projet';
        project4.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        projectDal.createNew(project4, function (data) { console.log('Ajout Projet : 1')});
    var project5 = {};
        project5.name = 'Mon premier projet';
        project5.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        projectDal.createNew(project5, function (data) { console.log('Ajout Projet : 1')});
    var project6 = {};
        project6.name = 'Mon second projet';
        project6.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        projectDal.createNew(project6, function (data) { console.log('Ajout Projet : 1')});
    var project7 = {};
        project7.name = 'Mon 3 projet';
        project7.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        projectDal.createNew(project7, function (data) { console.log('Ajout Projet : 1')});
    var project8 = {};
        project8.name = 'Mon 4 projet';
        project8.description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        projectDal.createNew(project8, function (data) { console.log('Ajout Projet : 1')});



}