
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

// boite à outils :
var defaultDiacriticsRemovalMap = [
    {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
    {'base':'AA','letters':/[\uA732]/g},
    {'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
    {'base':'AO','letters':/[\uA734]/g},
    {'base':'AU','letters':/[\uA736]/g},
    {'base':'AV','letters':/[\uA738\uA73A]/g},
    {'base':'AY','letters':/[\uA73C]/g},
    {'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
    {'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
    {'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
    {'base':'DZ','letters':/[\u01F1\u01C4]/g},
    {'base':'Dz','letters':/[\u01F2\u01C5]/g},
    {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
    {'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
    {'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
    {'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
    {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
    {'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
    {'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
    {'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
    {'base':'LJ','letters':/[\u01C7]/g},
    {'base':'Lj','letters':/[\u01C8]/g},
    {'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
    {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
    {'base':'NJ','letters':/[\u01CA]/g},
    {'base':'Nj','letters':/[\u01CB]/g},
    {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
    {'base':'OI','letters':/[\u01A2]/g},
    {'base':'OO','letters':/[\uA74E]/g},
    {'base':'OU','letters':/[\u0222]/g},
    {'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
    {'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
    {'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
    {'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
    {'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
    {'base':'TZ','letters':/[\uA728]/g},
    {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
    {'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
    {'base':'VY','letters':/[\uA760]/g},
    {'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
    {'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
    {'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
    {'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
    {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
    {'base':'aa','letters':/[\uA733]/g},
    {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
    {'base':'ao','letters':/[\uA735]/g},
    {'base':'au','letters':/[\uA737]/g},
    {'base':'av','letters':/[\uA739\uA73B]/g},
    {'base':'ay','letters':/[\uA73D]/g},
    {'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
    {'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
    {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
    {'base':'dz','letters':/[\u01F3\u01C6]/g},
    {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
    {'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
    {'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
    {'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
    {'base':'hv','letters':/[\u0195]/g},
    {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
    {'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
    {'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
    {'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
    {'base':'lj','letters':/[\u01C9]/g},
    {'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
    {'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
    {'base':'nj','letters':/[\u01CC]/g},
    {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
    {'base':'oi','letters':/[\u01A3]/g},
    {'base':'ou','letters':/[\u0223]/g},
    {'base':'oo','letters':/[\uA74F]/g},
    {'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
    {'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
    {'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
    {'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B\u017F]/g},
    {'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
    {'base':'tz','letters':/[\uA729]/g},
    {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
    {'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
    {'base':'vy','letters':/[\uA761]/g},
    {'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
    {'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
    {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
    {'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
];
var changes;
function removeDiacritics (str) {
    if(!changes) {
        changes = defaultDiacriticsRemovalMap;
    }
    for(var i=0; i<changes.length; i++) {
        str = str.replace(changes[i].letters, changes[i].base);
    }
    return str.replace(/[\u0300-\u036F]/g, "");
}

function getMembresBCL(callback_success, callback_error) {
	return $.ajax("https://bcl.cnrs.fr/spip.php", {data: 'page=json&id_rubrique=2&membres&var_mode=calcul', dataType: 'json', jsonp: false, error: function() {		
		callback_error(-1);
	}, success: function( liste ) {
	  callback_success(liste);
	}});
}

// Note: la fonction getIdHAL() essaye tout d'abord de trouver l'idHal demandé parmis les formes auteurs de la collection (liste qui inclut donc en toute logique tous les membres publiants du laboratoire).
// En cas de réussite, la fonction callback_success ne retourne que l'idhal textuel (l'idhal numérique retourné est alors -1, et si on en a vraiment besoin, il faut refaire une deuxième requete AJAX dans la foulee pour le récuperer à partir de l'idhal textuel)
// En cas d'échec, une nouvelle recherche est faite parmi toute la base de HAL, et s'il y a un et un seul idhal candidat, il est retourné, à la fois en textuel et en numérique.
function getIdHAL(nom_de_la_collection, full_name, callback_success, callback_error) {
	var full_name_sci=removeDiacritics(full_name.toLowerCase());
	return $.ajax("https://api.archives-ouvertes.fr/search/"+nom_de_la_collection, {data: 'q=authFullName_t:'+encodeURIComponent(full_name_sci)+'&rows=0&wt=json&facet=true&facet.field=authFullNameIdHal_fs&facet.mincount=1&facet.limit=1000', dataType: 'json', jsonp: false, error: function() {
		callback_error(-2,full_name);
	}, success: function( d ) {
	  if (!d.facet_counts || !d.facet_counts.facet_fields || !d.facet_counts.facet_fields.authFullNameIdHal_fs)
		  callback_error(-1,full_name); 
	  else {
		  var reponses = d.facet_counts.facet_fields.authFullNameIdHal_fs;
		  for (var i = 0; i < reponses.length; i++) {
		    var rep = reponses[i]+'';
		    rep = rep.split("_FacetSep_");
		    if (full_name_sci == removeDiacritics(rep[0].toLowerCase())) {
		    	callback_success(-1,rep[1],full_name);
		    	return;
		    }
		  }
		  // user not found => let's try outside of the collection :
		  $.ajax("https://api.archives-ouvertes.fr/ref/author", {data: 'q=fullName_t:'+encodeURIComponent(full_name_sci)+'&wt=json&rows=2000&fl=docid,fullName_s,email_s,idHal_i,idHal_s,structureId_i,structure_s,valid_s&fq=idHal_i:(-0)&group=true&group.field=idHal_i&group.limit=200&sort=idHal_i+asc', dataType: 'json', jsonp: false, error: function() {
				callback_error(-4,full_name);
		  }, success: function( d ) {
			  if (!d.grouped || !d.grouped.idHal_i || !d.grouped.idHal_i.groups || !d.grouped.idHal_i.groups.length)
				  callback_error(-3,full_name); 
			  else {
				  var reponses = d.grouped.idHal_i.groups;
				  var nbIdHAL = reponses.length;
				  if (reponses[0].groupValue==0) {
				  	nbIdHAL--; // let's ignore users without IdHals.
				  }
				  if (nbIdHAL>1) {
				  	// several idHals (several people) with same name !
				  	callback_error(-9,full_name); 
				  	return;
				  }
				  if (nbIdHAL==1) {
				  	callback_success(reponses[reponses.length-1].groupValue,reponses[reponses.length-1].doclist.docs[0].idHal_s,full_name);
				  	return;
				  }
				  // else : nbIdHAL==0 && reponses.length==1 && reponses[0].groupValue==0
				  // (only user(s) without IdHAL) => let's return 0 / empty string.
				  callback_success(0,"",full_name);
			  }
		  }});
	  }
	}});
}

// Récupère la liste des formes auteurs d'une collection (ou d'un laboratoire possédant une collection)
// Le parametre id_structures est facultatif : il s'agit d'un tableau d'identifiants de structures. S'il est présent, ne seront pris en compte que les formes auteurs affiliées à l'une de ces structures. Cela permet de filtrer les coauteurs qui ne sont pas membres de ce laboratoire. Ex : id_structures = [199944, 107319]
function getFormesAuteurs(nom_collection, id_structures, callback_success, callback_error) {
	return $.ajax("https://api.archives-ouvertes.fr/search/"+nom_collection, {data: 'q=*&rows=0&wt=json&facet=true&facet.field=structHasAuthIdHal_fs&facet.mincount=1&facet.limit=1000', dataType: 'json', jsonp: false, error: function() {		
		callback_error(-2);
	}, success: function( data ) {
	  if (!data.facet_counts || !data.facet_counts.facet_fields || !data.facet_counts.facet_fields.structHasAuthIdHal_fs)
	  		callback_error(-1,full_name); 
	  else {
		  var reponses = data.facet_counts.facet_fields.structHasAuthIdHal_fs;
		  var liste = [];
		  if (reponses !== undefined)
			  for (var i = 0; i < reponses.length; i+=2) {
			    var rep = reponses[i]+'';
			    rep = rep.split(/_FacetSep_|_JoinSep_/);
			    var membre = true;
			    if (id_structures && id_structures.length) {
			    	membre = false;
				    for (var j = 0; j < id_structures.length; j++)
				    	if (rep[0]==id_structures[j]) {
				    		membre |= true;
				    		break;
				  		}
			    }
			    if (membre)
			    	liste.push({idhal: rep[2], name: rep[3], nb_depots: reponses[i+1]});
			  }
		  callback_success(liste);
	  }
	}});
}

// Retrieves firstname and lastname values from fullname
// The callback_function will receive 3 parameters : firstname, lastname, and method used (see below) to retrieve them (2 == optimized method, without AJAX search on AureHal (very reliable), 1 == reliable AJAX search by idhal, 0 == unreliable AJAX search by fullname, negative number == AJAX search failed, reverted to very unreliable fallback best-effort method. : -3 = no matching in returned results -2 = empty response returned, -1 = ajax error) 
// Optimized way: when fullname only contains one space, this space is considered as the separator between firstname and lastname, and in this specific case no AJAX search is triggered on AureHal, therefore idhal_s is not required and function immediately returns timeoutID (just an integer) instead of jqXHR object.
// If you want to be sure to trigger this optimization, you may use '+' to introduce escaped spaces inside <firstname> or <lastname>
// Unoptimized way : an AJAX search is triggered on AureHal (based on idHal if idhal_s is provided, or based on fullname if not)
// When idhal_s is not provided OR when AJAX search fails, this function will do best effort but it may lead to errors or approximations (some fullnames may be incorreclty parsed, notably when homonyms are returned by the AJAX search).
function getFirstnameLastname(fullname, idhal_s, callback_function) {
		var name = fullname.split(new RegExp("[\\s]+","gi"));
		if (name.length==2) {
			return window.setTimeout( function(){ callback_function(name[0], name[1], 2); });
		} else {
			var fallback_best_effort = function(f, errno) {
				var fullname_s = fullname.replace(/\+|\s+/g, " ");
				// TODO : A voir: ici on pourrait detecter un pattern du type "minuscules bla bla MAJUSCULES BLA" qui nous donnerait une indication sur la frontière entre prénomnom, mais il ya le problème épineux des accents Unicode à gérer.
				callback_function(name[0], name[1], errno);
				// TODO : A voir: au lieu de couper bêtement au premier espace trouvé, on pourrait chercher dans une liste de prénoms connus (et dans une liste de particules de noms propres connues) pour essayer de donner des poids aux différents espaces pour déterminer celui qui obtient le meilleur score.
			}
			var requete = "wt=json&rows=32&sort=valid_s%20desc&fl=idHal_s,firstName_s,lastName_s,fullName_s,valid_s";
			requete += (idhal_s!=""? "&q=idHal_s:%22" + idhal_s + "%22"
			                       : "&q=fullName_sci:%22" + fullname.replace(/\s+/g, "+") + "%22");
			return $.ajax("https://api.archives-ouvertes.fr/ref/author", {data: requete, dataType: 'json', jsonp: false, error: function() {		
				fallback_best_effort(fullname, -1);
			}, success: function( data ) {
				if (!data.response || !data.response.docs || !data.response.docs.length)
					fallback_best_effort(fullname, -2);
				else {
					var reponses = data.response.docs;
					var fullname_s = fullname.replace(/\+|\s+/g, " ");
					var fullname_sci = removeDiacritics(fullname_s.toLowerCase());
					var exactMatch = -1;
					var insensitiveMatch = -1;
					for (var i = 0; i < reponses.length; i++) {
						if (reponses[i].firstName_s+" "+reponses[i].lastName_s==fullname_s) {
							exactMatch = i;
							break;
						}
						if (removeDiacritics(reponses[i].firstName_s+" "+reponses[i].lastName_s).toLowerCase()==fullname_sci) {
							insensitiveMatch = i;
						}
					}
					var i = insensitiveMatch;
					if (exactMatch >= 0)
						i = exactMatch;
					if (i >= 0)
						callback_function(reponses[i].firstName_s, reponses[i].lastName_s, (idhal_s!=""? 1 : 0));
					else
						fallback_best_effort(fullname, -3);
				}
			}});
		}
}

// Effectue une requête AJAX puis appelle la fonction success_callback avec un parametre booleen qui vaut vrai si la requete AJAX a retourné un tableau vide, faux sinon.
// En cas d'erreur, la fonction error_callback est appelée en lieu et place de success_callback
function is_empty_json_response(ajax_url, ajax_request, callback_success, callback_error) {
	return $.ajax(ajax_url, {data: ajax_request, dataType: 'json', jsonp: false, error: function() {
		if (callback_error)
			callback_error(-1);
	}, success: function( data ) {
		var there_is_something = false;
		if (data.response && data.response.numFound)
			there_is_something |= (data.response.numFound > 0);
		if (data.grouped)
			for (var child in data.grouped)
				if (data.grouped.hasOwnProperty(child))
					there_is_something |= (data.grouped[child].matches);
		if (callback_success)
			callback_success(!there_is_something);
	}});
}


function getJournalID(journal_name, callback_success, callback_error, original_journal_name) {
	if (!original_journal_name)
		original_journal_name = journal_name;
	var trimmed_name = journal_name.replace(/^[\s-"'_.;,]*/, '').replace(/[\s-"'.:;_,]$/, '').replace(/\+|\s+/g, " ").replace(/’/g, "'");
	return $.ajax("https://api.archives-ouvertes.fr/ref/journal/", {data: 'q=title_t:%22'+encodeURIComponent(trimmed_name)
	+'%22&wt=json&fl=docid,label_s,title_s,titleAbbr_s,valid_s&sort=valid_s+desc,label_s+asc&rows=1000', dataType: 'json', jsonp: false, error: function() {
		if (callback_error)
			callback_error(-1, original_journal_name);
	}, success: function( data ) {
		if (!data.response || !data.response.docs)
			callback_error(-2, original_journal_name);
		else {
			var reponses = data.response.docs;
			var fullname_s = trimmed_name;
			var fullname_sci = removeDiacritics(fullname_s.toLowerCase());
			var exactMatch = -1;
			var insensitiveMatch = -1;
			var abbrevMatch = -1;
			var partialMatch = -1;
			for (var i = 0; i < reponses.length; i++) {
				if ((!reponses[i].titleAbbr_s || reponses[i].titleAbbr_s=='') && reponses[i].title_s) {
					// on essaye d'extraire l'acronyme dans le titre (si il y est) :
					if (reponses[i].title_s.match(/^\s*([A-Z]\.)+[A-Z]?\s*$/i)) {
							reponses[i].titleAbbr_s=reponses[i].title_s;
					} else {
						var matches = fullname_sci.match(/\([A-Z]\.?[A-Z]\.?(?:[A-Z]\.?)+\)/i);
						if (matches && matches[0]!='') {
							reponses[i].titleAbbr_s=matches[0].replace(/[()]/gi, "");
						}
					}
				}
				if (reponses[i].title_s && reponses[i].title_s.replace(/’/g, "'")==fullname_s) {
					exactMatch = i;
					break;
				}
				if (insensitiveMatch == -1 && reponses[i].title_s && removeDiacritics(reponses[i].title_s).toLowerCase().replace(/’/g, "'")==fullname_sci) {
					insensitiveMatch = i;
				}
				if (abbrevMatch == -1 && reponses[i].titleAbbr_s && removeDiacritics(reponses[i].titleAbbr_s).toLowerCase().replace(/\./gi, '')==fullname_sci.replace(/\./gi, '')) {
					abbrevMatch = i;
				}
				if (partialMatch == -1 && reponses[i].title_s && removeDiacritics(reponses[i].title_s).toLowerCase().replace(/’/g, "'").match('^\\s*'+fullname_sci.replace(/[|.?^$\[\](){}\\/]/gi, "\\$1"))) {
					partialMatch = i;
				}
			}
			var i = partialMatch;
			if (abbrevMatch >=0)
				i = abbrevMatch;
			if (insensitiveMatch >=0)
				i = insensitiveMatch;
			if (exactMatch >= 0)
				i = exactMatch;
			if (i >= 0)
				callback_success(reponses[i].docid, original_journal_name, reponses[i]);
			else {
				var matches = fullname_sci.match(/\([A-Z][A-Z][A-Z]+\)/i);
				if (matches && matches[0]!='') {
					// on refait une tentative avec juste l'acronyme :
					getJournalID(matches[0].replace(/[()]/gi, ""), callback_success, callback_error, original_journal_name);
				} else if (fullname_sci.match(/\(.+\)\s*$/i)) {
					// on refait une tentative sans la parenthèse :
					getJournalID(fullname_sci.replace(/\(.+\)\s*$/i, ''), callback_success, callback_error, original_journal_name);
				} else if (fullname_sci.match(/[:]/)) {
					// on refait une tentative avec juste le début du titre :
					getJournalID(fullname_sci.replace(/\s*[:](.*)$/gi, ""), callback_success, callback_error, original_journal_name);
				} else if (fullname_sci.match(/[\-/]/)) {
					getJournalID(fullname_sci.replace(/\s*[\-/](.*)$/gi, ""), callback_success, callback_error, original_journal_name);
				} else 
					callback_success(0, original_journal_name, []);
			}
		}
	}});
}


function getStructures(query, callback_success, callback_error) {
	return $.ajax("https://api.archives-ouvertes.fr/ref/structure/", {data: 'q='+query+'&wt=json&fl=name_s,code_s,acronym_s,docid,address_s,type_s,url_s,valid_s,updateDate_s,parentDocid_i&group=true&group.field=type_s&group.limit=200&sort=type_s+asc,valid_s+desc,name_s+asc', dataType: 'json', jsonp: false, error: function() {		
		callback_error(-1, query);
	}, success: function( d ) {
	  var reponses = d.grouped.type_s.groups;
	  var structure_groups = {};
	  var structures_tree = [];
	  if (reponses !== undefined) {
		  for (var i = 0; i < reponses.length; i++) {
		  	structure_groups[reponses[i].groupValue]=reponses[i].doclist.docs;
		  }
	  }
	  if (structure_groups.institution) {
		  for (var i = 0; i < structure_groups.institution.length; i++) {
		  	structures_tree.push(structure_groups.institution[i]);
		  }
		  delete structure_groups.institution;
	  }
	  if (structure_groups.laboratory) {
		  for (var i = 0; i < structure_groups.laboratory.length; i++) {
		  	structures_tree.push(structure_groups.laboratory[i]);
		  }
		  delete structure_groups.laboratory;
	  }
	  if (structure_groups.department) {
		  for (var i = 0; i < structure_groups.department.length; i++) {
		  	structures_tree.push(structure_groups.department[i]);
		  }
		  delete structure_groups.department;
	  }
	  if (structure_groups.researchteam) {
		  for (var i = 0; i < structure_groups.researchteam.length; i++) {
		  	structures_tree.push(structure_groups.researchteam[i]);
		  }
		  delete structure_groups.researchteam;
	  }
	  for (var key in structure_groups) {
		  // skip loop if the property is from prototype
		  if (!structure_groups.hasOwnProperty(key)) continue;
		  for (var i = 0; i < structure_groups[key].length; i++) {
		  	structures_tree.push(structure_groups[key][i]);
		  }
	  }
	  // now let's make an index of all available Docids :
	  var structures_index = {};
	  for (var i = 0; i < structures_tree.length; i++) {
	  	structures_index[structures_tree[i].docid+'']=structures_tree[i];
	  }
	  // and then, let's move siblings to their right place :
	  for (var i = 0; i < structures_tree.length; i++) {
	  	for (var j = 0; j < (structures_tree[i].parentDocid_i ? structures_tree[i].parentDocid_i.length : 0); j++) {
	  		if (structures_index[structures_tree[i].parentDocid_i[j]+'']) {
	  			if (!structures_index[structures_tree[i].parentDocid_i[j]+''].substructures) {
	  				structures_index[structures_tree[i].parentDocid_i[j]+''].substructures = [];
	  			}
	  			structures_index[structures_tree[i].parentDocid_i[j]+''].substructures.push(structures_tree[i]);
	  			structures_tree.splice(i,1);
	  			i--;
	  			break;
	  		}
	  	}
	  }
	  callback_success(reponses, structures_index, structures_tree, query);
	}});
}

function writeStructures(structures, level, lang) {
	var c = "";
	for (var j = 0; j < structures.length; j++) {
		var s = structures[j];
		c = c + '<div class="row">';
		for (var i = 0; i < (level-1); i++) {
			c = c + '<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"><div class="bounds b_vertical b_vertical_0" style="display: none;"></div><div class="bounds b_horizontal b_horizontal_0" style="display: none;"></div></div>';
		}
		if (level > 0) {
			c = c + '<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"><div class="bounds b_vertical b_vertical_1 b_last "></div><div class="bounds b_horizontal b_horizontal_1 b_last "><i class="glyphicon glyphicon-play arrow" style="left:7px;"></i></div></div>';
		}
		c = c + '<div data-rank="'+(12-level)+'" class="col-xs-'+(12-level)+' col-sm-'+(12-level)+' col-md-'+(12-level)+' col-lg-'+(12-level)+'" data-category="'+s.type_s+'">';
		var icon_class = "";
		if (s.valid_s=="VALID") { icon_class = "alert-success"; }
		if (s.valid_s=="INCOMING") { icon_class = "alert-danger"; }
		if (s.valid_s=="OLD") { icon_class = "alert-warning"; }
		var block_class = "statut-"+s.valid_s;
		var titre = "This structure was last updated on "+s.updateDate_s;
		var icon_type_struct = '<span class="label label-primary">'+s.type_s[0].toUpperCase()+s.type_s.slice(1)+'</span>';
		if (lang=="fr") {
			if (s.type_s=="researchteam") { icon_type_struct = '<span class="label label-primary">&Eacute;quipe de recherche</span>'; }
			if (s.type_s=="department")   { icon_type_struct = '<span class="label label-success">D&eacute;partement</span>'; }
			if (s.type_s=="laboratory")   { icon_type_struct = '<span class="label label-warning">Laboratoire</span>'; }
			if (s.type_s=="institution")  { icon_type_struct = '<span class="label label-danger">Institution</span>'; }
			titre = "Structure mise &agrave; jour le "+s.updateDate_s;
		} else {
			if (s.type_s=="researchteam") { icon_type_struct = '<span class="label label-primary">Research Team</span>'; }
		}
		c = c + '<blockquote class="structure-element-'+s.type_s+' '+block_class+'" title="'+titre+'">';
		c = c + '<div class="boutons_supplementaires"><a class="btn btn-primary" target="_blank" href="https://hal.archives-ouvertes.fr/search/index/q/*/structId_i/'+s.docid+'">Voir les d&eacute;p&ocirc;ts associ&eacute;s</a></div>';
		c = c + '<h6 onclick="link(\'https://aurehal.archives-ouvertes.fr/structure/read/id/'+s.docid+'\');"><i style="background:none;border:0;" class="glyphicon glyphicon-ok-circle '+icon_class+'"></i>&nbsp;'+s.name_s+'&nbsp;'+icon_type_struct+'<span class="badge">'+s.docid+'</span></h6><div onclick="link(\'https://aurehal.archives-ouvertes.fr/structure/read/id/'+s.docid+'\');"><small>'+s.acronym_s+'</small>'+(s.code_s && s.code_s!=''?'<small><i>'+s.code_s+'</i></small>':'')+(s.address_s && s.address_s!=''?'<small>'+s.address_s+'</small>':'')+'France'+(s.url_s && s.url_s!=''?'<small><a target="_blank" href="'+s.url_s+'">'+s.url_s+'</a></small>':'')+'</div></blockquote>';
		c = c + "</div></div>";
		if (s.substructures && s.substructures.length>0) {
			c = c + writeStructures(s.substructures, level+1, lang);
		}
	}
	return c;
}

// Generates part of a search URL containing all name variations possible for a given fullname.
// This is especially usefull when searching on fields like scientificEditor_t or seriesEditor_t
// examples: "Pierre-Aurélien Del Giudice" will return "%22del+giudice+Pierre-Aurelien%22+OR+%22Pierre-Aurelien+del+giudice%22+OR+%22del+giudice+P%2EA%2E%22+OR+%22P%2EA%2E+del+giudice%22+OR+%22del+giudice+P%2E A%2E%22+OR+%22P%2E A%2E+del+giudice%22+OR+%22del+giudice+P%2DA%2E%22+OR+%22P%2DA%2E+del+giudice%22+OR+%22del+giudice+P%2E%2DA%2E%22+OR+%22P%2E%2DA%2E+del+giudice%22"
//           "Jean-R. Parada Gonzalez" should return "%22parada+jean-r%2E%22+Or+%22jean-r%2E+parada%22+Or+%22parada+j%2Er%2E%22+Or+%22j%2Er%2E+parada%22+Or+%22parada+j%2E r%2E%22+Or+%22j%2E r%2E+parada%22+Or+%22parada+j%2Dr%2E%22+Or+%22j%2Dr%2E+parada%22+Or+%22parada+j%2E%2Dr%2E%22+Or+%22j%2E%2Dr%2E+parada%22"
//           "M.Paule Foo-Salvan" should return "%22foo+m%2Epaule%22+Op+%22m%2Epaule+foo%22+Op+%22foo+m%2Ep%2E%22+Op+%22m%2Ep%2E+foo%22+Op+%22foo+m%2E p%2E%22+Op+%22m%2E p%2E+foo%22+Op+%22foo+m%2Dp%2E%22+Op+%22m%2Dp%2E+foo%22+Op+%22foo+m%2E%2Dp%2E%22+Op+%22m%2E%2Dp%2E+foo%22"
//			 "Philippe-Christian XXX" should return all combinations of [P. | Ph.] + [Chr. | Ch. | C.]
//
// Notes : when the lastname contains several words, the search is performed on the first word only when first word is at least 5 chars long. This is in order to avoid situations where "van der Schmutz" would be reduced to "van" and nevertheless account for situations where "Parada Gonzalez" or "Gaudin-Salvan" should be reduced respectively to "Parada" and "Gaudin"...
function generate_alternate_names(firstname, lastname) {
	var prenoms=removeDiacritics(firstname);
	var nom = removeDiacritics(lastname).split(new RegExp("[^a-z'\u2018-\u201B]","gi"));
	if (nom[0].length<5) {
		nom = removeDiacritics(lastname).split(new RegExp("-","gi"));
	}
	nom = encodeURIComponent(nom[0]);
	var alternate_criterias="%22"+nom+"+"+encodeURIComponent(prenoms)+"%22+OR+%22"+encodeURIComponent(prenoms)+"+"+nom+"%22";

	prenoms = prenoms.split(new RegExp("[^a-z'\u2018-\u201B]","gi"));
	if (!prenoms || prenoms.length < 1)
		return "%22"+nom+"%22";

	var my_recursive_function = function (firstnames, first_lastname, level) {
		var initiales = [];
		var abreviation=(new RegExp("^['\u2018-\u201B]?[aeiouy]","i")).exec(firstnames[level-1]);
		if (!abreviation)
			abreviation=firstnames[level-1].split(new RegExp("[aeiouy]","gi"));
		abreviation=abreviation[0];
		for (var j=1;j<=abreviation.length;j++)
			initiales.push(encodeURIComponent(abreviation.slice(0,j)));
		if (level < firstnames.length) {
			var result = [];
			var rest = arguments.callee(firstnames, first_lastname, level+1);
			for (var j=0;j<initiales.length;j++)
				for (var i=0;i<rest.length;i++)
					result.push(initiales[j]+" "+rest[i]);
			return result;
		}
		return initiales;
	};
			
	var initiales = my_recursive_function(prenoms, nom, 1);
	for (var j=0;j<initiales.length;j++) {
		alternate_criterias=alternate_criterias+"+OR+%22"+nom+"+"+initiales[j]+"%2E%22+OR+%22"+initiales[j]+"%2E+"+nom+"%22";
	}
	if (alternate_criterias.match(/ /)) {
		alternate_criterias = alternate_criterias.replace(/ /g,"%2E")+alternate_criterias.replace(/ /g,"%2E ")+alternate_criterias.replace(/ /g,"%2D")+alternate_criterias.replace(/ /g,"%2E%2D");
	}
	return alternate_criterias;
}

