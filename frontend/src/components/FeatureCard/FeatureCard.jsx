import { motion } from "framer-motion";

const FeatureCard = ({ title, color, icon, desc }) => {
    return (
        <motion.div
            className="border-0 shadow-lg hover:shadow-xl transition-shadow rounded-md duration-300 px-4 py-4 text-left bg-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
        >
            <div
                className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mb-6 text-white text-xl`}
            >
                <i className={`${icon}`} />
            </div>
            <div>
                <h1 className="text-black text-2xl font-bold">{title}</h1>
                <p className="text-md text-gray-700">{desc}</p>
            </div>
        </motion.div>
    );
};

export default FeatureCard