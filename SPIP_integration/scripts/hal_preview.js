
/* Le code javascript ci-dessous est destiné à afficher les détails d'une publication HAL au sein d'un pop-up,
lorsqu'on clique sur la publi en question.

   Il utilise pour cela le plugin nivoslider-v2 qui est notamment proposé par le Kit CNRS 
   
*/

$(document).ready(function() {

var est_une_page_perso = $("body.p-auteur").length > 0;

$("#res_script dd.Titre a").attr("rel", "external"); // peut importe ce que l'on met comme valeur, mais le mediabox se base sur le contenu de l'attribut rel pour savoir quels sont les elements qui font partie d'un meme groupe.

$("#res_script dd.Titre a").mediabox({

	href:"spip.php?page=hal_preview",
	
	minHeight: "80%",
	minWidth:  "80%",
	
	title: function(){
	    var url = $(this).attr('href');
	    if (url != null && !est_une_page_perso)
			url = url.replace('.fr/hal', '.fr/BCL/hal');
        var hal_id = url.match(/([^:.\/]*)$/i);
		if (hal_id.length == 2)
			hal_id = hal_id[1];
		else
			hal_id = "Voir sur HAL";
	    return '<a href="'+url+'" target="_blank"><img class="logo hal" src="https://hal.archives-ouvertes.fr/img/favicon.png" />' + hal_id + '</a>';
	},
	
	onShow: function(){
		var resume = $(this).parent().parent().find(".resume").html();
		if (resume == null)
		  resume = $(this).parent().parent().find(".Debut_du_resume").html();
		$("#hal_preview .abstract").html(resume);

		var titre = $(this).parent().parent().find(".Titre").html();
		if (titre != null && !est_une_page_perso)
			titre = titre.replace('.fr/hal', '.fr/BCL/hal');
		$("#hal_preview .titre").html(titre);
		$("#hal_preview .titre a").removeClass("cboxElement"); // on retire l'attribut rel pour eviter que mediabox fasse n'importe quoi.

		var vignette = $(this).parent().parent().find(".Vignette").html();
		if (vignette != null)
			vignette = vignette.replace('/thumb/little', '/thumb/large');
	    if (vignette != null && !est_une_page_perso)
			vignette = vignette.replace('.fr/hal', '.fr/BCL/hal');
		$("#hal_preview .vignette").html(vignette);

		var url_pdf = $(this).parent().parent().find(".Fichier_joint a").attr('href');
		if (url_pdf != null && url_pdf.length > 0)
			$("#hal_preview .vignette a").attr('href', url_pdf);

		var auteurs = $(this).parent().parent().find(".Auteurs").html();
		$("#hal_preview .auteurs").html(auteurs);

		var revue = $(this).parent().parent().find(".article").html();
		$("#hal_preview .revue").html(revue);

		var annee = $(this).parent().parent().find(".annee_publi").html();
		$("#hal_preview .annee").html(annee);

		var type_pub = $(this).parent().parent().find(".Type_de_document").html();
		$("#hal_preview .type_pub").html(type_pub);
	}

});

}); /* end of $(document).ready(function() */
