import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';
import { featuredTopics } from '../data/featuredTopics';

export function FeaturedTopics() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(featuredTopics.length / 3));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.ceil(featuredTopics.length / 3) - 1 : prev - 1
    );
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          {translations.featuredTopics.title[language]}
        </h2>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-full">
                {featuredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${topic.imageUrl})` }}
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {topic.title[language]}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {topic.description[language]}
                      </p>
                      <button className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                        {translations.featuredTopics.readMore[language]} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Previous topics"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Next topics"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}