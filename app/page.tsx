'use client'
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Define color palettes (Tailwind classes) and corresponding hex codes
const shapePalette = [
  'bg-orange-500',
  'bg-green-500',
  'bg-red-500',
  'bg-blue-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500'
];
const shapeHexes = [
  '#f97316', // orange-500
  '#22c55e', // green-500
  '#ef4444', // red-500
  '#3b82f6', // blue-500
  '#eab308', // yellow-500
  '#a855f7', // purple-500
  '#ec4899'  // pink-500
];

const cardPalette = [
  'border-orange-500',
  'border-green-500',
  'border-red-500',
  'border-blue-500',
  'border-yellow-500',
  'border-purple-500',
];

const extractPolygon = (svgString: string): string | null => {
  const match = svgString.match(/<polygon[^>]*points="([^"]+)"[^>]*>/);
  return match ? `polygon(${match[1]})` : null;
};

const defaultWatermarkColor = "#000000"; // default fill when not hovering

// Add originalColor and originalHex to each shape.
const generateShapes = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const color = shapePalette[i % shapePalette.length];
    const hex = shapeHexes[i % shapeHexes.length];
    return {
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
      size: Math.random() * 150 + 50,
      rotation: Math.random() * 360,
      isFlying: false,
      color,
      hex,
      originalColor: color,
      originalHex: hex,
      font: 'font-bold uppercase tracking-wide',
      warped: false,
      warpedPath: null as string | null,
    };
  });
};

const variantPaths = [
  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)", // star
  "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", // rhombus
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)", // octagon
  "polygon(50% 0%, 61% 35%, 87% 35%, 67% 57%, 73% 91%, 50% 70%, 27% 91%, 33% 57%, 13% 35%, 39% 35%)",  // flower
  "circle(50% at 50% 50%)", // circle
  "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" // square
];

const bounceOffEdges = (x: number, y: number, dx: number, dy: number, width: number, height: number) => {
  let newDx = dx;
  let newDy = dy;
  if (x <= 0 || x + width >= window.innerWidth) newDx *= -1;
  if (y <= 0 || y + height >= window.innerHeight) newDy *= -1;
  return { newDx, newDy };
};

