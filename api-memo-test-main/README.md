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

## To make sure that you get your own free ideas i made the base of both back & and front, so feel free to modify everything (id,querys,all...)

make sure that you run this for migrations.

```bash
npm install -g graphql-cli
graphql init
graphql get-schema --endpoint=example.com/graphql --output=schema.graphql
bash´´´


-----

Lighthouse documentation
https://lighthouse-php.com/6/getting-started/migrating-to-lighthouse.html#schema-definition





