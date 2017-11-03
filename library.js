var systemMessages = function(){
	// Hard code date of System Node
	this.SystemNode = function(){
		return {
			"system": {
				"errorCode": 123,
				"errorMsg": "Network seems unreachable. Check mobile signal strength and try again.  This means you have been logged out and require authentication",
				"notification": {
					"message": "A meeting has been rescheduled"
				},
				"badge": {
					"myMeetings": 1,
					"crisisEvents": 23
				},
				"mySecurityRole": {
					"bitwise": 7
				}
			}
		}
	};
	
	this.serverError = function(){
		return {
			"errorCode": 123,
			"errorMsg": "There is a problem connecting with server",
			"notification": {
				"message": "A meeting has been rescheduled"
			},
		}
	}		

	this.serverError = function(){
		return {
			"errorCode": 123,
			"errorMsg": "There is a problem connecting with server",
			"notification": {
				"message": "A meeting has been rescheduled"
			},
		}
	}		
}

exports = module.exports = systemMessages;
