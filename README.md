![Build and Deploy to GKE](https://github.com/sammo/detours/workflows/Build%20and%20Deploy%20to%20GKE/badge.svg)
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
