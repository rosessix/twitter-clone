import { motion } from "motion/react"

export default function ({author, feedback, img, role}) {
    return (
        <motion.div 
            className="border-0 shadow-lg hover:shadow-xl transition-shadow rounded-md duration-300 px-4 py-4 text-left bg-white w-full"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95}}
        >
            <i className="fa-solid fa-quote-right text-purple-500 text-5xl"/>
            <p className="text-lg text-gray-700">"{feedback}"</p>
            <div className="flex flex-row gap-2 items-center">
                <img src={img} className="rounded-full w-16 h-16"/>
                <div className="flex flex-col h-full">
                    <h1 className="text-xl font-bold text-gray-900">{author}</h1>
                    <p className="text-md text-gray-500">{role}</p>
                </div>
            </div>
        </motion.div>
    )
}