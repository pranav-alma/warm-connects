
import { Link } from "react-router-dom";
import { MapPin, Star, ExternalLink } from "lucide-react";

const Footer = () => {
  const accreditationLinks = [
    {
      url: "https://www.cbse.gov.in/",
      icon: "/lovable-uploads/footer-logo/2cd8d4b02ec37dd337fe650117c5bd9c.png",
    },
    {
      url: "https://www.cambridgeinternational.org/",
      icon: "/lovable-uploads/footer-logo/7d09c8af7b35e597cce99b82333f25b6.png",
    },
    {
      url: "https://www.ibo.org/",
      icon: "/lovable-uploads/footer-logo/22d374e309cc20a7a9876acb39c72215.png",
    },
    {
      url: "https://www.roundsquare.org/",
      icon: "/lovable-uploads/footer-logo/812705465d4edc46ad17807de457a7b1.png",
    },
  ];
  const base_url = "http://localhost:8080";
  const quickLinks = [
    { name: "Admissions", path: "/admissions/" },
    { name: "Join Us", path: "/join-us/" },
    { name: "Publications", path: "/publications/" },
    { name: "Blogs", path: "/blogs/" },
    { name: "Reach Us", path: "/reach-us/" },
    { name: "ERP Login", path: "/erp-login/" },
    { name: "Statutory Compliances", path: "/compliances/" },
    { name: "General Information", path: "/general-information/" },
    { name: "Transfer Certificate", path: "/pages/transfer_certificate_new.cfm" },
    { name: "Disclaimer", path: "/download" },
  ];

  return (
    <footer className="bg-[#FFFDE8] relative font-['Cardo']">
      <div className="container mx-auto px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Logo and Tagline */}
            <div className="max-w-[300px]">
              <img 
                src="/lovable-uploads/fbc0653e-edfe-4c0c-952d-3e7baeab3401.png" 
                alt="Step By Step School Logo" 
                className="w-full"
              />
            </div>

            {/* Address */}
            <div className="text-black text-base">
              <p>
                Address :<br />
                Step By Step School, Plot A-10, Sector - 132,<br />
                Taj Expressway, Noida – 201 303
              </p>
            </div>

            {/* Phone Number */}
            <div className="text-black text-base">
              Phone :<br />
              <p>0120–5087300</p>
            </div>

            {/* Accreditation Icons */}
            <div className="flex space-x-4">
              {accreditationLinks.map(({ url, icon }, index) => (
                <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={icon}
                    alt={`Accreditation ${index + 1}`}
                    className="w-12 h-12 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-black -mx-6" />

          {/* Right Column */}
          <div className="space-y-8 md:flex">
            {/* Quick Links */}
            <div className="flex-1">
              <h3 className="font-bold text-lg text-[#9F021D] mb-6">
                QUICK LINKS
              </h3>
              <ul className="space-y-2">
                {quickLinks.map(({ name, path }) => (
                  <li key={name}>
                    <a
                      href={`${base_url}${path}`}
                      className="text-base text-[#9F021D] hover:text-black transition-colors"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map Embed */}
            <div className="flex-shrink-0">
              <iframe
                title="Step By Step School Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.470173102662!2d77.3751745!3d28.5117808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce6281d06e50d%3A0x1604ff30bb8d2595!2sStep%20by%20Step%20School!5e0!3m2!1sen!2sin!4v1707745072465!5m2!1sen!2sin"
                width="465.33"
                height="366.67"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-[465.33px] h-[366.67px] object-cover"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-[#9F021D] py-4">
        <p className="text-white text-sm text-center">
          © 2025 | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
