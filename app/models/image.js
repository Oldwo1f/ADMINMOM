module.exports = function (db, DataTypes) {

	var image = db.define('image', {
		name: DataTypes.STRING,
		originalName: DataTypes.STRING,
		size: DataTypes.INTEGER,
		type: DataTypes.STRING,
		deleteType: DataTypes.STRING,
		url: DataTypes.STRING,
		deleteUrl: DataTypes.STRING,
		thumbnailUrl: DataTypes.STRING
	});
	return image;
}