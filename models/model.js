var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CompanySchema   = new Schema({}, {strict: false});
var StaffsSchema   = new Schema({}, {strict: false});
var MockSchema   = new Schema({});
var RolesSchema   = new Schema({});
var TeamsSchema   = new Schema({});
var CrisisSchema   = new Schema({}, {strict: false});
var ChecklistSchema   = new Schema({"items": Array});

exports.mockdata = mongoose.model('mockrecords', MockSchema);
exports.companies = mongoose.model('companies', CompanySchema);
exports.staffs = mongoose.model('staffs', StaffsSchema);
exports.roles = mongoose.model('role', RolesSchema, 'role');
exports.teams = mongoose.model('teams', TeamsSchema);
exports.crisis = mongoose.model('crisis', CrisisSchema, 'crisis');
exports.checklist = mongoose.model('checklist', ChecklistSchema, 'checklist');