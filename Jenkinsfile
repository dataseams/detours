pipeline {
  agent none
  environment {
    CI = 'true'
  }
  stages {
    stage('Test') {
      parallel {
        stage('Test UI') {
          when {
            expression {
              return changed('ui')
            }
          }
          agent any
          steps {
            dir('ui') {
              runBuildTest()
            }
          }
        }
        stage('Test Core') {
          when {
            expression {
              return changed('core')
            }
          }
          agent any
          steps {
            dir('core') {
              runBuildTest()
            }
          }
        }
      }
    }
    stage('Deploy') {
      parallel {
        stage('Deploy UI') {
          when {
            expression {
              return changed('ui')
            }
          }
          agent any
          steps {
            dir('ui') {
              runBuildDeploy()
            }
          }
        }
        stage('Deploy Core') {
          when {
            expression {
              return changed('core')
            }
          }
          agent any
          steps {
            dir('core') {
              runBuildDeploy()
            }
          }
        }
      }
    }
  }
}

boolean hasChanges(String module) {
    def diffBase = !env.GIT_PREVIOUS_SUCCESSFUL_COMMIT ? "origin/master" : env.GIT_PREVIOUS_SUCCESSFUL_COMMIT
    return sh(
        returnStatus: true,
        script: "git diff --name-only ${diffBase}...${env.GIT_COMMIT} | grep ^${module}/"
    ) == 0
}

def runCloudBuild(String location, Map additionalTags = [:]) {
    googleCloudBuild(
        credentialsId: 'robocation-dev',
        source: local('.'),
        request: file(location),
        substitutions: [
            SHORT_SHA: "${env.GIT_COMMIT}"
        ] + additionalTags
    )
}

def runCloudBuildTest() {
    runCloudBuild('build_test.yml')
}

def runCloudBuildDeploy() {
    runCloudBuild('build_deploy.yml', [_BUILD_ID_TAG: "${getBuildIdTag()}"])
}

def getBuildIdTag() {
    "mcp-${BUILD_ID}"
}

def notifyFailure() {
    slackSend(color: "#FF9FA1", message: "FAILED: `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n${env.BUILD_URL}")
}

def notifyFailureIfMaster() {
    if ("${env.GIT_BRANCH}" == 'master') {
        notifyFailure()
    }
}