export default function Home() {
  const [hoveredColor, setHoveredColor] = useState(defaultWatermarkColor);
  // New state for the white container background:
  const [bgColor, setBgColor] = useState("#ffffff");
  const [shapes, setShapes] = useState(generateShapes(10));
  const [isDragging, setIsDragging] = useState(false);
  const [cards, setCards] = useState([
    { id: 1, x: 50, y: 150, width: 350, height: 200, rotation: 0, title: 'grifgraf', desc: 'AR street art platform' },
    { id: 2, x: 200, y: 330, width: 400, height: 200, rotation: 0, title: 'accountabl', desc: 'easy peer-powered budgeting' },
    { id: 3, x: 100, y: 510, width: 300, height: 200, rotation: 0, title: 'planmi', desc: 'plan and execute language lessons' },
    { id: 4, x: 800, y: 200, width: 300, height: 200, rotation: 0, title: 'Blog', desc: '' },
    { id: 5, x: 1200, y: 150, width: 400, height: 600, rotation: 0, title: 'Socials', desc: 'connect with me' },
    { id: 6, x: 900, y: 700, width: 400, height: 200, rotation: 0, title: 'About me', desc: '' },
  ]);
  const [activeCard, setActiveCard] = useState(null as any | null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((prevShapes) =>
        prevShapes.map((shape) => {
          if (shape.isFlying) {
            let newX = shape.x + shape.dx * 2;
            let newY = shape.y + shape.dy * 2;
            let { newDx, newDy } = bounceOffEdges(newX, newY, shape.dx, shape.dy, shape.size, shape.size);
            let newFont = shape.font === 'font-bold uppercase tracking-wide'
              ? 'font-mono lowercase tracking-tight'
              : 'font-bold uppercase tracking-wide';
            return {
              ...shape,
              x: newX,
              y: newY,
              dx: newDx,
              rotation: shape.rotation + 2,
              dy: newDy,
              font: newDx !== shape.dx || newDy !== shape.dy ? newFont : shape.font,
            };
          } else {
            let newX = shape.x + shape.dx;
            let newY = shape.y + shape.dy;
            let { newDx, newDy } = bounceOffEdges(newX, newY, shape.dx, shape.dy, shape.size, shape.size);
            return { ...shape, x: newX, y: newY, dx: newDx, dy: newDy, rotation: shape.rotation + 2 };
          }
        })
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative min-h-screen p-6 overflow-hidden text-black uppercase tracking-wide font-michroma"
      style={{ backgroundColor: bgColor }} // container background set to bgColor
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: hoveredColor,
          WebkitMaskImage: "url('/CzNy3H01.svg')",
          maskImage: "url('/CzNy3H01.svg')",
          maskSize: "cover",
          maskRepeat: "no-repeat",
          opacity: hoveredColor === defaultWatermarkColor ? 0.05 : 0.10,
        }}
      />
      
      {/* Bouncing and Draggable Content */}
      <motion.div
        contentEditable
        animate={{ x: 300, y: 0 }}
        className="absolute p-6 cursor-grab text-black"
        style={{ width: 'full', height: 200 }}
        drag
        dragConstraints={{ top: 0, left: 0, right: window.innerWidth - 600, bottom: window.innerHeight - 200 }}
        dragElastic={0.2}
      >
        <h1 className={`text-9xl font-bold`}>sam robertson</h1>
      </motion.div>

      {shapes.map((shape, i) => (
  <motion.div
    key={shape.id}
    className={`absolute ${shape.color} opacity-80 shadow-xl cursor-grab ${shape.font}`}
    style={{
      width: shape.size,
      height: shape.size,
      borderRadius: shape.warped ? '0' : (shape.id % 3 === 0 ? '50%' : '10%'),
      clipPath: shape.warpedPath ? shape.warpedPath : variantPaths[i % variantPaths.length],
    }}
    animate={{ x: shape.x, y: shape.y, rotate: shape.rotation }}
    transition={{ duration: 0.03, ease: 'linear' }}
    onHoverStart={() => setHoveredColor(shape.hex)}
    onHoverEnd={() => setHoveredColor(defaultWatermarkColor)}
    onDragStart={() => {
      setShapes((prevShapes) =>
        prevShapes.map((s) => (s.id === shape.id ? { ...s, dx: 0, dy: 0 } : s))
      );
    }}
    onClick={() => {
      if (shape.hex === '#ffffff') {
        // If the shape is already white, revert it and set container bg to white.
        setBgColor('#ffffff');
        setShapes((prevShapes) =>
          prevShapes.map((s) =>
            s.id === shape.id
              ? { ...s, color: s.originalColor, hex: s.originalHex }
              : s
          )
        );
      } else {
        // Set container background to the shape's color and change this shape to white.
        setBgColor(shape.hex);
        setShapes((prevShapes) =>
          prevShapes.map((s) => {
            if (s.id === shape.id) {
              return { ...s, color: 'bg-white', hex: '#ffffff' };
            } else if (s.color === 'bg-white') {
              // Revert any other white shape.
              return { ...s, color: s.originalColor, hex: s.originalHex };
            }
            return s;
          })
        );
      }
    }}
    drag
    onDragEnd={(_: number, info: any) => {
      setShapes((prevShapes) =>
        prevShapes.map((s) =>
          s.id === shape.id
            ? { ...s, dx: info.velocity.x / 100, dy: info.velocity.y / 100, isFlying: true }
            : s
        )
      );
    }}
  />
))}

{cards.map((card) => (
        <motion.div
          key={card.id}
          animate={{ x: card.x, y: card.y, rotate: card.rotation }}
          className={`absolute p-6 shadow-xl cursor-grab border-4 bg-black text-white ${cardPalette[card.id % cardPalette.length]} overflow-hidden`}
          style={{ width: card.width, height: card.height }}
          drag
          dragConstraints={{ 
            top: 0, 
            left: 0, 
            right: window.innerWidth - card.width, 
            bottom: window.innerHeight - card.height 
          }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            setIsDragging(false);
            // Your current position update code goes here
          }}
          onTap={() => {
            // Only trigger onTap if not dragging
            if (!isDragging&& card.id!==5) {
              setActiveCard(card);
            }
          }}
        >
          <h2 className="text-4xl font-bold">{card.title}</h2>
          <p className="mt-2">{card.desc}</p>
          {card.id === 5 && <>

      <div className="grid grid-cols-2 gap-4 overflow-hidden">
          <a href='https://www.github.com/ageofadz'
          className="transition-all  hover:bg-neutral-200 border border-neutral-200  bg-neutral-50 rounded p-1 text-sm inline-flex items-left  text-neutral-900 dark:text-neutral-100 mb-3"
          >
          <img className='m-auto' width={120} height={120} alt="GitHub logo" src="/github-logo.svg"/>
          </a>
          <a href='https://www.linkedin.com/in/sam-r-559bb090/'
          className="transition-all  hover:bg-neutral-200 border border-neutral-200 bg-neutral-50 rounded p-1 text-sm inline-flex items-left  text-neutral-900 dark:text-neutral-100 mb-3 "
          >
          <img  className='m-auto' width={120} height={120} alt="LinkedIn logo" src="/linkedin-logo.svg" />
          </a>
          <a  href='mailto:samuel.lazier.robertson+website@gmail.com'
          className="transition-all  hover:bg-neutral-200 border border-neutral-200 bg-neutral-50 rounded p-1 text-sm inline-flex items-left  text-neutral-900 dark:text-neutral-100 mb-3 "
          >
          <img  className='m-auto' width={120} height={120} alt="Email" src="/email.svg"/>
          
          </a>
          <a  href='https://www.instagram.com/sam.l.robertson/'
          className="transition-all  hover:bg-neutral-200 border border-neutral-200 bg-neutral-50 rounded p-1 text-sm inline-flex items-left  text-neutral-900 dark:text-neutral-100 mb-3 "
          >
          <img  className='m-auto' width={120} height={120} alt="Instagram" src="/insta-logo.svg"/>
          
          </a>
          <a  href='https://www.soundcloud.com/colortelevisionmusic/'
          className="transition-all  hover:bg-neutral-200 border border-neutral-200 bg-neutral-50 rounded p-1 text-sm inline-flex items-left  text-neutral-900 dark:text-neutral-100 mb-3 "
          >
          <img  className='m-auto' width={120} height={120} alt="Soundcloud" src="/soundcloud.svg"/>
          
          </a>
          <a  href='https://huggingface.co/samrobertsondev'
          className="transition-all  hover:bg-neutral-200 border border-neutral-200 bg-neutral-50 rounded p-1 text-sm inline-flex items-left  text-neutral-900 dark:text-neutral-100 mb-3 "
          >
          <img  className='m-auto' width={120} height={120} alt="Huggingface" src="/huggingface.svg"/>
          
          </a>
          </div>
          </>}
          <svg 
      viewBox="0 0 10 10" 
      className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none"
    >
      <polygon points="0,10 10,10 10,0" fill="white" />
    </svg>
            <motion.div
        className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize"
        drag
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        onDragEnd={() => {
          setIsDragging(false);
          // Your current position update code goes here
        }}
        onDrag={(_: any, info: any) => {
          if (info.delta) {
            const newWidth = Math.max(100, card.width + info.delta.x);
            const newHeight = Math.max(100, card.height + info.delta.y);
            setCards((prevCards) =>
              prevCards.map((c) =>
                c.id === card.id ? { ...c, width: newWidth, height: newHeight } : c
              )
            );
          }
        }}
      >  
  </motion.div>

  <svg 
        viewBox="0 0 10 10" 
        className="absolute top-0 left-0 w-6 h-6 pointer-events-none"
      >
        <polygon points="0,0 10,0 0,10" fill="white" />
      </svg>
  <motion.div
      className="absolute top-0 left-0 w-6 h-6"
      drag
      dragMomentum={false}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      // Prevent events from bubbling to the parent card
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onDrag={(_: any, info: any) => {
        // Use the horizontal movement to add to the card's rotation
        const newRotation = card.rotation + info.delta.x/3;
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.id === card.id ? { ...c, rotation: newRotation } : c
          )
        );
      }}
    >
    </motion.div>
        </motion.div>
        
      ))}

