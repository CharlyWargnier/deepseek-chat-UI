"use client"

interface BrandedHeaderProps {
  model: string
  temperature: number
}

export function BrandedHeader({ model, temperature }: BrandedHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-blue-600/90 text-white p-6 rounded-t-lg backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* DeepSeek Logo */}
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-8 h-8">
              {/* DeepSeek whale logo - more accurate */}
              <ellipse cx="100" cy="100" rx="60" ry="40" fill="#4F46E5" />
              <ellipse cx="100" cy="100" rx="45" ry="30" fill="#6366F1" />
              <circle cx="115" cy="90" r="8" fill="#3B82F6" />
              <circle cx="118" cy="87" r="3" fill="white" />
              <path d="M40 100 Q30 90 25 100 Q30 110 40 100" fill="#4F46E5" />
              <path d="M160 100 Q170 90 175 100 Q170 110 160 100" fill="#4F46E5" />
              <path d="M80 125 Q100 135 120 125" stroke="#3B82F6" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold">Chat Interface for DeepSeek</h1>
            <p className="text-blue-100 text-sm">
              Powered by advanced reasoning AI
            </p>
          </div>
        </div>
        
        {/* Model Info */}
        <div className="text-right">
          <div className="text-sm font-medium">
            {model.split('/').pop()?.replace(/-/g, ' ')}
          </div>
          <div className="text-xs text-blue-200">
            Temperature: {temperature} • Context: 128K
          </div>
        </div>
      </div>
    </div>
  )
} 