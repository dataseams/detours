#!/bin/bash
PROJECT_ID=robocation
PROJECT_NAME=detours
CLUSTER=$PROJECT_NAME
SVC_ACCOUNT=svc-$PROJECT_NAME

# Create gcp cluster
gcloud container clusters create $CLUSTER \
--num-nodes 1 \
--machine-type n1-standard-1 \
--scopes "https://www.googleapis.com/auth/projecthosting,cloud-platform"

# Fetch cluster endpoints and auth data into kubeconfig
gcloud container clusters get-credentials $CLUSTER

# Clone util repo
git clone https://github.com/GoogleCloudPlatform/continuous-deployment-on-kubernetes.git
cd continuous-deployment-on-kubernetes

# Install helm
wget https://storage.googleapis.com/kubernetes-helm/helm-v2.14.1-linux-amd64.tar.gz
tar zxfv helm-v2.14.1-linux-amd64.tar.gz
cp linux-amd64/helm .

# Add yourself as a cluster administrator in the cluster's RBAC so that you can give
# Jenkins permissions in the cluster
kubectl create clusterrolebinding cluster-admin-binding --clusterrole=cluster-admin \
--user=$(gcloud config get-value account)

# Grant Tiller, the server side of Helm, the cluster-admin role in your cluster
kubectl create serviceaccount tiller --namespace kube-system
kubectl create clusterrolebinding tiller-admin-binding --clusterrole=cluster-admin \
--serviceaccount=kube-system:tiller

# Initialize Helm. This ensures that the server side of Helm (Tiller) is properly
# installed in your cluster.
./helm init --service-account=tiller
./helm update

# Ensure Helm is properly installed. Both client and server version should appear.
./helm version

# Deploy jenkins helm chart - use -f values.yml to replace values
./helm install -n cd stable/jenkins -f jenkins/values.yaml --version 1.2.2 --wait

# Grant cd-jenkins servive account access to deploy to all namespaces
kubectl create clusterrolebinding jenkins-admin-binding --clusterrole=cluster-admin --serviceaccount=default:cd-jenkins

# Forward jenkins port
export POD_NAME=$(kubectl get pods -l "component=jenkins-master" -o jsonpath="{.items[0].metadata.name}")
kubectl port-forward $POD_NAME 8080:8080 >> /dev/null &

# Confirm installation
kubectl get service

# Retrieve jenkins admin password
printf $(kubectl get secret cd-jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 --decode);echo

# Build docker images on gcloud image build
gcloud builds submit --tag gcr.io/$PROJECT_ID/core ../$PROJECT_NAME/core/. --timeout 10m
gcloud builds submit --tag gcr.io/$PROJECT_ID/ui ../$PROJECT_NAME/ui/. --timeout 10m

# Create service account for gcr image pull
gcloud beta iam service-accounts create $SVC_ACCOUNT \
--description "pull gcr images" \
--display-name $SVC_ACCOUNT

# Grant service account access to project resources to pull images
gcloud projects add-iam-policy-binding $PROJECT_ID \
--member serviceAccount:$SVC_ACCOUNT@$PROJECT_ID.iam.gserviceaccount.com \
--role roles/viewer
