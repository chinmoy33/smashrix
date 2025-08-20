import React from 'react';
import { Mail, Phone, Award, Star } from 'lucide-react';
import chinmoy from '../assets/chinmoy_photo.jpg';
import diptangshu from '../assets/diptangshu.jpg';
import orin from '../assets/orin.jpg';
import dijit from '../assets/dijit.jpg';
import mridul from '../assets/Mridul.webp';
import iran from '../assets/iran.jpg';
import ishita from '../assets/ishita.jpg';
import angaraj from '../assets/angaraj.jpg';
import rohan from '../assets/rohan.jpg';
import kalpeeta from '../assets/kalpita.jpg';
import antara from '../assets/antara.jpg';

const About: React.FC = () => {
  const coaches = [
    {
      id: 1,
      name: "Chinmoy Sharma",
      role: "Club Head and Founder",
      experience: "4th year",
      image: chinmoy,
      email: "chinmoysharma2003@gmail.com",
      phone: "7896911752"
    },
    {
      id: 2,
      name: "Iran Kataky",
      role: "Club Head and Founder",
      experience: "4th year",
      //specialization: "Advanced Techniques",
      //image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
      image: iran,
      //achievements: ["Former World Ranking #45", "Youth Development Expert", "Sports Science Degree"],
      email: "irankataky0906@gmail.com",
      phone: "6900300469"
    },
    {
      id: 3,
      name: "Angaraj Thengal",
      role: "Executive Member",
      experience: "4th year",
      //specialization: "Sports Conditioning",
      image: angaraj,
      //achievements: ["Sports Medicine Degree", "Certified Strength Coach", "Injury Prevention Expert"],
      email: "angarajthengal5759@gmail.com",
      phone: "9864724303"
    },
    {
      id: 4,
      name: "Rohan Borkotoky",
      role: "Executive Member",
      experience: "4th year",
      //specialization: "Sports Conditioning",
      image: rohan,
      //achievements: ["Sports Medicine Degree", "Certified Strength Coach", "Injury Prevention Expert"],
      email: "rohanborkotoky123@gmail.com",
      phone: "9707824182"
    },
    {
      id: 5,
      name: "Kalpeeta Sarma",
      role: "Executive Member",
      experience: "4th year",
      //specialization: "Sports Conditioning",
      image: kalpeeta,
      //achievements: ["Sports Medicine Degree", "Certified Strength Coach", "Injury Prevention Expert"],
      email: "kalpeetasarma2003@gmail.com",
      phone: "9101776681"
    },
    {
      id: 6,
      name: "Antara Talukdar",
      role: "Executive Member",
      experience: "4th year",
      //specialization: "Sports Conditioning",
      image: antara,
      //achievements: ["Sports Medicine Degree", "Certified Strength Coach", "Injury Prevention Expert"],
      email: "antaratalukdar31@gmail.com",
      phone: "9387123106"
    },
    {
      id: 7,
      name: "Mridul Hazarika",
      role: "Executive Member",
      experience: "3rd year",
      //specialization: "Sports Conditioning",
      image: mridul,
      //achievements: ["Sports Medicine Degree", "Certified Strength Coach", "Injury Prevention Expert"],
      email: "mridul23@jecassam.ac.in",
      phone: "8638911494"
    },
    {
      id: 8,
      name: "Diptangshu Parashar",
      role: "Executive Member",
      experience: "3rd year",
      //specialization: "Junior Development",
      image: diptangshu,
      //achievements: ["Junior World Championships", "Child Psychology Certified", "BWF Level 2 Certified"],
      email: "emma@smashrix.com",
      phone: "7099662292"
    },
    {
      id: 9,
      name: "Ishita Das",
      role: "Executive Member",
      experience: "3rd year",
      //specialization: "Sports Conditioning",
      image: ishita,
      //achievements: ["Sports Medicine Degree", "Certified Strength Coach", "Injury Prevention Expert"],
      email: "ishi712004@gmail.com",
      phone: "9864869881"
    },
    {
      id: 10,
      name: "Dijit Gautam",
      role: "Executive Member",
      experience: "2nd year",
      //specialization: "Sports Conditioning",
      image: dijit,
      //achievements: ["Sports Medicine Degree", "Certified Strength Coach", "Injury Prevention Expert"],
      email: "gautamdijit@gmail.com",
      phone: "9395982341"
    },
    {
      id: 11,
      name: "Orin Kashyap",
      role: "Executive Member",
      experience: "2nd year",
      //specialization: "Sports Conditioning",
      image: orin,
      //achievements: ["Sports Medicine Degree", "Certified Strength Coach", "Injury Prevention Expert"],
      email: "orinkashyap42@gmail.com",
      phone: "7086560707"
    },
    
  ];

  return (
    <section className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Smashrix</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Founded in 2025, Smashrix is the official badminton club of JEC. We are dedicated to 
            nurturing talent, building character, and creating a community where players of all levels can thrive. 
            We work at our level best to deliver our outcome and to bring out the best in a player.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-orange-600 mb-4">Our Mission</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our mission is to transform the skill of a player from beginner to a champion. We aim to provide daily sessions where player can participate , learn and make the evening enjoyable.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Our Vision</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To be recognized as the leading badminton club that produces champions, promotes the sport, 
              and creates lifelong friendships through the love of badminton.
            </p>
          </div>
        </div>

        {/* Coaches Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {coaches.map((coach) => (
              <div 
                key={coach.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative">
                  <img 
                    src={coach.image} 
                    alt={coach.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {coach.experience}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-gray-900">{coach.name}</h4>
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                    </div>
                  </div>
                  
                  <p className="text-orange-600 font-semibold mb-2">{coach.role}</p>
                  {/* <p className="text-gray-600 mb-4"><strong>Specialization:</strong> {coach.specialization}</p> */}
                  
                  {/* <div className="mb-4">
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Award size={16} className="mr-2 text-yellow-600" />
                      Key Achievements
                    </h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {coach.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div> */}
                  
                  <div className="border-t pt-4 flex flex-col space-y-2">
                    <a href={`mailto:${coach.phone}`}>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail size={16} className="mr-2 text-gray-500" />
                      {coach.email}
                    </div>
                    </a>
                    <a href={`tel:${coach.phone}`}>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone size={16} className="mr-2 text-gray-500" />
                      {coach.phone}
                    </div>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Club Values */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Core Values</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Excellence</h4>
              <p className="text-gray-600">Striving for the highest standards in training, facilities, and sportsmanship</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Integrity</h4>
              <p className="text-gray-600">Building character through honest competition and respectful conduct</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Community</h4>
              <p className="text-gray-600">Creating lasting bonds through shared passion for badminton</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;