# BCL_collection #

🔥🔴⚠️**ATTENTION**⚠️🔴🔥
Depuis la mise en place de la nouvelle interface de HAL (janvier 2022), il se pourrait que certains de ces codes sources ne soient plus fonctionnels **dès lors que** vous tenterez de modifier les pages web sur lesquelles vous les aviez préalablement mis en place. 

- Si vous aviez déjà installé ces codes sources sur votre collection HAL avant la fin 2021, je vous suggère de ne pas tenter de les mettre à jour directement, car vous risqueriez de les rendre définitivement inopérants. => Avant de faire cette montée de version, faites d'abord un test sur une page de brouillon, ou dans une autre collection HAL temporaire (à laquelle vous ne tenez pas), afin de vous assurer que ces codes sources fonctionnent toujours avec la nouvelle version de HAL. **En particulier, j'ai un doute sur le fait que si vous modifiez l'en-tête de votre collection HAL (dans *Privileges > Site Web > En-tête*), cela risque de faire disparaître l'import du fichier `collection_hal.js`** (cf. point n°2 ci-dessous) et ainsi de **rendre inopérants la plupart des codes sources fournis ci-joints**, qui nécessitent l'inclusion de ce fichier javascript.

- Si en revanche vous n'aviez encore jamais installé ces codes sources sur votre collection HAL, vous ne risquez rien à tenter de les installer à présent (au pire, si ça ne fonctionne pas, il vous suffira de faire marche arrière)

# Résumé #

