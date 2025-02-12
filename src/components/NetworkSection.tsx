
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const profileImages = Array(21).fill("/placeholder.svg");

const NetworkSection = () => {
  return (
    <section className="py-20 bg-[#FFFEF3] flex justify-center items-center">
      <div className="container mx-auto px-4 flex justify-center">
        {/* White Card with Flexible Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center"
        >
          {/* Left Side: Profile Circles */}
          <div className="w-full md:w-1/2 grid grid-cols-7 gap-3 p-4">
            {profileImages.slice(0, 21).map((src, index) => (
              <div
                key={index}
                className="w-14 h-14 rounded-full border-2 border-white overflow-hidden"
              >
                <img src={src} alt={`Profile ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Right Side: Centered Text & Signup */}
          <div className="w-full md:w-1/2 flex flex-col items-center text-center px-6">
            <h2 className="text-2xl md:text-3xl text-gray-800 mb-6 font-semibold">
              Search and Network with alums across programs and batches
            </h2>

            <Button className="bg-[#EE5023] hover:bg-[#d9461f] text-white transition-colors duration-300 px-12 py-6 text-lg rounded-none">
              Login/Signup
            </Button>



            <p className="mt-6 text-gray-500 text-sm">Powered by AlmaConnect</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};




export default NetworkSection;
