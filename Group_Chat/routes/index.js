module.exports = function Route(app){
	var session_id = "";
	var session_info = [];
	var messages = [];

	app.get("/", function(req, res){
		res.render("index", {title: "Broadcast Example"});
	});

	app.io.route("page_load", function(req){
		req.io.emit("load_messages", {messages: messages});
		var counter = 0;

		for(var index in session_info)
		{
			if(req.session.id == session_info[index].id)
			{
				counter = 1;
				break;
			}
		}
		
		if(counter == 0)
			req.io.emit("get_user_name");
	})

	app.io.route("new_user", function(req){
		session_info.push({id: req.session.id, name: req.data.name});
	})

	app.io.route("new_message", function(req){
		for(var index in session_info)
		{
			if(session_info[index].id == req.session.id)
			{
				messages.push({ name: session_info[index].name, message: req.data.message });
				app.io.broadcast("post_new_message", { new_message: req.data.message, user: session_info[index].name });
			}
		}
	})
}