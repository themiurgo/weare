

/* Accordion Menu (mission) */

function accordion(){
 $("dd:not(:first)").hide();
 $("dt a").click(function(){
	 $("dd:visible").slideUp("slow");
	 $(this).parent().next().slideDown("slow");
	 return false;
	 });
};
