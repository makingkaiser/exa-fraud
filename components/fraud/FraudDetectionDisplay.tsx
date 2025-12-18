import React from "react";
import CompanySummary from "../companycontent/CompanySummary";
import RiskIndicators from "./RiskIndicators";
import { motion } from "framer-motion";

interface FraudDetectionDisplayProps {
  report: {
    riskScore: number;
    riskLevel: "Low" | "Medium" | "High" | "Critical";
    summary: Array<{ heading: string; text: string }>;
    riskIndicators: Array<{
      indicator: string;
      severity: "Low" | "Medium" | "High" | "Critical";
      description: string;
    }>;
    principals: Array<{ name: string; role: string; linkedInUrl?: string }>;
  };
}

const FraudDetectionDisplay: React.FC<FraudDetectionDisplayProps> = ({
  report,
}) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-green-600 bg-green-50 border-green-200";
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "High":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "Critical":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score < 30) return "bg-green-500";
    if (score < 60) return "bg-yellow-500";
    if (score < 85) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-12 w-full">
      {/* Risk Overview Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-medium">Fraud Risk Assessment</h2>
          <p className="text-gray-500">
            Based on official records and industry intelligence
          </p>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-center space-y-2">
            <div
              className={`px-4 py-1 rounded-full border text-sm font-semibold ${getRiskColor(
                report.riskLevel
              )}`}
            >
              {report.riskLevel} Risk
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
              Risk Level
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-100"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={213.6}
                  strokeDashoffset={213.6 - (213.6 * report.riskScore) / 100}
                  className={`${getRiskScoreColor(report.riskScore).replace(
                    "bg-",
                    "text-"
                  )} transition-all duration-1000`}
                />
              </svg>
              <span className="absolute text-xl font-bold">
                {report.riskScore}
              </span>
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
              Risk Score
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Summary Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-normal">Investigation Summary</h3>
        <CompanySummary summary={report.summary} />
      </div>

      {/* Risk Indicators Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-normal">Red Flags & Warning Indicators</h3>
        <RiskIndicators indicators={report.riskIndicators} />
      </div>
    </div>
  );
};

export default FraudDetectionDisplay;
