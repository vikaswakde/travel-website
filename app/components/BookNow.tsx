import React from "react";
import Image from "next/image";
import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  Clock,
  UserIcon,
  TagIcon,
} from "lucide-react";

const BookNow = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <section
      id="contact_whatsapp"
      className="py-16 lg:py-24 bg-gradient-to-r from-gray-200 to-gray-300"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Content Side */}
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Let&apos;s Plan Your Perfect Trip
              </h2>
              <p className="text-gray-600 mb-8">
                Connect with our travel experts instantly through WhatsApp for
                personalized travel planning and quick responses to your
                queries.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-primary-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      24/7 Support
                    </h3>
                    <p className="text-sm text-gray-600">
                      Get instant responses any time of day
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <UserIcon className="text-primary-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Expert Assistance
                    </h3>
                    <p className="text-sm text-gray-600">
                      Professional travel advisors at your service
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TagIcon className="text-primary-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Best Deals</h3>
                    <p className="text-sm text-gray-600">
                      Get exclusive offers and packages
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  className="inline-flex items-center justify-center w-full gap-4 bg-green-700 text-white px-8 py-4 rounded-full hover:bg-green-800 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="#25D366"
                  >
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
                  </svg>
                  <span className="font-semibold">
                    Start Planning on WhatsApp
                  </span>
                </a>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative h-full min-h-[300px] md:min-h-full">
              <Image
                src="/book-now-call.jpg"
                alt="Travel Expert"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="font-semibold text-lg">
                    Our travel experts are ready to help
                  </p>
                  <p className="text-sm opacity-90">
                    Average response time: 5 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Options */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <a
            href={`tel:${whatsappNumber}`}
            className="flex items-center gap-4 bg-white p-4 rounded-xl hover:bg-primary-50 transition-colors"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <PhoneIcon className="text-primary-600 w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Call Us</p>
              <p className="text-sm text-gray-600">+91 9175982377</p>
            </div>
          </a>

          <a
            href="mailto:suparnamholidays24@gmail.com"
            className="flex items-center gap-4 bg-white p-4 rounded-xl hover:bg-primary-50 transition-colors"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <MailIcon className="text-primary-600 w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Email Us</p>
              <p className="text-sm text-gray-600">
                suparnamholidays24@gmail.com
              </p>
            </div>
          </a>

          <a
            href="#"
            className="flex items-center gap-4 bg-white p-4 rounded-xl hover:bg-primary-50 transition-colors"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <MapPinIcon className="text-primary-600 w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Visit Us</p>
              <p className="text-sm text-gray-600">
                {" "}
                211/1557 NR Shani Mandir, <br /> Sant Tukaram Nagar, Pimpri
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BookNow;
