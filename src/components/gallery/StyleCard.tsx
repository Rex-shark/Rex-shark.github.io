import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface StyleCardProps {
  title: string
  subtitle: string
  description: string
  to: string
  accentColor: string
  bgColor: string
  textColor: string
  preview: React.ReactNode
}

export default function StyleCard({
  title,
  subtitle,
  description,
  to,
  accentColor,
  bgColor,
  textColor,
  preview,
}: StyleCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Link to={to} className="block group cursor-pointer">
        <div
          className="rounded-2xl overflow-hidden border border-black/8 shadow-sm hover:shadow-xl transition-shadow duration-300"
          style={{ background: bgColor }}
        >
          {/* 預覽區 */}
          <div className="h-52 relative overflow-hidden flex items-center justify-center">
            {preview}
          </div>

          {/* 資訊區 */}
          <div className="p-6">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-1"
              style={{ color: accentColor }}
            >
              {subtitle}
            </p>
            <h2
              className="text-xl font-bold mb-2"
              style={{ color: textColor }}
            >
              {title}
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: textColor, opacity: 0.6 }}>
              {description}
            </p>
            <div
              className="flex items-center gap-1.5 text-sm font-medium transition-gap duration-200"
              style={{ color: accentColor }}
            >
              查看此風格
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
