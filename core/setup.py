"""Package setup module."""
import os

import requirements
from setuptools import find_packages, setup

package_name = os.path.basename(os.getcwd()).replace("-", "_")


def readme():
    """Add README doc."""
    with open("README.md") as file:
        return file.read()


def version():
    """Add version from file."""
    version_contents = {}
    version_module_path = os.path.join(
        os.path.dirname(os.path.abspath(__file__)),
        f"{package_name}/_version.py",
    )
    with open(version_module_path) as file:
        exec(file.read(), version_contents)
    return version_contents["version"]


setup(
    name=package_name,
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
    author="Sam Mourad",
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
