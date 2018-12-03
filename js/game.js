//Funcion Random
function randomNum(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Pantalla
var screenWidth = 480, screenHeight = 270;

//Componentes
var player;
var blueDot, redDot, greenDot, yellowDot;
var blueTxt, redTxt, greenTxt, yellowTxt;
var gameOver = false;

//Preguntas
var questionsText = '{'+
						'"question" :'+
						'['+

							'{'+
								'"text" : "¿De dónde proviene la palabra Archetypos?",'+
								'"blueAnswer" : {"text" : "Griego", "value" : true},'+
								'"redAnswer" : {"text" : "Ruso", "value" : false},'+
								'"greenAnswer" : {"text" : "Latin", "value" : false},'+
								'"yellowAnswer" : {"text" : "Romano", "value" : false}'+
							'},'+

							'{'+
								'"text" : "Alguien que demora, ¿cuantas acciones hace con respecto a las necesarias?",'+
								'"blueAnswer" : {"text" : "Menos", "value" : false},'+
								'"redAnswer" : {"text" : "Más", "value" : true},'+
								'"greenAnswer" : {"text" : "Suficientes", "value" : false},'+
								'"yellowAnswer" : {"text" : "Insuficientes", "value" : false}'+
							'},'+

							'{'+
								'"text" : "Tras una expansión acelerada el crecimiento se vuelve",'+
								'"blueAnswer" : {"text" : "Más rápido", "value" : false},'+
								'"redAnswer" : {"text" : "Se mantiene", "value" : false},'+
								'"greenAnswer" : {"text" : "Más lento", "value" : true},'+
								'"yellowAnswer" : {"text" : "Decreciente", "value" : false}'+
							'},'+

							'{'+
								'"text" : "El uso prolongado de una solución a corto plazo es:",'+
								'"blueAnswer" : {"text" : "Positivo", "value" : false},'+
								'"redAnswer" : {"text" : "Suficiente", "value" : false},'+
								'"greenAnswer" : {"text" : "Insuficiente", "value" : false},'+
								'"yellowAnswer" : {"text" : "Dependiente", "value" : true}'+
							'},'+

							'{'+
								'"text" : "¿Qué procura aliviar síntomas de problemas obvios?",'+
								'"blueAnswer" : {"text" : "Los integrantes", "value" : false},'+
								'"redAnswer" : {"text" : "La intervención", "value" : true},'+
								'"greenAnswer" : {"text" : "Los problemas", "value" : false},'+
								'"yellowAnswer" : {"text" : "La atención", "value" : false}'+
							'},'+

							'{'+
								'"text" : "Una solución a corto plazo significa para la meta:",'+
								'"blueAnswer" : {"text" : "Eradicar", "value" : false},'+
								'"redAnswer" : {"text" : "Estructurar", "value" : false},'+
								'"greenAnswer" : {"text" : "Ser fundamental", "value" : false},'+
								'"yellowAnswer" : {"text" : "Deterioro", "value" : true}'+
							'},'+

							'{'+
								'"text" : "¿Qué aumenta una persona amenazada?",'+
								'"blueAnswer" : {"text" : "Su voluntad", "value" : false},'+
								'"redAnswer" : {"text" : "Su defensa", "value" : false},'+
								'"greenAnswer" : {"text" : "Su agresividad", "value" : true},'+
								'"yellowAnswer" : {"text" : "Su bienestar", "value" : false}'+
							'},'+

							'{'+
								'"text" : "A mayor éxito...",'+
								'"blueAnswer" : {"text" : "mayor respaldo", "value" : true},'+
								'"redAnswer" : {"text" : "menores recursos", "value" : false},'+
								'"greenAnswer" : {"text" : "más actividades", "value" : false},'+
								'"yellowAnswer" : {"text" : "más competencia", "value" : false}'+
							'},'+

							'{'+
								'"text" : "¿Cómo reaccionan los individuos ante la disminución de ganancias?",'+
								'"blueAnswer" : {"text" : "Disminuir esfuezo", "value" : false},'+
								'"redAnswer" : {"text" : "Intensificar esfuerzo", "value" : true},'+
								'"greenAnswer" : {"text" : "Aumentar necesidad", "value" : false},'+
								'"yellowAnswer" : {"text" : "Reparar recurso", "value" : false}'+
							'},'+

							'{'+
								'"text" : "Una solución eficaz a corto plazo tiene consecuencias",'+
								'"blueAnswer" : {"text" : "a corto plazo", "value" : false},'+
								'"redAnswer" : {"text" : "a mediano plazo", "value" : false},'+
								'"greenAnswer" : {"text" : "nunca", "value" : false},'+
								'"yellowAnswer" : {"text" : "a largo plazo", "value" : true}'+
							'},'+

							'{'+
								'"text" : "Para impedir la reducción del crecimiento se debe hacer una inversión",'+
								'"blueAnswer" : {"text" : "Intensa", "value" : true},'+
								'"redAnswer" : {"text" : "Lenta", "value" : false},'+
								'"greenAnswer" : {"text" : "Rápida", "value" : true},'+
								'"yellowAnswer" : {"text" : "Baja", "value" : false}'+
							'}'+

						']'+
					'}';

var questions = JSON.parse(questionsText);

function startGame()
{
    myGameArea.start();

    player = new snake(20, "white", screenWidth/2 - 10, screenHeight/2 - 10);

    blueDot = new dot("blue", screenWidth/4, screenHeight/4);
    redDot = new dot("red", screenWidth - screenWidth/4, screenHeight/4);
    greenDot = new dot("green", screenWidth/4, screenHeight - screenHeight/4);
    yellowDot = new dot("yellow", screenWidth - screenWidth/4, screenHeight - screenHeight/4);

    questionNumber = 0;
    actualQuestionText = new text(screenWidth/16, screenHeight/8, questions.question[questionNumber].text);

    blueTxt = new text(10, screenHeight/4, questions.question[questionNumber].blueAnswer.text, "blue", "15px Arial");
    redTxt = new text(10, screenHeight/4 + 50, questions.question[questionNumber].redAnswer.text, "red", "15px Arial");
    greenTxt = new text(10, screenHeight/4 + 100, questions.question[questionNumber].greenAnswer.text, "green", "15px Arial");
    yellowTxt = new text(10, screenHeight/4 + 150, questions.question[questionNumber].yellowAnswer.text, "yellow", "15px Arial");
}

function updateGameArea()
{
	if(!gameOver)
	{
	    myGameArea.clear();

	    player.update();
	    blueDot.update();
		redDot.update();
		greenDot.update();
		yellowDot.update();
		actualQuestionText.update();
		blueTxt.update();
		redTxt.update();
		greenTxt.update();
		yellowTxt.update();

		player.move();

		if (myGameArea.keys && myGameArea.keys[37]) {player.speedX = -player.maxSpeedX; player.speedY = 0;}
	    if (myGameArea.keys && myGameArea.keys[39]) {player.speedX = player.maxSpeedX; player.speedY = 0;}
	    if (myGameArea.keys && myGameArea.keys[38]) {player.speedY = -player.maxSpeedY; player.speedX = 0;}
	    if (myGameArea.keys && myGameArea.keys[40]) {player.speedY = player.maxSpeedY; player.speedX = 0;}

	    player.bounce();

	    if (player.collision(blueDot))
	    {
	    	blueDot.reposition();
	    	player.augmentSpeed();
	    	if (questions.question[questionNumber].blueAnswer.value)
	    	{
	    		actualQuestionText.nextQuestion();
	    	}
	    	else
	    	{
	    		alert("Game Over");
	    		gameOver = true;
	    	}
	    }
	    if (player.collision(redDot))
	    {
	    	redDot.reposition();
	    	player.augmentSpeed();
	    	if (questions.question[questionNumber].redAnswer.value)
	    	{
	    		actualQuestionText.nextQuestion();
	    	}
	    	else
	    	{
	    		alert("Game Over");
	    		gameOver = true;
	    	}
	    }
	    if (player.collision(greenDot))
	    {
	    	greenDot.reposition();
	    	player.augmentSpeed();
	    	if (questions.question[questionNumber].greenAnswer.value)
	    	{
	    		actualQuestionText.nextQuestion();
	    	}
	    	else
	    	{
	    		alert("Game Over");
	    		gameOver = true;
	    	}
	    }
	    if (player.collision(yellowDot))
	    {
	    	yellowDot.reposition();
	    	player.augmentSpeed();
    		if (questions.question[questionNumber].yellowAnswer.value)
    		{
    			actualQuestionText.nextQuestion();
    		}
    		else
    		{
    			alert("Game Over");
    			gameOver = true;
    		}
    	}
    }
}

var myGameArea =
{
    canvas : document.createElement("canvas"),
    start : function()
    {
        this.canvas.width = screenWidth;
        this.canvas.height = screenHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);

        window.addEventListener('keydown', function (e)
        {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        });

        window.addEventListener('keyup', function (e)
        {
        	myGameArea.keys[e.keyCode] = false;
        });
    },
    clear : function()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function snake(size, color, x, y)
{
	this.width = size;
    this.height = size;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeedX = 3;
    this.maxSpeedY = 3;
    this.speedAugment = 1.03;

    this.update = function()
    {
    	ctx = myGameArea.context;
    	ctx.fillStyle = color;
    	ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	this.move = function()
	{
        this.x += this.speedX;
        this.y += this.speedY;
    }

    this.collision = function(otherObj)
    {
    	myLeft = this.x;
        myRight = this.x + this.width;
        myTop = this.y;
        myBottom = this.y + this.height;

        otherLeft = otherObj.x;
        otherRight = otherObj.x + otherObj.width;
        otherTop = otherObj.y;
        otherBottom = otherObj.y + otherObj.height;

        touches = true;
        if((otherLeft > myRight) || (otherTop > myBottom) || (otherBottom < myTop) || (otherRight < myLeft))
        {
            touches = false;
        }
        return touches;
    }

    this.bounce = function()
    {
    	if(screenWidth <= this.x + this.width || 0 >= this.x)
    	{
    		if (screenWidth < this.x + this.width)
    		{
    			this.x = screenWidth - this.width;
    		}
    		if (0 > this.x)
    		{
    			this.x = 0;
    		}
    		this.speedX = this.speedX * (-1);
    	}
    	if(screenHeight <= this.y + this.height || 0 >= this.y)
    	{
    		if (screenHeight < this.y + this.width)
    		{
    			this.y = screenHeight - this.width;
    		}
    		if (0 > this.y)
    		{
    			this.y = 0;
    		}
    		this.speedY = this.speedY * (-1);
    	}
    }

    this.augmentSpeed = function()
    {
    	this.maxSpeedX = this.maxSpeedX * this.speedAugment;
    	this.maxSpeedY = this.maxSpeedY * this.speedAugment;
    }
}

function dot(color, x, y)
{
	this.width = 5;
    this.height = 5;
    this.x = x;
    this.y = y;
    this.answerType = color + "Answer";

    this.update = function()
    {
    	ctx = myGameArea.context;
    	ctx.fillStyle = color;
    	ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	this.reposition = function()
	{
		this.x = randomNum(0, screenWidth - this.width);
		this.y = randomNum(0, screenHeight - this.height);
	}
}

function text(x, y, text="null", color="white", font="12px Arial")
{
	this.x = x;
	this.y = y;
	this.color = color;
	this.font = font;
	this.text = text;

	this.update = function()
	{
		ctx = myGameArea.context;
		ctx.font = this.font;
		ctx.fillStyle = this.color;
		ctx.fillText(this.text, x, y);
	}

	this.nextQuestion = function()
	{
		questionNumber++;
		if(questionNumber > questions.question.length - 1)
		{
			this.text = "YOU WON!";
			alert("You Won");
			gameOver = true;
		}
		else
		{
			this.text = questions.question[questionNumber].text;
			blueTxt.text = questions.question[questionNumber].blueAnswer.text;
			redTxt.text = questions.question[questionNumber].redAnswer.text;
			greenTxt.text = questions.question[questionNumber].greenAnswer.text;
			yellowTxt.text = questions.question[questionNumber].yellowAnswer.text;
		}
	}
}