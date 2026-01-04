export type WorkItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images?: string[];
  videos?: string[];
  github?: string;
  demo?: string;
  year: string;
};

export const works: WorkItem[] = [
  {
    id: "project-1",
    title: "3D 퍼즐",
    description: "프로젝트 설명",
    tags: ["Unity"],
    videos: ["/videos/160620_3d_puzzle_unity.mov"], // 선택사항
    year: "2016"
  },
  {
    id: "project-2",
    title: "프로젝트 제목",
    description: "프로젝트 설명",
    tags: ["OpenCV"],
    videos: ["/videos/170116_multitouch_tracking_opencv.mp4"], // 선택사항
    year: "2017"
  }
];