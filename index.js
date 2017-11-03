// Packages imports
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

// import Companies Schema
const Model = require('./models/model');

// Global Variable Declaration for DB connection   
var ConnectionFlag = 1;

// Mongo DB connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/cms');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Mongo is connected, hurray!!!")
});

// Local Library file for Hard code data and common functions
var cmsLibrary = require('./system.js');
var systemLibrary = new cmsLibrary();

var app = express();

// CORS Headers
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

// Body-parser Configuration
app.use(bodyParser());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cookieParser());
app.use(session({secret: "Your secret key"},  {cookie :{maxAge : 10000}}));

app.use(require('express-promise')());

// Express router
var router = express.Router();



// -----------------------------------------------------------------

router.route("/api/1/user/login",urlencodedParser)


.post(function(req,res){
	var username = "admin@gmail.com";
	var password = "admin";
	var message = "";	
	var hour = 30000;

	// Check Login credentials
	if(req.body.username == username && req.body.password == password){						
				
		var newSessionID =(Math.random().toString(36).slice(2)) + (Math.floor(Math.random() * 10) + 1);
		req.session.sessionID = newSessionID;						
		req.session.cookie.expires = new Date(Date.now() + hour)
		req.session.cookie.maxAge = hour
	
		// res.end("You have successfully logged in!");
		res.json({
			message : "You have successfully logged in",
			sessionID :req.session.sessionID
		});
		
	}else{
		message = "Invalid Credentials";
		res.send(message);			
	}	
})



// -----------------------------------------------------------------

router.route('/api/1/user/logout')
.get(function(req, res,err){
	// if the user logs out, destroy all of their individual session
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.send('You are successfully logged out');
		}
	});
})



// -----------------------------------------------------------------

	// Api to switch db connection (  Mock Collection or Mongo DB )
	router.route('/api/1/useDBData/:connection')
	.get(function(req, res, err){
		var requestedConnection = req.params.connection;
		if(requestedConnection == 0){
			ConnectionFlag = 0;
			res.send({status: true, message : "Connection is set to Mock Collection"})
		}else if(requestedConnection == 1){
			ConnectionFlag = 1;
			res.send({status: true, message : "Connection is set to Mongo Live DB"})
		}else{
			res.send({status: false, message : "Pass the value 0 (For Mock Data) or 1 (For Mongo Live DB)"});
		}
	});


// -----------------------------------------------------------------





router.route('/api/1/companies')
	.get(function(req, res, err){		
		 	// Check if Mongo DB or  Mock Collection
		 	if(ConnectionFlag == 0){ 
		 		// Mock data block 	
		 		Model.mockdata.find({mock_id: 1}, function(err, mock){
	 				if(err){
	 					res.json(systemLibrary.serverError());
	 				}else{		 		
	 					if(mock.length){
	 						res.json(mock[0].toObject().mock_data);		 					
	 					}else{
	 						res.json(systemLibrary.noDataError());
	 					}	
	 				}
	 			})				 	
		 	}else if(ConnectionFlag == 1){ 		 		
		 		// Live data block			 					 					 		
		 		// System Node
			 	var systemNode = systemLibrary.getSystemNode();
			 	// Check session
		 		if(req.session.sessionID){		 			
		 			var result = Model.companies.find({});
		 			
		 			if(result){
				 		res.json(result);			 		
		 			}else{
		 				// Data not found error
				 		var errorNode = systemLibrary.noDataError();
						res.json(errorNode);
		 			}
			 	}else{
			 		var errorNode = systemLibrary.sessionExpired();
					res.json(errorNode);
			 	}
			 }
		})	
// -----------------------------------------------------------------

// Get all teams

