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
          when {
            expression {
              return hasChanges('ui\/')
            }
          }
          steps {
            container('python-ui') {
              sh('pip install -r ui/requirements.txt')
              sh('python -m pytest ui/.')
            }
          }
        }
        stage('Test core') {
          when {
            expression {
              return hasChanges('core\/')
            }
          }
          steps {
            container('python-core') {
              sh('pip install -r core/requirements.txt')
              sh('python -m pytest core/.')
            }
          }
        }
      }
    }
    stage('Build') {
      when {branch 'master'}
      parallel {
        stage('Build ui') {
          when {
            expression {
              return hasChanges('ui\/')
            }
          }
          steps {
            container('gcloud') {
              sh('gcloud builds submit --substitutions SHORT_SHA=${env.GIT_COMMIT} --config ui/cloudBuild.yml ui/.')
            }
          }
        }
        stage('Build core') {
          when {
            expression {
              return hasChanges('core\/')
            }
          }
          steps {
            container('gcloud') {
              sh('gcloud builds submit --substitutions SHORT_SHA=${env.GIT_COMMIT} --config core/cloudBuild.yml core/.')
            }
          }
        }
      }
    }
    stage('Deploy ui') {
      when {
        branch 'master'
        anyOf {
          expression {
            return hasChanges('ui\/')
          }
          expression {
            return hasChanges('k8s\/production\/ui.yml')
          }
        }
      }
      steps {
        container('kubectl') {
          sh('kubectl -n production delete deployment -l app=ui')
          sh('kubectl -n production apply -f k8s/production/ui.yml')
        }
      }
    }
    stage('Deploy core') {
      when {
        branch 'master'
        anyOf {
          expression {
            return hasChanges('core\/')
          }
          expression {
            return hasChanges('k8s\/production\/core.yml')
          }
        }
      }
      steps {
        container('kubectl') {
          sh('kubectl -n production delete deployment -l app=core')
          sh('kubectl -n production apply -f k8s/production/core.yml')
        }
      }
    }
    stage('Deploy ui service') {
      when {
        branch 'master'
        expression {
          return hasChanges('k8s\/services\/ui.yml')
        }
      }
      steps {
        sh('kubectl -n production delete service -l app=ui')
        sh('kubectl -n production apply -f k8s/services/ui.yml')
      }
    }
    stage('Deploy core service') {
      when {
        branch 'master'
        expression {
          return hasChanges('k8s\/services\/core.yml')
        }
      }
      steps {
        sh('kubectl -n production delete service -l app=core')
        sh('kubectl -n production apply -f k8s/services/core.yml')
      }
    }
  }
}

boolean hasChanges(String module) {
    def diffBase = !env.GIT_PREVIOUS_SUCCESSFUL_COMMIT ? 'origin/master' : env.GIT_PREVIOUS_SUCCESSFUL_COMMIT
    return sh(
        returnStatus: true,
        script: 'git diff --name-only ${diffBase}...${env.GIT_COMMIT} | grep ^${module}'
    ) == 0
}
