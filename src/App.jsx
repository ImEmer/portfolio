import { useState, useEffect, useRef } from 'react'
import {
  FaHome, FaUser, FaTrophy, FaProjectDiagram, FaDownload, FaMoon, FaSun,
  FaCalendarAlt, FaBriefcase, FaCertificate, FaCode, FaLaptopCode, FaChartLine,
  FaBars, FaTimes, FaArrowUp, FaComments, FaPaperPlane
} from 'react-icons/fa'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

import { emersonContext } from './aiContext';

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

import splide1 from './assets/splide1.jpg'
import splide2 from './assets/splide2.jpg'
import splide3 from './assets/splide3.jpg'

import './App.css'
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Gemini with API key from .env file
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTopBtn, setShowTopBtn] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentDate, setCurrentDate] = useState('')

  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm Emerson's AI assistant. How can I help you today?" }
  ])
  const [userInput, setUserInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  const texts = [
    'Hey, Welcome to my portfolio',
    'Explore my work and ideas',
    "Let's create something amazing together."
  ]

  const careerStats = [
    { label: 'Experience', value: 0, icon: FaBriefcase, unit: ' years', color: 'text-blue-500', bgColor: 'bg-blue-100', darkBgColor: 'bg-blue-900/30' },
    { label: 'Certificates', value: 0, icon: FaCertificate, unit: '', color: 'text-green-500', bgColor: 'bg-green-100', darkBgColor: 'bg-green-900/30' },
    { label: 'Projects', value: 5, icon: FaProjectDiagram, unit: '', color: 'text-purple-500', bgColor: 'bg-purple-100', darkBgColor: 'bg-purple-900/30' },
    { label: 'Technologies', value: 14, icon: FaLaptopCode, unit: '+', color: 'text-orange-500', bgColor: 'bg-orange-100', darkBgColor: 'bg-orange-900/30' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const goToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  useEffect(() => {
    const date = new Date()
    setCurrentDate(date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  }, [])

  useEffect(() => {
    const currentFullText = texts[textIndex]
    const typingSpeed = isDeleting ? 50 : 100
    if (!isDeleting && charIndex < currentFullText.length) {
      const timer = setTimeout(() => { setDisplayText(currentFullText.substring(0, charIndex + 1)); setCharIndex(charIndex + 1) }, typingSpeed)
      return () => clearTimeout(timer)
    }
    if (!isDeleting && charIndex === currentFullText.length) {
      const timer = setTimeout(() => setIsDeleting(true), 1500)
      return () => clearTimeout(timer)
    }
    if (isDeleting && charIndex > 0) {
      const timer = setTimeout(() => { setDisplayText(currentFullText.substring(0, charIndex - 1)); setCharIndex(charIndex - 1) }, typingSpeed)
      return () => clearTimeout(timer)
    }
    if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTextIndex((prev) => (prev + 1) % texts.length)
    }
  }, [charIndex, isDeleting, textIndex])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!userInput.trim()) return

    const userMsg = { role: 'user', text: userInput }
    setMessages(prev => [...prev, userMsg])
    setUserInput('')
    setIsTyping(true)

    try {
      const prompt = `${emersonContext}\n\nUser question: ${userInput}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { role: 'ai', text }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsTyping(false)
    }
  }

  const splideOptions = { type: 'loop', autoplay: true, interval: 6000, arrows: false, pagination: false, speed: 1000 }
  const carouselImages = [splide1, splide2, splide3]

  return (
    <div className={darkMode ? 'min-h-screen bg-gray-900 p-0 md:p-6 flex flex-col md:flex-row gap-3 md:h-screen md:overflow-hidden' : 'min-h-screen bg-blue-50 p-0 md:p-6 flex flex-col md:flex-row gap-3 md:h-screen md:overflow-hidden'}>

      {/* MOBILE HEADER */}
      <header className={`sticky top-0 z-[40] flex md:hidden items-center justify-between p-4 backdrop-blur-md transition-colors duration-300 ${darkMode ? 'bg-gray-900/80 text-white' : 'bg-blue-50/80 text-gray-900'}`}>
        <button onClick={() => setMenuOpen(true)} className={`text-2xl p-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          <FaBars/>
        </button>
        <h1 className='font-bold text-lg tracking-tight'>Portfolio</h1>
        <div className='w-8'></div>
      </header>

      {/* SIDEBAR */}
      <aside className={`fixed md:sticky top-0 left-0 z-50 h-full md:h-auto w-64 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-none md:rounded-xl shadow-2xl md:shadow-lg p-6 flex flex-col justify-between overflow-y-auto scrollbar-hide`}>
        <div>
          <div className='flex justify-end md:hidden mb-4'>
            <button onClick={()=>setMenuOpen(false)} className={darkMode ? 'text-white' : 'text-gray-900'}><FaTimes size={24}/></button>
          </div>
          <div className='flex flex-col items-center mb-6'>
            <img src={profile} alt='profile' className='w-24 h-24 rounded-full object-cover mb-3 border-2 border-blue-500 p-1' />
            <h1 className='text-xl font-bold'>Emerson Isla</h1>
            <p className='text-sm text-gray-500 font-medium'>Front-end Developer</p>
          </div>
          <button className='flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2.5 rounded-lg mb-8 w-full transition-all duration-200 shadow-md active:scale-95'>
            <FaDownload/> Resume
          </button>
          <nav className='flex flex-col gap-2 text-md font-medium'>
            <a href='#' className='flex items-center gap-3 text-blue-500 bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-lg'> <FaHome/> Home </a>
            <a href='#' className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors duration-200 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}> <FaUser/> About </a>
            <a href='#' className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors duration-200 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}> <FaTrophy/> Achievements </a>
            <a href='#' className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors duration-200 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}> <FaProjectDiagram/> Projects </a>
          </nav>
        </div>
        <div className='flex flex-col gap-4 mt-6'>
          <button onClick={()=>setDarkMode(!darkMode)} className={`flex items-center justify-center gap-2 border rounded-lg py-2 transition-all duration-200 ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'}`}>
            {darkMode ? <FaSun className='text-yellow-400'/> : <FaMoon className='text-blue-600'/>} {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <p className='text-[10px] text-center text-gray-500 uppercase tracking-widest'> © {new Date().getFullYear()} Emerson Isla </p>
        </div>
      </aside>

      {menuOpen && <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden' onClick={()=>setMenuOpen(false)}></div>}

      {/* CONTENT WRAPPER */}
      <div className='flex-1 flex flex-col md:flex-row gap-4 md:overflow-hidden p-4 md:p-0'>
        
        {/* MAIN CONTENT */}
        <div className='flex flex-col gap-4 md:overflow-y-auto scrollbar-hide md:w-2/3 md:max-h-full'>
          
          {/* CAROUSEL */}
          <div className='rounded-xl shadow-lg overflow-hidden relative flex-shrink-0'>
            <Splide options={splideOptions}>
              {carouselImages.map((img,index)=>(
                <SplideSlide key={index}>
                  <div className='relative w-full h-[220px] md:h-[300px]'>
                    <img src={img} alt='slide' className='w-full h-full object-cover' />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'></div>
                    <div className='absolute inset-0 flex flex-col justify-between p-5 md:p-8'>
                      <div className='flex items-center gap-2 text-white'>
                        <FaCalendarAlt className='text-sm text-blue-400'/>
                        <span className='text-xs md:text-lg font-semibold'>{currentDate}</span>
                      </div>
                      <div className='text-white text-lg md:text-2xl font-bold'> {displayText}<span className='animate-pulse text-blue-500'>|</span> </div>
                    </div>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>

          {/* CAREER SUMMARY */}
          <div className={darkMode ? 'bg-gray-800 rounded-xl shadow-lg p-5 md:p-6 flex-shrink-0' : 'bg-white rounded-xl shadow-lg p-5 md:p-6 flex-shrink-0'}>
            <div className='flex items-center gap-2 mb-6'>
              <FaChartLine className={darkMode ? 'text-blue-400 text-xl' : 'text-blue-600 text-xl'}/>
              <h1 className={`text-lg md:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Career Summary</h1>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {careerStats.map((stat,index)=>(
                <div key={index} className='flex flex-col items-center text-center p-3 rounded-xl transition-all hover:scale-105'>
                  <div className={darkMode ? `${stat.darkBgColor} p-3 rounded-2xl mb-3` : `${stat.bgColor} p-3 rounded-2xl mb-3`}>
                    <stat.icon className={`${stat.color} text-xl`}/>
                  </div>
                  <div className={`text-2xl font-extrabold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}{stat.unit}</div>
                  <div className={`text-xs font-medium uppercase tracking-tighter ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Currently working */}
          <div className={darkMode ? 'bg-gray-800 rounded-xl shadow-lg p-5 md:p-6' : 'bg-white rounded-xl shadow-lg p-5 md:p-6'}>
            <h2 className={`text-lg md:text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Currently working</h2>
            <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Currently working ...</p>
          </div>

          <div className={darkMode ? 'bg-gray-800 rounded-xl shadow-lg p-5 md:p-6' : 'bg-white rounded-xl shadow-lg p-5 md:p-6'}>
            <h2 className={`text-lg md:text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Currently working</h2>
            <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Currently working ...</p>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className='flex flex-col gap-4 md:gap-6 md:w-1/3 md:overflow-y-auto scrollbar-hide pb-24 md:pb-0'>
          
          {/* SKILL SET SECTION */}
          <div className={darkMode ? 'bg-gray-700/50 rounded-xl p-4 md:p-5 backdrop-blur-sm' : 'bg-white/80 rounded-xl p-4 md:p-5 shadow-md backdrop-blur-sm'}>
            <h3 className={`text-xl md:text-2xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <FaCode className='text-blue-500'/>
              Skill Set
            </h3>
            
            {/* Frontend Row */}
            <div className='mb-4'>
              <div className='overflow-hidden'>
                <div className='animate-scroll-right flex gap-2 md:gap-3'>
                  {[...['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Bootstrap', 'Vite'], 
                    ...['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Bootstrap', 'Vite']].map((skill, index) => {
                    const getSkillImage = (skillName) => {
                      switch(skillName) {
                        case 'HTML': return html; case 'CSS': return css; case 'JavaScript': return javascript;
                        case 'React': return react; case 'Tailwind': return tailwind;
                        case 'Bootstrap': return bootstrap; case 'Vite': return vite;
                        default: return null;
                      }
                    }
                    return (
                      <div key={index} className='flex flex-col items-center gap-1 p-2 md:p-3 min-w-[60px] md:min-w-[70px]'>
                        <img src={getSkillImage(skill)} alt={skill} className='w-8 h-8 md:w-10 md:h-10 object-contain' />
                        <span className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{skill}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            
            {/* Backend Row */}
            <div>
              <div className='overflow-hidden'>
                <div className='animate-scroll-left flex gap-2 md:gap-3'>
                  {[...['PHP', 'Python', 'Java', 'Kotlin', 'Node', 'MySQL', 'XML'], 
                    ...['PHP', 'Python', 'Java', 'Kotlin', 'Node', 'MySQL', 'XML']].map((skill, index) => {
                    const getSkillImage = (skillName) => {
                      switch(skillName) {
                        case 'PHP': return php; case 'Python': return python; case 'Java': return java;
                        case 'Kotlin': return kotlin; case 'Node': return node; case 'MySQL': return mysql;
                        case 'XML': return xml; default: return null;
                      }
                    }
                    return (
                      <div key={index} className='flex flex-col items-center gap-1 p-2 md:p-3 min-w-[60px] md:min-w-[70px]'>
                        <img src={getSkillImage(skill)} alt={skill} className='w-8 h-8 md:w-10 md:h-10 object-contain' />
                        <span className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{skill}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* GET IN TOUCH SECTION */}
          <div className={darkMode ? 'bg-gray-700/50 rounded-xl p-4 md:p-5 backdrop-blur-sm' : 'bg-white/80 rounded-xl p-4 md:p-5 shadow-md backdrop-blur-sm'}>
            <h3 className={`text-xl md:text-2xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <FaUser className='text-green-500'/>
              Get In Touch
            </h3>
            <div className='flex flex-col gap-3 md:gap-4'>
              <p className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Have a project in mind? Let's work together!
              </p>
              <div className='space-y-2 md:space-y-3'>
                <div className='flex items-center gap-2 md:gap-3'>
                  <div className={`${darkMode ? 'bg-gray-600' : 'bg-gray-200'} p-2 rounded-full`}>
                    <svg className='w-4 h-4 md:w-5 md:h-5 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                    </svg>
                  </div>
                  <span className={`text-xs md:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>pitongemer06@gmail.com</span>
                </div>
                <div className='flex items-center gap-2 md:gap-3'>
                  <div className={`${darkMode ? 'bg-gray-600' : 'bg-gray-200'} p-2 rounded-full`}>
                    <svg className='w-4 h-4 md:w-5 md:h-5 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                    </svg>
                  </div>
                  <span className={`text-xs md:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>+63 909 090 7337</span>
                </div>
                <div className='flex items-center gap-2 md:gap-3'>
                  <div className={`${darkMode ? 'bg-gray-600' : 'bg-gray-200'} p-2 rounded-full`}>
                    <svg className='w-4 h-4 md:w-5 md:h-5 text-purple-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                  </div>
                  <span className={`text-xs md:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Pangasinan, Philippines</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHAT WITH EMERSON WIDGET */}
      <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end">
        {chatOpen && (
          <div className={`mb-4 w-72 md:w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            {/* Chat Header */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <span className="font-bold flex items-center gap-2"><FaUser size={14}/> Chat with Emerson</span>
              <button onClick={() => setChatOpen(false)} className="hover:scale-110 transition-transform">
                <FaTimes size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-2.5 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : (darkMode ? 'bg-gray-700 text-gray-200 rounded-tl-none' : 'bg-gray-100 text-gray-800 rounded-tl-none')
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-xs text-gray-400 animate-pulse">Emerson is typing...</div>}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className={`p-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className={`flex-1 text-sm p-2 rounded-lg outline-none ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-black'}`}
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <FaPaperPlane size={14}/>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Floating Button */}
        {!chatOpen && (
          <button 
            onClick={() => setChatOpen(true)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center gap-2 animate-chat-float"
          >
            <FaComments size={20}/> <span className="hidden md:inline font-medium">Chat with Emerson</span>
          </button>
        )}
      </div>

      {/* BACK TO TOP BUTTON */}
      {showTopBtn && !chatOpen && (
        <button onClick={goToTop} className="fixed bottom-24 right-6 z-[60] p-4 rounded-full bg-blue-600 text-white shadow-2xl animate-bounce md:hidden">
          <FaArrowUp size={18} />
        </button>
      )}
    </div>
  )
}

export default App