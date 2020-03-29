"""Package setup module."""
import os
from setuptools import setup, find_packages

import requirements


def readme():
    """Add README doc."""
    with open("README.md") as file:
        return file.read()


def version():
    """Add version from file."""
    version_contents = {}
    version_module_path = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "core/_version.py",
    )
    with open(version_module_path) as file:
        exec(file.read(), version_contents)
    return version_contents["version"]


setup(
    name="core-service",
    version=version(),
    description="Detours' core service.",
    long_description=readme(),
    classifiers=[
        "Development status :: 3 - Alpha",
        "License :: Other/Proprietary License",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Topic :: Flask :: GraphQL",
    ],
    keywords="flask,graphql",
    url=("https://github.com/sammo/detours"),
    author="Crisp",
    author_email="sam@dataseams.com",
    license="Proprietary",
    packages=find_packages(exclude=["tests"]),
    python_requires=">=3.7",
    install_requires=requirements.get(["#prod"]),
    include_package_data=False,
    zip_safe=False,
    setup_requires=requirements.get(["#dev"]),
    tests_require=["pytest"],
)
