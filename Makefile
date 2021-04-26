SHELL=/bin/bash
CONDA_ENV=detours
CONDA_ACTIVATE=source $$(conda info --base)/etc/profile.d/conda.sh ; conda activate ; conda activate
CONDA_DEACTIVATE=source $$(conda info --base)/etc/profile.d/conda.sh ; conda deactivate ; conda deactivate

help:
	@printf "\033[36m%-30s\033[0m %s\n" Monorepo
	@echo ---
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' ./Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: help Makefile

lint: ## Run a linting check on the core service using flake8
	@python -m flake8 core/.

format:  ## Run black formatter on the core service
	@python -m isort --settings-path pyproject.toml ./core
	@python -m black ./core

format-check:  ## Run a formatting check using black on the core service
	@python -m isort -c --settings-path pyproject.toml ./core
	@python -m black --check ./core

test:  ## Run all tests in the core service using pytest
	@python -m pytest -c pyproject.toml

env: ## Create the core development environment in conda
	@($(CONDA_DEACTIVATE); conda env remove -n detours)
	@conda env create -f ./core/environment.yml

coverage:  ## Run core service tests using pytest under coverage
	@python -m coverage run -m pytest
	@python -m coverage report -m
