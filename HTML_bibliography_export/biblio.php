<?php 

if (!isset($_GET["q"])) {
	die("<script>location.href='?q=(collCode_s:BCL)%20AND%20producedDate_tdate:[2011-01-01T00:00:00Z%20TO%202017-01-01T00:00:00Z]'</script>");
} else {
	$q = htmlspecialchars($_GET["q"]);
}

if (!isset($_GET["title"])) {
	$title = "BCL";
} else {
	$title = $_GET["title"];
}

?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset='UTF-8'>
		<title>Biblio <?php echo $title; ?></title>
<style>
  body {
    position:relative;
    text-align:justify;
    width:95%;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen {
    body {
      max-width: 700px;
    }
  }
</style>
	</head>
	<body>
	
		<h1>Bibliographie <?php echo $title; ?></h1>  
		<?php
		$output = shell_exec('python exportHAL.py "' . str_replace(" ", "%20", $q) . '"');
		echo $output;
		?>
	</body>
</html>
