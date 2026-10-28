    //   Interactive Multi-Color Big Dots & Bold Lines Canvas (Light/Dark Mode Adaptive)
    const canvas = document.getElementById('hero-connected-dots');
    const heroSection = document.getElementById('hero-section');
    if (!canvas || !heroSection) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    // Multi-color palettes tailored for high contrast in both themes
    const darkPalette = [
      { r: 105, g: 186, b: 255 }, // Electric Blue
      { r: 52,  g: 211, b: 153 }, // Emerald Green
      { r: 167, g: 139, b: 250 }, // Soft Purple
      { r: 251, g: 146, b: 60  }, // Amber Glow
      { r: 244, g: 63,  b: 94  }  // Rose Pink
    ];

    const lightPalette = [
      { r: 23,  g: 105, b: 170 }, // Deep Brand Blue
      { r: 13,  g: 148, b: 136 }, // Deep Teal
      { r: 109, g: 40,  b: 217 }, // Deep Purple
      { r: 194, g: 65,  b: 12  }, // Rich Amber/Rust
      { r: 225, g: 29,  b: 72  }  // Rich Crimson
    ];

    const mouse = {
      x: null,
      y: null,
      radius: 190 // Interaction distance
    };

    function resizeCanvas() {
      width = canvas.width = heroSection.offsetWidth;
      height = canvas.height = heroSection.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // BIGGER DOTS: Radius between 5px and 9px
        this.radius = Math.random() * 4 + 5;
        this.vx = (Math.random() - 0.5) * 1.4;
        this.vy = (Math.random() - 0.5) * 1.4;
        this.alpha = Math.random() * 0.3 + 0.7;
      }

      update() {
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse repulsion / push-away interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 5.5;
            this.y -= forceDirectionY * force * 5.5;
          }
        }

        this.x += this.vx;
        this.y += this.vy;
      }

      draw(palette) {
        // Pick color dynamically based on current theme palette
        const color = palette[Math.floor(Math.abs(Math.sin(this.x) * palette.length)) % palette.length];
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${this.alpha})`;
        // Glowing halo effect for big dots
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        return color; // Return color for line drawing
      }
    }

    const particleCount = Math.floor(Math.min(width, 1200) / 16);
    const particles = Array.from({ length: particleCount }, () => new Particle());

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Check if dark mode class is active on root <html> element
      const isDark = document.documentElement.classList.contains('dark');
      const activePalette = isDark ? darkPalette : lightPalette;

      // Store resolved colors for each particle during this frame
      const particleColors = particles.map(p => {
        p.update();
        return p.draw(activePalette);
      });

      const maxDistance = 160;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.6 : 0.45);
            const c1 = particleColors[i];
            const c2 = particleColors[j];

            // Multi-color gradient connecting lines between particles
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(${c1.r}, ${c1.g}, ${c1.b}, ${alpha})`);
            gradient.addColorStop(1, `rgba(${c2.r}, ${c2.g}, ${c2.b}, ${alpha})`);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = gradient;
            // BOLD LINES: Up to 3.5px width based on closeness
            ctx.lineWidth = (1 - dist / maxDistance) * 3.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  });
