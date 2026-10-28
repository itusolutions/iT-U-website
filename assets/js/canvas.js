    //   Interactive Adaptive Connected Dots Canvas
    const canvas = document.getElementById('hero-connected-dots');
    const heroSection = document.getElementById('hero-section');
    if (!canvas || !heroSection) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    const mouse = {
      x: null,
      y: null,
      radius: 170
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
        this.radius = Math.random() * 3.5 + 4;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.alpha = Math.random() * 0.4 + 0.5;
      }

      update() {
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 4.5;
            this.y -= forceDirectionY * force * 4.5;
          }
        }

        this.x += this.vx;
        this.y += this.vy;
      }

      draw(isDark) {
        // Adapt particle colors based on light or dark mode
        const colorStr = isDark ? '105, 186, 255' : '23, 105, 170';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorStr}, ${this.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${colorStr}, 0.6)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particleCount = Math.floor(Math.min(width, 1200) / 18);
    const particles = Array.from({ length: particleCount }, () => new Particle());

    function animate() {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');

      particles.forEach(p => {
        p.update();
        p.draw(isDark);
      });

      const maxDistance = 145;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.45 : 0.25);
            const lineColor = isDark ? '105, 186, 255' : '23, 105, 170';

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.lineWidth = (1 - dist / maxDistance) * 2;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  });

