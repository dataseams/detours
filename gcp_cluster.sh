#!/bin/bash
CLUSTER=robocation1

# Create gcp cluster
gcloud container clusters create $CLUSTER \
--num-nodes 2 \
--machine-type n1-standard-2 \
--scopes "https://www.googleapis.com/auth/projecthosting,cloud-platform"

# Fetch cluster endpoints and auth data into kubeconfig
gcloud container clusters get-credentials $CLUSTER

# Clone util repo
git clone https://github.com/GoogleCloudPlatform/continuous-deployment-on-kubernetes.git
cd continuous-deployment-on-kubernetes

# Install helm
wget https://storage.googleapis.com/kubernetes-helm/helm-v2.9.1-linux-amd64.tar.gz
tar zxfv helm-v2.9.1-linux-amd64.tar.gz
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
./helm install -n cd stable/jenkins --version 0.16.6 --wait

