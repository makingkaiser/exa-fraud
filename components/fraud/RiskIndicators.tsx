import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";

interface Indicator {
  indicator: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  description: string;
}

interface RiskIndicatorsProps {
  indicators: Indicator[];
}

const RiskIndicators: React.FC<RiskIndicatorsProps> = ({ indicators }) => {
  const severityOrder = {
    Critical: 0,
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const sortedIndicators = [...indicators].sort((a, b) => {
    return severityOrder[a.severity] - severityOrder[b.severity];
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Critical":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "High":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "Medium":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case "Low":
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "border-red-200 bg-red-100/50";
      case "High":
        return "border-red-100 bg-red-50/50";
      case "Medium":
        return "border-orange-100 bg-orange-50/50";
      case "Low":
        return "border-blue-100 bg-blue-50/50";
      default:
        return "border-gray-100 bg-gray-50/50";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sortedIndicators.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`p-5 border rounded-none ${getSeverityStyles(
            item.severity
          )} space-y-3`}
        >
          <div className="flex items-center gap-3">
            {getSeverityIcon(item.severity)}
            <span className="font-semibold text-gray-900">
              {item.indicator}
            </span>
            <span
              className={`ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                item.severity === "Critical"
                  ? "border-red-300 text-red-700 bg-red-100"
                  : item.severity === "High"
                  ? "border-red-200 text-red-600"
                  : item.severity === "Medium"
                  ? "border-orange-200 text-orange-600"
                  : "border-blue-200 text-blue-600"
              }`}
            >
              {item.severity}
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default RiskIndicators;
