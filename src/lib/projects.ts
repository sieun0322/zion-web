type Project = {
    slug: string;
    name: string;
    title: string;
    subtitle: string;
    description: string;
    tech: string[];

    tag: string[];
    link?: string;
    github?: string;
    android?: string;
    ios?: string;
  
    images?: string[];
    features?: string[];
    architecture?: string;
  };
export const projects: Project[] = [
    {
    slug: 'life-puzzle',
    name: 'Life Puzzle',
    title: 'Life Puzzle – 함께 쓰는 인생 기록 앱',
    subtitle: '사진, 글, 음성으로 한 사람의 이야기를 담고, 가족과 함께 완성해가는 인생 퍼즐',
    description: 'React Native 기반의 모바일 애플리케이션으로, 한 사람의 삶을 다양한 형태로 기록하고 가족, 친구 등과 함께 공유하며 써 내려갈 수 있는 스토리 기록 앱입니다.',
      tech: ['React Native', 'TypeScript', 'Android','iOS'],
      tag: ['React Native', 'TypeScript', 'Android','iOS'],
      github: 'https://github.com/itmca/lifepuzzle-rn',
      android: 'https://g.co/kgs/cHBtsC2',
      ios: 'https://apps.apple.com/kr/app/%EC%9D%B8%EC%83%9D%ED%8D%BC%EC%A6%90/id6443452557',
      images: [
        '/images/life-puzzle-1.png',
        '/images/life-puzzle-2.png',
        '/images/life-puzzle-3.png',
      ],
      features: [
        '📷 사진, ✍️ 글, 🎙️ 음성 녹음을 통해 다양한 방식으로 추억 기록',
        '🔗 공유 링크를 통해 가족, 지인들과 함께 한 사람의 이야기를 공동 작성',
        '🧑‍🤝‍🧑 **함께 쓰는 전기(傳記)**처럼, 추억을 퍼즐처럼 이어서 완성하는 협업 경험',
        '📱 Android & iOS 크로스플랫폼 지원',
      ],
      architecture:''
    },
    {
        slug: 'zionlee-website',
      name: 'Zionlee Website',
      title: 'Zionlee Website – 직접 구축한 홈서버 기반 포트폴리오',
    subtitle: '도메인 구매부터 서버 인프라 구축까지 직접 설계한 개인 포트폴리오 웹사이트',
      description:
        '직접 구매한 도메인(zionlee.website)과 Mac mini를 홈서버로 구성하여 Next.js 기반 포트폴리오를 클라우드 환경 없이 로컬 서버에서 완전 자립적으로 운영하는 프로젝트입니다.',
      tech: ['Next.js', 'Jenkins','Minikube'],
      tag: ['Next.js', 'Docker','Minikube', 'Jenkins','Nginx', 'Cloudflared','GitHub Actions'],
      link: 'https://zionlee.website',
      github: 'https://github.com/sieun0322/zion-web',
      
      features: [
        '💻 **Mac mini(Late 2012)**를 홈서버로 활용',
        '🧠 ChatGPT를 활용해 페이지 구조 및 구성 아이디어 설계',
        '🌐 Cloudflare Tunnel을 통해 외부 도메인 연결 (HTTPS 보안 포함)',
        '🐳 Docker + Minikube 환경에서 Kubernetes 기반 배포 파이프라인 구성',
        '⚙️ Jenkins를 통해 GitHub 커밋 → 자동 빌드 & 배포 자동화',
        '🔁 Nginx Ingress로 포트포워딩 및 서비스 라우팅 처리',
      ],
      architecture: '/images/p2_architecture.png',
    },
  ];
  