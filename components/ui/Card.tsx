
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ children, title, description }) => {
  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700/50">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
            <p className="mt-1 text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
  );
};

export default Card;
