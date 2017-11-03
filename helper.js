const post = newDB('companies').chain().find({'companyId' : parseInt(req.params.companyID) }).assign({'name': 'SunSmart'});


// Get company list using flat-db
router.route('/api/1/companies')
 .get(function(req, res){		
	var post = newDB('companies').value();
		// res.send(JSON.stringify(post));
		var item = post;
		// picking a random company from the list.
		item = post[Math.floor(Math.random()*post.length)];
		// Response [object]
		res.json(post);
	})

// -----------------------------------------------------------------

	this.errorMessages = {
		sessionExpiredMessage: {
			"SessionExpired": {
				"errorCode": 1213,
				"errorMsg": "Session Expired"				
			}
		},
		dataNotFoundMessage : {
			"negativeBlock": {
				"errorCode": 123,
				"errorMsg": "Data not found for the requested id"				
			}
		}
	}

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

// set the default views folder
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

// register the session with it's secret ID
app.use(session({secret: 'uitisawesome'}));

// register the bodyParser middleware for processing forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.post('/login',function(req,res){

	// Very basic. Set the session e-mail to whatever the user has added.
	req.session.email = req.body.email;
	req.session.password = req.body.pass;
	res.end('done');
});

app.get('/admin',function(req,res){
  
	if(req.session.email) {
		res.write('<h1>Hello '+req.session.email+'</h1>');
		res.write('<a href="/logout">Logout</a>');
		res.end();
	} else {
		res.write('<h1>Please login first.</h1>');
		res.write('<a href="/">Login</a>');
		res.end();
	}
});

app.get('/logout',function(req,res){
	
	// if the user logs out, destroy all of their individual session
	// information
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});

});

app.listen(8000,function(){
	console.log("App Started on port 8000");
});



