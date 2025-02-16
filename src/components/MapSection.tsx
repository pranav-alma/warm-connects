
import { Button } from "./ui/button";
import HoverButton from "./ui/HoverButton";

const MapSection = () => {
  const markers = [
    { value: 484, top: "40%", left: "55%", size: "large", label: "The World Journal\non Juristic Polity" },
    { value: 245, top: "50%", left: "52%", size: "medium", label: "Action Home World" },
    { value: 138, top: "45%", left: "75%", size: "medium" },
    { value: 115, top: "70%", left: "55%", size: "medium" },
    { value: 44, top: "48%", left: "65%", size: "x-small", hasWhiteBox: true },
    { value: 29, top: "55%", left: "60%", size: "x-small", hasWhiteBox: true },
    { value: 16, top: "42%", left: "68%", size: "x-small", hasWhiteBox: true },
    { value: 12, top: "45%", left: "58%", size: "x-small", hasWhiteBox: true },
    { value: 12, top: "52%", left: "56%", size: "x-small", hasWhiteBox: true },
  ];
  

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Black & White Background Map */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url('/lovable-uploads/map/16f24a156b3554aa0b23cc8ca3b8e3cf.png')`,
          backgroundSize: '110%', // Zoomed-in effect
          backgroundPosition: 'center', // Keep it centered
          backgroundRepeat: 'no-repeat',
          width: '1713px',
          height: '916.25px',
          top: '-246.63px', // Moved 100px up
          left: '-100px', // Moved 100px left
          transform: 'scale(1.1)',
          filter: 'grayscale(100%)',
        }}
      />



      {/* Rotated Slash "/" Gradient */}
      <div 
        className="absolute inset-0 z-1"
        style={{
          background: 'linear-gradient(135deg, rgba(120,2,22,0.9) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)',
        }}
      />


      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-xl">
          <h2 className="text-7xl font-serif font-normal text-white mb-4 leading-tight">
            SBS Alumni on<br />Global Map
          </h2>
          <p className="text-xl text-white mb-8 font-light">
            Connect with your alumni today!
          </p>
          <HoverButton text="Sign in now"/>

        </div>
      </div>

      {/* Map Markers */}
      {markers.map((marker, index) => {
        const sizeClasses = {
          'large': 'w-32 h-32 text-3xl',
          'medium': 'w-24 h-24 text-xl',
          'small': 'w-20 h-20 text-lg',
          'x-small': 'w-12 h-12 text-sm'
        }[marker.size];

        if (marker.hasWhiteBox) {
          return (
            <div
              key={index}
              className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: marker.top,
                left: marker.left
              }}
            >
              <div className="bg-white rounded-lg px-4 py-2 shadow-lg flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#C93329]"></div>
                <span className="text-[#C93329] font-medium">{marker.value}</span>
              </div>
            </div>
          );
        }

        return (
          <div
            key={index}
            className="absolute z-10 text-center"
            style={{
              top: marker.top,
              left: marker.left
            }}
          >
            <div className={`${sizeClasses} bg-[#C93329] rounded-full flex items-center justify-center font-medium text-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110`}>
              {marker.value}
            </div>
            {marker.label && (
              <div className="absolute whitespace-nowrap text-white font-medium mt-2 left-1/2 transform -translate-x-1/2">
                {marker.label.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default MapSection;
