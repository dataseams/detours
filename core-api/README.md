## Core (graphql) service

For local service-specific development, especially the core service, you can connect to the minikube postgres database by forwarding its port to your local machine. Use the following command to do so:

```
kubectl port-forward svc/postgres-api 5432:5432
```

Once the port is forwarded, you can connect to the postgres database from your IDE using the following information:

> host: localhost
> port: 5432
> database: detours
> user: sam
> password: abcd

### core-api development and debugging

To debug the core-api you need to create the following environment variables in your vscode `launch.json`:

```
"env": {
    "POSTGRES_USER": "sam",
    "POSTGRES_PASSWORD": "abcd",
    "POSTGRES_HOST": "localhost",
    "POSTGRES_PORT": 5432,
    "POSTGRES_DB": "detours",
}
```

# UI service

To connect to the core (GraphQL) service on minikube, use the following url:

```
http://graphql.dataseams.local/graphql
```

### core-api development and debugging

To debug the ui-api you need to create the following environment variables in your vscode `launch.json`:

```
"env": {
    "CORE_HOST": "graphql.dataseams.local",
    "GRAPHQL_ENDPOINT": "graphql",
    "CORE_PORT": 5000,
}
```
