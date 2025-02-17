
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import metadata from "../defaultMetadata.js"

// const profileImages = Array(21).fill("/placeholder.svg");

const NetworkSection = () => {
  const handleLogin = () => {
    window.location.href = metadata.networkAlmaUrl;
  }

  return (
    <section className="py-20 bg-[#FFFEF3] flex justify-center items-center">
      <div className="container mx-auto px-4 flex justify-center">
        {/* White Card with Flexible Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl bg-white shadow-lg p-8 flex flex-col md:flex-row items-center"
        >
        {/* Left Side: Profile Collage */}
        <div className="w-full md:w-1/2 flex justify-center p-4">
          <img 
            src="../../public/network.png" 
            alt="Profile Collage" 
            className="w-full h-auto"
          />
        </div>


          {/* Right Side: Centered Text & Signup */}
          <div className="w-full md:w-1/2 flex flex-col items-center text-center px-6">
          <h2 
            className="text-2xl md:text-3xl text-gray-800 mb-6"
            style={{ fontFamily: "'Cardo', serif" }}
          >
            <b> Search </b> and <b> Network </b> with alums across programs and batches
          </h2>

          <Button onClick={handleLogin} className="bg-[#EE5023] hover:bg-[#d9461f] text-white transition-colors duration-300 px-12 py-6 text-lg rounded-none">
            Login/Signup
          </Button>

          <p 
            className="mt-6 text-sm"
            style={{ fontFamily: "'Cardo', serif", color: "#B6B9BB" }}
          >
            Powered by AlmaConnect
          </p>

        </div>

        </motion.div>
      </div>
    </section>
  );
};




export default NetworkSection;
