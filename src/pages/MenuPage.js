import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from '@studio-freight/lenis';
import { 
  Phone, 
  ArrowLeft,
  ChevronDown,
  Menu as MenuIcon,
  X,
  Sun,
  Moon
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useTheme } from "../context/ThemeContext";

// WhatsApp
const WHATSAPP_NUMBER = "221776190060";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite réserver une table chez MIMS.")}`;

// Category images
const CATEGORY_IMAGES = {
  "Salades": { main: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", secondary: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400" },
  "Burgers": { main: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800", secondary: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400" },
  "Sandwichs": { main: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800", secondary: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=400" },
  "Pâtes": { main: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800", secondary: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400" },
  "Pizzas": { main: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800", secondary: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" },
  "Plats": { main: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", secondary: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400" },
  "Omelettes": { main: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800", secondary: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400" },
  "Desserts": { main: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800", secondary: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400" },
  "Boissons & Cocktails": { main: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800", secondary: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400" }
};

// Menu data
const MENU_DATA = {
  "Salades": [
    { name: "Salade MIMS", price: 6000, description: "Notre signature avec poulet grillé, avocat, tomates cerises et vinaigrette maison" },
    { name: "Salade César", price: 5500, description: "Laitue romaine, croûtons, parmesan et sauce César crémeuse" },
    { name: "Salade Avocat", price: 5000, description: "Avocat frais, tomates, oignons rouges et citron vert" },
    { name: "Salade Poulet", price: 6000, description: "Poulet grillé mariné sur lit de verdure fraîche" },
    { name: "Salade Thon", price: 5500, description: "Thon mi-cuit, haricots verts, œuf et olives noires" }
  ],
  "Burgers": [
    { name: "Classic Burger", price: 6000, description: "Bœuf 150g, salade, tomate, oignon et sauce maison" },
    { name: "Cheeseburger", price: 6500, description: "Bœuf 150g avec cheddar fondant et pickles" },
    { name: "Chicken Burger", price: 6000, description: "Filet de poulet pané, salade et mayonnaise" },
    { name: "Crispy Chicken Burger", price: 6500, description: "Poulet croustillant, coleslaw et sauce épicée" },
    { name: "Veggie Burger", price: 5500, description: "Galette de légumes, avocat et sauce tahini" }
  ],
  "Sandwichs": [
    { name: "Sandwich Poulet", price: 4500, description: "Poulet grillé, crudités et sauce cocktail" },
    { name: "Sandwich Steak", price: 5000, description: "Emincé de bœuf, oignons caramélisés et moutarde" },
    { name: "Sandwich Thon", price: 4500, description: "Thon, mayonnaise légère et salade croquante" },
    { name: "Club Sandwich", price: 5500, description: "Triple étage avec poulet, bacon, œuf et crudités" }
  ],
  "Pâtes": [
    { name: "Spaghetti Bolognaise", price: 7000, description: "Sauce tomate mijotée à la viande hachée" },
    { name: "Spaghetti Carbonara", price: 7500, description: "Crème, lardons, parmesan et jaune d'œuf" },
    { name: "Penne Poulet", price: 7500, description: "Poulet sauté, crème et champignons" },
    { name: "Penne Crème Champignons", price: 7000, description: "Champignons de Paris, crème fraîche et persil" },
    { name: "Pâtes Fruits de Mer", price: 9000, description: "Crevettes, moules, calamars et sauce tomate" }
  ],
  "Pizzas": [
    { name: "Margherita", price: 6500, description: "Tomate, mozzarella et basilic frais" },
    { name: "Reine", price: 7500, description: "Jambon, champignons et mozzarella" },
    { name: "Poulet", price: 7500, description: "Poulet grillé, poivrons et oignons" },
    { name: "Viande Hachée", price: 8000, description: "Bœuf haché épicé, oignons et fromage" },
    { name: "Fruits de Mer", price: 9000, description: "Crevettes, moules et sauce tomate" },
    { name: "Végétarienne", price: 7000, description: "Légumes grillés, olives et mozzarella" }
  ],
  "Plats": [
    { name: "Filet de Bœuf", price: 12000, description: "Filet tendre 200g, sauce au poivre et légumes grillés" },
    { name: "Entrecôte", price: 11000, description: "Entrecôte 250g grillée à votre cuisson" },
    { name: "Poulet Grillé", price: 7500, description: "Demi-poulet mariné aux herbes" },
    { name: "Escalope de Poulet", price: 8000, description: "Escalope panée ou grillée, au choix" },
    { name: "Brochettes", price: 8000, description: "Brochettes mixtes bœuf et poulet" },
    { name: "Poisson Grillé", price: 9000, description: "Poisson du jour grillé, sauce citronnée" }
  ],
  "Omelettes": [
    { name: "Omelette Nature", price: 3000, description: "Omelette classique aux herbes fraîches" },
    { name: "Omelette Fromage", price: 3500, description: "Garnie de fromage fondant" },
    { name: "Omelette Champignons", price: 3500, description: "Champignons de Paris sautés" },
    { name: "Omelette Mixte", price: 4000, description: "Fromage, champignons et fines herbes" }
  ],
  "Desserts": [
    { name: "Crêpe Chocolat", price: 3500, description: "Crêpe fine nappée de chocolat chaud" },
    { name: "Crêpe Banane", price: 3500, description: "Crêpe avec banane fraîche et caramel" },
    { name: "Fondant au Chocolat", price: 4500, description: "Cœur coulant au chocolat noir, glace vanille" },
    { name: "Glaces", price: 3000, description: "2 boules au choix: vanille, chocolat, fraise" }
  ],
  "Boissons & Cocktails": [
    { name: "Cocktails classiques & signatures", price: 5000, note: "à partir de", description: "Mojito, Margarita, Cosmopolitan et créations maison" },
    { name: "Jus naturels", price: 3000, description: "Orange, ananas, mangue pressés à la minute" },
    { name: "Sodas", price: 2000, description: "Coca-Cola, Fanta, Sprite, Schweppes" },
    { name: "Eau minérale", price: 1500, description: "Plate ou gazeuse 50cl" },
    { name: "Boissons chaudes", price: 2500, description: "Café, thé, cappuccino, chocolat chaud" }
  ]
};

