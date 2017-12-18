***WARNING:*** this is a modified version of the spip_webpage_from_hal plugin, developped by Boris Morel, from Université Grenoble Alpes. The original version can be found [here](https://github.com/Saga-UGA/spip_webpage_from_hal). This version was modified for aesthetics and more flexibility (such as for the thumbnails). ***Since they don't provide any LICENSE.txt for the moment it's difficult to know in which conditions we are allowed to used this software or not. Therefore, USE IT AT YOUR OWN RISK.*** (I've openned an issue on their GitHub repository to ask them to add a LICENSE.txt file).

# Spip plugin to include an html list of publications from Hal directly in your website #

## How does it works ? ##

This plugin is very simple and requires nothing more.

Once installed, create a new article and put on the body this modele:

`<webpage_from_hal|url=http://hal.univ-grenoble-alpes.fr/Public/afficheRequetePubli.php?auteur_exp=boris,morel&CB_auteur=oui&CB_titre=oui&CB_article=oui&langue=Francais&tri_exp=annee_publi&tri_exp2=typdoc&tri_exp3=date_publi&ordre_aff=TA&Fen=Aff&css=../css/VisuRubriqueEncadre.css>`

By this modele, Spip get the url and include the html content directly on your body.

## Install ##

### Version ###

Prefer to use the tags `[v1.0.*[` or branch `1.0`. Master is dev version.

### Add to spip ###

To install this plugin please refer to the official [Spip documentation](http://www.spip.net/en_article3475.html)

## Support ##

GitHub is the good way to contribute on this project.
  - Issue
  - Pull request
  - [...]