router.route('/api/1/teams')
	.get(function(req, res, err){		
		 	// Check if Mongo DB or Mock Collection
		 	if(ConnectionFlag == 0){ 
		 		// Mock data block 	
		 		Model.mockdata.find({mock_id: 4}, function(err, mock){
	 				if(err){
	 					res.json(systemLibrary.serverError());
	 				}else{		 		
	 					if(mock.length){
	 						res.json(mock[0].toObject().mock_data);		 					
	 					}else{
	 						res.json(systemLibrary.noDataError());
	 					}	
	 				}
	 			})				 	
		 	}else if(ConnectionFlag == 1){ 		 		
		 		// Live data block			 					 					 		
		 		// System Node
			 	var systemNode = systemLibrary.getSystemNode();
			 	// Check session
		 		if(req.session.sessionID){
		 			
		 			var result = Model.teams.find({});
		 			
		 			if(result){
				 		var responseData = {
            			system: systemLibrary.getSystemNode(),
            			teams: Model.teams.find()
            		}
            		res.json(responseData); 		 		
		 			}else{
		 				// Data not found error
				 		var errorNode = systemLibrary.noDataError();
						res.json(errorNode);
		 			}
			 	}else{
			 		var errorNode = systemLibrary.sessionExpired();
					res.json(errorNode);
			 	}
			 }
		})	
// -----------------------------------------------------------------



// Get all crisis

router.route('/api/1/crisis')
	.get(function(req, res, err){		
		 	// Check if Mongo DB or Mock Collection
		 	if(ConnectionFlag == 0){ 
		 		// Mock data block 	
		 		Model.mockdata.find({mock_id: 5}, function(err, mock){
	 				if(err){
	 					res.json(systemLibrary.serverError());
	 				}else{		 		
	 					if(mock.length){
	 						res.json(mock[0].toObject().mock_data);		 					
	 					}else{
	 						res.json(systemLibrary.noDataError());
	 					}	
	 				}
	 			})				 	
		 	}else if(ConnectionFlag == 1){ 		 		
		 		// Live data block			 					 					 		
		 		// System Node
			 	var systemNode = systemLibrary.getSystemNode();
			 	// Check session
		 		if(req.session.sessionID){
		 			
		 			var result = Model.crisis.find({});
		 			
		 			if(result){
				 		var responseData = {
            			system: systemLibrary.getSystemNode(),
            			crisis: Model.crisis.find()
            		}
            		res.json(responseData); 		 		
		 			}else{
		 				// Data not found error
				 		var errorNode = systemLibrary.noDataError();
						res.json(errorNode);
		 			}
			 	}else{
			 		var errorNode = systemLibrary.sessionExpired();
					res.json(errorNode);
			 	}
			 }
		})	
// -----------------------------------------------------------------


// Get Crisis Using id
router.route('/api/1/crisis/:crisisId')
.get(function(req, res, err){	

	// Check if Mongo DB or Mock Collection
	if (ConnectionFlag == 0){  			
			
			Model.mockdata.find({mock_id: 5}, function(err, mock){
				if(err){
					res.json(systemLibrary.serverError());
				}else{		 		
					if(mock.length){
						var responseCrisis = mock[0].toObject().mock_data;
						var randomCrisis = responseCrisis[ Math.floor(Math.random() * responseCrisis.length)];
						res.json(randomCrisis);		 					
					}else{
						res.json(systemLibrary.noDataError());
					}	
				}
			})	
			
	}else if(ConnectionFlag == 1){
		if(req.session.sessionID){
		 		// Mongo DB block
		 		var crisis  = Model.crisis.find({ crisisId : parseInt(req.params.crisisId)});		 		 				
 				if(crisis){
	 				res.json(crisis);
 				}else{
 					res.json(systemLibrary.noDataError());
 				}
		 	}else{
		 		res.send(systemLibrary.sessionExpired());
		 	}
		 }
		})

// -----------------------------------------------------------------



// // update crisis
router.route("/api/1/crisis/",urlencodedParser)

