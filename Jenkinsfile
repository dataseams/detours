def project = 'robocation'
def appName = 'ui'
def uiSvcName = "${appName}-ui"
def imageTag = "gcr.io/${project}/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
def SHORT_SHA = env.GIT_COMMIT

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
          sh("gcloud builds submit --config ui/cloudBuild.yml ui/.")
        }
      }
    }
    stage('Build core') {
      when {branch 'master'}
      steps {
        container('gcloud') {
          sh("gcloud builds submit --config core/cloudBuild.yml core/.")
        }
      }
    }
    stage("Deploy ui") {
      when {branch 'master'}
      steps {
        container('kubectl') {
          sh("echo $SHORT_SHA")
        }
      }
    }
    // stage('Build and push image with Container Builder') {
    //   steps {
    //     container('gcloud') {
    //       sh "PYTHONUNBUFFERED=1 gcloud builds submit -t ${imageTag} ."
    //     }
    //   }
    // }
    // stage('Deploy Canary') {
    //   // Canary branch
    //   when { branch 'canary' }
    //   steps {
    //     container('kubectl') {
    //       // Change deployed image in canary to the one we just built
    //       sh("sed -i.bak 's#gcr.io/cloud-solutions-images/gceme:1.0.0#${imageTag}#' ./k8s/canary/*.yaml")
    //       sh("kubectl --namespace=production apply -f k8s/services/")
    //       sh("kubectl --namespace=production apply -f k8s/canary/")
    //       sh("echo http://`kubectl --namespace=production get service/${uiSvcName} -o jsonpath='{.status.loadBalancer.ingress[0].ip}'` > ${uiSvcName}")
    //     }
    //   }
    // }
    // stage('Deploy Production') {
    //   // Production branch
    //   when { branch 'master' }
    //   steps{
    //     container('kubectl') {
    //     // Change deployed image in canary to the one we just built
    //       sh("sed -i.bak 's#gcr.io/cloud-solutions-images/gceme:1.0.0#${imageTag}#' ./k8s/production/*.yaml")
    //       sh("kubectl --namespace=production apply -f k8s/services/")
    //       sh("kubectl --namespace=production apply -f k8s/production/")
    //       sh("echo http://`kubectl --namespace=production get service/${uiSvcName} -o jsonpath='{.status.loadBalancer.ingress[0].ip}'` > ${uiSvcName}")
    //     }
    //   }
    // }
  //   stage('Deploy Dev') {
  //     // Developer Branches
  //     when {
  //       not { branch 'master' }
  //       not { branch 'canary' }
  //     }
  //     steps {
  //       container('kubectl') {
  //         // Create namespace if it doesn't exist
  //         sh("kubectl get ns ${env.BRANCH_NAME} || kubectl create ns ${env.BRANCH_NAME}")
  //         // Don't use public load balancing for development branches
  //         sh("sed -i.bak 's#LoadBalancer#ClusterIP#' ./k8s/services/frontend.yaml")
  //         sh("sed -i.bak 's#gcr.io/cloud-solutions-images/gceme:1.0.0#${imageTag}#' ./k8s/dev/*.yaml")
  //         sh("kubectl --namespace=${env.BRANCH_NAME} apply -f k8s/services/")
  //         sh("kubectl --namespace=${env.BRANCH_NAME} apply -f k8s/dev/")
  //         echo 'To access your environment run `kubectl proxy`'
  //         echo "Then access your service via http://localhost:8001/api/v1/proxy/namespaces/${env.BRANCH_NAME}/services/${uiSvcName}:80/"
  //       }
  //     }
  //   }
  }
}