Ce dossier contient tous les fichiers utilisés par la [Collection HAL du laboratoire BCL](https://hal.archives-ouvertes.fr/BCL/)

# Dépendances #

Ces fichiers sont prévus pour être utilisés sur une Collection de la plateforme [HAL](https://hal.archives-ouvertes.fr).

Certains de ces codes javascript utilisent la librairie [Lazy.js](http://danieltao.com/lazy.js/) de Daniel Tao ; celle-ci est donc fournie dans le sous-dossier Ressources/, mais vous pourrez éventuellement la remplacer par une version plus récente si nécessaire.

La librairie Jquery est également utilisée, mais on utilise ici celle qui est en principe fournie par la plateforme HAL.

# Contenu #

- **Admin** : fonctionnalités d'administration à destination des gestionnaires de collection (gestion des formes auteurs en doublon, sans idhal, parti du labo, etc. ; et gestion des sous-structures, comme par ex. les équipes de recherche, validées, fermées, ou saisies manuellement avec potentiellement des doublons)

- **Export** : fonctionnalités d'exportation bibliographique à destination des chercheurs

- **Homepage** : exemple de page d'accueil d'une collection HAL

- **Ressources** : fichiers javascript et images utilisés par les 3 répertoires mentionnés ci-dessus.

- **Arborescence des menus.pdf** : exemple de menu d'une collection HAL, qui implémente toutes les fonctionnalités mentionnées ci-dessus.

# Installation #

0. Editer le fichier config.js qui se trouve dans le dossier Ressources/ : il contient tous les paramètres à configurer pour votre collection HAL (code de la collection, URL, etc.)

1. Les fichiers contenus dans le dossier Ressources/ doivent être uploadés manuellement, un par un, sur votre Collection HAL, par le biais du menu Privileges > Site Web > Ressources (accessible uniquement aux personnes qui sont gestionnaires de la collection). Notamment et surtout le fichier `collection_hal.js` qui contient toutes les primitives javascript permettant de travailler sur les données de la collection (ainsi que le fichier `lazy.js` qui contient une bibliothèque javascript requise pour le bon fonctionnement de `collection_hal.js`).

2. Pour que le javascript contenu dans `collection_hal.js` soit bien chargé et executé sur chaque page de la collection HAL, nous allons avoir recours à une astuce, qui consiste à injecter une balise `<script>` dans le bandeau situé en haut de la page web, qui contient le nom de la collection. Pour cela, on passe par le biais du menu Privileges > Site Web > En-tête > ajouter un élément de type texte, qui va contenir dans le champ "libellé" uniquement cette balise `<script>...</script>` (y copier/coller la balise script contenue dans le fichier `header.html` ci-joint). Oui, c'est sale, mais ça fonctionne :-) 

**En tout cas, ça fonctionnait bien sur les anciennes versions de HAL (jusqu'en 2021)**. J'ignore si depuis la nouvelle version de HAL ça fonctionne encore... Peut-être ont-il mis en place une sécurité qui empêche désormais d'injecter une balise <script> dans les libellés du bandeau de la collection ?? Si c'est le cas, il vous faudra procéder différemment, en ajoutant un import du fichier `collection_hal.js` dans le code source de chaque page où cela est nécessaire (Cherchez le mot clé "hack" dans les différents fichiers fournis ci-joint et cela vous donnera une idée de comment il faut faire...)

3. (facultatif) Le dossier Homepage contient le code source pour personnaliser la page d'accueil de la collection (un fichier par langue), de manière à avoir une page qui soit "responsive design" (utilisation du système à 12 colonnes). Pour ce faire, une fois authentifié, on se rend sur la page d'accueil de la collection, et tout en bas il y a un bouton "Modifier le contenu de cette page". Il faut alors copier/coller le contenu de chacun de ces fichiers `homepage-*.html`  pour chacune des langues gérées par votre collection HAL (français, anglais, voire espagnol).

4. (facultatif) En ce qui concerne l'esthétique, le bas de page (fichiers `footer-*.html`) est personnalisé par le biais du menu Privileges > Site Web > Pied de page. On procède ici de manière similaire à l'étape précédente : il faut copier/coller le code source de chacun de ces fichiers `footer-*.html` pour chacune des langues proposées par cette collection HAL.

5. Toujours en ce qui concerne l'esthétique, la feuille de style CSS est personnalisée par le biais du menu Privileges > Site Web > Apparence. Il faut ici copier/coller le contenu du fichier `style.css`. 

**ATTENTION**: à la ligne 127, il y a un `li:last-child {display:none}` qui est destiné à masquer le dernier onglet du menu de la collection lorsque le menu contient un nombre d'onglets pairs. L'idée étant de mettre dans un dernier onglet du menu de la collection HAL des fonctions supplémentaires destinées au gestionnaire de la collection pour l'aider à administrer la collection HAL. Ainsi, lorsque le gestionnaire de collection s'est authentifié, un dernier onglet "Privileges" apparaît (rajouté automatiquement par la plateforme HAL), et son apparition entraîne également dans la foulée l'apparition de cet onglet d'adminitration. Et lorsque l'onglet "Privileges" est absent, l'onglet d'administration est caché.

Par conséquent, si votre menu contient un nombre d'onglets pairs (en comptant tous les onglets y compris l'onglet "privileges"), il vous faudra remplacer ici `nth-child(even)` par `nth-child(odd)` et vice versa (2 occurrences à modifier). Et si vous faites le choix de ne pas mettre d'onglet d'administration à destination des gestionnaires de collection, dans ce cas il faut juste supprimer cette ligne "display:none".

6. Les dossiers Admin et Export contiennent des fonctionnalités supplémentaires (cf. rubrique "contenu" ci-dessus). Si vous souhaitez les activer, il vous faudra, pour chacun de ces fichiers HTML, créer une nouvelle page web (par le biais du menu Privileges > Site Web > Menu > ajouter une page personnalisable), puis ensuite se rendre sur cette page web, et cliquer, tout en bas, sur "modifier le contenu de la page". Il faudra ensuite copier/coller ici le contenu du fichier HTML fourni autant de fois que vous avez de langues gérées par votre collection HAL (français, anglais, voire espagnol).

Le fichier `Arborescence des menus.pdf` ci-joint donne un exemple de ce que l'on peut obtenir au final, avec ce fameux onglet d'administration à destination des gestionnaires de collection.

# En cas de difficultés #

Veuillez consultez la FAQ sur le [wiki](https://github.com/UMR7320/HAL-developments/wiki)

# Documentation du code source #

Veuillez consultez le [wiki](https://github.com/UMR7320/HAL-developments/wiki)
