pipeline {
  agent any

  environment {
    IMAGE_NAME = "zion-next-app"
    K8S_DEPLOY_DIR = "k8s"
    PATH = "/Users/apple/node/bin:/Users/apple/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
        script {
          // Git 커밋 해시 가져오기 (짧은 버전)
          env.GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
          env.IMAGE_TAG = env.GIT_COMMIT_SHORT
          echo "🏷️ Image tag: ${env.IMAGE_TAG}"
        }
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
        script {
          // 버전 태그와 latest 태그 모두 생성
          sh """
            eval \$(minikube docker-env) && docker build -t ${IMAGE_NAME}:${env.IMAGE_TAG} .
            eval \$(minikube docker-env) && docker tag ${IMAGE_NAME}:${env.IMAGE_TAG} ${IMAGE_NAME}:latest
          """
          echo "🐳 Built images: ${IMAGE_NAME}:${env.IMAGE_TAG}, ${IMAGE_NAME}:latest"
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        script {
          // deployment.yaml의 이미지 태그를 현재 커밋 해시로 업데이트
          sh """
            sed -i.bak 's|image: ${IMAGE_NAME}:.*|image: ${IMAGE_NAME}:${env.IMAGE_TAG}|' ${K8S_DEPLOY_DIR}/deployment.yaml
            echo "📝 Updated deployment.yaml with image: ${IMAGE_NAME}:${env.IMAGE_TAG}"
          """
          
          // Kubernetes에 배포
          sh "kubectl apply -f ${K8S_DEPLOY_DIR}/deployment.yaml"
          sh "kubectl apply -f ${K8S_DEPLOY_DIR}/service.yaml"
          
          // 배포 상태 확인
          sh "kubectl rollout status deployment/zion-next-app --timeout=300s"
          
          echo "🚀 Successfully deployed ${IMAGE_NAME}:${env.IMAGE_TAG}"
        }
      }
    }
  }

  post {
    success {
      script {
        def minikubeIp = sh(script: "minikube ip", returnStdout: true).trim()
        echo "✅ 배포 완료: http://zionlee.website"
      }
    }
    failure {
      echo "❌ 배포 실패"
    }
  }
}
