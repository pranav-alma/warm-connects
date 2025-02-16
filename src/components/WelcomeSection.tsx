
import { motion } from "framer-motion";

const WelcomeSection = () => {
  return (
    <section className="bg-[#FFFEF3] py-20 relative">
    {/* Positioned Image */}
    <img
      src="/lovable-uploads/curtain/616fbe92ad014f866d858aac_shape-p-800.jpg"
      alt="Decorative Element"
      className="absolute opacity-30"
      style={{
        width: "225px",  // 25% of 536px
        height: "300px", // 25% of 535.31px
        top: "0px",    // Attach to the top
        left: "0px",   // Attach to the left
        objectFit: "cover",
      }}
      />

      {/* Right-top image */}
      <img
        src="/lovable-uploads/curtain/616fbe92ad014f866d858aac_shape-p-800.jpg"
        alt="Decorative Element"
        className="absolute opacity-30"
        style={{
          width: "150px",
          height: "200px",
          top: "0px",
          right: "0px", // Positioned at the top-right
          transform: "scaleX(-1)",  // Mirrors the image horizontally
          objectFit: "cover",
        }}
      />


      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-[640px] mx-auto"
        >
          <h3 className="text-5xl md:text-6xl text-burgundy mb-8 ">
            SBS Alumni and Friends
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
          SBSAlum is more than just a platform—it’s a bridge that brings our alumni together,
          celebrating the shared experiences that shaped us at SBS. Whether you’re reconnecting with
          old friends, expanding your professional network, or giving back to the community that
          nurtured you, this is your space to stay engaged.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Join a vibrant network of SBS alumni, where memories are cherished, achievements are
          celebrated, and lifelong connections continue to thrive.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeSection;
