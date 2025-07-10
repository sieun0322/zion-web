pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/sieun0322/zion-web.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          sh 'docker build -t zion-next-app:latest .'
        }
      }
    }

    stage('Deploy to Minikube') {
      steps {
        withKubeConfig(credentialsId: 'kubeconfig') {
          sh '''
            kubectl apply -f k8s/deployment.yaml
            kubectl apply -f k8s/service.yaml
          '''
        }
      }
    }
  }
}
