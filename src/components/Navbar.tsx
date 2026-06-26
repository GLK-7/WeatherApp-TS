import { motion } from 'framer-motion';
import { CloudSun } from '@phosphor-icons/react';

interface Props {
  children?: React.ReactNode;
}

const Navbar = ({ children }: Props) => {
  return (
    <motion.nav
      className="relative z-20 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 px-6 py-4 bg-black/10 backdrop-blur-sm border-b border-white/10">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <CloudSun size={22} color="#fff" weight="fill" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-base leading-tight">WeatherApp</span>
            <span className="text-white/50 text-[10px] font-medium uppercase tracking-widest">Live Forecast</span>
          </div>
        </div>

        {/* Children (search bar) */}
        <div className="flex-1 flex justify-center sm:justify-end w-full">
          {children}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
