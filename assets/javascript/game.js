/*global variables*/
var attackPower = 0;
var attackMsg = "";
var banana = new Audio("assets/images/banana.mp3");
var attack = new Audio("assets/images/attack.mp3");
var defenderOut = new Audio("assets/images/defenderOut.mp3");
var out = new Audio("assets/images/out.mp3");


/*character object containing character name , healthpoints, base attack power and counter attack power.
object method setPower returns player's attackpowers*/
var characterObject = {

	"character1": {
		"name": "Kevin",
		"healthPoints": 120,
		"attackPower": 8,
		"counterAttackPower": 15
	},
	"character2": {
		"name": "Bob",
		"healthPoints": 100,
		"attackPower": 15,
		"counterAttackPower": 5
	},
	"character3": {
		"name": "Dave",
		"healthPoints": 150,
		"attackPower": 6,
		"counterAttackPower": 20
	},
	"character4": {
		"name": "Stuart",
		"healthPoints": 180,
		"attackPower": 3,
		"counterAttackPower": 25
	},

	/*function to get the attack powers for player and defender*/

	setPower: function (player) {
		/*array to store baseattackpower and counterattackpower*/

		var attackPower = [];

		if (player === "c1") {
			attackPower[2] = this.character1.attackPower;
			attackPower[3] = this.character1.counterAttackPower;

		}
		if (player === "c2") {
			attackPower[2] = this.character2.attackPower;
			attackPower[3] = this.character2.counterAttackPower;
		}
		if (player === "c3") {
			attackPower[2] = this.character3.attackPower;
			attackPower[3] = this.character3.counterAttackPower;
		}
		if (player === "c4") {
			attackPower[2] = this.character4.attackPower;
			attackPower[3] = this.character4.counterAttackPower;
		}

		return attackPower;

	},

};

/*function to choose your character and enemies 
and also to choose defender from the enemies*/

$('#divCharacter').on('click', 'a', function () {
	
	banana.play();
	
	$("#hasEnemies").css({"display": "block"});
	var character = $("#divCharacter").children("a");
	$("#divCharacter").empty();
	$("#enemies").append(character);
	$("#divCharacter").prepend($(this));

	$("#enemies").children("a").children("img").css({
		"background-color": "red",
		"border": "3px solid black"
	});

	$("#enemies").children("a").on("click", function () {

		if ($("#defender").children().length <= 0) {
			$("#defender").append($(this));
			$("#defender").children("a").children("img").css({
				"color": "white",
				"background-color": "black",
				"border": "3px solid green"
			});
			$("#defender").children("a").children("span").css({
				"color": "white"
			});
			$("#attack").prop("disabled", false);
			$("#attackMsg").html("");
			$("#hasDefender").css({
				"display": "block"
			});
		}
	});

});

/*function for attack changes health points of player and defender based on defenders counterattackpower and player's attackpower respectively.
once all enemies are moved one by one to dfender area and been defeated , the player wins. if 
any of the defender defeats player the n the player losses the game. player win / loss the game is restarted
setting everything to game start*/

$("#attack").on("click", function () {

	
	var playerHealth = $("#divCharacter").children("a").children(".bottomWords").html();
	var defenderHealth = $("#defender").children("a").children(".bottomWords").html();
	var playerName = $("#divCharacter").children("a").children(".topWords").html();
	var defenderName = $("#defender").children("a").children(".topWords").html();

	var player = $("#divCharacter").children("a").attr("id");
	var defender = $("#defender").children("a").attr("id");

	var baseAttackPower = characterObject.setPower(player);
	var counterAttackPower = characterObject.setPower(defender);;

	attackPower += baseAttackPower[2];

	if ($("#defender").children().length <= 0 && $("#enemies").children().length > 0) {
		$("#attackMsg").html("Po-ka, choose buddy. ");
	} else if ($("#defender").children().length > 0) {
		attack.play();
		attackMsg = "You attacked  " + defenderName + " for  " + attackPower + "🍌 bananas . <br>" + defenderName + " attacked you back for " + counterAttackPower[3] + "🍌 bananas.";
		defenderHealth -= attackPower;

		if (defenderHealth <= 0) {
			if ($("#enemies").children().length > 0) {
				attackMsg = "You have eaten all bananas 🍌 from " + defenderName + ". Choose another buddy.";
				$("#hasDefender").css({
					"display": "none"
				});
				$("#defender").children("a").remove();
			} else {
				$("#hasDefender").css({
					"display": "none"
				});
				$("#hasEnemies").css({
					"display": "none"
				});
				attackMsg = "Tulaliloo ti amo Banana King 🍌" + playerName + "..... You Won !!";
				defenderOut.play();
				$("#attack").prop("disabled", true);
				$("#defender").children("a").remove();
				restart();
			}

		} else {
			playerHealth -= counterAttackPower[3];
			if (playerHealth <= 0) {
				out.play();
				attackMsg = "You lost all your bananas 🍌, Poopaye ! ";
				$("#attack").prop("disabled", true);
				restart();
			}
		}
		$("#divCharacter").children("a").children(".bottomWords").html(playerHealth);
		$("#defender").children("a").children(".bottomWords").html(defenderHealth);
		$("#attackMsg").html(attackMsg);
	}


});

/*function to create restart button to restart the game*/
function restart() {
	$("#restart").css({
		"display": "inline"
	});

	$("#restart").on("click", function () {
		$("#divCharacter").empty();
		$("#enemies").empty();
		$("#defender").empty();
		$("#attackMsg").html("");
		attackPower = 0;
		$("#divCharacter").append('<a href="#" class ="character" id="c1"> <img src="assets/images/character1.jpg" alt="character1" > <span class="topWords">'+characterObject.character1.name+'</span> <span class="bottomWords">'+characterObject.character1.healthPoints+'</span></a>');

		$("#divCharacter").append('<a href="#" class ="character" id="c2"><img src="assets/images/character2.jpg" alt="character2" > <span class="topWords">'+characterObject.character2.name+'</span><span class="bottomWords">'+characterObject.character2.healthPoints+'</span></a>');

		$("#divCharacter").append('<a href="#" class ="character" id="c3"><img src="assets/images/character3.jpg" alt="character3" > <span class="topWords">'+characterObject.character3.name+'</span><span class="bottomWords">'+characterObject.character3.healthPoints+'</span></a>');

		$("#divCharacter").append('<a href="#" class ="character" id="c4"><img src="assets/images/character4.jpg" alt="character4" > <span class="topWords">'+characterObject.character4.name+'</span><span class="bottomWords">'+characterObject.character4.healthPoints+'</span></a>');

		$("#divCharacter").children("a").children("img").css({
			"border": "3px solid red"
		});
		$("#hasEnemies").css({
			"display": "none"
		});
		$("#hasDefender").css({
			"display": "none"
		});
		$("#restart").css({
			"display": "none"
		});
	});

}