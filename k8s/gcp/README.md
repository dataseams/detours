# Managing the GKE cluster

This document provides information needed to manage the production cluster on GKE. The instruction require `gcloud` to be installed on your machine, which should be done by running the `ansible-playbook` as instructed in *dev_setup*.

## Continuous Deployment

A Jenkins agent is deployed to the GKE cluster in the `system` namespace. The Jenkins agent checks for changes on the `master` branch of the robocation repository every minute. If any changes found, the jenkins pipeline:

- runs tests
- build images to gcp container registry
- deploys any changes to the k8s manifests

## Turn on the GKE cluster

```zsh
gcloud container clusters resize robocation1 --num-nodes 2
```

## Turn off the GKE cluster

```zsh
gcloud container clusters resize robocation1 --num-nodes 0
```

## Rebuild the GKE cluster

Run commands from the script below step-by-step as they might be outdated.

**This script needs to be moved to an ansible playbook.**

```zsh
../../gcp_cluster.sh
```
