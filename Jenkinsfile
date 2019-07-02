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
              return changed("ui")
            }
          }
          agent any
          steps {
            dir('ui') {
              runBuildTest()
            }
          }
        }
      }
    }
  }
}
