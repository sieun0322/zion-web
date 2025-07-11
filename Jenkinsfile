pipeline {
  agent any

  environment {
    IMAGE_NAME = "zion-next-app"
    IMAGE_TAG = "latest"
    K8S_DEPLOY_DIR = "k8s"
    PATH = "/Users/apple/node/bin:/Users/apple/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh '''
          rm -rf node_modules package-lock.json .next
          npm cache clean --force
          npm install
        '''
      }
    }

    stage('Build Next.js App') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Build Docker Image in Minikube') {
      steps {
        sh 'which minikube'
        sh 'which docker'
        sh 'eval $(minikube docker-env) && docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh "kubectl apply -f ${K8S_DEPLOY_DIR}/deployment.yaml"
        sh "kubectl apply -f ${K8S_DEPLOY_DIR}/service.yaml"
        sh "kubectl apply -f ${K8S_DEPLOY_DIR}/ingress.yaml"
      }
    }
  }

  post {
    success {
      script {
        def minikubeIp = sh(script: "minikube ip", returnStdout: true).trim()
        echo "✅ 배포 완료: http://${minikubeIp}:30080"
      }
    }
    failure {
      echo "❌ 배포 실패"
    }
  }
}
