//Allows the interactions with the mongoDB collection
var User = require('../models/User')

//A collection of handles that point to different API endpoints
module.exports.controller = (app) => {
	//READ all, usually for index page for this collection
	app.get("/users", (req, res) => {
		User.find({}, (err, foundUsers)=>{
			if (err) {
				console.log(err)
			} else {
				res.send({
					users: foundUsers
				})
			}
		})		
	})
	//READ one, usually for individual display of collection's specific document
	app.get("/users/:id", (req, res) => {
		User.findById(req.params.id, 'name email', (err, foundUser) => {
			if (err) {
				console.log(err)
			} else {
				res.send(foundUser)
			}
		})
	})
	//CREATE, usually for adding a new document in thee collection
	app.post("/users", (req,res) => {
		//form design: formData['title'] to directly store user input from form control: title
		//could be superfluous
		let dataFromForm = req.body.formData;
		User.create(dataFromForm, (err, createdUser) => {
			if (err) {
				console.log(err)
			} else {
				console.log(createdUser)
			}
		})
	})
	//UPDATE, usually for changing an exisitng document in the collection
	app.put("/users/:id", (req,res) => {
		User.findById("req.body.id", (err, foundUser) => {
			if (err) {
				console.log(err)
			} else {
				//assuming the form contorl values are well setup, i.e. append['title']
				foundUser = req.body.append;
				foundUser.save((err,appenedUser) => {
					if (err) {
						console.log(err)
					} else {
						console.log("User Appended.")
					}
				})
			}
		})
	})
	//Destroy (delete), usually for the removal of document in the collection
	app.delete("/users/:id", (req,res) => {
		if (err) {
			console.log(err)
		} else {
			User.remove({_id: req.params.id}, (err, deletedDoc) => {
				if (err) {
					console.log(err)
				} else {
					console.log("Entry deleted")
				}
			})
		}
	})

}