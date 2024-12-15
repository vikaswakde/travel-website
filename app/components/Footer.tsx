import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-primary-400 mb-6">
              Suparnam Holidays
            </h3>
            <p className="text-gray-400 mb-6">
              Your trusted partner for unforgettable travel experiences and
              adventures around the world.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1Ciryy9tdQ/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter />
              </a>
              <a
                href="https://www.instagram.com/suparnam_holidays?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram />
              </a>
              <a
                href="https://wa.me/9175982377"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Destinations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Travel Packages
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Travel Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cancellation Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="mt-1" />
                <span>
                  211/1557 NR Shani Mandir, Sant Tukaram Nagar, Pimpri Pune 18
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone />
                <span>+91 9175982377</span>
                <a href="tel:+919175982377" className="sr-only">
                  Call +91 9175982377
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone />
                <span>+91 9823025308</span>
                <a href="tel:+919823025308" className="sr-only">
                  Call +91 9823025308
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail />
                <span>
                  <a
                    href="mailto:suparnamholidays24@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    suparnamholidays24@gmail.com
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Instagram />
                <span>
                  <a
                    href="https://www.instagram.com/suparnam_holidays?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 Suparnam Holidays. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
