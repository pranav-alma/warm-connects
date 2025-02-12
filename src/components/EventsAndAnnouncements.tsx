import React from "react";
import { Button } from "@/components/ui/button";

interface Announcement {
  date: string;
  title: string;
  excerpt: string;
}

interface AlumniProfile {
  name: string;
  position: string;
  organization: string;
  imageUrl: string;
}

interface Event {
  date: string;
  day: string;
  month: string;
  title: string;
  location: string;
  organizer: string;
  email: string;
  imageUrl?: string;
}

const announcements: Announcement[] = [
  {
    date: "April 29, 2021",
    title: "Tata Communications (SYNH) Tops Q1 Earnings and Revenue Estimates, Greater Noida",
    excerpt: "Tata Communications (SYNH) came out with quarterly earnings of $0.79 per share, beating the Zack...",
  },
  {
    date: "April 27, 2021",
    title: "Tata Communications Partners with Medable, Expanding Decentralized Solutions",
    excerpt: "New Partnership Leverages Medable's Patient-Centred Cloud Platform, Accelerating Seamles...",
  },
  {
    date: "April 25, 2021",
    title: "Tata Communications (SYNH) Tops Q1 Earnings and Revenue Estimates, Greater Noida",
    excerpt: "Tata Communications (SYNH) came out with quarterly earnings of $0.79 per share, beating the Zack...",
  },
];

const alumni: AlumniProfile[] = [
  {
    name: "Subir Kumar Banerjee",
    position: "Emeritus and Founding Director",
    organization: "Institute of Rock Magnetism",
    imageUrl: "/lovable-uploads/3ccd8266-39d6-4245-afa5-37125563aca7.png",
  },
  {
    name: "Hirak Kumar Sen",
    position: "Founder and CEO",
    organization: "H. K. Sen & Associates",
    imageUrl: "/lovable-uploads/bcb7c699-7ee5-432a-93c4-d485974d8b54.png",
  },
  {
    name: "Sarbari Gupta",
    position: "President and CEO",
    organization: "Electrosoft",
    imageUrl: "/lovable-uploads/f332db90-32f1-4dc2-8eaf-d78eb9326cd2.png",
  },
  {
    name: "Anand Sen",
    position: "Executive Director and Chief Operating Officer",
    organization: "Tata International Limited",
    imageUrl: "/lovable-uploads/f8535f7e-c4ec-4149-9736-469e30cd13ba.png",
  },
];

const upcomingEvents: Event[] = [
  {
    date: "DEC 08, 2023 | LIVE AND ONLINE",
    day: "08",
    month: "DEC",
    title: "Impact of AI in the next decade",
    location: "Online",
    organizer: "John Gosain",
    email: "john@sonspot.com/+1-999999999",
    imageUrl: "/ai-impact.jpg",
  },
  {
    date: "DEC 20, 2023 | LIVE AND ONLINE",
    day: "20",
    month: "DEC",
    title: "Launch of Next Gen Product",
    location: "Online",
    organizer: "Beth Roberts",
    email: "beth@soppa.com/+1-999999999",
    imageUrl: "/product-launch.jpg",
  },
];

const recentEvents: Event[] = [
  {
    date: "Jun '23",
    day: "15",
    month: "JUN",
    title: "John's Farewell",
    location: "Main Campus",
    organizer: "Event Team",
    email: "events@example.com",
    imageUrl: "/farewell.jpg",
  },
  {
    date: "May '23",
    day: "20",
    month: "MAY",
    title: "March Product Release",
    location: "Virtual",
    organizer: "Product Team",
    email: "products@example.com",
    imageUrl: "/release.jpg",
  },
];
const EventsAndAnnouncements = () => {
  return (
    <section 
      className="relative w-full py-16"
      style={{
        background: 'linear-gradient(225deg, #FCCC68 0%, #F07053 100%)',
      }}
    >
      <div className="container mx-auto px-4 realtive z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Announcements Section */}
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold font-serif mb-6 pb-2 border-b-2 border-[#C93329]">
              ANNOUNCEMENTS
            </h2>
            <div className="space-y-6">
              {announcements.map((announcement, index) => (
                <div key={index} className="space-y-2">
                  <p className="text-[#5A5A5A] italic text-sm">{announcement.date}</p>
                  <h3 className="font-bold font-serif text-base">
                    {announcement.title}
                    <a href="#" className="text-[#1A73E8] ml-2 font-sans hover:underline">
                      Read more
                    </a>
                  </h3>
                  <p className="text-[#5A5A5A] text-sm font-sans">{announcement.excerpt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Distinguished Alumni Section */}
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-[#C93329]">
              Distinguished Alumni
            </h2>
            <div className="space-y-6">
              {alumni.map((profile, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={profile.imageUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{profile.name}</h3>
                    <p className="text-gray-600">
                      {profile.position}, {profile.organization}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-[#FDE1D3] rounded-lg p-4">
              <p className="text-gray-700">
                Want to nominate someone for an award? Write to us at{" "}
                <a href="mailto:abc@delhi.sbs.in" className="text-[#1A73E8]">
                  abc@delhi.sbs.in
                </a>
              </p>
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold pb-2 border-b-2 border-[#C93329]">
                Upcoming Alum Events
              </h2>
              <Button variant="link" className="text-[#C93329]">
                View all
              </Button>
            </div>
            <div className="space-y-8">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="bg-[#C93329] text-white rounded-lg p-2 text-center w-16">
                        <div className="text-sm">{event.month}</div>
                        <div className="text-xl font-bold">{event.day}</div>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <p className="text-gray-600 italic">{event.date}</p>
                      <p className="text-gray-700">{event.organizer} / {event.email}</p>
                      <Button className="mt-4 bg-[#C93329] hover:bg-[#A62822]">
                        Register
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Events Section */}
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-[#C93329]">
              Recent Events
            </h2>
            <div className="space-y-6">
              {recentEvents.map((event, index) => (
                <div key={index} className="space-y-2">
                  <p className="text-gray-600 italic">{event.date}</p>
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Background Image */}
      <div className="absolute bottom-0 left-0 w-full h-64 pointer-events-none z-0">
  <div 
    className="absolute inset-0 bg-no-repeat bg-bottom bg-cover w-full"
    style={{
      backgroundImage: `url('/lovable-uploads/background/ef35b8e5e57158a21745df533a24c52f.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center bottom',
      opacity: 0.7,
      zIndex: 0
    }}
  />
</div>


    </section>
  );
};


export default EventsAndAnnouncements;