.post(function(req,res){

	// console.log(req.body);	
	if(req.session.sessionID){

	
	  var conditions = { 
		  crisisId: req.body.crisisId },
		  update =  { "$set": {"status": req.body.status}},
		  options = { multi: true };		  
		  // Update query
		Model.crisis.update(conditions, update, options, callback);

		function callback (err, numAffected) {
		  if(err){
		  			res.send(err);
		  }else{
	
		  var responseData = {
            			system: systemLibrary.dataUpdatedMessage(),
            			crisis:Model.crisis.find({ crisisId : parseInt(req.body.crisisId)})
            		}
            		res.json(responseData); 

		  }
		}
	}else{
		// Session expired messsage from Library
		res.send(systemLibrary.sessionExpired());		
	}
})


// -----------------------------------------------------------------



// Get all teams

router.route('/api/1/members')
	.get(function(req, res, err){		
		 	// Check if Mongo DB or Mock Collection
		 	if(ConnectionFlag == 0){ 
		 		// Mock data block 	
		 		Model.mockdata.find({mock_id: 4}, function(err, mock){
	 				if(err){
	 					res.json(systemLibrary.serverError());
	 				}else{		 		
	 					if(mock.length){
	 						res.json(mock[0].toObject().mock_data);		 					
	 					}else{
	 						res.json(systemLibrary.noDataError());
	 					}	
	 				}
	 			})				 	
		 	}else if(ConnectionFlag == 1){ 		 		
		 		// Live data block			 					 					 		
		 		// System Node
			 	var systemNode = systemLibrary.getSystemNode();
			 	// Check session
		 		if(req.session.sessionID){
		 			
		 			var result = Model.teams.find({});
		 			
		 			if(result){
				 		var responseData = {
            			system: systemLibrary.getSystemNode(),
            			teams: Model.teams.find()
            		}
            		res.json(responseData); 		 		
		 			}else{
		 				// Data not found error
				 		var errorNode = systemLibrary.noDataError();
						res.json(errorNode);
		 			}
			 	}else{
			 		var errorNode = systemLibrary.sessionExpired();
					res.json(errorNode);
			 	}
			 }
		})	
// -----------------------------------------------------------------


// // delete Staff By Id
router.route("/api/1/staff/delete/",urlencodedParser)

.post(function(req,res){

	// console.log(req.body);	
	if(req.session.sessionID){

	
	  var conditions = { 
		  stafId: req.body.stafId },
		  update =  { "$set": {"active": req.body.active}},
		  options = { multi: true };		  
		  // Update query
		Model.staffs.update(conditions, update, options, callback);

		function callback (err, numAffected) {
		  if(err){
		  			res.send(err);
		  }else{
	
		  var responseData = {
            			system: systemLibrary.dataUpdatedMessage(),
            			crisis:Model.staffs.find({ stafId : parseInt(req.body.stafId)})
            		}
            		res.json(responseData); 

		  }
		}
	}else{
		// Session expired messsage from Library
		res.send(systemLibrary.sessionExpired());		
	}
})


// ---------------------------------------------------------------------------------


// // delete Staff By Id
router.route("/api/1/staff/update",urlencodedParser)

.post(function(req,res){

	// console.log(req.body);	
	if(req.session.sessionID){

	
	  var conditions = { 
		  stafId: req.body.stafId },
		  update =  { "$set": {"active": req.body.active}},
		  options = { multi: true };		  
		  // Update query
		Model.staffs.update(conditions, update, options, callback);

		function callback (err, numAffected) {
		  if(err){
		  			res.send(err);
		  }else{
	
		  var responseData = {
            			system: systemLibrary.dataUpdatedMessage(),
            			crisis:Model.staffs.find({ stafId : parseInt(req.body.stafId)})
            		}
            		res.json(responseData); 

		  }
		}
	}else{
		// Session expired messsage from Library
		res.send(systemLibrary.sessionExpired());		
	}
})





// // activate crisis 

router.route("/api/1/crisis/activate/",urlencodedParser)

