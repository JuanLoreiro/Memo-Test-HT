Welcome to the Memo Test back-end project! This backend for a memo test game using Laravel, GraphQL API, MySQL, and Docker. This server-side application handles game logic, data storage, and communication with the frontend, providing a seamless experience for players. The use of Laravel ensures a robust and scalable backend, GraphQL facilitates efficient data retrieval, MySQL serves as the database, and Docker simplifies deployment and management of the entire system.

## Prerequisites

    Docker and Docker Compose installed

## Download repository:

    git clone https://github.com/diegomottadev/api-memo-test

## Navigate to the backend directory:

    cd api-memo-test

## Run docker compose:

    docker-compose up -d

## Wait for the build to finish

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




## Now, the backend is ready to be used with the frontend!

Check http://localhost:82

Feel free to integrate it with the frontend to create an engaging Memo test game [https://github.com/diegomottadev/memo-test]. If you encounter any issues, make sure Docker is installed, and the necessary commands are executed in the correct order.








