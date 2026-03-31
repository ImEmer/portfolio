import { useState, useEffect, useRef } from 'react'
import {
  FaHome, FaUser, FaTrophy, FaProjectDiagram, FaDownload, FaMoon, FaSun,
  FaCalendarAlt, FaBriefcase, FaCertificate, FaCode, FaLaptopCode, FaChartLine,
  FaBars, FaTimes, FaArrowUp, FaComments, FaPaperPlane, FaExternalLinkAlt, FaGithub, FaGraduationCap, 
  FaSchool, FaBolt
} from 'react-icons/fa'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

import { BriefcaseBusiness, Code, School, Zap } from 'lucide-react';

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

import cover from './assets/cover.jpg'
import sjnhs from './assets/sjnhs.jpg'
import upang from './assets/upanglogo.jpg'

import portfolioimg from './assets/portfolio.png'
import scanrx from './assets/scanrx.png'
import timplangpinoy from './assets/timplangpinoy.png'
import unitaskmanager from './assets/unitaskmanager.png'
import chronomaster from './assets/chronomaster.png'
import macromonitor from './assets/macromonitor.png'

import splide1 from './assets/splide1.jpg'
import splide2 from './assets/splide2.jpg'
import splide3 from './assets/splide3.jpg'

import './App.css'
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Gemini with API key from .env file
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTopBtn, setShowTopBtn] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentDate, setCurrentDate] = useState('')
  const [activePage, setActivePage] = useState('home')

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
    { label: 'Projects', value: 6, icon: FaProjectDiagram, unit: '', color: 'text-purple-500', bgColor: 'bg-purple-100', darkBgColor: 'bg-purple-900/30' },
    { label: 'Technologies', value: 14, icon: FaLaptopCode, unit: '+', color: 'text-orange-500', bgColor: 'bg-orange-100', darkBgColor: 'bg-orange-900/30' }
  ]

  const projects = [
    {
      name: 'ScanRx',
      description: 'A mobile application for scanning and managing prescription medications.',
      tech: ['Kotlin', 'XML'],
      year: '2026',
      images: ['/scanrx1.jpg', '/scanrx2.jpg']
    },
    {
      name: 'Timplang Pinoy',
      description: 'A Filipino recipe website featuring traditional dishes and cooking tutorials.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      year: '2025',
      images: ['/timplang1.jpg', '/timplang2.jpg']
    },
    {
      name: 'Task Manager',
      description: 'A Java-based task management application for organizing daily activities.',
      tech: ['Java'],
      year: '2025',
      images: ['/task1.jpg', '/task2.jpg']
    },
    {
      name: 'My Portfolio',
      description: 'Personal portfolio website showcasing projects and skills.',
      tech: ['React', 'Vite', 'Tailwind'],
      year: '2026',
      images: ['/portfolio1.jpg', '/portfolio2.jpg']
    },
    {
      name: 'MacroMonitor',
      description: 'A web application for tracking macros and nutrition.',
      tech: ['PHP', 'MySQL', 'Tailwind', 'JavaScript'],
      year: '2025',
      images: ['/macro1.jpg', '/macro2.jpg']
    },
    {
      name: 'Chrono Master',
      description: 'A Python-based time management tool with productivity features.',
      tech: ['Python'],
      year: '2025',
      images: ['/chrono1.jpg', '/chrono2.jpg']
    }
  ]

  const getTechLogo = (tech) => {
    switch(tech) {
      case 'HTML': return html;
      case 'CSS': return css;
      case 'JavaScript': return javascript;
      case 'PHP': return php;
      case 'Python': return python;
      case 'Java': return java;
      case 'React': return react;
      case 'Kotlin': return kotlin;
      case 'XML': return xml;
      case 'Vite': return vite;
      case 'Tailwind': return tailwind;
      case 'Bootstrap': return bootstrap;
      case 'Node': return node;
      case 'MySQL': return mysql;
      default: return null;
    }
  }

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
      
      console.log("API Key exists?", !!import.meta.env.VITE_GEMINI_API_KEY);
      console.log("Sending request to Gemini API...");
      console.log("Prompt length:", prompt.length);
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log("Response received successfully");
      setMessages(prev => [...prev, { role: 'ai', text }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      
      if (error.message?.includes("quota")) {
        setMessages(prev => [...prev, { role: 'ai', text: "I've reached my API limit for now. Please try again later." }]);
      } else if (error.message?.includes("rate limit")) {
        setMessages(prev => [...prev, { role: 'ai', text: "Too many requests. Please wait a moment and try again." }]);
      } else if (error.message?.includes("timeout")) {
        setMessages(prev => [...prev, { role: 'ai', text: "The request timed out. Please try again." }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having trouble connecting right now." }]);
      }
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
            <button onClick={() => { setActivePage('home'); setMenuOpen(false); }} className={`flex items-center gap-3 w-full p-2.5 rounded-lg transition-colors duration-200 ${activePage === 'home' ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <FaHome/> Home
            </button>
            <button onClick={() => { setActivePage('about'); setMenuOpen(false); }} className={`flex items-center gap-3 w-full p-2.5 rounded-lg transition-colors duration-200 ${activePage === 'about' ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <FaUser/> About
            </button>
            <button onClick={() => { setActivePage('achievements'); setMenuOpen(false); }} className={`flex items-center gap-3 w-full p-2.5 rounded-lg transition-colors duration-200 ${activePage === 'achievements' ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <FaTrophy/> Achievements
            </button>
            <button onClick={() => { setActivePage('projects'); setMenuOpen(false); }} className={`flex items-center gap-3 w-full p-2.5 rounded-lg transition-colors duration-200 ${activePage === 'projects' ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <FaProjectDiagram/> Projects
            </button>
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
        <div className={`flex flex-col gap-4 md:overflow-y-auto scrollbar-hide ${activePage === 'home' ? 'md:w-2/3' : 'md:w-full'} md:max-h-full`}>
          
          {/* HOME PAGE */}
          {activePage === 'home' && (
            <>
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
            </>
          )}

      {/* ABOUT PAGE - With Main Content and Right Column */}
      {activePage === 'about' && (
  <div className='flex flex-col md:flex-row gap-6'>

    {/* MAIN CONTENT - Left Side */}
    <div className='flex-1 flex flex-col gap-6'>

      {/* Introduction Section (Facebook Cover Style) */}
      <div className={`overflow-hidden rounded-2xl shadow-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
        <div className='relative h-48 md:h-60 w-full overflow-hidden'>
          <img src={cover} alt='Cover' className='w-full h-full object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
        </div>

        <div className='relative p-6 pt-0'>
          <div className='-mt-14 md:-mt-16 flex justify-center md:justify-start mb-4 relative z-10'>
            <div className={`p-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
              <img src={profile} alt='Profile' className='w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white dark:border-gray-800' />
            </div>
          </div>

          <div className='text-center md:text-left'>
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Introduction</h2>
            <p className={`text-xl mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Hi, I'm <span className='font-extrabold text-blue-500'>Emerson Isla</span>
            </p>
            <p className={`text-md leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              An aspiring <span className='font-semibold text-blue-500'>Full-Stack Developer</span> passionate about building modern, scalable, and high-performance web applications. I enjoy turning ideas into functional digital products by combining clean code, thoughtful design, and efficient problem-solving.
            </p>
          </div>
        </div>
      </div>

      {/* Career Roadmap Section */}
      <div className={darkMode ? 'bg-gray-800 rounded-xl shadow-lg p-6' : 'bg-white rounded-xl shadow-lg p-6'}>
        <h2 className={`text-2xl font-bold mb-10 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Career Roadmap</h2>
        <div className="relative px-2">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 transform md:-translate-x-1/2 opacity-30"></div>
          <div className="space-y-16">
            {[
              { icon: FaSchool, color: 'text-blue-500', shadowColor: 'shadow-blue-500/50', bgColor: 'bg-blue-500/10', title: 'Present – BSIT Student', description: ['Studying at University of Pangasinan', 'Building projects using React and Tailwind', 'Improving frontend development skills'] },
              { icon: FaBolt, color: 'text-purple-500', shadowColor: 'shadow-purple-500/50', bgColor: 'bg-purple-500/10', title: 'Mid-Term Goal – Full Stack Developer', description: ['Work with React, Express.js, and databases', 'Build scalable full-stack web applications', 'Contribute to real-world projects'] },
              { icon: FaBriefcase, color: 'text-cyan-500', shadowColor: 'shadow-cyan-500/50', bgColor: 'bg-cyan-500/10', title: 'Long-Term Goal – Senior Developer / Tech Lead', description: ['Build impactful digital products', 'Lead development teams', 'Mentor junior developers and contribute to the tech community'] }
            ].map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center relative`}>
                  <div className="hidden md:block flex-1 w-1/2"></div>
                  <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2 border-current ${step.color} mx-4 md:mx-0 shadow-[0_0_15px_rgba(0,0,0,0.1)]`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1 w-full md:w-1/2">
                    <div className={`p-6 rounded-2xl shadow-xl border ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-white border-gray-100'} md:ml-8 md:mr-0 ml-12`}>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${step.bgColor} ${step.color} uppercase tracking-wider`}>Milestone {index + 1}</div>
                      <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                      <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {step.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${step.color.replace('text', 'bg')}`}></span>
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* skill set Section */}
      <div className={darkMode ? 'bg-gray-800 rounded-xl shadow-lg p-6' : 'bg-white rounded-xl shadow-lg p-6'}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Skill Set</h2>
        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4'>
          {[
            { name: 'HTML', img: html }, { name: 'CSS', img: css }, { name: 'JS', img: javascript },
            { name: 'React', img: react }, { name: 'Tailwind', img: tailwind }, { name: 'Bootstrap', img: bootstrap },
            { name: 'Vite', img: vite }, { name: 'PHP', img: php }, { name: 'Python', img: python },
            { name: 'Java', img: java }, { name: 'Kotlin', img: kotlin }, { name: 'Node', img: node },
            { name: 'MySQL', img: mysql }, { name: 'XML', img: xml }
          ].map((tech, idx) => (
            <div key={idx} className={`flex flex-col items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <img src={tech.img} alt={tech.name} className='w-12 h-12 md:w-14 md:h-14 object-contain mb-2' />
              <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* RIGHT COLUMN */}
    <div className='md:w-80 flex flex-col gap-6'>
      
    {/* Specialization Section */}
      <div className={`overflow-hidden relative ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl shadow-xl p-5 border`}>
        <h3 className={`text-xl font-bold mb-4 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-blue-50'}`}>
            <FaCode className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          Specialization
        </h3>

        <div className='relative flex justify-center mb-6 p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/10 border border-blue-500/10 overflow-hidden'>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl"></div>
          <img 
            src={react} 
            alt='React' 
            className='w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-[spin_15s_linear_infinite]' 
          />
        </div>

        <div className='space-y-3 relative z-10'>
          <h4 className={`font-bold text-lg ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Frontend Architecture</h4>
          <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            I specialize in building high-performance web applications using <span className='font-semibold text-blue-500'>React</span>. Focus on component modularity and clean UI.
          </p>
        </div>
      </div>

      {/* Education Section */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl shadow-xl p-5 border`}>
        <div className='flex items-center gap-2 mb-6'>
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
            <FaGraduationCap size={22} />
          </div>
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Education</h3>
        </div>

  <div className='space-y-8'>
    
    {/* College - Active/Current */}
    <div className='relative'>
      <div className='flex flex-col gap-3'>
        <div className="flex items-center gap-4">
          <img src={upang} alt='UPang' className='w-16 h-16 object-contain' />
          <div>
            <p className={`font-bold text-base md:text-lg leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>PHINMA University of Pangasinan</p>
            <p className={`text-sm font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Bachelor of Science in Information Technology (BSIT)</p>
          </div>
        </div>
        <div className='flex flex-wrap gap-3 ml-[72px]'>
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
            <FaCalendarAlt size={12} className="text-blue-500" /> Present
          </span>
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
            <FaChartLine size={12} className="text-blue-500" /> GWA: TBD
          </span>
        </div>
      </div>
    </div>

    {/* High School */}
    <div className='relative pt-2'>
      <div className='flex flex-col gap-3'>
        <div className="flex items-center gap-4">
          <img src={sjnhs} alt='SJNHS' className='w-16 h-16 object-contain' />
          <div>
            <p className={`font-bold text-base md:text-lg leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>San Jacinto National High School</p>
            <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>TVL - Information and Communications Technology (ICT)</p>
          </div>
        </div>
        
        <div className='ml-[72px] space-y-2'>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 uppercase tracking-wide`}>
            <FaTrophy size={12} className="drop-shadow-sm" /> With Highest Honor (GWA: 98)
          </div>
          <div className={`flex items-center gap-2 text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            NC II Passer - Computer System Servicing (CSS)
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
)}

          {/* PROJECTS PAGE - Full width with 2 columns */}
            {activePage === 'projects' && (
              <div className={darkMode ? 'bg-gray-800 rounded-xl shadow-lg p-6' : 'bg-white rounded-xl shadow-lg p-6'}>
                <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>My Projects</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {[
                    {
                      name: 'Personal Portfolio',
                      description: 'My personal portfolio website showcasing my skills, projects, and experience as a developer. Built with modern web technologies.',
                      tech: ['React', 'Vite', 'Tailwind'],
                      year: '2026',
                      image: portfolioimg
                    },
                    {
                      name: 'ScanRx',
                      description: 'A mobile application for scanning and managing prescription medications.',
                      tech: ['Kotlin', 'XML'],
                      year: '2026',
                      image: scanrx
                    },
                    {
                      name: 'MacroMonitor',
                      description: 'A web application for tracking macros and nutrition.',
                      tech: ['PHP', 'MySQL', 'Tailwind', 'JavaScript'],
                      year: '2025',
                      image: macromonitor
                    },
                    {
                      name: 'UniTask Manager',
                      description: 'A Java-based task management application for organizing daily activities and university tasks.',
                      tech: ['Java'],
                      year: '2025',
                      image: unitaskmanager
                    },
                    {
                      name: 'Timplang Pinoy',
                      description: 'A Filipino recipe website featuring traditional dishes and cooking tutorials.',
                      tech: ['HTML', 'CSS', 'JavaScript'],
                      year: '2025',
                      image: timplangpinoy
                    },
                    {
                      name: 'Chrono Master',
                      description: 'A Python-based time management tool with productivity features.',
                      tech: ['Python'],
                      year: '2025',
                      image: chronomaster
                    }
                  ].map((project, idx) => (
                    <div key={idx} className={`rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}>
                      {/* Project Image */}
                      <div className='h-48 w-full overflow-hidden'>
                        <img 
                          src={project.image} 
                          alt={project.name} 
                          className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                        />
                      </div>
                      <div className='p-5'>
                        <div className='flex justify-between items-start mb-3'>
                          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.name}</h2>
                          <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>{project.year}</span>
                        </div>
                        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                        <div className='flex flex-wrap gap-2 mb-4'>
                          {project.tech.map((tech, techIdx) => (
                            <div key={techIdx} className='flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/10'>
                              <img src={getTechLogo(tech)} alt={tech} className='w-4 h-4 object-contain' />
                              <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{tech}</span>
                            </div>
                          ))}
                        </div>
                        <div className='flex gap-3'>
                          <button className='flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 transition-colors'>
                            <FaGithub /> GitHub
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* RIGHT COLUMN - Only show on Home page */}
        {activePage === 'home' && (
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
        )}
      </div>

      {/* CHAT WITH EMERSON WIDGET */}
      <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end">
        {chatOpen && (
          <div className={`mb-4 w-72 md:w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <span className="font-bold flex items-center gap-2"><FaUser size={14}/> Chat with Emerson</span>
              <button onClick={() => setChatOpen(false)} className="hover:scale-110 transition-transform">
                <FaTimes size={18} />
              </button>
            </div>
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