db.mockrecords.insertMany(
[
	{		
		"mock_id" : 1,
		"mock_name" : "companies",
		"mock_data" : [
			{
				"companyId" : 11111,
				"name" : "'KFC'",
				"domain" : "'YKK.com'",
				"status" : true,
				"adminSupportNumber" : "'123",
				"globalSecurityZone" : {
					"Cmt" : 1,
					"CmtAdmin" : 0,
					"Admin" : 0,
					"SingleCrisisMode" : 0,
					"ClaimsReporting" : 1,
					"CrisisReporting" : 1,
					"CrisisActivation" : 1,
					"CrisisActivationOptions" : 1,
					"MeetingCreate" : 1,
					"TaskManagement" : 1
				}
			},
			{
				"companyId" : 22222,
				"name" : "'KFC'",
				"domain" : "'YKK.com'",
				"status" : true,
				"adminSupportNumber" : "'123",
				"globalSecurityZone" : {
					"Cmt" : 1,
					"CmtAdmin" : 0,
					"Admin" : 0,
					"SingleCrisisMode" : 0,
					"ClaimsReporting" : 1,
					"CrisisReporting" : 1,
					"CrisisActivation" : 1,
					"CrisisActivationOptions" : 1,
					"MeetingCreate" : 1,
					"TaskManagement" : 1
				}
			},
			{
				"companyId" : 33333,
				"name" : "'Nike'",
				"domain" : "'nike.com'",
				"status" : true,
				"adminSupportNumber" : "'123",
				"globalSecurityZone" : {
					"Cmt" : 1,
					"CmtAdmin" : 0,
					"Admin" : 0,
					"SingleCrisisMode" : 0,
					"ClaimsReporting" : 1,
					"CrisisReporting" : 1,
					"CrisisActivation" : 1,
					"CrisisActivationOptions" : 1,
					"MeetingCreate" : 1,
					"TaskManagement" : 1
				}
			},
			{
				"companyId" : 44444,
				"name" : "'Google'",
				"domain" : "'google.com'",
				"status" : true,
				"adminSupportNumber" : "'123",
				"globalSecurityZone" : {
					"Cmt" : 1,
					"CmtAdmin" : 0,
					"Admin" : 0,
					"SingleCrisisMode" : 0,
					"ClaimsReporting" : 1,
					"CrisisReporting" : 1,
					"CrisisActivation" : 1,
					"CrisisActivationOptions" : 1,
					"MeetingCreate" : 1,
					"TaskManagement" : 1
				}
			},
			{
				"companyId" : 55555,
				"name" : "'Apple'",
				"domain" : "'apple.com'",
				"status" : true,
				"adminSupportNumber" : "'123",
				"globalSecurityZone" : {
					"Cmt" : 1,
					"CmtAdmin" : 0,
					"Admin" : 0,
					"SingleCrisisMode" : 0,
					"ClaimsReporting" : 1,
					"CrisisReporting" : 1,
					"CrisisActivation" : 1,
					"CrisisActivationOptions" : 1,
					"MeetingCreate" : 1,
					"TaskManagement" : 1
				}
			},
			{
				"companyId" : 66666,
				"name" : "'BlackBerry'",
				"domain" : "'bb.com'",
				"status" : true,
				"adminSupportNumber" : "'123",
				"globalSecurityZone" : {
					"Cmt" : 1,
					"CmtAdmin" : 0,
					"Admin" : 0,
					"SingleCrisisMode" : 0,
					"ClaimsReporting" : 1,
					"CrisisReporting" : 1,
					"CrisisActivation" : 1,
					"CrisisActivationOptions" : 1,
					"MeetingCreate" : 1,
					"TaskManagement" : 1
				}
			}
		]
	},
	{		
		"mock_id" : 2,
		"mock_name" : "staffs",
		"mock_data" : [
			{
				"companyId" : 11111,
				"stafId" : 1234,
				"memberOfCMT" : 0,
				"fname" : "'Stan'",
				"lname" : "'Smith'",
				"cell" : 3033341234,
				"work" : 3033341234,
				"email" : "'stan@mail.com'",
				"active" : 1,
				"activationCode" : "er432",
				"security" : {
					"bitwise" : 7
				},
				"SecurityZones" : {
					"Cmt" : 1,
					"CmtAdmin" : 0,
					"Admin" : 0,
					"SingleCrisisMode" : 0,
					"ClaimsReporting" : 1,
					"CrisisReporting" : 1,
					"CrisisActivation" : 1,
					"CrisisActivationOptions" : 1,
					"MeetingCreate" : 1,
					"TaskManagement" : 1
				}
			},
			{
				"companyId" : 22222,
				"stafId" : 1234,
				"memberOfCMT" : 0,
				"fname" : "'Stan'",
				"lname" : "'Smith'",
				"cell" : 3033341234,
				"work" : 3033341234,
				"email" : "'stan@mail.com'",
				"active" : 1,
				"activationCode" : "er432",
				"security" : {
					"bitwise" : 7
				},
				"SecurityZones" : {
					"Cmt" : 1,
					"CmtAdmin" : 0,
					"Admin" : 0,
					"SingleCrisisMode" : 0,
					"ClaimsReporting" : 1,
					"CrisisReporting" : 1,
					"CrisisActivation" : 1,
					"CrisisActivationOptions" : 1,
					"MeetingCreate" : 1,
					"TaskManagement" : 1
				}
			},
			{
				"companyId" : 33333,
				"stafId" : 1234,
				"memberOfCMT" : 0,
				"fname" : "'Stan'",
				"lname" : "'Smith'",
				"cell" : 3033341234,
				"work" : 3033341234,
				"email" : "'stan@mail.com'",
				"active" : 1,
				"activationCode" : "er432",
				"security" : {
					"bitwise" : 7
				},
				"SecurityZones" : {
					"Cmt" : 1,
					"CmtAdmin" : 0,
					"Admin" : 0,
					"SingleCrisisMode" : 0,
					"ClaimsReporting" : 1,
					"CrisisReporting" : 1,
					"CrisisActivation" : 1,
					"CrisisActivationOptions" : 1,
					"MeetingCreate" : 1,
					"TaskManagement" : 1
				}
			}
		]
	}
]
);


