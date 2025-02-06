import { 
  Pencil, 
  Share2, 
  Cloud, 
  Users, 
  Shapes, 
  Palette,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import LocalImage from '../component/Image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-b from-purple-50 to-white">
        <nav className="container mx-auto px-6 py-4 flex flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <Shapes className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-800">DrawFlow</span>
          </div>
          <div className="flex flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900 hidden sm:block">Features</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 hidden sm:block">Docs</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 hidden sm:block">Blog</a>
            <Link href="/signin" className="text-gray-600 hover:text-gray-900 mr-2 sm-mr-0">Sign In</Link>
            <Link href="/signup" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Sign Up
            </Link>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Whiteboarding,
            <span className="text-purple-600"> reimagined</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Create beautiful hand-drawn diagrams, wireframes, and illustrations with our intuitive drawing tool. 
            Collaborate in real-time, export anywhere.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/signup"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium flex items-center hover:bg-purple-700 transition-colors"
            >
              Start Drawing
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:border-gray-400 transition-colors">
              Signup
            </button>
          </div>
        </div>
      </header>

      {/* Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            {/* <img 
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80" 
              alt="DrawFlow Interface Preview"
              className="w-full object-cover"
            /> */}
            <LocalImage />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
            Everything you need to bring ideas to life
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Pencil className="w-6 h-6 text-purple-600" />}
              title="Intuitive Drawing"
              description="Natural hand-drawn feel with smart shape recognition and smooth freehand drawing."
            />
            <FeatureCard 
              icon={<Share2 className="w-6 h-6 text-purple-600" />}
              title="Easy Sharing"
              description="Share your drawings instantly with a link or export to various formats."
            />
            <FeatureCard 
              icon={<Cloud className="w-6 h-6 text-purple-600" />}
              title="Cloud Sync"
              description="Your drawings are automatically saved and synced across all devices."
            />
            <FeatureCard 
              icon={<Users className="w-6 h-6 text-purple-600" />}
              title="Real-time Collaboration"
              description="Work together with your team in real-time, see changes instantly."
            />
            <FeatureCard 
              icon={<Shapes className="w-6 h-6 text-purple-600" />}
              title="Smart Shapes"
              description="Perfect geometric shapes with intelligent recognition and snapping."
            />
            <FeatureCard 
              icon={<Palette className="w-6 h-6 text-purple-600" />}
              title="Custom Styling"
              description="Personalize your drawings with custom colors, fonts, and styles."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shapes className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-semibold text-white">DrawFlow</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center md:text-left text-sm">
            © {new Date().getFullYear()} DrawFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

interface featureCardPros {
  icon ?: React.ReactNode,
  title ?: string,
  description ?: string
}

function FeatureCard({ icon, title, description }: featureCardPros) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
