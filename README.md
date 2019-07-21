# robocation
The Travel Robot

## Local Development Setup
We use minikube and a combination of tools for local development. To setup your local development environment on ubuntu, follow the instructions below, assuming you use a _zsh_ shell:

1- Install miniconda

```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
zsh Miniconda3-latest-Linux-x86_64.sh
eval "$(/home/sam/miniconda3/bin/conda shell.zsh hook)"
conda init zsh
source ~/.zshrc
```

2- Install ansible with miniconda's pip

`pip install ansible`

3- Let ansible setup your environment by running the following command (_coming soon_)

`ansible-playbook -K minikube.yml`

