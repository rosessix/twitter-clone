import { Link } from 'react-router-dom'
import Badge from './Badge/Badge'
import Button from './Button/Button'
export default function () {
    return (
        <section className="px-4 py-4">
            <div className="max-w-4xl text-center">
                <Badge variant="default" className="text-center">🚀 Join the conversation today!</Badge>
                <h2 className="text-4xl font-bold mb-2 text-white md:text-6xl lg:text-7xl transition-all duration-200 text-center">
                    Revolutionize the world<br/>
                    <span className="bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent border-none">
                        with your opinion!  
                    </span>
                </h2>
                <h3 className="text-xl mb-8 text-gray-200 md:text-2xl text-center">
                    Let others know what you think. Share ideas, spark debates, and connect with minds that matter.
                </h3>

                <Link to='/login'>
                    <Button variant="default" className="text-xl text-purple-700">Register now! <i className="ml-2 fas fa-arrow-right"/></Button>
                </Link>

                <div className="flex flex-row gap-4 text-center w-full justify-center mt-2 text-purple-200">
                    <div className="">
                        <i className="fas fa-user-group"/> 10K+ Users
                    </div>
                    <div>
                        <i className="fa-regular fa-comment"/> 1M+ Posts
                    </div>
                    <div>
                        <i className="fa-regular fa-star"/> 4.9/5 Rating
                    </div>
                </div>
            </div>
        </section> 

    )
}