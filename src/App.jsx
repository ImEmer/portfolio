import { useState, useEffect } from 'react'
import { 
  FaHome, FaUser, FaTrophy, FaProjectDiagram, FaDownload, FaMoon, FaSun, 
  FaCalendarAlt, FaBriefcase, FaCertificate, FaCode, FaLaptopCode, FaChartLine 
} from 'react-icons/fa'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import profile from './assets/profile.jpg'
import html from './assets/html.png'
import css from './assets/css.png'
import javascript from './assets/javascript.png'
import php from './assets/php.png'
import python from './assets/python.png'
import java from './assets/java.png'
import react from './assets/react.png'
import kotlin from './assets/kotlin.png'
import xml from './assets/xml.png'
import vite from './assets/vite.png'
import tailwind from './assets/tailwind.png'
import bootstrap from './assets/bootstrap.png'
import node from './assets/node.png'
import mysql from './assets/mysql.png'
import './App.css'

// Import your images
import splide1 from './assets/splide1.jpg'
import splide2 from './assets/splide2.jpg'
import splide3 from './assets/splide3.jpg'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentDate, setCurrentDate] = useState('')

  const texts = [
    'Hey, Welcome to my portfolio',
    'Explore my work and ideas',
    'Let\'s create something amazing together.'
  ]

  // Career stats with different colors
  const careerStats = [
    { label: 'Experience', value: 0, icon: FaBriefcase, unit: ' years', color: 'text-blue-500', bgColor: 'bg-blue-100', darkBgColor: 'bg-blue-900/30' },
    { label: 'Certificates', value: 0, icon: FaCertificate, unit: '', color: 'text-green-500', bgColor: 'bg-green-100', darkBgColor: 'bg-green-900/30' },
    { label: 'Projects', value: 4, icon: FaProjectDiagram, unit: '', color: 'text-purple-500', bgColor: 'bg-purple-100', darkBgColor: 'bg-purple-900/30' },
    { label: 'Technologies', value: 14, icon: FaLaptopCode, unit: '+', color: 'text-orange-500', bgColor: 'bg-orange-100', darkBgColor: 'bg-orange-900/30' }
  ]

  // Get current date
  useEffect(() => {
    const date = new Date()
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    setCurrentDate(formattedDate)
  }, [])

  // Typing animation effect
  useEffect(() => {
    const currentFullText = texts[textIndex]
    
    const typingSpeed = isDeleting ? 50 : 100
    const pauseBetweenTexts = 1500

    if (!isDeleting && charIndex < currentFullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(currentFullText.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, typingSpeed)
      return () => clearTimeout(timer)
    } 
    
    if (!isDeleting && charIndex === currentFullText.length) {
      const timer = setTimeout(() => {
        setIsDeleting(true)
      }, pauseBetweenTexts)
      return () => clearTimeout(timer)
    }
    
    if (isDeleting && charIndex > 0) {
      const timer = setTimeout(() => {
        setDisplayText(currentFullText.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      }, typingSpeed)
      return () => clearTimeout(timer)
    }
    
    if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTextIndex((prev) => (prev + 1) % texts.length)
    }
  }, [charIndex, isDeleting, textIndex, texts])

  // Splide options - images change every 6 seconds
  const splideOptions = {
    type: 'loop',
    autoplay: true,
    interval: 6000,
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: false,
    pagination: false,
    rewind: true,
    speed: 1000,
  }

  // Your images
  const carouselImages = [splide1, splide2, splide3]

  return (
    <div className={darkMode ? 'h-screen bg-gray-900 p-6 flex gap-3 overflow-hidden' : 'h-screen bg-blue-50 p-6 flex gap-3 overflow-hidden'}>

      {/* Sidebar */}
      <aside className={darkMode
        ? 'w-64 bg-gray-800 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between sticky top-6 h-full'
        : 'w-64 bg-white text-black rounded-xl shadow-lg p-6 flex flex-col justify-between sticky top-6 h-full'
      }>
        <div>
          {/* Profile */}
          <div className='flex flex-col items-center mb-6'>
            <img
              src={profile}
              alt='profile'
              className='w-24 h-24 rounded-full object-cover mb-3'
            />
            <h1 className='text-xl font-bold'>Emerson Isla</h1>
            <p className='text-sm text-gray-500'>Front-end Developer</p>
          </div>

          {/* Resume Button */}
          <button className='flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded mb-8 w-full'>
            <FaDownload />
            Resume
          </button>

          {/* Navigation */}
          <nav className='flex flex-col gap-2 text-md'>
            <a href='#' className='flex items-center gap-3 text-blue-500  p-2 rounded transition'>
              <FaHome />
              Home
            </a>
            <a href='#' className='flex items-center gap-3 hover:text-blue-500 hover:bg-gray-100 p-2 rounded transition'>
              <FaUser />
              About
            </a>
            <a href='#' className='flex items-center gap-3 hover:text-blue-500 hover:bg-gray-100 p-2 rounded transition'>
              <FaTrophy />
              Achievements
            </a>
            <a href='#' className='flex items-center gap-3 hover:text-blue-500 hover:bg-gray-100 p-2 rounded transition'>
              <FaProjectDiagram />
              Projects
            </a>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className='flex flex-col gap-4'>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className='flex items-center justify-center gap-2 border rounded py-2 hover:bg-gray-400 transition'
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <p className='text-xs text-center text-gray-500'>
            © {new Date().getFullYear()} Emerson Isla
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className='flex-[2] flex flex-col gap-4 overflow-y-auto scrollbar-hide'>
        
        {/* Carousel Section */}
        <div className='rounded-xl shadow-lg overflow-hidden relative flex-shrink-0'>
          <div className='relative w-full'>
            <Splide options={splideOptions} className='w-full'>
              {carouselImages.map((img, index) => (
                <SplideSlide key={index}>
                  <div className='relative w-full h-[300px]'>
                    <img
                      src={img}
                      alt={`Slide ${index + 1}`}
                      className='w-full h-full object-cover'
                    />
                    {/* Dark overlay for better text visibility */}
                    <div className='absolute inset-0 bg-black bg-opacity-40'></div>
                    
                    {/* Text Overlay */}
                    <div className='absolute inset-0 flex flex-col justify-between p-8 z-10'>
                      {/* Upper Left - Date with Calendar Icon */}
                      <div className='self-start'>
                        <div className='flex items-center gap-3'>
                          <FaCalendarAlt className='text-white text-lg' />
                          <span className='text-white text-lg font-semibold'>{currentDate}</span>
                        </div>
                      </div>
                      
                      {/* Lower Left - Typing Animation Text */}
                      <div className='self-start'>
                        <div className='max-w-md'>
                          <div className='text-white text-2xl font-bold'>
                            {displayText}
                            <span className='animate-pulse ml-1'>|</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>

        {/* Career Summary Section */}
        <div className={darkMode
          ? 'bg-gray-800 rounded-xl shadow-lg p-6 flex-shrink-0'
          : 'bg-white rounded-xl shadow-lg p-6 flex-shrink-0'
        }>
          <div className='flex items-center gap-2 mb-4'>
            <FaChartLine className={darkMode ? 'text-blue-400 text-2xl' : 'text-blue-600 text-2xl'} />
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Career Summary</h1>
          </div>

          <div className='grid grid-cols-4 gap-4'>
            {careerStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div 
                  key={index}
                  className='flex flex-col items-center text-center p-4 rounded-xl transition-all hover:scale-105 hover:shadow-md'
                >
                  <div className={darkMode
                    ? `${stat.darkBgColor} p-3 rounded-full mb-3`
                    : `${stat.bgColor} p-3 rounded-full mb-3`
                  }>
                    <Icon className={`${stat.color} text-2xl`} />
                  </div>
                  <div className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}{stat.unit}
                  </div>
                  <div className={darkMode ? 'text-gray-400 text-sm' : 'text-gray-500 text-sm'}>
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Currently working */}
        <div className={darkMode
          ? 'bg-gray-800 rounded-xl shadow-lg p-6'
          : 'bg-white rounded-xl shadow-lg p-6'
        }>
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Currently working</h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Currently working...</p>
        </div>

        {/* Currently working  */}
        <div className={darkMode
          ? 'bg-gray-800 rounded-xl shadow-lg p-6'
          : 'bg-white rounded-xl shadow-lg p-6'
        }>
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Currently working</h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Currently working ...</p>
        </div>

      </div>

      {/* RIGHT COLUMN */}
      <section className='flex-1 flex flex-col gap-6 overflow-y-auto scrollbar-hide'>
        
        {/* Skill Set Section */}
        <div className={darkMode
          ? 'bg-gray-700/50 rounded-xl p-5 backdrop-blur-sm'
          : 'bg-white/80 rounded-xl p-5 shadow-md backdrop-blur-sm'
        }>
          <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <FaCode className='text-blue-500' />
            Skill Set
          </h3>
          
          {/* Frontend Row - Moving to the RIGHT */}
          <div>
            <div className='overflow-hidden'>
              <div className='animate-scroll-right flex gap-3'>
                {[...['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Bootstrap', 'Vite'], 
                  ...['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Bootstrap', 'Vite']].map((skill, index) => {
                  
                  const getSkillImage = (skillName) => {
                    switch(skillName) {
                      case 'HTML': return html;
                      case 'CSS': return css;
                      case 'JavaScript': return javascript;
                      case 'React': return react;
                      case 'Tailwind': return tailwind;
                      case 'Bootstrap': return bootstrap;
                      case 'Vite': return vite;
                      default: return null;
                    }
                  }
                  
                  const skillImage = getSkillImage(skill);
                  
                  return (
                    <div key={index} className='flex flex-col items-center gap-1 p-3 min-w-[70px]'>
                      <img src={skillImage} alt={skill} className='w-10 h-10 object-contain' />
                      <span className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{skill}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          
          {/* Backend & Database Row - Moving to the LEFT */}
          <div>
            <div className='overflow-hidden'>
              <div className='animate-scroll-left flex gap-3'>
                {[...['PHP', 'Python', 'Java', 'Kotlin', 'Node', 'MySQL', 'XML'], 
                  ...['PHP', 'Python', 'Java', 'Kotlin', 'Node', 'MySQL', 'XML']].map((skill, index) => {
                  
                  const getSkillImage = (skillName) => {
                    switch(skillName) {
                      case 'PHP': return php;
                      case 'Python': return python;
                      case 'Java': return java;
                      case 'Kotlin': return kotlin;
                      case 'Node': return node;
                      case 'MySQL': return mysql;
                      case 'XML': return xml;
                      default: return null;
                    }
                  }
                  
                  const skillImage = getSkillImage(skill);
                  
                  return (
                    <div key={index} className='flex flex-col items-center gap-1 p-3 min-w-[70px]'>
                      <img src={skillImage} alt={skill} className='w-10 h-10 object-contain' />
                      <span className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{skill}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Get In Touch Section */}
        <div className={darkMode
          ? 'bg-gray-700/50 rounded-xl p-5 backdrop-blur-sm'
          : 'bg-white/80 rounded-xl p-5 shadow-md backdrop-blur-sm'
        }>
          <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <FaUser className='text-green-500' />
            Get In Touch
          </h3>
          <div>
            <div className='flex flex-col gap-4'>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Have a project in mind? Let's work together!
              </p>
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <div className={darkMode ? 'bg-gray-600 p-2 rounded-full' : 'bg-gray-200 p-2 rounded-full'}>
                    <svg className='w-5 h-5 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                    </svg>
                  </div>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>pitongemer06@gmail.com</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className={darkMode ? 'bg-gray-600 p-2 rounded-full' : 'bg-gray-200 p-2 rounded-full'}>
                    <svg className='w-5 h-5 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                    </svg>
                  </div>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>+63 909 090 7337</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className={darkMode ? 'bg-gray-600 p-2 rounded-full' : 'bg-gray-200 p-2 rounded-full'}>
                    <svg className='w-5 h-5 text-purple-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                  </div>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Pangasinan, Philippines</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default App