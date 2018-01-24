
var attackPower=0;
var attackMsg="";


var characters = $("#divCharacter").children("a");

var characterObject={

		"character1":{
			"name":"Obi-Wan Kenobi",
			"healthPoints":120,
			"attackPower":8,
			"counterAttackPower":15
		},
		"character2":{
			"name":"Luke Skywalker",
			"healthPoints":100,
			"attackPower":15,
			"counterAttackPower":5
		},
		"character3":{
			"name":"Darth Sidious",
			"healthPoints":150,
			"attackPower":6,
			"counterAttackPower":20
		},
		"character4":{
			"name":"Darth Maul",
			"healthPoints":180,
			"attackPower":3,
			"counterAttackPower":25
		},

		/*function to get the attack powers for player and defender*/

		setPower:function(player)
		{
			var attackPower=[];	
			//var baseAttackPower, counterAttackPower;

			if(player==="c1")
			{
				attackPower[0]=this.character1.name;
				attackPower[1]=this.character1.healthPoints;
				attackPower[2]=this.character1.attackPower;
				attackPower[3]=this.character1.counterAttackPower;	
				
			}
			if(player==="c2"){
				attackPower[0]=this.character2.name;
				attackPower[1]=this.character2.healthPoints;
				attackPower[2]=this.character2.attackPower;
				attackPower[3]=this.character2.counterAttackPower;	
			}
			if(player==="c3"){
				attackPower[0]=this.character3.name;
				attackPower[1]=this.character3.healthPoints;
				attackPower[2]=this.character3.attackPower;
				attackPower[3]=this.character3.counterAttackPower;	
			}
			if(player==="c4"){
				attackPower[0]=this.character4.name;
				attackPower[1]=this.character4.healthPoints;
				attackPower[2]=this.character4.attackPower;
				attackPower[3]=this.character4.counterAttackPower;	
			}

			return attackPower;

		},		

};

/*function to choose your character and enemies 
and also to choose defender from the enemies*/
//$('#a').on('click', '.b', function(){
//$(document.body).on("click","#divCharacter",function(){
$("#divCharacter").children("a").on("click",function(){
//$("#divCharacter").on("click",".character" , function(){

    $("#divCharacter").empty();
    $("#enemies").append(characters);
    $("#divCharacter").prepend($(this));
    $("#enemies").children("a").children("img").css({"background-color": "red", "border": "3px solid black"});

   $("#enemies").children("a").on("click",function(){

	    if($("#defender").children().length<=0)
	    {
			$("#defender").append($(this));
			$("#defender").children("a").children("img").css({"color":"white","background-color": "black", "border": "3px solid green"});
			$("#defender").children("a").children("span").css({"color":"white"});
	    	$("#attack").prop("disabled", false);
	    	$("#attackMsg").html("");
	    }	
    }); 

});

/*function for attack*/
	
$("#attack").on("click",function(){
	var playerHealth=$("#divCharacter").children("a").children(".bottomWords").html();
	var defenderHealth=$("#defender").children("a").children(".bottomWords").html();
	var playerName=$("#divCharacter").children("a").children(".topWords").html();
	var defenderName=$("#defender").children("a").children(".topWords").html();

	var player=$("#divCharacter").children("a").attr("id");
	var defender=$("#defender").children("a").attr("id");

	var baseAttackPower= characterObject.setPower(player);
	var counterAttackPower= characterObject.setPower(defender);;

	attackPower+=baseAttackPower[2];
	
	if($("#defender").children().length<=0  && $("#enemies").children().length>0)
	{
		$("#attackMsg").html("No Defender to attack");
	}
	else if($("#defender").children().length > 0 )
	{
		attackMsg= "You attacked  " +defenderName + " for  " +attackPower + " damage. <br>"+ defenderName + " attacked you back for " + counterAttackPower[3]+ " damage.";
		defenderHealth-=attackPower;
		
		if (defenderHealth<=0 )
		{
			if($("#enemies").children().length>0)
			{
			attackMsg="You have defeated " + defenderName + ". You can choose to fight another enemy.";
			$("#defender").children("a").remove();
			}
			else
			{
				attackMsg="You won ..... GAME OVER !!";
				$("#attack").prop("disabled", true);
				$("#defender").children("a").remove();
				 restart();
			}
	    	
		}	
		else
		{
			playerHealth-=counterAttackPower[3];
			if(playerHealth<=0)
			{
				attackMsg="You been defeated ..... GAME OVER !!";
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
function restart()
{
	$("#restart").css({"display":"block"});
	$("#restart").on("click",function(){
		$("#divCharacter").empty();
		$("#enemies").empty();
		$("#defender").empty();
		$("#attackMsg").html("");
		$("#divCharacter").prepend('<span class="words">Your Character</span>');
		$("#divCharacter").append('<a href="#" class ="character" id="c1"><img src="assets/images/character1.jfif" alt="character1" > <span class="topWords">Obi-Wan Kenobi</span><span class="bottomWords">'+120+'</span></a> <a href="#" class ="character" id="c2"><img src="assets/images/character2.jfif" alt="character2" > <span class="topWords">Luke Skywalker</span><span class="bottomWords">'+100+'</span></a> <a href="#" class ="character" id="c3"><img src="assets/images/character3.jfif" alt="character3" > <span class="topWords">Darth Sidious</span><span class="bottomWords">'+150+'</span></a> <a href="#" class ="character" id="c4"><img src="assets/images/character4.jfif" alt="character4" > <span class="topWords">Darth Maul</span><span class="bottomWords">'+180+'</span></a>'); 
		$("#divCharacter").children("a").children("img").css({"background-color": "white", "border": "3px solid green"});
		$("#restart").css({"display":"none"});
	});

}
/*var characterId=$(this).attr("id");
	console.log(characterId);	
	*/