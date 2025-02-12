import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-cover bg-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/lovable-uploads/4f2e22df096fb8f235c668c1269eeeca.jpeg")',
        }}
      />

      {/* Brown gradient fade from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#210308] via-[#00000090] to-transparent" />

      {/* Content */}
      <div className="relative container mx-auto px-4 h-screen flex items-end justify-center pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h2
            className="text-white mb-2 animate-fade-in"
            style={{
              fontSize: '64px',
              fontWeight: '400',
              lineHeight: '56px',
              textAlign: 'center',
              textUnderlinePosition: 'from-font',
              textDecorationSkipInk: 'none',
            }}
          >
            Welcome to
          </h2>
          <h1
            className="text-white mb-8 animate-fade-in"
            style={{
              fontSize: '96px',
              fontWeight: '700',
              lineHeight: '84px',
              letterSpacing: '-2px',
              textAlign: 'left',
              textUnderlinePosition: 'from-font',
              textDecorationSkipInk: 'none',
            }}
          >
            SBSAlum
          </h1>
        </motion.div>
      </div>

      {/* Straight bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-cream" />
    </section>
  );
};

export default HeroSection;
