var systemNode = function(){
	this.systemObj = function(){
		return {
			"system": {
				"errorCode": 0,
				"errorMsg": "",
				"notification": {
					"message": ""
				},
				"badge": {
					"myMeetings": "",
					"crisisEvents": ""
				},
				"mySecurityRole": {
					"bitwise": ""
				}
			}
		}
	}
};

var systemMessages = function(){
	this.getSystemNode = function(){
		var system = new systemNode();				
		return system.systemObj();
	};
	
	this.serverError = function(){		
		var serverErrorNode = this.getSystemNode();
			serverErrorNode.system.errorCode = 500;
			serverErrorNode.system.errorMsg = "There is a problem connecting to the server";
		return serverErrorNode;
	};		

	this.noDataError = function(){
		var noDataErrorNode = this.getSystemNode();
			noDataErrorNode.system.errorCode = 500;
			noDataErrorNode.system.errorMsg = "Data not found";
		return noDataErrorNode;
	};


	this.sessionExpired = function(){
		var sessionExpiredNode = this.getSystemNode();
			sessionExpiredNode.system.errorCode = 123;
			sessionExpiredNode.system.errorMsg = "Session has been Expired, please login again.";
		return sessionExpiredNode;
	};

		this.dataUpdatedMessage = function(){
		var dataUpdatedNode = this.getSystemNode();			
			dataUpdatedNode.system.notification.message = "Data has been successfully updated.";
		return dataUpdatedNode;
	};
}
exports = module.exports = systemMessages;
