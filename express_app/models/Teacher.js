const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
	name: String,
	email: String,
	subjects: Array
})

const Teacher = mongoose.model('Teacher', TeacherSchema)
module.exports = Teacher

//trying to sort out somehting that i should have done long ago

//example:
// mockObj = {
// 	name: 'lupux lynx',
// 	email: 'fnbdesign@gmail.com',
// 	subjects: [
// 	{
// 		name: "Chemistry",
// 		syllabi: ["IBDP", "A-level", "IGCSE", "ISEB", "AP", "SATII"]
// 	},
// 	{
// 		name: "Science",
// 		syllabi: ["IBMPY", "IGCSE", "ISEB"]
// 	},
// 	{
// 		name: "Non Verbal Reasoning",
// 		syllabi: ["ISEB", "CEM"]
// 	},
// 	{
// 		name: "Verbal Reasoning",
// 		syllabi: ["ISEB", "CEM"]
// 	}]
// }