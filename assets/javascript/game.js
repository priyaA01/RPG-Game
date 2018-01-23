
/*function to choose your character and enemies 
and also to choose defender from the enemies*/

var enemies = $("#divCharacter").children("a");

$(enemies).on("click",function(){

    enemies.remove();
    $("#enemies").append(enemies);
    $("#divCharacter").prepend($(this));
    $("#enemies").children("a").children("img").css({"background-color": "red", "border": "3px solid black"});

   $("#enemies").children("a").on("click",function(){

	    if($("#defender").children().length<=0)
	    {
	    	console.log("inside defender");
			$("#defender").append($(this));
			$("#defender").children("a").children("img").css({"color":"white","background-color": "black", "border": "3px solid green"});
			$("#defender").children("a").children("span").css({"color":"white"});
	    	$("#attack").prop("disabled", false);
	    }
	    else
	    {
	    	console.log("Defender already exists");
	    }	
    });
    


});

$("#attack").on("click",function(){
	var selectedCharacter=$("#divCharacter").children("a");
	var playerHealth=selectedCharacter.children(".bottomWords").html();
	var defenderCharacter=$("#defender").children("a");
	var defenderHealth=defenderCharacter.children(".bottomWords").html();
	
	var player=$("a").attr("id");

	console.log(playerHealth);
	
	console.log(defenderHealth);

	var baseAttackPower;
	var attackPower;
	var counterAttackPower;

	if(player==="c1"){
		baseAttackPower=8;
		counterAttackPower=10;
	}
	if(player==="c2"){
		baseAttackPower=10;
		counterAttackPower=5;
	}
	if(player==="c3"){
		baseAttackPower=5;
		counterAttackPower=20;
	}
	if(player==="c4"){
		baseAttackPower=3;
		counterAttackPower=25;		
	}




});





	/*var characterId=$(this).attr("id");
	console.log(characterId);	
	*/