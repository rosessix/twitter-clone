import image from '../assets/Example Scenes/PNG/example-scene-2.png'
import image2 from '../assets/Example Scenes/PNG/example-scene-1.png'
import FeatureCard from './FeatureCard/FeatureCard'
import Badge from './Badge/Badge'
export default function() {
    return (
        <div className="w-full bg-gray-100 overflow-hidden relative text-black transition-all duration-300 text-center">
            <Badge className='mb-4 bg-purple-100 text-purple-700 border-purple-200 mt-2'>Features</Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Why choose daydream?</h1>
            <h1 className="text-md md:text-xl mx-2 sm:mx-auto text-gray-800 max-w-2xl ">Built for modern thinkers who want top make their voice heard and connect with others.</h1>

            <section className="container mx-auto px-6 p-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard 
                    title="Easy to use"
                    color="from-purple-500 to-blue-500"
                    icon={'fas fa-bolt'}
                    desc={`Intuitive interface designed for seamless opinion sharing. No learning curve, just pure expression.`}
                />
                <FeatureCard 
                    title="Spread your opinion."
                    color="from-green-500 to-teal-500"
                    icon={'fa-regular fa-comment'}
                    desc={`With our large user base, your opinion will be heard. Share knowledge, spark meaningful debates, and help others discover new perspectives.`}
                />
                <FeatureCard
                    title="Build for the people"
                    color="from-pink-500 to-fuchsia-500"
                    icon={'fa-regular fa-user'}
                    desc={`Speak to like-minded people. With your debates and opinions you are guaranteed to learn something new.`}
                />
            </section>
        </div>
    )
}