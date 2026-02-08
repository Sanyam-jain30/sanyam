// Loading Screen - NO AUTO SCROLL
document.addEventListener('DOMContentLoaded', function() {
    const loadingBar = document.getElementById('loading-bar');
    const loadingPercentage = document.getElementById('loading-percentage');
    const loadingScreen = document.getElementById('loading-screen');
    let progress = 0;

    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }
        loadingBar.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
    }, 100);
});

// Section Popup Notification
const sectionPopup = document.getElementById('section-popup');
let popupTimeout;

const showSectionPopup = (sectionName) => {
    clearTimeout(popupTimeout);
    sectionPopup.textContent = sectionName;
    sectionPopup.classList.add('show');

    popupTimeout = setTimeout(() => {
        sectionPopup.classList.remove('show');
    }, 2000);
};

// Intersection Observer for section popups
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const sectionName = entry.target.dataset.sectionName;
            if (sectionName) {
                showSectionPopup(sectionName);
            }
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('section[data-section-name]').forEach(section => {
    sectionObserver.observe(section);
});

// Profile Image Switcher with Glitch Effect
const profileFrame = document.getElementById('profile-frame');
const profileImg = document.getElementById('profile-img');
const profileImgAlt = document.getElementById('profile-img-alt');
const switchHint = document.getElementById('switch-hint');
let isFirstImage = true;

profileFrame.addEventListener('click', function() {
    // Create glitch effect
    const glitchDuration = 300;
    const glitchSteps = 5;
    let step = 0;

    const glitchInterval = setInterval(() => {
        if (step < glitchSteps) {
            profileImg.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
            profileImg.style.filter = `hue-rotate(${Math.random() * 360}deg) saturate(${Math.random() * 2 + 1})`;
            step++;
        } else {
            clearInterval(glitchInterval);
            profileImg.style.transform = 'none';
            profileImg.style.filter = 'grayscale(30%) contrast(1.1)';

            // Switch images
            if (isFirstImage) {
                profileImg.src = 'assests/Myself2.jpg';
                switchHint.textContent = 'MODE: TACTICAL';
            } else {
                profileImg.src = 'assests/Myself.png';
                switchHint.textContent = 'MODE: OPERATIVE';
            }
            isFirstImage = !isFirstImage;
        }
    }, glitchDuration / glitchSteps);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.stats-card, .achievement-item, .experience-card, .project-card:not(.hidden-project), .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero grid
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroGrid = document.querySelector('.hero-grid');
    if (heroGrid) {
        heroGrid.style.transform = `perspective(500px) rotateX(60deg) translateY(${scrolled * 0.1}px)`;
    }
});

// Stats counter animation
const statsNumbers = document.querySelectorAll('.stats-card-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = parseFloat(target.textContent);
            let current = 0;
            const increment = finalValue / 50;
            const isDecimal = target.textContent.includes('.');

            const counter = setInterval(() => {
                current += increment;
                if (current >= finalValue) {
                    target.textContent = isDecimal ? finalValue.toFixed(2) : Math.floor(finalValue);
                    clearInterval(counter);
                } else {
                    target.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
                }
            }, 30);

            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statsNumbers.forEach(num => statsObserver.observe(num));

// Horizontal scroll for roadmap
const roadmapContainer = document.querySelector('.roadmap-container');
let isDown = false;
let startX;
let scrollLeft;

roadmapContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - roadmapContainer.offsetLeft;
    scrollLeft = roadmapContainer.scrollLeft;
});

roadmapContainer.addEventListener('mouseleave', () => {
    isDown = false;
});

roadmapContainer.addEventListener('mouseup', () => {
    isDown = false;
});

roadmapContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - roadmapContainer.offsetLeft;
    const walk = (x - startX) * 2;
    roadmapContainer.scrollLeft = scrollLeft - walk;
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        roadmapContainer.scrollLeft += 100;
    } else if (e.key === 'ArrowLeft') {
        roadmapContainer.scrollLeft -= 100;
    }
});

// Cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    document.body.appendChild(cursor);

    setTimeout(() => {
        cursor.remove();
    }, 500);
});

// Random glitch effect on hero name
const heroName = document.querySelector('.hero-name');
setInterval(() => {
    if (Math.random() > 0.95) {
        heroName.style.animation = 'glitch 0.3s ease';
        setTimeout(() => {
            heroName.style.animation = 'none';
        }, 300);
    }
}, 2000);

// Load More Projects
const loadMoreBtn = document.getElementById('load-more-projects');
const hiddenProjects = document.querySelectorAll('.hidden-project');
let projectsShown = false;

loadMoreBtn.addEventListener('click', () => {
    hiddenProjects.forEach(project => {
        project.classList.remove('hidden-project');
        project.style.opacity = '0';
        project.style.transform = 'translateY(30px)';
        project.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
        }, 100);
    });
    loadMoreBtn.classList.add('hidden');
});

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-3px) scale(1.02)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Year Load More Buttons for Achievements
document.querySelectorAll('.year-load-more').forEach(btn => {
    btn.addEventListener('click', () => {
        const year = btn.dataset.year;
        const yearSection = document.querySelector(`.year-section[data-year="${year}"]`);
        const hiddenItems = yearSection.querySelectorAll('.hidden-achievement');

        hiddenItems.forEach(item => {
            item.classList.remove('hidden-achievement');
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        });

        btn.classList.add('hidden');
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});