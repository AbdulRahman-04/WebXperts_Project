import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";

const Home = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate("/signin");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    class Particle {
      constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
      }

      draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }

      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.005;
      }
    }

    const createParticles = (x, y) => {
      for (let i = 0; i < 30; i++) {
        particles.push(
          new Particle(x, y, Math.random() * 6 + 2, "rgba(0, 204, 255, 0.8)", {
            x: (Math.random() - 0.5) * 4,
            y: (Math.random() - 0.5) * 4,
          })
        );
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        if (particle.alpha > 0) {
          particle.update();
          particle.draw();
        } else {
          particles.splice(index, 1);
        }
      });
    };

    animate();

    window.addEventListener("click", (e) => {
      createParticles(e.clientX, e.clientY);
    });

    return () => {
      window.removeEventListener("click", createParticles);
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>

      <motion.h1
        className="text-5xl md:text-7xl font-extrabold text-blue-400 drop-shadow-lg relative z-10"
        initial={{ scale: 0.5, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Welcome to WebXpertz
      </motion.h1>
      <motion.p
        className="text-gray-300 max-w-lg mt-4 text-lg md:text-xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        WebXpertz is your **ultimate freelancing hub**, connecting talented developers, designers, and marketers with clients worldwide. Join us and level up your freelance career today!
      </motion.p>
      <motion.button
        onClick={() => navigate("/signin")}
        className="bg-black border-2 border-blue-500 text-white px-6 py-3 rounded-lg text-lg mt-6 hover:bg-blue-600 transition-all shadow-lg relative z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Sign In Here
      </motion.button>
    </div>
  );
};

export default Home;
