<!-- JavaScript for Multi-Color Big Dots, Bold Lines, and Mouse Repulsion -->
  document.addEventListener('DOMContentLoaded', () => {
   
    //   Interactive Multi-Color Connected Dots Canvas
    const canvas = document.getElementById('hero-connected-dots');
    const heroSection = document.getElementById('hero-section');
    if (!canvas || !heroSection) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    // Multi-color palette for vibrant particles
    const colorPalette = [
      { r: 23,  g: 105, b: 170 }, // Primary Brand Blue
      { r: 105, g: 186, b: 255 }, // Light Sky Blue
      { r: 16,  g: 185, b: 129 }, // Emerald Green
      { r: 147, g: 51,  b: 234 }, // Vivid Purple
      { r: 245, g: 158, b: 11  }  // Amber Glow
    ];

    const mouse = {
      x: null,
      y: null,
      radius: 180
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
        // Big dots: radius between 5px and 9.5px
        this.radius = Math.random() * 4.5 + 5;
        this.vx = (Math.random() - 0.5) * 1.0;
        this.vy = (Math.random() - 0.5) * 1.0;
        // Assign random multi-color from palette
        this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        this.alpha = Math.random() * 0.4 + 0.6;
      }

      update() {
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse Repulsion (Push away)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 5;
            this.y -= forceDirectionY * force * 5;
          }
        }

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
        // Glowing halo effect for big dots
        ctx.shadowBlur = 14;
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.85)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particleCount = Math.floor(Math.min(width, 1200) / 20);
    const particles = Array.from({ length: particleCount }, () => new Particle());

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw Bold Connecting Multi-Color Gradient Lines
      const maxDistance = 160;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.65;

            // Create gradient blending between the two particle colors
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${alpha})`);
            gradient.addColorStop(1, `rgba(${p2.color.r}, ${p2.color.g}, ${p2.color.b}, ${alpha})`);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = gradient;
            // Bold lines up to 3.5px width
            ctx.lineWidth = (1 - dist / maxDistance) * 3.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  });
