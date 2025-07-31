"use client";

import { Mail, Github } from "lucide-react";
import Link from "next/link";

const developerInfo = {
  name: "Anna Maulina",
  contact: {
    email: "annamaulina14@gmail.com",
    github: "https://github.com/annamaulina654",
  },
};

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DB</span>
              </div>
              <span className="text-xl font-bold">Dashboard Buzz</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering brands through strategic influencer marketing.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-gray-400">
              <p>
                <Link
                  href="/#features"
                  className="hover:text-pink-400 transition-colors"
                >
                  Features
                </Link>
              </p>
              <p>
                <Link
                  href="/#about"
                  className="hover:text-pink-400 transition-colors"
                >
                  About
                </Link>
              </p>
              <p>
                <Link
                  href="/#contact"
                  className="hover:text-pink-400 transition-colors"
                >
                  Contact
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4">Contact Me</h3>
            <p className="text-gray-400 text-sm mb-4">
              Let&apos;s connect! Find me on these platforms.
            </p>
            <div className="flex items-center justify-center md:justify-end space-x-4">
              <a
                href={`mailto:${developerInfo.contact.email}`}
                aria-label="Email"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Mail className="h-6 w-6" />
              </a>
              <a
                href={developerInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm md:text-base">
          <p>
            Developed with ❤️ by {developerInfo.name} &copy;{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
