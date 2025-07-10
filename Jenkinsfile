pipeline {
  agent any

  environment {
    IMAGE_NAME = "zion-next-app"
    IMAGE_TAG = "latest"
    K8S_DEPLOY_DIR = "k8s"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: '*/main']],
          userRemoteConfigs: [[
            url: 'https://github.com/sieun0322/zion-web.git'
          ]]
        ])
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build Next.js App') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Build Docker Image in Minikube') {
      steps {
        // Minikube Docker 환경 사용
        sh 'eval $(minikube docker-env) && docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh "kubectl apply -f ${K8S_DEPLOY_DIR}/deployment.yaml"
        sh "kubectl apply -f ${K8S_DEPLOY_DIR}/service.yaml"
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
