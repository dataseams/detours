# UI Service

Users must have an addictingly-easy and modern interface which is what this service provides.

- A `node` server using the `next.js` and `react` frameworks.
- State management use both `redux` and react component states.
- The data layer is in `core` as a GraphQL service. `ui` uses `apollo-client` to query the data endpoints.
- Packaging is done with npm in docker.

No need to build the docker image here since it's managed in the docker-compose file in root. Though if needed, you can run below command in this directory to build an image:

```sh
docker build -t detours/ui .
```

Peace.
