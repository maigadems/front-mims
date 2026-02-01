import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lenis from '@studio-freight/lenis';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Wine, 
  Leaf, 
  Tv, 
  ShoppingBag,
  Award,
  ChevronDown,
  Menu as MenuIcon,
  X,
  Sun,
  Moon,
  ArrowRight,
  Send
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Calendar } from "./components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Toaster } from "sonner";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import MenuPage from "./pages/MenuPage";

// Images
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920",
  chef: "images/IMG_0318.PNG",
  dish1: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
  dish2: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
  interior1: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  interior2: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
  cocktail: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800"
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// Format price
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
};

// Theme Toggle Component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      className="theme-toggle"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      data-testid="theme-toggle"
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="w-5 h-5 text-gold" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="w-5 h-5 text-[#D4AF37]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "À Propos" },
    { href: "#chef", label: "Le Chef" },
    { href: "#menu", label: "Menu" },
    { href: "#services", label: "Services" },
    { href: "#locations", label: "Adresses" },
  ];

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'nav-glass' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        data-testid="main-header"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl md:text-3xl font-bold text-foreground" data-testid="logo">
            MIMS
          </Link>

          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="nav-link text-sm tracking-widest uppercase text-foreground/80 hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button className="btn-gold" data-testid="header-reserve-btn">
                Réserver
              </Button>
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-foreground"
              data-testid="mobile-menu-toggle"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu-overlay flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-testid="mobile-nav"
          >
            <div className="flex justify-between items-center p-6">
              <span className="font-serif text-2xl font-bold text-foreground">MIMS</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif text-foreground hover:text-[#D4AF37] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-gold mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Réserver une Table
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Hero Section
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="hero-section flex items-center justify-center" data-testid="hero-section">
      <motion.div 
        className="hero-bg"
        style={{ 
          backgroundImage: `url(${IMAGES.hero})`,
          y 
        }}
      />
      <div className="hero-overlay" />
      
      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl"
        style={{ opacity }}
      >
        <motion.p 
          className="text-sm tracking-[0.4em] uppercase text-[#D4AF37] mb-6"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          Depuis 2009 • Dakar, Sénégal
        </motion.p>
        
        <motion.h1 
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-foreground mb-6"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          MIMS
        </motion.h1>
        
        <motion.p 
          className="font-accent text-xl md:text-2xl italic text-foreground/70 mb-12 max-w-2xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          Cuisine Élégante & Moderne
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <Link to="/menu">
            <Button className="btn-gold" data-testid="hero-menu-btn">
              Découvrir le Menu
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button className="btn-outline-gold" data-testid="hero-reserve-btn">
              <Phone className="mr-2 w-4 h-4" />
              Réserver
            </Button>
          </a>
        </motion.div>
      </motion.div>
      
      <motion.a 
        href="#about" 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-[#D4AF37]" />
      </motion.a>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeInUp} className="text-sm tracking-[0.2em] uppercase text-[#D4AF37] mb-4">
              Notre Histoire
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl text-foreground mb-8">
              Une Expérience<br />Culinaire Unique
            </motion.h2>
            <motion.div variants={fadeInUp} className="gold-line mb-8" />
            <motion.p variants={fadeInUp} className="text-lg text-foreground/70 leading-relaxed mb-6">
              Depuis 2009, MIMS a combiné élégance, ingrédients de qualité et saveurs raffinées 
              pour créer une expérience culinaire unique à Dakar. Notre restaurant est devenu 
              une référence pour ceux qui recherchent une cuisine moderne dans un cadre chic et chaleureux.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-foreground/70 leading-relaxed">
              Que ce soit pour un déjeuner d'affaires, un dîner en amoureux ou un moment entre amis, 
              MIMS vous accueille dans une atmosphère contemporaine où chaque détail est pensé 
              pour votre confort.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="img-hover-zoom rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={IMAGES.interior1}
              alt="Intérieur élégant du restaurant MIMS"
              className="w-full h-[500px] object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Chef Section
const ChefSection = () => {
  return (
    <section id="chef" className="py-24 md:py-32 bg-card/50" data-testid="chef-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeInUp} className="text-sm tracking-[0.2em] uppercase text-[#D4AF37] mb-4">
              Le Propriétaire
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Chef Momo
            </motion.h2>
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <Award className="w-6 h-6 text-[#D4AF37]" />
              <span className="font-accent text-xl italic text-[#D4AF37]">9ème Mondial en Pâtisserie</span>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-lg text-foreground/70 leading-relaxed mb-6">
              Momo est l'un des meilleurs pâtissiers au monde. Sa passion pour l'excellence 
              et son dévouement à l'art culinaire l'ont mené au sommet de la gastronomie internationale.
            </motion.p>
            <motion.div variants={fadeInUp} className="glass-card p-6 mb-6">
              <p className="font-accent text-lg italic text-foreground/90">
                "En 2026, Momo a dirigé l'équipe au Concours Mondial de la Pâtisserie 
                organisé en France et s'est classé 9ème mondial, faisant de lui le 
                meilleur pâtissier du continent africain."
              </p>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-lg text-foreground/70 leading-relaxed">
              Son expertise et sa créativité se retrouvent dans chaque dessert servi chez MIMS.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="chef-image-wrapper">
              <img 
                src={IMAGES.chef}
                alt="Chef Momo - Propriétaire de MIMS"
                className="w-full h-[600px] object-cover rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Menu Preview Section
const MenuPreviewSection = () => {
  const menuHighlights = [
    { name: "Filet de Bœuf", price: 12000, category: "Plats", image: IMAGES.dish1 },
    { name: "Fondant au Chocolat", price: 4500, category: "Desserts", image: IMAGES.dish2 },
    { name: "Cocktails Signatures", price: 5000, category: "Bar", image: IMAGES.cocktail },
  ];

  return (
    <section id="menu" className="py-24 md:py-32" data-testid="menu-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={fadeInUp} className="text-sm tracking-[0.2em] uppercase text-[#D4AF37] mb-4">
            Nos Saveurs
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Le Menu
          </motion.h2>
          <motion.div variants={fadeInUp} className="gold-line mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {menuHighlights.map((item, index) => (
            <motion.div
              key={index}
              className="glass-card overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              data-testid={`menu-highlight-${index}`}
            >
              <div className="img-hover-zoom h-64">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-[#D4AF37] text-sm tracking-wider uppercase mb-2">{item.category}</p>
                <h3 className="font-serif text-xl text-foreground mb-2">{item.name}</h3>
                <p className="text-foreground/70 font-accent text-lg">{formatPrice(item.price)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/menu">
            <Button className="btn-outline-gold" data-testid="view-full-menu-btn">
              Voir le Menu Complet
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    { icon: <Wine className="w-8 h-8" />, title: "Cocktails d'Exception", description: "Une carte de cocktails classiques et signatures." },
    { icon: <Leaf className="w-8 h-8" />, title: "Options Végétariennes", description: "Des plats savoureux pour tous les régimes." },
    { icon: <Tv className="w-8 h-8" />, title: "Diffusion Sports", description: "Événements sportifs dans un cadre premium." },
    { icon: <ShoppingBag className="w-8 h-8" />, title: "Sur Place & À Emporter", description: "Dégustez sur place ou emportez." },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-card/50" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={fadeInUp} className="text-sm tracking-[0.2em] uppercase text-[#D4AF37] mb-4">
            Ce Que Nous Offrons
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl text-foreground">
            Nos Services
          </motion.h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              data-testid={`service-card-${index}`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-6">
                {service.icon}
              </div>
              <h3 className="font-serif text-xl text-foreground mb-4">{service.title}</h3>
              <p className="text-foreground/60">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Locations Section
const LocationsSection = () => {
  const locations = [
    { name: "Dakar", address: "90 Rue Félix Faure, Dakar", phone: "+221 33 822 70 75", image: IMAGES.interior1 },
    { name: "Ngor Virage", address: "Ngor Virage, Dakar", phone: "+221 77 566 55 41", image: IMAGES.interior2 },
  ];

  return (
    <section id="locations" className="py-24 md:py-32" data-testid="locations-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={fadeInUp} className="text-sm tracking-[0.2em] uppercase text-[#D4AF37] mb-4">
            Où Nous Trouver
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl text-foreground">
            Nos Adresses
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              className="location-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              data-testid={`location-card-${location.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="img-hover-zoom h-64">
                <img src={location.image} alt={`MIMS ${location.name}`} className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl text-foreground mb-4">MIMS {location.name}</h3>
                <div className="space-y-3">
                  <p className="flex items-center gap-3 text-foreground/70">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    {location.address}
                  </p>
                  <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-foreground/70 hover:text-[#D4AF37] transition-colors">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                    {location.phone}
                  </a>
                  <p className="flex items-center gap-3 text-foreground/70">
                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                    Ouvert tous les jours jusqu'à 00:00
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// WhatsApp number
const WHATSAPP_NUMBER = "221776190060";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite réserver une table chez MIMS.")}`;

// Generate WhatsApp URL with form data
const generateWhatsAppMessage = (formData) => {
  const locationName = formData.location === 'dakar' ? 'MIMS Dakar - 90 Rue Félix Faure' : 'MIMS Ngor Virage';
  const dateStr = formData.date ? format(formData.date, "d MMMM yyyy", { locale: fr }) : 'Non spécifiée';
  
  const message = `🍽️ *RÉSERVATION MIMS*

👤 *Nom:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Téléphone:* ${formData.phone}

📅 *Date:* ${dateStr}
🕐 *Heure:* ${formData.time || 'Non spécifiée'}
👥 *Nombre de personnes:* ${formData.guests || 'Non spécifié'}
📍 *Restaurant:* ${locationName}

${formData.message ? `💬 *Message:* ${formData.message}` : ''}

Merci de confirmer ma réservation.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// Reservation Section
const ReservationSection = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: null, time: '', guests: '', location: '', message: ''
  });

  const timeSlots = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappUrl = generateWhatsAppMessage(formData);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="reservation" className="py-24 md:py-32 bg-card" data-testid="reservation-section">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div 
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={fadeInUp} className="text-sm tracking-[0.2em] uppercase text-[#D4AF37] mb-4">
            Réservez Votre Table
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl text-foreground">
            Réservation
          </motion.h2>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="glass-card p-8 md:p-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          data-testid="reservation-form"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="text-sm tracking-wider uppercase text-foreground/60 mb-2 block">Nom *</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="input-dark"
                placeholder="Votre nom"
                data-testid="reservation-name"
              />
            </div>
            <div>
              <label className="text-sm tracking-wider uppercase text-foreground/60 mb-2 block">Email *</label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="input-dark"
                placeholder="votre@email.com"
                data-testid="reservation-email"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="text-sm tracking-wider uppercase text-foreground/60 mb-2 block">Téléphone *</label>
              <Input
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="input-dark"
                placeholder="+221 XX XXX XX XX"
                data-testid="reservation-phone"
              />
            </div>
            <div>
              <label className="text-sm tracking-wider uppercase text-foreground/60 mb-2 block">Personnes *</label>
              <Select value={formData.guests} onValueChange={(v) => setFormData({...formData, guests: v})}>
                <SelectTrigger className="input-dark border-0 border-b border-white/20 rounded-none" data-testid="reservation-guests">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                    <SelectItem key={n} value={n.toString()}>{n} {n === 1 ? 'personne' : 'personnes'}</SelectItem>
                  ))}
                  <SelectItem value="10+">Plus de 10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="text-sm tracking-wider uppercase text-foreground/60 mb-2 block">Date *</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full input-dark border-0 border-b border-white/20 rounded-none justify-start font-normal hover:bg-transparent" data-testid="reservation-date">
                    {formData.date ? format(formData.date, "d MMMM yyyy", { locale: fr }) : <span className="text-foreground/30">Choisir une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={formData.date} onSelect={(d) => setFormData({...formData, date: d})} disabled={(d) => d < new Date()} />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="text-sm tracking-wider uppercase text-foreground/60 mb-2 block">Heure *</label>
              <Select value={formData.time} onValueChange={(v) => setFormData({...formData, time: v})}>
                <SelectTrigger className="input-dark border-0 border-b border-white/20 rounded-none" data-testid="reservation-time">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (<SelectItem key={slot} value={slot}>{slot}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-8">
            <label className="text-sm tracking-wider uppercase text-foreground/60 mb-2 block">Restaurant *</label>
            <Select value={formData.location} onValueChange={(v) => setFormData({...formData, location: v})}>
              <SelectTrigger className="input-dark border-0 border-b border-white/20 rounded-none" data-testid="reservation-location">
                <SelectValue placeholder="Choisir un restaurant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dakar">MIMS Dakar - 90 Rue Félix Faure</SelectItem>
                <SelectItem value="ngor">MIMS Ngor Virage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-8">
            <label className="text-sm tracking-wider uppercase text-foreground/60 mb-2 block">Message (optionnel)</label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="input-dark resize-none"
              placeholder="Demandes spéciales, allergies, occasion..."
              rows={3}
              data-testid="reservation-message"
            />
          </div>

          <div className="text-center">
            <Button type="submit" className="btn-gold inline-flex items-center gap-3" data-testid="reservation-submit">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Envoyer via WhatsApp
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-16 border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-3xl text-foreground mb-4">MIMS</h3>
            <p className="text-foreground/60">Cuisine Élégante & Moderne<br />Depuis 2009</p>
          </div>
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase text-[#D4AF37] mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+221338227075" className="flex items-center gap-3 text-foreground/60 hover:text-[#D4AF37] transition-colors footer-link">
                <Phone className="w-4 h-4" /> +221 33 822 70 75
              </a>
              <a href="tel:+221775665541" className="flex items-center gap-3 text-foreground/60 hover:text-[#D4AF37] transition-colors footer-link">
                <Phone className="w-4 h-4" /> +221 77 566 55 41
              </a>
              <a href="https://instagram.com/mims_dakar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground/60 hover:text-[#D4AF37] transition-colors footer-link" data-testid="instagram-link">
                <Instagram className="w-4 h-4" /> @mims_dakar
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase text-[#D4AF37] mb-4">Horaires</h4>
            <div className="space-y-3 text-foreground/60">
              <p className="flex items-center gap-3"><Clock className="w-4 h-4" /> Ouvert tous les jours</p>
              <p className="ml-7">Fermeture à 00:00</p>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/40 text-sm">© {new Date().getFullYear()} MIMS Restaurant</p>
          <div className="flex gap-6">
            <a href="#about" className="text-foreground/40 hover:text-[#D4AF37] text-sm transition-colors">À Propos</a>
            <Link to="/menu" className="text-foreground/40 hover:text-[#D4AF37] text-sm transition-colors">Menu</Link>
            <a href="#reservation" className="text-foreground/40 hover:text-[#D4AF37] text-sm transition-colors">Réserver</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Home Page
const HomePage = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="grain">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ChefSection />
        <MenuPreviewSection />
        <ServicesSection />
        <LocationsSection />
        <ReservationSection />
      </main>
      <Footer />
    </div>
  );
};

// Main App
function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Toaster position="top-center" richColors />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
