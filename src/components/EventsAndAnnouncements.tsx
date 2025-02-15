import React from "react";
import { Button } from "@/components/ui/button";
import Announcements from "./Events/Announcement";
import Alumni from "./Events/Alumni"
import UpcomingEvents from "./Events/UpcomingEvents"
import RecentEvents from "./Events/RecentEvents";
// const AlumEvents = require("./Events/AlumEvents").default


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
  {
    date: "April 25, 2021",
    title: "Tata Communications (SYNH) Tops Q1 Earnings and Revenue Estimates, Greater Noida",
    excerpt: "Tata Communications (SYNH) came out with quarterly earnings of $0.79 per share, beating the Zack...",
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
      className="relative w-full py-16 overflow-hidden"
      style={{
        background: 'linear-gradient(225deg, #FCCC68 0%, #F07053 100%)',
      }}
    >
      {/* Background Image */}
      <div className="absolute bottom-0 left-0 w-full h-64 pointer-events-none z-0">
        <div 
          className="absolute inset-0 bg-no-repeat bg-bottom bg-cover w-full"
          style={{
            backgroundImage: `url('/lovable-uploads/background/ef35b8e5e57158a21745df533a24c52f.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            opacity: 0.2,
          }}
        />
      </div>

      {/* Main Content (Cards) */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Announcements Section */}
          <Announcements/>

          {/* Distinguished Alumni Section */}
          <Alumni alumni={alumni}></Alumni>

          {/* Upcoming Events Section */}
          <UpcomingEvents></UpcomingEvents>

          {/* Recent Events Section */}
          <RecentEvents></RecentEvents>
        </div>
      </div>

    </section>
  );
};



export default EventsAndAnnouncements;
