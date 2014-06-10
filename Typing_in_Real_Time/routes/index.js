module.exports = function Route(app){
  var all_users = [];

  app.get("/", function(req, res){
    res.render("index");
  });

  app.io.route("got_a_new_user", function(req){
    req.io.broadcast("new_user", {new_user_name: req.data.name, socket_id: req.socket.id});
    all_users.push({user_name: req.data.name, socket_id: req.socket.id});
    req.io.emit("existing_users", {users: all_users});
  });

  app.io.route("updated_message", function(req){
    req.io.broadcast("message_update", {chat_for: req.data.chat_for, message: req.data.message});
  });

  app.io.route("disconnect", function(req){
    for(var index in all_users)
    {
      if(all_users[index].socket_id == req.socket.id)
        delete all_users[index];
    }

    req.io.broadcast("disconnected_user", {socket_id: req.socket.id});
  })
};