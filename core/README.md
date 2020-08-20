# Development guide

This guide will help you set up your development environment for each of Detours services.

Before creating the conda environment, install the postgresql development package on your machine by running:
```sh
sudo apt install -y libpq-dev
```

## Core service

For local service-specific development, especially the core service, you can connect to the minikube postgres database by forwarding its port to your local machine. Use the following command to do so:

```sh
kubectl port-forward svc/postgres-api 5432:5432
```

Once the port is forwarded, you can connect to the postgres database from your IDE using the following information:

```yaml
host: localhost
port: 5432
database: detours
user: sam
password: abcd
```

### core-api development and debugging

To debug the core-api you need to create the following environment variables in your vscode `launch.json`:

```json
"env": {
    "POSTGRES_USER": "sam",
    "POSTGRES_PASSWORD": "abcd",
    "POSTGRES_HOST": "localhost",
    "POSTGRES_PORT": 5432,
    "POSTGRES_DB": "detours",
}
```

## UI service

To connect to the core (GraphQL) service on minikube, use the following url:

```text
http://graphql.dataseams.local/graphql
```

### ui-api development and debugging

To debug the ui-api you need to create the following environment variables in your vscode `launch.json`:

```json
"env": {
    "CORE_HOST": "graphql.dataseams.local",
    "GRAPHQL_ENDPOINT": "graphql",
    "CORE_PORT": 5000,
}
```
