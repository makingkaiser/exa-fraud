import React from "react";

interface SummaryItem {
  heading: string;
  text: string;
}

interface CompanySummaryProps {
  summary: SummaryItem[];
}

const CompanySummary: React.FC<CompanySummaryProps> = ({ summary }) => {
  const hasEmoji = (str: string) => {
    const emojiRegex =
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
    return emojiRegex.test(str.split(" ")[0]);
  };

  return (
    <div className="w-full space-y-4">
      <div className="bg-white border shadow-sm p-4 sm:p-8 mt-2">
        <div className="space-y-6">
          {summary.map((item, index) => {
            const firstWord = item.heading.split(" ")[0];
            const restOfHeading = item.heading.split(" ").slice(1).join(" ");
            const startsWithEmoji = hasEmoji(item.heading);

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-start gap-2 sm:gap-3">
                  {startsWithEmoji ? (
                    <>
                      <span className="text-xl sm:text-2xl flex-shrink-0">
                        {firstWord}
                      </span>
                      <div className="space-y-2 sm:space-y-3 pt-1 w-full">
                        <p className="font-semibold text-base sm:text-lg">
                          {restOfHeading}
                        </p>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                          {item.text}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2 sm:space-y-3 w-full">
                      <p className="font-semibold text-base sm:text-lg">
                        {item.heading}
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {item.text}
                      </p>
                    </div>
                  )}
                </div>

                {index < summary.length - 1 && (
                  <div className="pt-4 sm:pt-6">
                    <div className="border-t border-gray-100"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompanySummary;
