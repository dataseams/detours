pipeline {
  agent {
    kubernetes {
      label 'robocation-pipeline'
      defaultContainer 'jnlp'
      yamlFile 'jenkinsAgent.yml'
    }
  }
  stages {
    stage('Test UI') {
      steps {
        container() {
          sh "PYTHONUNBUFFERED=1 gcloud builds submit -t gcr.io/robocation/ui:0.1 ui/."
        }
      }
    }
  }
}
