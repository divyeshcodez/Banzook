import React from 'react';

interface InfoPageProps {
  title: string;
  content: string;
}

export const InfoPage: React.FC<InfoPageProps> = ({ title, content }) => {
  return (
    <div className="w-full flex flex-col bg-[#F5F4F1] min-h-[70vh] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h1 className="font-display font-extrabold text-[#111111] text-5xl md:text-7xl uppercase tracking-tighter mb-8">
          {title}
        </h1>
        <div className="text-sm text-[#111111] font-mono-banzook whitespace-pre-wrap leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};
