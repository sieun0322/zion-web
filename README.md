# 🖥️ Home Server with Mac Mini (2012)

개인 포트폴리오 및 블로그를 위한 홈서버 구축 프로젝트입니다.  
Mac Mini (Late 2012)를 활용해 **Kubernetes (Minikube)**, **Jenkins**, **Nginx**, **Cloudflare Tunnel**을 구성했습니다.  

## 🔧 Git Hooks (Husky)

이 프로젝트는 [Husky](https://typicode.github.io/husky/)를 사용해 코드 품질을 자동으로 검증합니다.  
`npm install` 실행 시 자동으로 설치됩니다.

- **commit-msg**: [Conventional Commits](https://www.conventionalcommits.org/) 형식 검증
- **pre-push**: 빌드 및 린트 검사 실행

### 커밋 메시지 형식
```
type(scope): description

예시:
feat(auth): add user login functionality
fix(ui): resolve button alignment issue
docs: update README installation steps
```

**허용된 타입**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`

---

## 🚀 배포 시스템

### 버전 관리
- **이미지 태그**: Git 커밋 해시 기반 (예: `zion-next-app:abc1234`)
- **자동 배포**: Jenkins가 커밋마다 새 버전으로 배포
- **롤백 지원**: 이전 버전으로 즉시 복원 가능

### 롤백 방법
```bash
# 특정 커밋으로 롤백
./scripts/rollback.sh <commit-hash>

# 예시
./scripts/rollback.sh abc1234
```

---

## ⚙️ Architecture
GitHub Push<br/>
↓<br/>
Jenkins (Git Pull → Docker Build → kubectl apply)<br/>
↓<br/>
Minikube (Kubernetes Cluster)<br/>
↓<br/>
Nginx (Reverse Proxy)<br/>
↓<br/>
Cloudflare Tunnel<br/>
↓<br/>
https://zionlee.website


<img src="https://github.com/sieun0322/zion-web/blob/main/public/images/p2_architecture.png?raw=true"/>
---

## 🛠️ Tech Stack

- **Hardware**: Mac Mini (Late 2012, i7, 16GB RAM)
- **Container Orchestration**: Kubernetes (Minikube)
- **CI/CD**: Jenkins
- **Reverse Proxy**: Nginx
- **Networking**: Cloudflare Tunnel (HTTPS → Localhost:443)
- **Frontend**: Next.js + Tailwind CSS
- **Backend**: (예정) NestJS + Redis

---

## 🚀 Deployment Flow

1. **코드 푸시**
   - GitHub에 push → Jenkins Webhook 트리거

2. **CI/CD**
   - Jenkins가 Git Pull
   - Minikube 내 Docker 환경에서 `docker build`
   - `kubectl apply -f k8s/`

3. **서비스 배포**
   - Cloudflare Tunnel을 통해 외부 도메인 연결

---

## 📌 TODO
- [ ] Terraform으로 IaC 구성
- [ ] Helm 차트 도입
- [ ] Observability (Prometheus + Grafana)
- [ ] Backend 서비스 추가 (NestJS + Redis)

---

## 🌐 Domain
- [https://zionlee.website](https://zionlee.website)



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
