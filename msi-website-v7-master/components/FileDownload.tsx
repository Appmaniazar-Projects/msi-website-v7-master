'use client'

import { motion } from 'framer-motion'
import { FileText, Download } from 'lucide-react'

interface FileDownloadProps {
  name: string;
  path: string;
}

export function FileDownload({ name, path }: FileDownloadProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-4 border border-gray-200 rounded-lg hover:border-red-500 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-red-600" />
          <span className="text-gray-700">{name}</span>
        </div>
        <a
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-red-600 hover:text-red-800 transition-colors"
        >
          <Download className="w-5 h-5" />
        </a>
      </div>
    </motion.div>
  )
}