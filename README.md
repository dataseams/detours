![Linters](https://github.com/dataseams/detours/actions/workflows/linter.yml/badge.svg?branch=master&event=push) ![Unit tests](https://github.com/dataseams/detours/actions/workflows/tests.yml/badge.svg?branch=master&event=push) ![Build and Deploy to GKE](https://github.com/dataseams/detours/actions/workflows/google.yml/badge.svg?branch=master&event=push)
# robocation

The Travel Robot

## Local Development Setup
We use docker-compose for local development. To setup your local development environment, follow the instructions below (assuming ubuntu os and zsh shell):

1- Install docker

```bash
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
"deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
docker --version
```

2- Install docker-compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

3- Install miniconda

```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
zsh Miniconda3-latest-Linux-x86_64.sh
eval "$(~/miniconda3/bin/conda shell.zsh hook)"
conda init zsh
source ~/.zshrc
```

4- Install node.js

```bash
sudo apt install -y nodejs npm
sudo npm install -g firebase-tools
```

5- Install java

```bash
sudo apt install -y default-jdk
update-alternatives --config java
```

6- Install insomnia for GraphQL troubleshooting

```bash
echo "deb https://dl.bintray.com/getinsomnia/Insomnia /" \
    | sudo tee -a /etc/apt/sources.list.d/insomnia.list
# Add public key used to verify code signature
wget --quiet -O - https://insomnia.rest/keys/debian-public.key.asc \
    | sudo apt-key add -

sudo apt-get update
sudo apt-get install insomnia
```

7- Install postgresql binaries

```bash
sudo apt install libpq-dev
```

8- Set environment variables

Create _./.env_ file in the root of this repo and set the following environment variables:

```bash
ZOMATO_API_KEY=
ZOMATO_API_URL=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=detours
CORE_API_URL=http://localhost:5000/graphql
GOOGLE_MAPS_API_KEY=
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
```

9- Set environment variables for next.js

Create _./ui/app/.env.local_ file and set the following environment variables:

```bash
REACT_APP_GOOGLE_MAPS_API_KEY=
FIREBASE_CLIENT_EMAIL=sam@detours.com
FIREBASE_PUBLIC_API_KEY=
FIREBASE_PRIVATE_KEY=
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=
SESSION_SECRET_CURRENT=
SESSION_SECRET_PREVIOUS=
CORE_API_URL=
LOGIN_API_URL=
LOGOUT_API_URL=
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=

```

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
