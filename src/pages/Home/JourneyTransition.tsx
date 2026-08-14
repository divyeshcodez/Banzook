import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const JourneyTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background color from off-white to black
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3],
    ['#FDFBF7', '#111111']
  );

  // Orange Accent Reveal (growing line)
  const orangeHeight = useTransform(scrollYProgress, [0, 0.2], ['0%', '100%']);
  const orangeOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.6], [0, 1, 1, 0]);

  // "PROCESS" Huge Text Reveal
  const processOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.7, 0.9], [0, 0.03, 0.03, 0]);
  const processScale = useTransform(scrollYProgress, [0.2, 0.9], [0.8, 1.1]);

  // Label 1: "01 — FROM STATEMENT TO PROCESS"
  const label1Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const label1Y = useTransform(scrollYProgress, [0.3, 0.4], [20, 0]);

  return (
    <motion.section 
      ref={containerRef}
      className="relative w-full h-[250vh]"
      style={{ backgroundColor }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background "PROCESS" Word */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: processOpacity, scale: processScale }}
        >
          <span className="text-[20vw] md:text-[15vw] font-black text-white font-condensed tracking-tighter leading-none select-none">
            PROCESS
          </span>
        </motion.div>

        {/* Central Orange Accent Line */}
        <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[2px] h-[100px] md:h-[150px] relative">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-[#FF4D1A]"
              style={{ height: orangeHeight, opacity: orangeOpacity }}
            />
          </div>
        </motion.div>

        {/* Labels Sequence */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="absolute text-white font-mono text-[9px] md:text-[10px] tracking-[0.3em] font-bold uppercase"
            style={{ opacity: label1Opacity, y: label1Y }}
          >
            01 — FROM STATEMENT TO PROCESS
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
};
