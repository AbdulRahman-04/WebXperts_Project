import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center p-6">
      <motion.h1 className="text-6xl font-bold text-red-500 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        404
      </motion.h1>
      <motion.h2 className="text-3xl font-semibold mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}>
        Oops! Page Not Found
      </motion.h2>
      <motion.p className="text-gray-400 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}>
        The page you're looking for doesn't exist or has been moved.
      </motion.p>
      <Link to="/home" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-all">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
