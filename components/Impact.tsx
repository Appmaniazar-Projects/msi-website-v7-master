'use client';

import { motion, useSpring, useInView, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Counter = ({ number, label }: { number: string; label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const finalNumber = parseInt(number.replace(/[^0-9]/g, ''));
  
  const spring = useSpring(0, {
    damping: 30,
    stiffness: 100
  });

  useEffect(() => {
    if (isInView) {
      spring.set(finalNumber);
    }
  }, [spring, finalNumber, isInView]);

  const displayNumber = useTransform(spring, (latest) => 
    `${Math.round(latest)}${number.includes('+') ? '+' : number.includes('%') ? '%' : ''}`
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full sm:w-1/2 md:w-1/4 mb-8"
    >
      <motion.div className="text-5xl font-bold mb-2">
        {displayNumber}
      </motion.div>
      <div>{label}</div>
    </motion.div>
  );
};

export default function Impact() {
  const stats = [
    { number: '15+', label: 'Years of Experience' },
    { number: '700000+', label: 'Beneficiaries Reached' },
    { number: '160+', label: 'Schools Partnered' },
    { number: '400+', label: 'Dedicated Tutors' }
  ];

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-navy-blue">Our Impact</h2>
        <div className="flex flex-wrap justify-center text-red-600">
          {stats.map((stat) => (
            <Counter key={stat.label} number={stat.number} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
