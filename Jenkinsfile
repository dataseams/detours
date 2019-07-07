pipeline {
  agent {
    kubernetes {
      label 'robocation'
      defaultContainer 'jnlp'
      yamlFile 'jenkinsAgent.yml'
    }
  }
  stages {
    stage('Test') {
      when {branch 'master'}
      parallel {
        stage('Test ui') {
          steps {
            container('python-ui') {
              sh("pip install -r ui/requirements.txt")
              sh("python -m pytest ui/.")
            }
          }
        }
        stage('Test core') {
          steps {
            container('python-core') {
              sh("pip install -r core/requirements.txt")
              sh("python -m pytest core/.")
            }
          }
        }
      }
    }
    stage('Build') {
      when {branch 'master'}
      stage('Build ui') {
        steps {
          container('gcloud') {
            sh("gcloud builds submit --substitutions SHORT_SHA=${env.GIT_COMMIT} --config ui/cloudBuild.yml ui/.")
          }
        }
      }
      stage('Build core') {
        steps {
          container('gcloud') {
            sh("gcloud builds submit --substitutions SHORT_SHA=${env.GIT_COMMIT} --config core/cloudBuild.yml core/.")
          }
        }
      }
    }
    stage('Deploy') {
      when {branch 'master'}
      steps {
        container('kubectl') {
          sh("kubectl -n production delete deployment -l app=core")
          sh("kubectl -n production delete deployment -l app=ui")
          sh("kubectl -n production apply -f k8s/production/")
        }
      }
    }
  }
}
