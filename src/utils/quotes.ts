
export const getRandomQuote = (): string => {
  const quotes = [
    "The secret of getting ahead is getting started. – Mark Twain",
    "It always seems impossible until it's done. – Nelson Mandela",
    "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
    "The way to get started is to quit talking and begin doing. – Walt Disney",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "You don't have to be great to start, but you have to start to be great. – Zig Ziglar",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "The harder I work, the luckier I get. – Samuel Goldwyn",
    "Focus on being productive instead of busy. – Tim Ferriss",
    "The most difficult thing is the decision to act, the rest is merely tenacity. – Amelia Earhart",
    "Success is walking from failure to failure with no loss of enthusiasm. – Winston Churchill",
    "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. – Steve Jobs",
    "The future depends on what you do today. – Mahatma Gandhi",
    "Don't judge each day by the harvest you reap but by the seeds that you plant. – Robert Louis Stevenson"
  ];

  return quotes[Math.floor(Math.random() * quotes.length)];
};
