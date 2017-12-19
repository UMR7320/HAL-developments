# HTML_bibliography_export #

# Résumé #

Ces scripts permettent de générer un export au format HTML de la bibliographie HAL (d'un auteur ou d'un laboratoire par exemple).

# Contenu #

Le script `biblio.php` reçoit une requête web, avec comme paramètres facultatifs (dans l'URL) : 

- `q` : la requête (syntaxe Apache SOLR) à effectuer sur les serveurs de HAL pour rapatrier la bibliographier à exporter (cf. [Documentation de l'API HAL](https://api.archives-ouvertes.fr/docs/search))
- `title` : le titre à afficher en début de document.

Exemple d'URL : [biblio.php?title=BCL&q=(collCode_s:BCL)%20AND%20producedDate_tdate:[2011-01-01T00:00:00Z%20TO%202017-01-01T00:00:00Z]](http://bcl.unice.fr/hal/biblio.php?title=BCL&q=(collCode_s:BCL)%20AND%20producedDate_tdate:[2011-01-01T00:00:00Z%20TO%202017-01-01T00:00:00Z]) affichera la bibliographie issue de la collection HAL du laboratoire BCL, uniquement pour les années 2011 à 2017.

Si vous omettez de passer ce paramètre `q` et/ou ce paramètre `title`, la valeur par défaut qui sera utilisée par le script est celle indiquée dans l'exemple ci-dessus (mais libre à vous de modifier cela dans le script `biblio.php`, c'est très facile à faire)

Le script `exportHAL.py` est appelé, en interne, par le script `biblio.php`. C'est lui qui effectue tout le travail à proprement parler : connexion à l'API de HAL, via une requête AJAX, pour récupérer la liste des dépôts et générer la biliographie au format HTML.

# Utilisation depuis votre propre collection HAL #

Ajoutez à votre collection HAL une nouvelle page de type `Lien web` (via le menu Privilèges > Site Web > Menu), et dans le champ `Lien`, indiquez l'adresse URL du script `biblio.php` accompagné des paramètres qui vous conviennent (en vous inspirant de l'exemple donné ci-dessus).

# Installation sur votre propre serveur web #

Ces deux scripts sont actuellement hébergés dans un coin du [site web du Laboratoire BCL](https://bcl.cnrs.fr) et sont utilisables à vos risques et périls (nous nous réservons la possibilité de modifier comme bon nous semble le contenu du script hébergé à cette adresse, et/ou d'interrompre ce service à tout moment et sans aucun avis préalable).

Vous pouvez y faire appel directement, mais pour plus de sécurité et d'autonomie, nous vous recommandons plutôt de prendre vos précautions et d'héberger ces deux fichiers (`biblio.php` et `exportHAL.py`) sur votre propre serveur web. Pour cela, il vous faut simplement un serveur (type Apache par ex.) sur lequel vous avez les droits nécessaires pour exécuter un script PHP ainsi qu'un script Python, et il faut par ailleurs que le serveur soit configuré pour autoriser le script PHP à executer la commande `shell_exec()`, qui est nécessaire pour appeler le script Python depuis le script PHP (certains hébergeurs interdisent, par sécurité, l'utilisation de cette commande `shell_exec()`)
