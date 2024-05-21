import React, { useEffect, useRef } from "react";
import "./../styles/particle.styles.scss";

// Constants for easy configuration
const NUMBER_OF_PARTICLES = 180;
const PARTICLE_COLOR = "#ffffff";
const NODE_PARTICLE_COLOR = "#ff0000";
const PARTICLE_SIZE = { min: 2, max: 5 };
const NODE_PARTICLE_SIZE = 10;
const PARTICLE_SPEED = { min: -0.15, max: 0.25 };
const CONNECTION_DISTANCE = (window.innerWidth / 7) * (window.innerHeight / 7);

const Particles = ({ positions }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];

    // Particle class
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.baseSize = size;
        this.color = color;
      }

      draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
      }

      update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
          this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    // Initialize particles
    const init = () => {
      particlesArray.length = 0;

      // Add particles at the positions of the spinning graph nodes
      positions.forEach((pos) => {
        if (pos) {
          particlesArray.push(
            new Particle(
              pos.cx,
              pos.cy,
              Math.random() * (PARTICLE_SPEED.max - PARTICLE_SPEED.min) +
                PARTICLE_SPEED.min,
              Math.random() * (PARTICLE_SPEED.max - PARTICLE_SPEED.min) +
                PARTICLE_SPEED.min,
              NODE_PARTICLE_SIZE,
              NODE_PARTICLE_COLOR
            )
          );
        }
      });

      // Add remaining particles
      for (let i = positions.length; i < NUMBER_OF_PARTICLES; i++) {
        const size =
          Math.random() * (PARTICLE_SIZE.max - PARTICLE_SIZE.min) +
          PARTICLE_SIZE.min;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const directionX =
          Math.random() * (PARTICLE_SPEED.max - PARTICLE_SPEED.min) +
          PARTICLE_SPEED.min;
        const directionY =
          Math.random() * (PARTICLE_SPEED.max - PARTICLE_SPEED.min) +
          PARTICLE_SPEED.min;

        particlesArray.push(
          new Particle(x, y, directionX, directionY, size, PARTICLE_COLOR)
        );
      }
    };

    // Connect particles with lines
    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const distance =
            (particlesArray[a].x - particlesArray[b].x) *
              (particlesArray[a].x - particlesArray[b].x) +
            (particlesArray[a].y - particlesArray[b].y) *
              (particlesArray[a].y - particlesArray[b].y);
          if (distance < CONNECTION_DISTANCE) {
            opacityValue = 1 - distance / 20000;
            context.strokeStyle = `rgba(255,255,255,${opacityValue})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(particlesArray[a].x, particlesArray[a].y);
            context.lineTo(particlesArray[b].x, particlesArray[b].y);
            context.stroke();
          }
        }
      }
    };

    // Animate particles
    const animate = () => {
      requestAnimationFrame(animate);
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    };

    init();
    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });

    return () => {
      window.removeEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
      });
    };
  }, [positions]);

  return <canvas ref={canvasRef} id="particles-js"></canvas>;
};

export default Particles;
