import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t bg-white text-gray-600">
      <div className="container mx-auto px-4 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-sm">
          
          {/* Useful Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Useful Links</h4>
            <ul className="space-y-2">
              <li>Blog</li>
              <li>Privacy</li>
              <li>Terms</li>
              <li>FAQs</li>
              <li>Security</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Company</h4>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Partner</li>
              <li>Franchise</li>
              <li>Seller</li>
              <li>Warehouse</li>
              <li>Deliver</li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Categories</h4>
            <ul className="space-y-2">
              <li>Vegetables & Fruits</li>
              <li>Dairy & Breakfast</li>
              <li>Cold Drinks & Juices</li>
              <li>Bakery & Biscuits</li>
              <li>Snacks & Munchies</li>
              <li>Personal Care</li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">More</h4>
            <ul className="space-y-2">
              <li>Pharma & Wellness</li>
              <li>Home & Decor</li>
              <li>Beauty & Cosmetics</li>
              <li>Electronics</li>
              <li>Fashion</li>
              <li>Gift Cards</li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Download App</h4>
            <div className="space-y-2">
              <img
                src="/src/assets/appStorre.png"
                alt="App Store"
                className="h-10 cursor-pointer"
              />
              <img
                src="/src/assets/playStore.png"
                alt="Play Store"
                className="h-10 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2025 Grabit Ecommerce Limited. All rights reserved.</p>

          <div className="flex items-center gap-4 text-xl">
            <a href="#" className="hover:text-black">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-black">
              <FaXTwitter />
            </a>
            <a
              href="https://www.instagram.com/amit_bind0497"
              className="hover:text-black"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/amitbind2301"
              className="hover:text-black"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
