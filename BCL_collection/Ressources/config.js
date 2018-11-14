
(function() {
	
	/// PARAMETRES A CONFIGURER POUR VOTRE COLLECTION HAL : ///
	///////////////////////////////////////////////////////////

	my_config.code_collection = "BCL"; // acronyme de la collection HAL, à taper en MAJUSCULES !!!
	
	my_config.codes_structures_labo = [199944, 107319]; // mettre ici entre crochets un ou plusieurs n° de structure séparés par des virgules. Ne mettre que les structure du niveau le plus élevé (i.e. mettre ici les "laboratoire" mais pas les "équipes de recherche" par ex.). Vous pourrez trouvez ces numéros dans AuréHAL en cherchant dans le référentiel des Structures.
	
	my_config.url_membres_labo = "https://bcl.cnrs.fr/spip.php?page=json&id_rubrique=2&membres&var_mode=calcul"; // URL où l'on peut récupérer un fichier JSON contenant la liste des membres du laboratoire (avec colonnes nom et prénom obligatoires, mais on peut y ajouter d'autres colonnes si besoin). Ce paramètre est utilisé par les différentes pages d'administration présentes dans le sous-dossier Admin/Membres.
	
	my_config.critere_sous_structures = "(acronym_t:"+my_config.code_collection+"+OR+parentAcronym_t:"+my_config.code_collection+"+OR+code_s:(UMR7320+OR+UMR6039)+OR+name_t:(Bases+Corpus+Langage)+OR+parentName_t:(Bases+Corpus+Langage))"; // Ce paramètre est utilisé par la page d'administration des sous-structures. Mettre ici le ou les codes UMR de votre laboratoire, ainsi que son nom dans lequel vous aurez remplacé les espaces par des + et tous les caractères qui ne sont pas des lettres doivent être échappés (sous la forme URI encode)

})();

/// PERSONNALISATION DE L'INTERFACE GRAPHIQUE DE LA COLLECTION : /////
//////////////////////////////////////////////////////////////////////

// personnalisation du menu de navigation HAL (navbar fixed) :
$("body > div.navbar > div.navbar-collapse > ul.navbar-nav > li:last-child").before("<li class='ladoc active'><a href='https://hal.archives-ouvertes.fr/section/documentation' title='Documentation HAL' style='font-weight: bold;'>Doc</a></li>");

// personnalisation de l'encart en haut à droite (lorsque l'utilisateur est connecte) :
$("body > div.navbar > div.navbar-collapse > div.navbar-right > ul > li > ul > li:first-child > table td.text-left a").removeClass();
$("body > div.navbar > div.navbar-collapse > div.navbar-right > ul > li > ul > li:first-child > table td.text-left a:first-of-type").replaceWith("<a href='https://hal.archives-ouvertes.fr/user/space' class='btn btn-primary btn-xs'>Mon espace</a> <a href='https://hal.archives-ouvertes.fr/user/submissions' class='btn btn-primary btn-xs'>Mes d&eacute;p&ocirc;ts</a>");

// personnalisation des _blank sur les liens hypertextes (une fois la page finie de charger) :
$(function(){
    $(".logo td:last-child a").attr("target","");
    $("#container .sidebar-nav > ul > li:nth-last-child(2):not(.dropdown) > a").attr("target","_blank"); 
});