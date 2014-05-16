module.exports = function Route(app){
	app.get('/', function(req, res) {
		res.render('index', {title:'DGN', session_data:req.session});
	});
	app.get('/dognate', function(req, res){
		res.render('dognate', {title:'Dognate Page', data: 'Hi'});
	});
		
	app.post('/process', function(req, res){
			console.log('\n\n\nPOST DATA\n\n', req.body);

			req.session.name = req.body.my_name;
			req.session.email = req.body.email;
			req.session.sessionID = req.sessionID;
			
			req.session.save(function(){
				res.redirect('/');
					});
				})
			
}