const formatPrice = (price) => new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Theme Toggle
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.button onClick={toggleTheme} className="theme-toggle" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
            <Sun className="w-5 h-5 text-[#D4AF37]" />
          </motion.div>
        ) : (
          <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
            <Moon className="w-5 h-5 text-[#D4AF37]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Header
const MenuHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 nav-glass" data-testid="menu-header">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-[#D4AF37] transition-colors" data-testid="back-home">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline text-sm tracking-wider uppercase">Retour</span>
            </Link>
            <Link to="/" className="font-serif text-2xl md:text-3xl font-bold text-foreground" data-testid="menu-logo">
              MIMS
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+221338227075" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-[#D4AF37] transition-colors">
              <Phone className="w-4 h-4" /> +221 33 822 70 75
            </a>
            <ThemeToggle />
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button className="btn-gold">Réserver</Button>
            </a>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-foreground">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu-overlay flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-between items-center p-6">
              <span className="font-serif text-2xl font-bold text-foreground">MIMS</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-6">
              <a href="tel:+221338227075" className="flex items-center gap-2 text-foreground">
                <Phone className="w-5 h-5" /> +221 33 822 70 75
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="btn-gold">
                Réserver une Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Menu Item Card
const MenuItemCard = ({ item }) => (
  <motion.div 
    className="menu-item group"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    data-testid={`menu-card-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
  >
    <div className="flex-1">
      <h3 className="font-serif text-xl text-foreground group-hover:text-[#D4AF37] transition-colors mb-1">
        {item.name}
      </h3>
      <p className="text-foreground/50 text-sm">{item.description}</p>
    </div>
    <div className="text-right ml-4">
      {item.note && <span className="text-foreground/40 text-xs block">{item.note}</span>}
      <span className="font-accent text-xl text-[#D4AF37] font-semibold">{formatPrice(item.price)}</span>
    </div>
  </motion.div>
);

// Category Section
const CategorySection = ({ category, items, images, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <section 
      id={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
      className={`py-20 md:py-32 ${isEven ? '' : 'bg-card/50'}`}
      data-testid={`section-${category.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start ${isEven ? '' : 'lg:flex-row-reverse'}`}>
          {/* Image */}
          <motion.div 
            className={`lg:sticky lg:top-32 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="img-hover-zoom rounded-2xl overflow-hidden">
                <img src={images?.main} alt={category} className="w-full h-[400px] md:h-[500px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border-4 border-background hidden md:block">
                <img src={images?.secondary} alt={`${category} detail`} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="mt-10">
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-3">{category}</h2>
              <div className="gold-line" />
            </div>
          </motion.div>

          {/* Menu Items */}
          <div className={`space-y-2 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            {items.map((item, idx) => (
              <MenuItemCard key={idx} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Quick Navigation
const QuickNav = ({ categories, activeCategory, onCategoryClick }) => (
  <div className="fixed left-0 right-0 top-[73px] z-40 nav-glass" data-testid="quick-nav">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex gap-1 py-3 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => onCategoryClick(category)}
            className={`px-4 py-2 text-xs tracking-widest uppercase whitespace-nowrap rounded-full transition-all ${
              activeCategory === category 
                ? 'bg-[#D4AF37] text-black' 
                : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid={`quick-nav-${category.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  </div>
);

// Main Menu Page
const MenuPage = () => {
  const categories = Object.keys(MENU_DATA);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenisRef.current = lenis;
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const scrollToCategory = (category) => {
    setActiveCategory(category);
    const element = document.getElementById(`category-${category.toLowerCase().replace(/\s+/g, '-')}`);
    if (element) {
      const offset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background grain" data-testid="menu-page">
      <MenuHeader />
      
      {/* Hero */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920)` }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-center">
          <motion.p 
            className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-4"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Nos Saveurs
          </motion.p>
          <motion.h1 
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-4"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Le Menu
          </motion.h1>
          <motion.p 
            className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            Découvrez notre sélection de plats préparés avec passion
          </motion.p>
        </div>
        <motion.a 
          href="#menu-content" 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-[#D4AF37]" />
        </motion.a>
      </div>

      <QuickNav categories={categories} activeCategory={activeCategory} onCategoryClick={scrollToCategory} />

      {/* Menu Content */}
      <div id="menu-content">
        {categories.map((category, index) => (
          <CategorySection 
            key={category}
            category={category}
            items={MENU_DATA[category]}
            images={CATEGORY_IMAGES[category]}
            index={index}
          />
        ))}
      </div>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-card" data-testid="menu-cta">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.p 
            className="text-[#D4AF37] text-sm tracking-[0.2em] uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Envie de Goûter?
          </motion.p>
          <motion.h2 
            className="font-serif text-4xl md:text-5xl text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Réservez Votre Table
          </motion.h2>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button className="btn-gold inline-flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Réserver sur WhatsApp
              </Button>
            </a>
            <a href="tel:+221338227075">
              <Button className="btn-outline-gold">
                <Phone className="w-4 h-4 mr-2" /> Appeler
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="font-serif text-2xl text-foreground">MIMS</Link>
          <p className="text-foreground/40 text-sm">© {new Date().getFullYear()} MIMS Restaurant</p>
        </div>
      </footer>
    </div>
  );
};

export default MenuPage;
