/**
* DbContext class
*/
(function () {

    var modelsPath = __dirname + '/../app/models/';

    /**
    * Constructor.
    * Add your entities 'DbSet' instance here like user.
    */
    function DbContext() {
        this.db = require('./dbConnection');
        this.entities();
        this.modelBuilder();
    }

    /**
     * Attach your model to DbContext like user to perform database sync.
     * 
     */
    DbContext.prototype.entities = function() {
        this.user = this.db.import(modelsPath + 'user');
        this.project = this.db.import(modelsPath + 'project');
        this.image = this.db.import(modelsPath + 'image');
    };

    /**
    * Manage Database entities associations here.
    */
    DbContext.prototype.modelBuilder = function () {
            this.project.hasMany(this.image);
    };

    module.exports = DbContext;
})();