mongoexport -d cms -c mockrecords







	// Function which check whether an user obj is already present in User Array
	this.isObjectExists = function(arr, sessionID) {
	  return arr.some(function(el) {
	    return el.user.sessionID === sessionID;
	  }); 
	};

	// Function to check an user is valid or not
	this.isUserValid = function(users, sessionID){
		return this.isObjectExists(users, sessionID);
	};	
	// Function to check an user is valid or not
	this.createSessionId = function(length){
		  var text = "";
		  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		  for (var i = 0; i < length; i++)
		    text += possible.charAt(Math.floor(Math.random() * possible.length));
		  return text;
	};	



	// Hard Code data for Session Expired
	this.sessionExpiredMessage = function(){
		return {
			"SessionExpired": {
				"errorCode": 1213,
				"errorMsg": "Session Expired"				
			}
		}
	};

	// Hard Code data fro "Data not found"
	this.flatFileErrorMessage = function(){
		return {
			"serverError": {
				"errorCode": 123,
				"errorMsg": "There is a problem connecting with Flat File"				
			}
		}
	};
	// Hard Code data fro "Data not found"
	this.serverErrorMessage = function(){
		return {
			"serverError": {
				"errorCode": 123,
				"errorMsg": "There is a problem connecting with server"				
			}
		}
	};

	// Hard Code data fro "Data not found"
	this.dataNotFoundMessage = function(){
		return {
			"negativeBlock": {
				"errorCode": 123,
				"errorMsg": "Data not found for your request"				
			}
		}
	};




503: Service Unavailable when datasource is down
500: Internal Server Error when datasource is down
502: Bad Gateway when "no data available"
404: Not Found when "no data available"
403: Forbidden when "no data available"
412: Precondition Failed when "no data available"





records = [];
var cursor = db.getCollection('foo').find({}, {});
while(cursor.hasNext()) {
    records.push(cursor.next())
}
print(tojson(records));









// crisis


[
    {
      "crisisId": "'111111'",
      "name": "'Plant Fire'",
      "description": "'description'",
      "crisisLevel": "'ACTIVATE'",
      "dateCreated": "2015-05-05T12:30:00",
      "createdByStaffId": 12341,
      "createdBy": "Bob Thomas",
      "status": "'Active'"
    },
    {
      "crisisId": "'222222'",
      "name": "'Plant Fire'",
      "description": "'description'",
      "crisisLevel": "'ACTIVATE'",
      "dateCreated": "2015-05-05T12:30:00",
      "createdByStaffId": 12341,
      "createdBy": "Bob Thomas",
      "status": "'Active'"
    },
    {
      "crisisId": "'333333'",
      "name": "'Plant Fire'",
      "description": "'description'",
      "crisisLevel": "'ACTIVATE'",
      "dateCreated": "2015-05-05T12:30:00",
      "createdByStaffId": 12341,
      "createdBy": "Bob Thomas",
      "status": "'Active'"
    }
  ]



  // checklist


  [
    {
      "checkListId": 324123,
      "type": "Checklist",
      "name": "Human Resource Action Plan",
      "teamId": 12345,
      "teamName": "CAT",
      "items": [
        {
          "checklistItemId": 11111,
          "roleId": 3131,
          "roleName": "CMT",
          "order": 1,
          "description": "Gather your team together",
          "category": "IT",
          "ownerName": "John",
          "ownerId": 313,
          "completedOn": "2015-05-05T12:30:00",
          "completedBy": 1212
        },
        {
          "checklistItemId": 22222,
          "roleId": 2121,
          "roleName": "CMT",
          "order": 1,
          "description": "Gather your team together",
          "category": "IT",
          "ownerName": "John",
          "ownerId": 323,
          "completedOn": "2015-05-05T12:30:00",
          "completedBy": 3432
        },
        {
          "checklistItemId": 33333,
          "roleId": 1233,
          "roleName": "CMT",
          "order": 1,
          "description": "Gather your team together",
          "category": "IT",
          "ownerName": "John",
          "ownerId": 333,
          "completedOn": "2015-05-05T12:30:00",
          "completedBy": 34534
        }
      ]
    }
  ]