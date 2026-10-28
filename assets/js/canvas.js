    // ------------------------------------------------------------------
    //  Interactive Multi-Color Connected Dots Canvas
    // ------------------------------------------------------------------
    const canvas = document.getElementById('hero-connected-dots');
    const heroSection = document.getElementById('hero-section');
    if (!canvas || !heroSection) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    // Vibrant Multi-Color Palette (Hex & RGB values)
    const colorPalette = [
      { r: 105, g: 186, b: 255 }, // Vibrant Blue (#69baff)
      { r: 126, g: 197, b: 255 }, // Sky Blue (#7ec5ff)
      { r: 52,  g: 211, b: 153 }, // Emerald Green (#34d399)
      { r: 167, g: 139, b: 250 }, // Soft Purple (#a78bfa)
      { r: 251, g: 146, b: 60  }  // Amber Glow (#fb923c)
    ];

    // Mouse Tracking Position & Interaction Parameters
    const mouse = {
      x: null,
      y: null,
      radius: 170 // Push-away interaction distance
    };

    // Responsive Canvas Resizing
    function resizeCanvas() {
      width = canvas.width = heroSection.offsetWidth;
      height = canvas.height = heroSection.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track Cursor relative to Hero Container
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Particle Object Definition
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Big particle radius (4px to 7.5px)
        this.radius = Math.random() * 3.5 + 4;
        this.baseRadius = this.radius;
        // Random velocity
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        // Assign random vibrant color from palette
        this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        this.alpha = Math.random() * 0.4 + 0.6;
      }

      update() {
        // Bounce off canvas edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse Push-Away Repulsion Physics
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            
            // Push particle away from cursor
            const pushX = forceDirectionX * force * 4.5;
            const pushY = forceDirectionY * force * 4.5;

            this.x -= pushX;
            this.y -= pushY;
          }
        }

        // Standard Movement
        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
        // Add subtle radial glow around big dots
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset blur for lines performance
      }
    }

    // Initialize Particle Array (Scales based on screen width)
    const particleCount = Math.floor(Math.min(width, 1200) / 18);
    const particles = Array.from({ length: particleCount }, () => new Particle());

    // Main Canvas Render Loop
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Update & Draw Particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw Bold Connecting Gradient Lines
      const maxDistance = 145; // Max link distance
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Proximity Alpha Factor
            const alpha = (1 - dist / maxDistance) * 0.55;

            // Gradient line matching colors of both connected dots
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${alpha})`);
            gradient.addColorStop(1, `rgba(${p2.color.r}, ${p2.color.g}, ${p2.color.b}, ${alpha})`);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = gradient;
            // Bold Line Width (up to 2.5px width)
            ctx.lineWidth = (1 - dist / maxDistance) * 2.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  });
