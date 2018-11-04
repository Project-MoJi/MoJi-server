const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath('./config/aws_config.json');
const s3 = new aws.S3();

module.exports = {
	deleteImage : async (...args)=>{
		var deleteKeys = args[0];
		var params = {
		  Bucket: "mojinj", 
		  Delete: {
		   Objects: [
		      {
		         Key : deleteKeys
		      }
		   ], 
		   Quiet: false
		  }
		};

		s3.deleteObjects(params, function(err, data) {
			if (err) console.log(err, err.stack); // an error occurred
			else     console.log(data); 
		});
	}
}
