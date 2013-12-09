module.exports = function (db, DataTypes) {

	var project = db.define('Project', {
		
				name: DataTypes.STRING,
				description: DataTypes.TEXT,
				yop: DataTypes.TEXT,
	});

	return project;
}