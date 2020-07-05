# Rails playground

Creating blog app

## System dependencies

```sh
gem install bundler-audit
docker-compose run --rm rails bin/setup
```

## How to run the test suite

```sh
bin/rake
```

## Services (job queues, cache servers, search engines, etc.)

## Deployment instructions

## Local development

```bash
docker run --rm --net=host -e POSTGRES_HOST_AUTH_METHOD=trust postgres
```

```bash
env RAILS_ENV=development DATABASE_URL=postgres://postgres@localhost:5432 bin/rails db:setup
```