.post(function(req,res){

	// console.log(req.body);	
	if(req.session.sessionID){

	
	  var conditions = { 
		  crisisId: req.body.crisisId },
		  update =  { "$set": {"crisisLevel": req.body.crisisLevel}},
		  options = { multi: false };		  
		  // Update query
		Model.crisis.update(conditions, update, options, callback);

		function callback (err, numAffected) {
		  if(err){
		  			res.send(err);
		  }else{
	
		  var responseData = {
            			system: systemLibrary.dataUpdatedMessage(),
            			crisis:Model.crisis.find({ crisisId : parseInt(req.body.crisisId)})
            		}
            		res.json(responseData); 

		  }
		}
	}else{
		// Session expired messsage from Library
		res.send(systemLibrary.sessionExpired());		
	}
})




// .post( function (req, res) {
// 	console.log(req.body)
//   Model.crisis.findOneAndUpdate({ crisisId : parseInt(req.body.crisisId)}, { "$set": {"status": req.body.status}},{new:true, upsert: false}, function(err, doc) {
//         if (err)
//         {
//             throw err; // handle error;
//         }
//         else{
        	
//         res.json(doc)
//         }	
//         })
// })




// -----------------------------------------------------------------
// Get Crisis Using id
router.route('/api/1/crisis/:crisisId')
.get(function(req, res, err){	

	// Check if Mongo DB or Mock Collection
	if (ConnectionFlag == 0){  			
			
			Model.mockdata.find({mock_id: 5}, function(err, mock){
				if(err){
					res.json(systemLibrary.serverError());
				}else{		 		
					if(mock.length){
						var responseCrisis = mock[0].toObject().mock_data;
						var randomCrisis = responseCrisis[ Math.floor(Math.random() * responseCrisis.length)];
						res.json(randomCrisis);		 					
					}else{
						res.json(systemLibrary.noDataError());
					}	
				}
			})	
			
	}else if(ConnectionFlag == 1){
		if(req.session.sessionID){
		 		// Mongo DB block
		 		var crisis  = Model.crisis.find({ crisisId : parseInt(req.params.crisisId)});		 		 				
 				if(crisis){
	 				res.json(crisis);
 				}else{
 					res.json(systemLibrary.noDataError());
 				}
		 	}else{
		 		res.send(systemLibrary.sessionExpired());
		 	}
		 }
		})

// -----------------------------------------------------------------

// Get checklist using teamid

router.route('/api/1/checklist/:teamId/:type')
.get(function(req, res, err){	

	// Check if Mongo DB or Mock Collection
	if (ConnectionFlag == 0){  			
			
			Model.mockdata.find({mock_id: 7}, function(err, mock){
				if(err){
					res.json(systemLibrary.serverError());
				}else{		 		
					if(mock.length){
						var responsechecklist = mock[0].toObject().mock_data;
						var randomchecklist = responsechecklist[ Math.floor(Math.random() * responsechecklist.length)];
						res.json(randomchecklist);		 					
					}else{
						res.json(systemLibrary.noDataError());
					}	
				}
			})	
			
		}else if(ConnectionFlag == 1){
			if(req.session.sessionID){
		 		// Mongo DB block
		 		var checklist  = Model.checklist.find(
		 		{
		 			$and: [
		 			{"teamId" : parseInt(req.params.teamId)}, {"type" : req.params.type}
		 			]
		 		}
		 		);		 		 				
		 		if(checklist){

		 			var responseData = {
		 				"system": systemLibrary.getSystemNode(),
		 				"Checklist": checklist	 				
		 			} 			
	 					res.json(responseData);
 				}else{
 					res.json(systemLibrary.noDataError());
 				}
		 	}else{
		 		res.send(systemLibrary.sessionExpired());
		 	}
		 }
		})

// -----------------------------------------------------------------


//  update default checklist

router.route("/api/1/checklist/update",urlencodedParser)

.post(function(req,res){

	// console.log(req.body);	
	if(!req.session.sessionID){

	
	  var conditions = { 
		  checkListId: req.body.checkListId },
		  update =  { "$set": req.body},
		  options = { multi: true, upsert: true };		  
		  // Update query
		Model.checklist.update(conditions, update, options, callback);

		function callback (err, numAffected) {
		  if(err){
		  			res.send(err);
		  }else{
	
		  var responseData = {
            			system: systemLibrary.dataUpdatedMessage(),
            			crisis:Model.checklist.find({ checkListId : parseInt(req.body.checkListId)})
            		}
            		res.json(responseData); 

		  }
		}
	}else{
		// Session expired messsage from Library
		res.send(systemLibrary.sessionExpired());		
	}
})












