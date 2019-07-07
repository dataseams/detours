pipeline {
  agent {
    kubernetes {
      label 'robocation'
      defaultContainer 'jnlp'
      yamlFile 'jenkinsAgent.yml'
    }
  }
  stages {
    stage('Test ui') {
      when {branch 'master'}
      steps {
        container('python-ui') {
          sh("pip install -r ui/requirements.txt")
          sh("python -m pytest ui/.")
        }
      }
    }
    stage('Test core') {
      when {branch 'master'}
      steps {
        container('python-core') {
          sh("pip install -r core/requirements.txt")
          sh("python -m pytest core/.")
        }
      }
    }
    stage('Build ui') {
      when {branch 'master'}
      steps {
        container('gcloud') {
          sh("gcloud builds submit --substitutions SHORT_SHA=${env.GIT_COMMIT} --config ui/cloudBuild.yml ui/.")
        }
      }
    }
    stage('Build core') {
      when {branch 'master'}
      steps {
        container('gcloud') {
          sh("gcloud builds submit --substitutions SHORT_SHA=${env.GIT_COMMIT} --config core/cloudBuild.yml core/.")
        }
      }
    }
    stage("Deploy") {
      when {branch 'master'}
      steps {
        container('kubectl') {
          sh("kubectl -n production deployment -l app=core")
          sh("kubectl -n production delete deployment -l app=ui")
          sj("kubectl -n production apply -f k8s/production/")
        }
      }
    }
  }
}
