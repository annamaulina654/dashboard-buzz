const companyInfo = {
  contact: {
    founder: "Founder",
    email: "buzz.dashboard@gmail.com",
    website: "https://dashboardbuzz.id",
  },
  details: {
    stage: "None",
    founded: "2025",
    industry: "Advertising & Marketing",
  },
};

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-8 md:py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DB</span>
              </div>
              <span className="text-xl font-bold">Dashboard Buzz</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm md:text-base">
              Empowering brands through strategic nano and micro influencer
              marketing.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400 text-sm md:text-base">
              <p>Founder: {companyInfo.contact.founder}</p>
              <p>Email: {companyInfo.contact.email}</p>
              <p>Website: {companyInfo.contact.website}</p>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Company Info</h3>
            <div className="space-y-2 text-gray-400 text-sm md:text-base">
              <p>Stage: {companyInfo.details.stage}</p>
              <p>Founded: {companyInfo.details.founded}</p>
              <p>Industry: {companyInfo.details.industry}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
          <p>&copy; 2025 Dashboard Buzz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
