module.exports = function Route(app){
	var session_info = [];
	var room = 0;
	var geek_quotes = [
		"If you do what you’ve always done, you’ll get what you’ve always gotten.",
		"If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on.",
		"You can’t outwit fate by standing on the sidelines placing little sidebets about the outcome of life. Either you wade in and risk everything you have to play the game or you don’t play at all. And if you don’t play you can’t win.",
		"Do the one thing you think you cannot do. Fail at it. Try again. Do better the second time. The only people who never tumble are those who never mount the high wire. This is your moment. Own it.",
		"Life is inherently risky. There is only one big risk you should avoid at all costs, and that is the risk of doing nothing.",
	];
	var artist_quotes = [
		"The universe has no restrictions. You place restrictions on the universe with your expectations.",
		"In order to succeed, your desire for success should be greater than your fear of failure.",
		"If you don’t build your dream, someone else will hire you to help them build theirs.",
		"Always go with your passions. Never ask yourself if it’s realistic or not.",
		"Don’t judge each day by the harvest you reap but by the seeds that you plant."
	];

	var answer = 0;
	var geek_answers = [];
	var artist_answers = [];

	app.get('/', function(req, res){
		var counter = 0;
		for(var index in session_info)
		{
			if(req.session.id == session_info[index].session_id)
			{
				counter = 1;
				break;
			}
		}
		
		if(counter == 0)
		{
			room = Math.floor((Math.random()*2)+1);
			session_info.push({session_id: req.session.id, session_room: room});
		}

		res.render('index', {title:room});
	});
	
	app.io.route("getting_quote", function(req){
		num1 = Math.floor((Math.random()*100)+1);
		num2 = Math.floor((Math.random()*100)+1);
		operators = ["+", "-", "*"];
		random_index = Math.floor((Math.random()*2)+0);
		
		if(random_index == 0)
			answer = num1 + num2;
		else if(random_index == 1)
			answer = num1 - num2;
		else if(random_index == 2)
			answer = num1 * num2;
		
		if(room == 1)
			answers_array = geek_answers;
		else
			answers_array = artist_answers;

		req.io.emit("math_question", {message: "I will give you an awesome quote if you can answer the following math question:",
			equation: num1+" "+operators[random_index]+" "+num2+" = ",
			answer: answer,
			room_answers: answers_array
		});
	});

	app.io.route("answer", function(req){
		if(req.data.status)
			var index = Math.floor((Math.random()*5));

		if(room == 1)
		{
			geek_answers.push({equation: req.data.equation, answer: req.data.answer});
			quote = geek_quotes[index];
			answer = geek_answers;
		}
		else
		{
			artist_answers.push({equation: req.data.equation, answer: req.data.answer});
			quote = artist_quotes[index];
			answer = artist_answers;
		}

		if(index !== undefined)
			req.io.emit("give_quote", {quote: quote, room_answers: answer});
		else	
			req.io.emit("update_latest_answers", {room_answers: answer});
	});
}