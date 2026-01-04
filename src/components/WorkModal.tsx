'use client';
import Image from 'next/image';
import { WorkItem } from '../lib/works';

interface WorkModalProps {
  work: WorkItem;
  isOpen: boolean;
  onClose: () => void;
  contentType: 'image' | 'video';
}

export default function WorkModal({ work, isOpen, onClose, contentType }: WorkModalProps) {
  if (!isOpen) return null;

  const hasImages = work.images && work.images.length > 0;
  const hasVideos = work.videos && work.videos.length > 0;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* 모달 콘텐츠 */}
        {contentType === 'image' && hasImages && (
          <div className="relative">
            <Image
              src={work.images![0]}
              alt={work.title}
              width={800}
              height={600}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        )}
        
        {contentType === 'video' && hasVideos && (
          <div className="relative bg-black flex items-center justify-center min-h-[400px]">
            <video
              controls
              autoPlay
              className="max-w-full max-h-[80vh]"
              style={{ 
                width: 'auto', 
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '80vh'
              }}
              preload="metadata"
              playsInline
              onError={(e) => {
                console.error('Video error:', e);
                const video = e.target as HTMLVideoElement;
                console.log('Video readyState:', video.readyState);
                console.log('Video networkState:', video.networkState);
              }}
              onLoadedMetadata={(e) => {
                const video = e.target as HTMLVideoElement;
                console.log('Video metadata loaded:', {
                  duration: video.duration,
                  videoWidth: video.videoWidth,
                  videoHeight: video.videoHeight
                });
              }}
              onCanPlay={(e) => {
                const video = e.target as HTMLVideoElement;
                console.log('Video can play:', {
                  videoWidth: video.videoWidth,
                  videoHeight: video.videoHeight,
                  clientWidth: video.clientWidth,
                  clientHeight: video.clientHeight
                });
              }}
            >
              <source src={work.videos![0]} type="video/mp4" />
              <div className="text-white p-4 text-center">
                <p className="mb-2">브라우저가 이 비디오 형식을 지원하지 않습니다.</p>
                <p className="text-sm text-gray-300 mb-4">
                  (MPEG-4 Video 코덱 - H.264로 재인코딩 권장)
                </p>
                <a 
                  href={work.videos![0]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                >
                  다운로드하여 재생
                </a>
              </div>
            </video>
          </div>
        )}
        
        {/* 모달 하단 정보 */}
        <div className="p-4 bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {work.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {work.description}
          </p>
        </div>
      </div>
    </div>
  );
}