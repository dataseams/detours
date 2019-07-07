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
              return moduleChanged("ui")
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
              return moduleChanged("core")
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
              return moduleChanged("ui")
            }
          }
          steps {
            container('gcloud') {
              sh('gcloud builds submit --substitutions=SHORT_SHA=${env.GIT_COMMIT},BUILD_ID=${env.BUILD_NO} --config ui/cloudBuild.yml ui/.')
            }
          }
        }
        stage('Build core') {
          when {
            expression {
              return moduleChanged("core")
            }
          }
          steps {
            container('gcloud') {
              sh('gcloud builds submit --substitutions=SHORT_SHA=${env.GIT_COMMIT},BUILD_ID=${env.BUILD_NO} --config core/cloudBuild.yml core/.')
            }
          }
        }
      }
    }
    stage('Deploy') {
      when {branch 'master'}
      parallel {
        stage('Deploy ui pods') {
          when {
            anyOf {
              expression {
                return moduleChanged("ui")
              }
              expression {
                return fileChanged("k8s.production.ui.yml")
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
        stage('Deploy core pods') {
          when {
            anyOf {
              expression {
                return moduleChanged("core")
              }
              expression {
                return fileChanged("k8s.production.core.yml")
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
        stage('Deploy ui services') {
          when {
            expression {
              return fileChanged("k8s.services.ui.yml")
            }
          }
          steps {
            sh('kubectl -n production delete service -l app=ui')
            sh('kubectl -n production apply -f k8s/services/ui.yml')
          }
        }
        stage('Deploy core services') {
          when {
            expression {
              return fileChanged("k8s.services.core.yml")
            }
          }
          steps {
            sh('kubectl -n production delete service -l app=core')
            sh('kubectl -n production apply -f k8s/services/core.yml')
          }
        }
      }
    }
  }
}

boolean moduleChanged(String module) {
    def diffBase = !env.GIT_PREVIOUS_SUCCESSFUL_COMMIT ? 'origin/master' : env.GIT_PREVIOUS_SUCCESSFUL_COMMIT
    return sh(
        returnStatus: true,
        script: "git diff --name-only ${diffBase}...${env.GIT_COMMIT} | grep ^${module}/"
    ) == 0
}

boolean fileChanged(String file) {
    def diffBase = !env.GIT_PREVIOUS_SUCCESSFUL_COMMIT ? 'origin/master' : env.GIT_PREVIOUS_SUCCESSFUL_COMMIT
    return sh(
        returnStatus: true,
        script: "git diff --name-only ${diffBase}...${env.GIT_COMMIT} | grep ^${file}"
    ) == 0
}
