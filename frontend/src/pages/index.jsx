import HeroSection from '../components/herosection';
import NavBar from '../components/NavBar';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Feedback from '../components/Feedback';
import Badge from '../components/Badge/Badge';
export default function (props) {
    let { darkMode, toggleDarkMode } = props

    const uImg = 'https://picsum.photos/200'

    return (
        <section className={`min-h-screen transition-all duration-200`}>
            {<NavBar/>}
            <div className="min-[400px] w-full overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800">
                <div className="container mx-auto px-4 py-20 lg:py-32 flex items-center justify-center">
                    <HeroSection />
                </div>
            </div>

            <Features />
            <div className="w-full bg-white text-center mt-4">
                <Badge className='mb-4 bg-indigo-100 text-indigo-700 border-indigo-200'>Testimonials</Badge>

                <div className="container mx-auto px-6 p-4 flex flex-col lg:flex-row lg:justify-center lg:items-center gap-3 text-left">
                    <Feedback img={'https://picsum.photos/200'} author="James Bond" feedback="This is just a great service!" role={'Great actor'} />
                    <Feedback img={'https://picsum.photos/400'} author="Elon Musk" feedback="omg shut this down, its a competitor to twitter😭😭" role={'CEO of Tesla'} />
                    <Feedback img={'https://picsum.photos/600'} author="Pernille Skipper" feedback="det bar'e go'" role={'Political Leader'} />
                </div>
            </div>
            <Footer />
        </section>
    )
}