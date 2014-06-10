module.exports = function Route(app){
	app.get("/", function(req, res){
		res.render("index");
	});

	app.io.route("posting_form", function(req){
		submitted_info = {
			name: req.data.name,
			location: req.data.location,
			language: req.data.language,
			comment: req.data.comment
		};
		req.io.emit("updated_message", {survey_info: submitted_info});
		req.io.emit("random_number", {
			number: "Your lucky number emitted by the server is: " + Math.floor((Math.random()*1000)+1)
		})
	});
};