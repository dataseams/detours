def project = "robocation"
def uiImageTag = "gcr.io/${project}/ui:0.1"
def coreImageTag = "gcr.io/${project}/core:0.1"

pipeline {
  agent {
    kubernetes {
      label 'robocation'
      defaultContainer 'jnlp'
      yaml """
apiVersion: v1
kind: Pod
metadata:
labels:
  component: ci
spec:
  # service account that can deploy to all namespaces
  serviceAccountName: cd-jenkins
  containers:
  - name: gcloud
    image: gcr.io/cloud-builders/gcloud
    command:
    - cat:
    tty: true
  - name: kubectl
    image: gcr.io/cloud-builders/kubectl
    command:
    - cat:
    tty: true
"""
    }
  }
  stages {
    stage ("Build and push core image with Container Builder") {
      steps {
        container("gcloud") {
          sh "gcloud builds submit --tag ${coreImageTag} core/."
        }
      }
    }
    stage ("Build and push ui image with Container Builder") {
      steps {
        container("gcloud") {
          sh "gcloud builds submit --tag ${uiImageTag} ui/."
        }
      }
    }
    stage ("Deploy prod") {
      steps {
        container("kubectl") {
          sh("kubectl kustomize k8s | kubectl --namespace=prod apply -f -")
        }
      }
    }
  }
}
