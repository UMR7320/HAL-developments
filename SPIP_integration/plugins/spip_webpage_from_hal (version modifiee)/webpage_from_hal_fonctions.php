<?php

function __is_https() {
	// en fait toutes les lignes ci-dessous ne sont pas fiables, 
	// car il y a plein de serveurs qui sont mal configurés
	// et qui ne renvoient aucunes de ces variables,
	// donc dans le doute, le plus simple est de 
	// systématiquement basculer tous les <img src="..."> en https://
				
	return true;
	
	$isSecure = false;
	if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') {
	    $isSecure = true;
	}
	if (!empty($_SERVER['HTTP_HTTPS']) && $_SERVER['HTTP_HTTPS'] != 'off') { 
	    $isSecure = true;
	}
	if (isset($_SERVER['REQUEST_SCHEME']) && $_SERVER['REQUEST_SCHEME'] == 'https') { 
	    $isSecure = true;
	}
	if (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == '443') { 
	    $isSecure = true;
	}
	if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https' 
	|| !empty($_SERVER['HTTP_X_FORWARDED_SSL']) && $_SERVER['HTTP_X_FORWARDED_SSL'] == 'on') {
	    $isSecure = true;
	}
	return $isSecure;
}

function hal_parse($url, $size = null, $div_encapsulation = true) {
    $url = trim(html_entity_decode($url), "\"' ");

    $infos = parse_url($url);
    $ip = gethostbyname($infos['host']);

    if ($ip != '193.48.96.10') {
        spip_log("Url invalid", _LOG_ERREUR);
        
        return;
    }

    spip_log(sprintf("[hal_parse] init_http(%s)", $url), _LOG_DEBUG);
    $content = recuperer_page($url);
    spip_log(sprintf("[hal_parse] init_http(%s): Done", $url), _LOG_DEBUG);

    $dom = new DomDocument('1.0', 'UTF-8');
    $dom->preserveWhiteSpace = false;
   
    $str = mb_convert_encoding($content, "HTML-ENTITIES");
    @$dom->loadHTML($str);
    
    // add years to the <dl> tag (in order to be able to use the CSS flexbox layout model, with order: ...) : 
    foreach ($dom->getElementsByTagName('dd') as $item) {	
    	if (strpos($item->getAttribute('class'), "annee_publi")===false)
    		continue;
    	// else:
    	$year = $item->nodeValue;
	    $item->parentNode->setAttribute('data-year', $year);
	}

    $xpath = new DOMXpath($dom);
    $entries = $xpath->query('//div[@id="res_script"]');

    if ($entries->length == 0) {
        spip_log("No tag found ...", _LOG_ERREUR);
        return;
    }

    $res_script = $dom->saveXML($entries->item(0));  
    
    if (!$div_encapsulation) {
    	// let's remove the <div id="res_script">...</div> : 
    	$res_script = preg_replace("/<div\s+id\s*=\s*['\"]res_script['\"]>/i", "", $res_script);
    	$res_script = preg_replace("/<\/div\s*>/i", "", $res_script);
    }
    
    if (strpos($url, "CB_Resume_court=oui")>0) {
    // let's encapsulate the ending "....." inside a <span> (in order to be able to enhance it via the CSS, AND/OR in order to be able to click on it via a javascript onClick event)
	    $res_script = str_replace(" .....</dd>", "<span> .....</span></dd>", $res_script);
    }
    
    // let's choose the size of the thumbnails : 
    if ($size && $size!="little" && preg_match("/^[a-z_]+$/i", $size))
    	$res_script = str_replace("/thumb/little","/thumb/".$size, $res_script);
    
    // let's put a direct link to the PDF download, when we are sure there is always a PDF :
    $res_script = preg_replace("~(<dd\s+class\s*=\s*['\"]Vignette['\"]>\s*<a\s+href\s*=\s*['\"](?:https?:)?//tel.archives-ouvertes.fr/tel-[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+)(['\"])~i", "$1/document$2", $res_script);
    
    // also add years to the <p.Rubrique> tags :
	$res_script = preg_replace("/(<p\s+class\s*=\s*['\"]Rubrique['\"]\s*)>\s*((?:19|20)[0-9][0-9])\s*<\/p>/i", "$1 data-year='$2'>$2</p>", $res_script);
	
	// replace http:// by https:// in all img src (only when required):
	if (__is_https())
		$res_script = preg_replace("~(\s+src\s*=\s*['\"]?)http://(haltools.)~i", "$1https://$2", $res_script);
	
    return $res_script;
}