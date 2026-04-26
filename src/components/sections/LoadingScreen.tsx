import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/96 backdrop-blur-sm"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-display font-bold text-gradient-gold"
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          Heaven X
        </motion.h1>
        <motion.p
          className="text-muted-foreground mt-3 text-sm tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          Mobile & Web Apps Developer
        </motion.p>
        <motion.div
          className="mt-6 h-[2px] w-[120px] bg-primary/20 mx-auto overflow-hidden rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-primary"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
