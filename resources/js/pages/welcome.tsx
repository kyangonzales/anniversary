import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const images = [
  { src: "/images/u.jpg", caption: "My favorite picture 💘" },
  { src: "/images/beach.jpg", caption: "Beach moments 🌊" },
  { src: "/images/pic.jpg", caption: "Random selfie but cute 😚" },
  { src: "/images/dam.jpg", caption: "Our peaceful moment 🌸" },
];

export default function AnniversaryPage() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Set initial to false to avoid autoplay blocking
  const audioRef = useRef<HTMLAudioElement>(null);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  // Audio play/pause logic
  const handleAudioPlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio play error:", error);
      });
    }
  };

  const handleAudioPause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      handleAudioPlay();
    } else {
      handleAudioPause();
    }
  }, [isPlaying]);

  // Auto change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(next, 5000); // Change every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-rose-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-serif">
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="/music/perfect.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Toggle */}
      <button
        onClick={() => setIsPlaying((prev) => !prev)}
        className="absolute top-6 right-6 z-20 bg-white/70 backdrop-blur-md p-2 rounded-full shadow-md hover:scale-105 transition-all"
        title="Toggle Music"
      >
        <Music className="text-rose-500" />
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center space-y-4 z-10"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-rose-700 tracking-widest leading-tight drop-shadow-md">
          Happy Anniversary, My Love 💕
        </h1>
        <p className="text-lg md:text-xl text-rose-600 max-w-xl mx-auto font-light italic">
          A love letter in the form of memories.
        </p>
      </motion.div>

      {/* Carousel */}
      <div className="relative w-full max-w-2xl mt-10 z-10">
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-rose-200">
          <AnimatePresence mode="wait">
            <motion.div className="relative">
              {/* Image */}
              <motion.img
                key={images[current].src}
                src={images[current].src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-[420px] object-cover object-center"
              />
              
              {/* Next/Prev Buttons on Image */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
                <Button onClick={prev} variant="ghost" className="text-rose-500 hover:bg-rose-200 rounded-full">
                  <ChevronLeft size={40} />
                </Button>
              </div>
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
                <Button onClick={next} variant="ghost" className="text-rose-500 hover:bg-rose-200 rounded-full">
                  <ChevronRight size={40} />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="text-center text-rose-600 mt-5 italic text-lg">{images[current].caption}</p>
      </div>

      {/* Love Message */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-12 text-center max-w-xl z-10"
      >
        <p className="text-rose-700 text-lg md:text-xl font-light">
          From our silly selfies to peaceful sunsets, you make every moment magical. I’ll never stop falling in love with you.
        </p>
        <Button className="mt-6 bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg flex items-center gap-2 transition-all">
          <Heart className="w-5 h-5" /> Forever with you
        </Button>
      </motion.div>

      {/* Floating Heart */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 right-8 text-pink-400 text-4xl"
      >
        💞
      </motion.div>
    </div>
  );
}
