
import React from 'react';
import { Tab } from '@/contexts/AppContext';
import { useAppContext } from '@/contexts/AppContext';

const TabsNavigation: React.FC = () => {
  const { activeTab, setActiveTab } = useAppContext();
  
  const tabs: { id: Tab; label: string }[] = [
    { id: 'telegramBot', label: 'Телеграмм бот' },
    { id: 'sms', label: 'СМС' },
  ];
  
  return (
    <div className="flex border-b border-gray-200 mb-4 animate-fade-in">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-4 py-2 font-medium text-sm transition-all duration-200 relative
            ${activeTab === tab.id 
              ? 'text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
            }
          `}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 animate-slide-in" />
          )}
        </button>
      ))}
    </div>
  );
};

export default TabsNavigation;
