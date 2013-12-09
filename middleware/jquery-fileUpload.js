var upload = require('jquery-file-upload-middleware');
/**
* MembershipFilters class
*/
var upload = module.exports = (function () {

    /**
    * Constructor.
    */
    function upload() {
    	
   		upload.configure({
		    tmpDir : __dirname + '/public/tmp',
		    uploadDir: __dirname + '/public/imgs',
		    uploadUrl: '/imgs',
		    maxPostSize: 11000000000, // 11 GB
		    minFileSize: 1,
		    maxFileSize: 10000000000, // 10 GB
		    acceptFileTypes: /.+/i,
		    imageTypes: /\.(gif|jpe?g|png)$/i,
		    imageVersions: {
		        thumbnail: {
		            width: 80,
		            height: 80
		        }
		    }
		});
		upload.on('end', function (fileInfo) { 
		    console.log('on End'); 
		});
		
		// app.use('/project/uploads', upload.fileHandler());
    }



    return upload;
})();