<AnimatePresence>
  {activeCard && (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setActiveCard(null)} // Closes modal if outer area is clicked
    >
      <motion.div
        className="bg-white p-6 rounded-lg max-w-3xl w-full relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e: any) => e.stopPropagation()} // Prevents closing when clicking inside modal
      >
        <button
          className="absolute top-2 right-2 text-2xl font-bold"
          onClick={() => setActiveCard(null)}
        >
          &times;
        </button>
        <div className="mt-4">
          <h2 className="text-3xl font-bold">{activeCard.title}</h2>
          <div className="mt-4">
            {frame(activeCard.id)}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}

const frame = (id: number) => {
  switch(id) {
    case 1:
      return                 <>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg overflow-hidden w-48 h-48 m-auto">
          <img src="grifgraf-full.png" alt="Grifgraf" className="w-36 object-cover m-auto" />
        </div>
        <div className="rounded-lg overflow-hidden w-48 h-48 m-auto">
          <img src="arcore-camera-geolocating/monkey.png" alt="Monkey" className="w-36 object-cover m-auto" />
        </div>
        <div className="rounded-lg overflow-hidden w-48 h-48 m-auto">
          <img src="arkit-vincenty-geolocating/interface.PNG" alt="Interface" className="w-36 object-cover m-auto" />
        </div>
        <div className="rounded-lg overflow-hidden w-48 h-48 m-auto">
          <img src="arkit-vincenty-geolocating/savedimage.PNG" alt="Saved Image" className="w-36 object-cover m-auto" />
        </div>
      </div>
      <div className="mt-4">
        <p className="normal-case">grifgraf turns real-life streets into a canvas for people to share and view virtual street art.</p>
        <br /><a href="https://grifgraf.app" className="text-blue-500 underline">
          Read more
        </a>
      </div>
    </>
    case 2:
      return <>
        <div className="rounded-lg overflow-hidden w-48 h-48 m-auto">
          <img src="accountabl.png" alt="accountabl" className="w-36 object-cover m-auto" />
        </div>
      <div className="mt-4">
        <p className="normal-case">accountabl is a peer budgeting app, where you and a friend can share your transactions and check in on each others progress in meeting your financial goals.</p>
        
      </div>
    </>
    case 3:
      return <>
        <div className="rounded-lg overflow-hidden w-48 h-48 m-auto">
          <img src="planmi.png" alt="accountabl" className="w-36 object-cover m-auto" />
        </div>
      <div className="mt-4">
        <p className="normal-case">I put this tool together to automate lesson planning back when I was an english teacher.</p>
        <br /><a href="https://planmi.vercel.app" className="text-blue-500 underline">
          Read more
        </a>
      </div>
    </>
    case 4:
      return <iframe
        src="/blog"
        className="w-full h-[500px] rounded bg-white"
      />
      case 6:
        return <>
          <div className="rounded-lg overflow-hidden w-48 h-48 m-auto">
            <img src="portrait.png" alt="sam" className="w-48 h-48 object-cover m-auto" />
          </div>
        <div className="mt-4">
          <p className="normal-case">I am a highly experienced software engineer experience currently based out of Southeast Asia. I&apos;m originally from Chicago. I like cooking, music, meditation, and architecture.</p>
          
        </div>
      </>
  }
}