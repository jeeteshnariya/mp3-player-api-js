# mp3-player-api-js

MP3 Player with PHP REST API

3 javascript app with Dust, Handlebars and Mustache

# Install

Composer is needed

```sh
git clone https://github.com/kMeillet/mp3-player-api-js
cd mp3-player-api-js/api/
composer install
chmod 777 log/
```

After this, create and import MySQL database

```sh
mysql -u <login>
CREATE DATABASE music
USE music
SOURCE /path/to/project/api/config/dump.sql
```

Then, create "api/config/config.php" file (there is a boilerplate)
```php
<?php
return [
    'title'   => 'MP3 PLAYER API JSON',
    'url'     => 'http://localhost/api/',
    'db_user' => 'root',
    'db_pass' => 'root',
    'db_host' => 'localhost',
    'db_name' => 'music',
    'db_port' => 3306
];
```

And finally, move project into web server

# Testing

If you want to test any API URI result, use "PostMan" with Google Chrome

# API URI

- Default API URI : http://yourdomain.com/api/[ressource]/[?identifier]

- /albums | GET : get albums collection
- /albums/[id] | GET : get single album with her tracks and genders

- /genres | GET : get genders collection
- /genres/[id] | GET : get single gender with her albums

- /artists | GET : get artists collection
- /artists/[id] | GET : get single artists with her albums

- /tracks | GET : get tracks collection
- /tracks/[id] | GET : get single track

- /search | POST (with body param : search=[yourSearch]) : search into albums, genders, tracks or artists

# Bonus :

- Persistant player
- Nice design, responsive, animation flow
- Infinite scroll
- Low dependency