// -------------------------------------------------------------------

/*db.checklist.find({
	$and: [
	{"teamId" : 12345}, {"items.roleId" : 3131} , {"type" : "Checklist"}
	]},
	{
		"checkListId" : Number,
		"type" : String,
		"name" : String,
		"teamId" : Number,
		"teamName" : String,
		"items.roleId.$" : Number
	}
	);*/

	// Get checklist using roleid

router.route('/api/1/checklist/role/:teamId/:roleId/:type')
.get(function(req, res, err){	

	// Check if Mongo DB or Mock Collection
	if (ConnectionFlag == 0){  			
			
			Model.mockdata.find({mock_id: 7}, function(err, mock){
				if(err){
					res.json(systemLibrary.serverError());
				}else{		 		
					if(mock.length){
						var responsechecklist = mock[0].toObject().mock_data;
						var randomchecklist = responsechecklist[ Math.floor(Math.random() * responsechecklist.length)];
						res.json(randomchecklist);		 					
					}else{
						res.json(systemLibrary.noDataError());
					}	
				}
			})	
			
		}else if(ConnectionFlag == 1){
			if(req.session.sessionID){
		 		// Mongo DB block

		 		console.log({"teamId" : parseInt(req.params.teamId)}, {"items.roleId" : parseInt(req.params.roleId)} , {"type" : req.params.type});

		 		var checklist  =  Model.checklist.find({'type': req.params.type, 'teamId':  parseInt(req.params.teamId), 'items.roleId': parseInt(req.params.roleId) }, {'items.roleId.$': parseInt(req.params.roleId),"type" :  req.params.type,"checkListId" : Number,"teamId" : parseInt(req.params.teamId)},{
		 		});

		 		if(checklist){

		 			var responseData = {
		 				"system": systemLibrary.getSystemNode(),
		 				"Checklist": checklist	 				
		 			} 			
	 					res.json(responseData);
 				}else{
 					res.json(systemLibrary.noDataError());
 				}
		 	}else{
		 		res.send(systemLibrary.sessionExpired());
		 	}
		 }
		})


// GET Meeting BY STAFF
router.route('/api/1/meetings/staff/:staffId')
.get(function(req, res, err){	

	// Check if Mongo DB or Mock Collection
	if (ConnectionFlag == 0){  			

		Model.mockdata.find({mock_id: 8}, function(err, mock){
			if(err){
				res.json(systemLibrary.serverError());
			}else{		 		
				if(mock.length){
					var responseTeam = mock[0].toObject().mock_data;
					// var randomTeam = responseTeam[ Math.floor(Math.random() * responseTeam.length)];
					res.json(responseTeam);		 					
				}else{
					res.json(systemLibrary.noDataError());
				}	
			}
		})	
	}else if(ConnectionFlag == 1){
		if(req.session.sessionID){
		 		// Mongo DB block
		 		var meeting  = Model.meetings.find({ "team.members.staff.stafId":  parseInt(req.params.staffId)});		 		 				
		 		if(meeting){
		 			var responseData = {
		 				system: systemLibrary.getSystemNode(),
		 				meeting: meeting
		 			}
		 			res.json(responseData);
		 		}else{
		 			res.json(systemLibrary.noDataError());
		 		}
		 	}else{
		 		res.send(systemLibrary.sessionExpired());
		 	}
		 }
	})



// UPSERT TEAM
router.route("/api/1/teams/update", urlencodedParser)
.post(function(req,res){

	// console.log(req.body);	
	if(!req.session.sessionID){
		var conditions = { 
			teamId: req.body.teamId },
			update = req.body,
			options = { "upsert": true };		  
		  // Update query
		  Model.teams.update(conditions, update, options, callback);
		  function callback (err, numAffected) {
		  	if(err){

		  	}else if(numAffected){
		  		var responseData = {
		  			system : systemLibrary.dataUpdatedMessage(),
		  			team : Model.teams.find({})
		  		}
		  		res.send(responseData);
		  	}
		  }
		}else{
		// Session expired messsage from Library
		res.send(systemLibrary.sessionExpired());		
	}
})



