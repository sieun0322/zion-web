import SectionTitle from '../../components/ui/SectionTitle';
import WorkCard from '../../components/WorkCard';
import { works } from '../../lib/works';

export default function WorksPage() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg py-16">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle 
          title="Works"
          subtitle="개인 프로젝트 및 작업물"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
          
          {works.length === 0 && (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 dark:text-gray-400">
                아직 등록된 프로젝트가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}