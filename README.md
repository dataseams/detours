# robocation

The Travel Robot

## Continuous Development

Support is provided to allow simple and straightforward setup of your local development cluster with minikube. Follow the steps below to build the solution in your local minikube environment.

`minikube start`

After minikube cluster starts, run the command below to build and deploy the solution:

`kubectl create ns development`
`skaffold run --tail`

Follow the link below to access the ui in your local development environment.

http://dataseams.local/
