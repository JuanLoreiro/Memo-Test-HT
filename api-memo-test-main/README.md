## Prerequisites

    Docker and Docker Compose installed

## Download repository:

   https://github.com/JuanLoreiro/Memo-Test-HT/tree/main/api-memo-test-main

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








