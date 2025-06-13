
const Footer = () => {
  return (
    <footer className="bg-moviefy-gray-dark border-t border-moviefy-gray-medium mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center text-moviefy-gray-light text-sm">
          © 2024 moviefy. All rights reserved. | 
          <a href="#" className="text-moviefy-yellow hover:text-moviefy-yellow-light mx-2 transition-colors">Privacy Policy</a> | 
          <a href="#" className="text-moviefy-yellow hover:text-moviefy-yellow-light mx-2 transition-colors">Terms of Service</a> | 
          <a href="#" className="text-moviefy-yellow hover:text-moviefy-yellow-light mx-2 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
