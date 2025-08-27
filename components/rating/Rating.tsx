"use client";

import { useState, useEffect } from "react";
import { content } from "@/config/content";
import { generateRatingSchema } from "@/app/schema";

export function Rating() {
  const [rating, setRating] = useState<number>(content.rating.initialRating);
  const [userRating, setUserRating] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  const calculateInitialVotes = () => {
    const baseVotes = 146;
    const startDate = new Date('2025-04-20').getTime(); // 改回原来的日期
    const today = new Date().getTime();
    const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) return baseVotes;

    // 使用日期作为种子来生成确定性的"随机"值
    const seed = daysDiff + (new Date().getMonth() * 100);
    const pseudoRandom = Math.sin(seed) * 10000;
    const randomValue = (pseudoRandom - Math.floor(pseudoRandom)) * 0.1 + 0.95; // 0.95-1.05范围

    const growthFactor = Math.log1p(daysDiff) * 1.5;
    const baseIncrease = Math.floor(growthFactor * 50);
    const variation = baseIncrease * randomValue;

    const dayOfWeek = new Date().getDay();
    const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.2 : 1;

    return Math.max(baseVotes, Math.floor(baseVotes + variation * weekendMultiplier));
  };

  const initialCalculatedVotes = calculateInitialVotes();
  const [votes, setVotes] = useState<number>(initialCalculatedVotes);

  useEffect(() => {
    // 读取所有保存的状态
    const savedHasVoted = localStorage.getItem('hasVoted') === 'true';
    const savedUserRating = localStorage.getItem('userRating');
    const savedGlobalRating = localStorage.getItem('globalRating');

    // 只有在用户已投票的情况下才设置用户评分
    if (savedHasVoted) {
      setHasVoted(true);
      if (savedUserRating) {
        setUserRating(parseInt(savedUserRating));
      }

      // 如果有保存的全局评分，使用它；否则使用初始评分
      if (savedGlobalRating) {
        setRating(parseFloat(savedGlobalRating));
      }

      // 不再从localStorage读取总票数，而是使用计算的值
      // 这样票数会随时间增长
    }

    // 无论用户是否投票，总是使用计算出的初始票数
    // 如果用户已投票，则在计算的基础上加1
    setVotes(savedHasVoted ? initialCalculatedVotes + 1 : initialCalculatedVotes);
  }, [initialCalculatedVotes]);

  const handleVote = (star: number) => {
    if (!hasVoted) {
      setUserRating(star);
      setHasVoted(true);
      const newTotalVotes = votes + 1;
      const newRating = ((rating * votes) + star) / newTotalVotes;
      const finalRating = Number(newRating.toFixed(1));

      setRating(finalRating);
      setVotes(newTotalVotes);

      localStorage.setItem('hasVoted', 'true');
      localStorage.setItem('userRating', star.toString());
      localStorage.setItem('globalRating', finalRating.toString());
      localStorage.setItem('totalVotes', newTotalVotes.toString());
    }
  };

  // 添加重置功能
  const handleReset = () => {
    localStorage.removeItem('hasVoted');
    localStorage.removeItem('userRating');
    localStorage.removeItem('globalRating');
    localStorage.removeItem('totalVotes');
    setHasVoted(false);
    setUserRating(0);
    setRating(content.rating.initialRating);
    setVotes(146); // 使用基础票数
  };

  return (
    <section className="mb-16" id="rating">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateRatingSchema(rating, votes))
        }}
      />

      <div className="container mx-auto">
        <div className="bg-[#fff2cb] rounded-lg p-6 mb-6">
          <h2 className="text-3xl font-bold text-center">{content.rating.title}</h2>
          {/* 添加重置按钮 */}
          <div className="text-center mt-2">
            <button
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-gray-700"
              style={{ display: process.env.NODE_ENV === 'development' ? 'block' : 'none' }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleVote(star)}
                disabled={hasVoted}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${
                  (hasVoted && star <= userRating) || (!hasVoted && star <= userRating)
                    ? 'bg-yellow-400 text-white'
                    : hasVoted
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-yellow-200 cursor-pointer'
                }`}
                aria-label={`Rate ${star} stars`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ))}
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-500">{rating}</div>
            <div className="text-gray-500">
              <span className="font-semibold">{votes.toLocaleString()}</span> {content.rating.votes}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}









