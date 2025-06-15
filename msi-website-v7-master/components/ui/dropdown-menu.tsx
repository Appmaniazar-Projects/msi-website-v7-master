"use client"

import React, { ReactNode, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"

interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
  align?: 'left' | 'right'
}

export const DropdownMenu: React.FC<DropdownProps> = ({ trigger, children, align = 'left' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <DropdownMenuTrigger onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </DropdownMenuTrigger>
      
      {isOpen && (
        <DropdownMenuContent align={align}>
          {children}
        </DropdownMenuContent>
      )}
    </div>
  )
}

export const DropdownMenuContent: React.FC<{
  children: ReactNode, 
  align?: 'left' | 'right'
}> = ({ children, align = 'left' }) => (
  <div 
    className={cn(
      "absolute top-full mt-2 bg-white rounded-md shadow-lg z-50 py-1",
      align === 'left' ? 'left-0' : 'right-0',
      "min-w-[200px] border"
    )}
  >
    {children}
  </div>
)

export const DropdownMenuItem: React.FC<{ 
  children: ReactNode, 
  href?: string, 
  onClick?: () => void,
  className?: string
}> = ({ children, href, onClick, className }) => {
  const content = (
    <div 
      className={cn(
        "px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )

  return href ? (
    <Link href={href}>
      {content}
    </Link>
  ) : (
    content
  )
}

export const DropdownMenuTrigger: React.FC<{ 
  children: ReactNode, 
  className?: string,
  onClick?: () => void
}> = ({ children, className, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center space-x-1",
      className
    )}
  >
    {children}
    <ChevronDown className="h-4 w-4 transition-transform text-current" />
  </button>
)

export const DropdownMenuSubTrigger: React.FC<{ 
  children: ReactNode, 
  inset?: boolean,
  className?: string
}> = ({ children, inset, className }) => (
  <div
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-red-100 data-[state=open]:bg-red-100",
      inset && "pl-8",
      className
    )}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </div>
)

export const DropdownMenuSubContent: React.FC<{ 
  children: ReactNode, 
  className?: string 
}> = ({ children, className }) => (
  <div
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-gray-900 shadow-lg",
      className
    )}
  >
    {children}
  </div>
)
