'use client';

export default function GraveyardStats() {
  const stats = [
    { label: "Projects started this week", value: "3", emoji: "🪦" },
    { label: "Projects that never had a chance", value: "67%", emoji: "💀" },
    { label: "Days since last 'I'll finish this tomorrow'", value: "2", emoji: "⏰" },
    { label: "Main cause of death", value: "Lost Interest", emoji: "🫠" }
  ];

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-cyan-400 mb-4">Graveyard Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{stat.emoji}</span>
              <span className="text-cyan-300 font-bold text-lg">{stat.value}</span>
            </div>
            <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-purple-900/20 border border-purple-800/50 rounded-lg">
        <p className="text-purple-300 text-sm italic">
          "The graveyard is full of good intentions and abandoned repos."
        </p>
      </div>
    </div>
  );
}
