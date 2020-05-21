help:
	@printf "\033[36m%-30s\033[0m %s\n" Geras-NLP
	@echo ---
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' ./Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: help Makefile

lint: ## Run a linting check using flake8
	@python -m flake8

format:  ## Run a formatting check using black
	@python -m black --check .

test:  ## Run tests using pytest
	@python -m pytest

install: lint format test  ## Install in active python environment if all checks pass
	@python -m pip install .