// GET Meeting BY ID
router.route('/api/1/meetings/:id')
.get(function(req, res, err){	

	// Check if Mongo DB or Mock Collection
	if (ConnectionFlag == 0){  			

		Model.mockdata.find({mock_id: 0}, function(err, mock){
			if(err){
				res.json(systemLibrary.serverError());
			}else{		 		
				if(mock.length){
					var responseTeam = mock[0].toObject().mock_data;
					var randomTeam = responseTeam[ Math.floor(Math.random() * responseTeam.length)];
					res.json(randomTeam);		 					
				}else{
					res.json(systemLibrary.noDataError());
				}	
			}
		})	
	}else if(ConnectionFlag == 1){
		if(req.session.sessionID){
		 		// Mongo DB block
		 		var meeting  = Model.meetings.find({ meetingId: parseInt(req.params.id)});		 		 				
		 		if(meeting){
		 			var responseData = {
		 				system: systemLibrary.getSystemNode(),
		 				meeting: meeting
		 			}
		 			res.json(responseData);
		 		}else{
		 			res.json(systemLibrary.noDataError());
		 		}
		 	}else{
		 		res.send(systemLibrary.sessionExpired());
		 	}
		 }
	})





// update meetings
router.route("/api/1/meetings/",urlencodedParser)
.post(function(req,res){
	// console.log(req.body);	
	if(req.session.sessionID){

	// Variable Declaration
	 var system = req.body.system;		 
	 var meetings = req.body.meeting;		 
	 var updateTeam = {};
	 var isTeam = false,
	 	 isMember = false, 
	 	 isDocuments = false,
	 	 isImages = false;	 	 
	 
	// Validate the json (req.body) [INTERNAL JSON VALIDATIOIN]		 
 	// does req.body have a team? 
		if(meetings.team){
			 isTeam = meetings.team ? true : false;			
			// 	does team have members?
			if(meetings.team.members)
		 	 isMember = meetings.team.members.length > 0 ? true : false;
		}
	// does req.body have documents?
		if(meetings.documents)
		 	 isDocuments = meetings.documents.length > 0 ? true : false; 		 	
 	// does it have images? 
		if(meetings.images)
		 	 isImages = meetings.images.length > 0 ? true : false;

		// If team and members are available
		if(isTeam == true && isMember == true){
		// get the teams -collection document- by teamId			
			Model.teams.findOne({ teamId : parseInt(meetings.team.teamId)}, function(err, teamDocs){
				if(teamDocs){		 		
					// modify the members node [insert]					 					 					 					 			
		 			updateTeam = teamDocs;
		 			updateTeam.members = meetings.team.members;		 					 									 						
		 		}else{
		 			res.send("no teams found");
		 		}		
			})				
		}
		// If documents are available
		if(isDocuments){
		// get the teams -collection document- by teamId			
			Model.teams.findOne({ teamId : parseInt(meetings.team.teamId)}, function(err, teamDocs){
				if(teamDocs){	
					// modify the "documents" node	 					 					 					 					 			
					if(isTeam == true && isMember == true){
			 			updateTeam.documents = meetings.documents;				 				 		
					}else{
						updateTeam = teamDocs;
						updateTeam.documents = meetings.documents;		 			
					}		 					 			
		 		}else{
		 			res.send("no teams found");
		 		}			
			})				
		}

		// UPDATE MEETINGS COLLECTION					 			
		Model.meetings.update({"meetingId": meetings.meetingId}, meetings, { "upsert": true }, MeetingCallback);
	    function MeetingCallback (err, numAffected) {
		  	if(err){
		  		console.log("error")		  		
		  	}else if(numAffected){
		  		console.log("meetings updated");
		  		// UPDATE TEAMS COLLECTION	
		  		// INSERT OR UPDATE THE MEETINGS BY ID			 
				Model.teams.update({"teamId": meetings.team.teamId}, updateTeam, {} , TeamsCallback);
			    function TeamsCallback (err, numAffected) {
				  	if(err){
				  		return err;
				  		console.log("error")		  		
				  	}else if(numAffected){
				  		console.log("Teams updated");
				  		var responseData = {
				  			system: systemLibrary.dataUpdatedMessage(),
				  			meetings: Model.meetings.find({ meetingId : parseInt(meetings.meetingId)})
				  		}
				  		res.json(responseData);		  
				  	}
			    }
		  	}
	    }	
		}else{
		// Session expired messsage from Library
		res.send(systemLibrary.sessionExpired());		
	}
})

