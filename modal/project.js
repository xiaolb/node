let mongoose = require('mongoose');

let projectSchema = require('../formdata/project');

let Project = mongoose.model('Project', projectSchema);

module.exports = Project;