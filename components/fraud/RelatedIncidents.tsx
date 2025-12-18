import React from "react";
import { motion } from "framer-motion";

interface Incident {
  url: string;
  title: string;
  author?: string;
}

interface RelatedIncidentsProps {
  incidents: Incident[];
}

const RelatedIncidents: React.FC<RelatedIncidentsProps> = ({ incidents }) => {
  const extractDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      return domain;
    } catch {
      return url;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-normal">Related Intelligence & Alerts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {incidents.map((item, index) => (
          <motion.a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col bg-white border border-gray-200 p-5 hover:border-brand-default hover:shadow-md transition-all group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex-1 space-y-3">
              <p className="text-gray-900 font-medium line-clamp-3 group-hover:text-brand-default transition-colors">
                {item.title}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{extractDomain(item.url)}</span>
                {item.author && (
                  <span className="text-gray-400 italic">
                    via {item.author}
                  </span>
                )}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default RelatedIncidents;
