import { motion } from 'framer-motion';
import { WarningCircle } from '@phosphor-icons/react';

interface Props {
  message: string;
  onDismiss: () => void;
}

const ErrorCard = ({ message, onDismiss }: Props) => (
  <motion.div
    className="flex items-center gap-3 bg-red-500/20 border border-red-400/30 text-white rounded-2xl px-5 py-4 max-w-lg w-full"
    initial={{ opacity: 0, scale: 0.95, y: -10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 200 }}
  >
    <WarningCircle size={22} className="text-red-300 flex-shrink-0" weight="fill" />
    <span className="flex-1 text-sm">{message}</span>
    <button
      onClick={onDismiss}
      className="text-white/50 hover:text-white text-xs underline transition-colors"
    >
      Fechar
    </button>
  </motion.div>
);

export default ErrorCard;
