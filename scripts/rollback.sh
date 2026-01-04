#!/bin/bash

# 사용법: ./scripts/rollback.sh <commit-hash>
# 예시: ./scripts/rollback.sh abc1234

if [ -z "$1" ]; then
    echo "사용법: $0 <commit-hash>"
    echo ""
    echo "최근 배포된 버전들:"
    kubectl get pods -o jsonpath='{.items[*].spec.containers[*].image}' | tr ' ' '\n' | grep zion-next-app | sort | uniq
    exit 1
fi

COMMIT_HASH=$1
IMAGE_NAME="zion-next-app"

echo "🔄 Rolling back to ${IMAGE_NAME}:${COMMIT_HASH}"

# deployment.yaml 업데이트
sed -i.bak "s|image: ${IMAGE_NAME}:.*|image: ${IMAGE_NAME}:${COMMIT_HASH}|" k8s/deployment.yaml

# Kubernetes에 적용
kubectl apply -f k8s/deployment.yaml

# 롤아웃 상태 확인
kubectl rollout status deployment/zion-next-app --timeout=300s

if [ $? -eq 0 ]; then
    echo "✅ Successfully rolled back to ${IMAGE_NAME}:${COMMIT_HASH}"
else
    echo "❌ Rollback failed"
    exit 1
fi