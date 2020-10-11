![Lint and docstring](https://github.com/sammo/detours/workflows/Source%20code%20checks/badge.svg) ![Unit tests](https://github.com/sammo/detours/workflows/Unit%20tests/badge.svg) ![Build and Deploy to GKE](https://github.com/sammo/detours/workflows/Build%20and%20Deploy%20to%20GKE/badge.svg)
# robocation

The Travel Robot

## Local Development Setup
We use minikube and a combination of tools for local development. To setup your local development environment on ubuntu, follow the instructions below, assuming you use a _zsh_ shell:

1- Install ansible with system's pip

`pip install ansible`

2- Install miniconda

```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
zsh Miniconda3-latest-Linux-x86_64.sh
eval "$(/home/sam/miniconda3/bin/conda shell.zsh hook)"
conda init zsh
source ~/.zshrc
```

3- Let ansible setup your environment by running the following command (_coming soon_)

`ansible-playbook -K minikube.yml`

_this should start minikube and create the development namespace_

## Continuous Development with skaffold

We use skaffold for continuous development. To build and deploy a development environment in minikube, run the command below:

`skaffold dev`

This will automatically deploy any saved changes in your local environment. If you prefer to deploy without automatic deployment of changes, run the command below:

`skaffold run --tail`

Follow the link below to access the ui in your local development environment.

http://dataseams.local/

## Set up a new developer user

New developer / data scientist on the team will need their accounts set up on Gmail, notion.so, Slack, GCP, Google Maps, and the RDS (Postgres) database.

### Add user email to GCP

Add user as Project Editor on GCP IAM.

### Create a Google Maps API key for the user

In Google Maps service in GCP, create an API key for the user.

### Create a database user and grant it access to the database

In the SQL service in GCP, create a database user and grant it the following database access:

```sql

GRANT CONNECT ON DATABASE database_name TO username;
GRANT USAGE ON SCHEMA public TO username;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO username;
```
