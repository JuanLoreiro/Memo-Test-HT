## Prerequisites

    Docker and Docker Compose installed
    
    https://docs.docker.com/compose/install/
    https://www.docker.com/products/docker-desktop/

## Navigate to the backend directory:

    cd api-memo-test

## Run docker compose:

    docker-compose up -d

## Wait

    ...

## Run composer install, set permissions and configuration:

    docker exec -it api-memo-test-app composer install
    docker exec -it api-memo-test-app chmod -R 775 storage
    docker exec -it api-memo-test-app chown -R www-data:www-data storage
    docker exec -it api-memo-test-app php artisan vendor:publish --tag=lighthouse-schema
    docker exec -it api-memo-test-app php artisan route:clear
    docker exec -it api-memo-test-app php artisan config:clear
    docker exec -it api-memo-test-app php artisan cache:clear
    docker cp .env api-memo-test-app:/var/www/api-memo-test/.env


## Run migrations:

    docker exec -it api-memo-test-app php artisan migrate

## Run seeders:

    docker exec -it api-memo-test-app php artisan db:seed --class=MemoTestSeeder
    docker exec -it api-memo-test-app php artisan db:seed --class=MemoTestImageSeeder

Check http://localhost:82

## Now for the lighthouse Set up run these. ( You'r going to need composer)

    composer require nuwave/lighthouse

## Publish the default schema

    php artisan vendor:publish --tag=lighthouse-schema

## Install GraphQL DevTools

    composer require mll-lab/laravel-graphiql

## To use the included lighthouse config, copy it over to your config folder.

    mkdir --parents config
    cp vendor/nuwave/lighthouse/src/lighthouse.php config/

Register the config file within your bootstrap/app.php file:

    $app->configure('lighthouse');
    
Register the service provider in your bootstrap/app.php file:

    $app->register(\Nuwave\Lighthouse\LighthouseServiceProvider::class);

The many features Lighthouse provides are split across multiple service providers. Since Lumen does not support auto-discovery, you will have to register them individually depending on which features you want to use. Check Lighthouse's composer.json (opens new window), the section extra.laravel.providers contains the default service providers.
To get you going right away in Lumen, copy over the included default schema. It uses pagination and validation, so you need to register the service providers.

    mkdir --parents graphql
    cp vendor/nuwave/lighthouse/src/default-schema.graphql graphql/schema.graphql
    $app->register(\Nuwave\Lighthouse\Pagination\PaginationServiceProvider::class);
    $app->register(\Nuwave\Lighthouse\Validation\ValidationServiceProvider::class);

## Info:

After all these steps feel free to use the setup that you need to use on your app.


## To make sure that you get your own free ideas i made the base of both back & and front, so feel free to modify everything (id,querys,all...) make sure that you run this for migrations.

    npm install -g graphql-cli
    graphql init
    graphql get-schema --endpoint=example.com/graphql --output=schema.graphql

## For more doubhs you can check Lighthouse documentation

    https://lighthouse-php.com/6/getting-started/migrating-to-lighthouse.html#schema-definition
