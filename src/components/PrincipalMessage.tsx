
import { motion } from "framer-motion";

const PrincipalMessage = () => {
  return (
    <section className="bg-[#FFFEF3] py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2
            className="text-5xl font-semibold text-center mb-16"
            style={{ fontFamily: "'Cardo', serif" }}
          >
            <span style={{ color: "#181122" }}>From the </span>
            <span style={{ color: "#9F021D" }}>Principal’s Desk,</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="aspect-square rounded-lg overflow-hidden shadow-xl"
              >
                <img
                  src="/lovable-uploads/f332db90-32f1-4dc2-8eaf-d78eb9326cd2.png"
                  alt="Portrait of Dr. Mahesh Prasad"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <div className="w-full md:w-3/4">
              <p className="text-gray-700 text-xl leading-relaxed mb-10" style={{ fontFamily: "'Cardo', serif" }}>
                Welcome to <b>SBSAlum</b>, a space dedicated to celebrating the bonds that tie us together beyond the school years. 
                As you embark on new journeys, we take pride in the individuals you have become and the impact you are making in the world. 
                This platform is your gateway to reconnect, collaborate, and continue being a part of the SBS legacy.
              </p>
              <p className="text-gray-700 text-xl leading-relaxed mb-10" style={{ fontFamily: "'Cardo', serif" }}>
                Stay connected, share your stories, and inspire future generations. 
                Once an SBS student, always a part of the SBS family!
              </p>
              <div className="text-gray-700" style={{ fontFamily: "'Cardo', serif" }}>
                <p className="text-lg">Warm Regards,</p>
                <p className="font-bold text-xl">Dr. Mahesh Prasad</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>


  );
};

export default PrincipalMessage;