// -----------------------------------------------------------------



// Get Crisis Using id
router.route('/api/1/documents/teams/:crisisId/:teamId')
.get(function(req, res, err){	
	// Check if Mongo DB or Mock Collection
	if (ConnectionFlag == 0){  			

		Model.mockdata.find({mock_id: 4}, function(err, mock){
			if(err){
				res.json(systemLibrary.serverError());
			}else{		 		
				if(mock.length){
					var responseTeamDocs = mock[0].toObject().mock_data;
					var randomTeamDocs = responseTeamDocs[ Math.floor(Math.random() * responseTeamDocs.length)];
					res.json(randomTeamDocs);		 					
				}else{
					res.json(systemLibrary.noDataError());
				}	
			}
		})	

	}else if(ConnectionFlag == 1){
		if(req.session.sessionID){
		 		// Mongo DB block		 		
	 			Model.teams.findOne({ teamId : parseInt(req.params.teamId)}, function(err, teamDocs){
					if(teamDocs){		 					 					 					 					 						 			
			 			var responseData = {
			 				system: systemLibrary.getSystemNode(),
			 				documents: teamDocs.documents
			 			}
		 			res.json(responseData);
			 		}else{
			 			res.json(systemLibrary.noDataError());
			 		}			
				})	
		 	}else{
		 		res.send(systemLibrary.sessionExpired());
		 	}
		 }
	})

// -----------------------------------------------------------------


// Get Crisis Using id
router.route('/api/1/documents/:id')
.get(function(req, res, err){	
	// Check if Mongo DB or Mock Collection
	if (ConnectionFlag == 0){  			

		Model.mockdata.find({mock_id: 4}, function(err, mock){
			if(err){
				res.json(systemLibrary.serverError());
			}else{		 		
				if(mock.length){
					var responseTeamDocs = mock[0].toObject().mock_data;
					var randomTeamDocs = responseTeamDocs[ Math.floor(Math.random() * responseTeamDocs.length)];
					res.json(randomTeamDocs);		 					
				}else{
					res.json(systemLibrary.noDataError());
				}	
			}
		})	

	}else if(ConnectionFlag == 1){
		if(req.session.sessionID){
		 		// Mongo DB block
		 		var temp = {};
		 		var id = new ObjectID();

		 		var doc =Model.teams.findOne({'documents.documentId': parseInt(req.params.id) }, {'documents.documentId.$': parseInt(req.params.id) });		 		 				
		 		if(doc){		 			
		 			// var responseData = {
		 			// 	"system": systemLibrary.getSystemNode(),
		 			// 	"documents": doc		 				
		 			// }	
		 			temp.data = doc;	 			
		 			// res.json(temp.data);
		 			res.json(doc);
		 		}else{
		 			res.json(systemLibrary.noDataError());
		 		}
		 	}else{
		 		res.send(systemLibrary.sessionExpired());
		 	}
		 }
		})

// -----------------------------------------------------------------



// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

// Server Code
var server = app.listen(8080,'10.0.0.131', function () {
	var host = server.address().address
	var port = server.address().port   
	console.log("Example app listening at http://%s:%s", host, port);
})

// Export app module
module.exports = app;


