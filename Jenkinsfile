pipeline {
  agent none
  stages {
    stage('Test') {
      parallel {
        stage('Test UI') {
          when {
            expression {
              return true
            }
          }
          agent {
            kubernetes {
              label 'jenkins_grade_agent'
              defaultContainer 'jnlp'
              yamlFile 'jenkinsAgent.yml'
              idleMinutes 10
            }
          }
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
