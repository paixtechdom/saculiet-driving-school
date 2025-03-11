import React from 'react'
import { db } from '../../assets/Constants'

export const JobPage = () => {
  return (
    <div className="w-full">

      <div className="bg-cover bg-center h-[60vh] flex items-center justify-center text-white bg-jobBg flex-col">
        <h1 className="text-3xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded-md">
          Truck Driver Vacancy – Imediate Employment
        </h1>
        <p>
          Join Saculiet Driving School & Logistics Today!
        </p>
      </div>

      {/* Job Details */}
      <VacancyCard />

      {/* Location List */}
      <LocationList />

      {/* Contact Info */}
      <ContactSection />
    </div>
  );
}





export const VacancyCard = () => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700">Truck Driver Vacancy</h2>
      <p className="text-gray-600 mt-2">Urgently needed for immediate employment</p>
      <h3 className="text-xl font-semibold mt-4 text-gray-800">Qualifications</h3>
      <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
        <li>1-3 years of experience</li>
        <li>Valid Driver’s License (Class G preferred)</li>
        <li>Excellent verbal and written communication skills</li>
        <li>Must have a smartphone</li>
        <li>Ability to use Zoom, WhatsApp, and sales tools</li>
        <li>Sales experience (added advantage)</li>
        <li>Negotiation and influencing skills</li>
        <li>Financial discipline and integrity</li>
      </ul>
      <p className="mt-4 text-gray-700">
        <strong>Location:</strong> Applicants must reside in specified areas within Lagos.
      </p>
    </div>
  );
};



const locations = [
  "Mushin", "Festac", "Ikeja", "Apapa", "Ikotun", "Ikorodu", "Iyana Ipaja",
  "Idimu", "Surulere", "Shomolu", "Palmgroove", "Onipanu", "Ijesha", "Agege",
  "Trade Fair", "Ojo", "Abule Egba", "Ajegunle", "Gbagada", "Oshodi", "Ojota",
  "Igbo Eran", "Chevron", "Marina", "Badagry"
];

export const LocationList = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-md mt-6">
      <h3 className="text-lg font-semibold text-gray-800">Eligible Locations in Lagos</h3>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-700 mt-2">
        {locations.map((location, index) => (
          <li key={index} className="p-2 bg-white shadow-sm rounded-md">{location}</li>
        ))}
      </ul>
    </div>
  );
};



export const ContactSection = () => {
  return (
    <div className="text-center p-6 bg-blue-600 text-white rounded-md mt-6">
      <h3 className="text-xl font-semibold">Apply Now</h3>
      <p className="mt-2">Send your CV to <strong>saculietdrivingschool@gmail.com</strong></p>
      <p className="mt-2">
        Contact: <a href="tel:+2349065823571" className="underline">+234 906 582 3571</a>, 
        <a href="tel:+2349163268225" className="underline"> +234 916 326 8225</a>
      </p>
      <p className="mt-2">Address: No. 16 & 17C, Jehoshamma Plaza, Ogba, Ikeja, Lagos</p>
    </div>
  );
};

