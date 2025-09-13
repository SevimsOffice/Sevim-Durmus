
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="p-6 bg-brand-cream border-b-2 border-brand-purple-light">
      <h1 className="text-3xl font-bold text-brand-charcoal">{title}</h1>
      <p className="mt-1 text-gray-600">{subtitle}</p>
    </div>
  );
};

export default PageHeader;
