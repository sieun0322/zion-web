'use client';
import Image from 'next/image';
import { useState } from 'react';
import { WorkItem } from '../lib/works';
import GitHubIcon from './icons/GitHubIcon';
import WorkModal from './WorkModal';

interface WorkCardProps {
  work: WorkItem;
}

export default function WorkCard({ work }: WorkCardProps) {
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<'image' | 'video'>('image');
  
  const hasImages = work.images && work.images.length > 0;
  const hasVideos = work.videos && work.videos.length > 0;
  const hasMedia = hasImages || hasVideos;
  
  // 기본적으로 비디오가 있으면 비디오 탭을 먼저 보여줌
  const defaultTab = hasVideos ? 'videos' : 'images';
  const currentTab = hasMedia ? (activeTab === 'images' && !hasImages ? defaultTab : activeTab) : null;

  const openModal = (type: 'image' | 'video') => {
    setModalContent(type);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* 이미지/비디오 미디어 영역 */}
      {hasMedia && (
        <div className="relative">
          {/* 탭 네비게이션 */}
          {hasImages && hasVideos && (
            <div className="absolute top-2 left-2 z-10 flex bg-black/50 rounded-md overflow-hidden">
              <button
                onClick={() => setActiveTab('images')}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  currentTab === 'images' 
                    ? 'bg-white text-black' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                이미지
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  currentTab === 'videos' 
                    ? 'bg-white text-black' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                영상
              </button>
            </div>
          )}
          
          <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => openModal(currentTab === 'videos' ? 'video' : 'image')}>
            {/* 이미지 표시 */}
            {currentTab === 'images' && hasImages && (
              <div className="relative w-full h-full">
                <Image
                  src={work.images![0]}
                  alt={work.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm bg-black/50 px-3 py-1 rounded">클릭하여 확대</span>
                </div>
              </div>
            )}
            
            {/* 영상 썸네일 표시 */}
            {(currentTab === 'videos' || (!hasImages && hasVideos)) && hasVideos && (
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                <video
                  className="w-full h-full"
                  style={{ objectFit: 'contain' }}
                  preload="metadata"
                  muted
                  onLoadedData={(e) => {
                    // 첫 프레임으로 이동
                    const video = e.target as HTMLVideoElement;
                    if (video.duration > 0) {
                      video.currentTime = 0.1;
                    }
                  }}
                >
                  <source src={work.videos![0]} type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* 콘텐츠 영역 */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {work.title}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {work.year}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {work.description}
        </p>
        
        {/* 태그들 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* 링크들 */}
        <div className="flex gap-3">
          {work.github && (
            <a
              href={work.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <GitHubIcon className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </a>
          )}
          {work.demo && (
            <a
              href={work.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Demo
            </a>
          )}
        </div>
      </div>
      
      {/* 모달 */}
      <WorkModal
        work={work}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contentType={modalContent}
      />
    </div>
  );
}