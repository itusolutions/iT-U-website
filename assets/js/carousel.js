      document.addEventListener('DOMContentLoaded', () => {
        const heroSection = document.getElementById('hero-section');
        const carouselLayer = document.getElementById('hero-carousel-layer');
        const canvas = document.getElementById('hero-connected-dots');
        if (!heroSection) return;

        const heroImages = [
          "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(1).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(2).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(3).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(4).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(5).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(6).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(7).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(8).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(9).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(1).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(2).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(3).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(4).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(5).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(6).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(1).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(2).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(3).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(4).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(5).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(6).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(7).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(8).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(9).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(10).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(1).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(2).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(3).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(4).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(5).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(6).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(7).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(8).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(9).jpg",
          "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(10).jpg"
        ];

        if (carouselLayer && heroImages.length > 0) {
          const intervalMs = parseInt(heroSection.getAttribute('data-interval'), 10) || 4000;
          let activeIndex = Math.floor(Math.random() * heroImages.length);
          let slideTimer = null;

          const frag = document.createDocumentFragment();
          const slideDivs = heroImages.map((src, idx) => {
            const slide = document.createElement('div');
            slide.style.backgroundImage = `url("${src}")`;
            slide.className =
              'absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat bg-fixed transition-opacity duration-700 ease-in-out ' +
              (idx === activeIndex ? 'opacity-100' : 'opacity-0');
            frag.appendChild(slide);
            return slide;
          });

          carouselLayer.innerHTML = '';
          carouselLayer.appendChild(frag);

          function showSlide(index) {
            activeIndex = ((index % slideDivs.length) + slideDivs.length) % slideDivs.length;
            slideDivs.forEach((slide, i) => {
              const isCurrent = i === activeIndex;
              slide.classList.toggle('opacity-100', isCurrent);
              slide.classList.toggle('opacity-0', !isCurrent);
            });
          }

          function nextRandomIndex() {
            if (slideDivs.length <= 1) return 0;
            let candidate = Math.floor(Math.random() * slideDivs.length);
            if (candidate === activeIndex) candidate = (activeIndex + 1) % slideDivs.length;
            return candidate;
          }

          function startAutoplay() {
            stopAutoplay();
            slideTimer = window.setInterval(() => showSlide(nextRandomIndex()), intervalMs);
          }

          function stopAutoplay() {
            if (slideTimer !== null) {
              window.clearInterval(slideTimer);
              slideTimer = null;
            }
          }

          document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
              stopAutoplay();
            } else {
              startAutoplay();
            }
          });

          showSlide(activeIndex);
          startAutoplay();
        }

        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;

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
          constructor() { this.reset(); }
          reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 4.5 + 5;
            this.vx = (Math.random() - 0.5) * 1.0;
            this.vy = (Math.random() - 0.5) * 1.0;
            this.alpha = Math.random() * 0.4 + 0.6;
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
                this.x -= forceDirectionX * force * 5;
                this.y -= forceDirectionY * force * 5;
              }
            }
            this.x += this.vx;
            this.y += this.vy;
          }
          draw(palette) {
            const color = palette[Math.floor(this.x % palette.length)];
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${this.alpha})`;
            const isDark = document.documentElement.classList.contains('dark');
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

          particles.forEach(p => {
            p.update();
            p.draw(activePalette);
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
