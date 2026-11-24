document.addEventListener('DOMContentLoaded', () => {
  const heroSections = Array.from(
    document.querySelectorAll('#hero-section, [data-hero-section], .hero-section')
  );
  if (heroSections.length === 0) return;

  const lightPalette = [
    { r: 23,  g: 105, b: 170 },
    { r: 14,  g: 116, b: 144 },
    { r: 5,   g: 150, b: 105 },
    { r: 124, g: 58,  b: 237 },
    { r: 217, g: 119, b: 6   }
  ];

  const darkPalette = [
    { r: 105, g: 186, b: 255 },
    { r: 52,  g: 211, b: 153 },
    { r: 167, g: 139, b: 250 },
    { r: 251, g: 146, b: 60  },
    { r: 56,  g: 189, b: 248 }
  ];

  heroSections.forEach((heroSection) => {
    const canvas = heroSection.querySelector('#hero-connected-dots, [data-hero-canvas]');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const mouse = { x: null, y: null, radius: 180 };

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
        this.radius = Math.random() * 4.5 + 5;
        this.vx = (Math.random() - 0.5) * 1.0;
        this.vy = (Math.random() - 0.5) * 1.0;
        this.alpha = Math.random() * 0.4 + 0.6;
        this.currentColor = lightPalette[0];
      }

      update() {
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 0 && distance < mouse.radius) {
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

      draw(palette, isDark) {
        const colorIndex = Math.abs(Math.floor(this.x)) % palette.length;
        const color = palette[colorIndex];
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${this.alpha})`;
        ctx.shadowBlur = isDark ? 14 : 8;
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${isDark ? 0.85 : 0.4})`;
        ctx.fill();
        ctx.shadowBlur = 0;
        this.currentColor = color;
      }
    }

    const particleCount = Math.floor(Math.min(width, 1200) / 20);
    const particles = Array.from({ length: particleCount }, () => new Particle());

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains('dark');
      const activePalette = isDark ? darkPalette : lightPalette;

      particles.forEach((p) => {
        p.update();
        p.draw(activePalette, isDark);
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
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.65 : 0.45);
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(${p1.currentColor.r}, ${p1.currentColor.g}, ${p1.currentColor.b}, ${alpha})`);
            gradient.addColorStop(1, `rgba(${p2.currentColor.r}, ${p2.currentColor.g}, ${p2.currentColor.b}, ${alpha})`);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = (1 - dist / maxDistance) * 3.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  });
});
