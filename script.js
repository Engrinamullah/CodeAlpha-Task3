/**
 * Portfolio Interaction Logic (script.js)
 * * Handles mobile menu toggle, smooth scrolling, 
 * icon initialization, and footer year update.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- Mobile Menu Toggle Logic ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuPanel = document.getElementById('mobile-menu-panel');
    const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    // Function to toggle the menu state
    const toggleMobileMenu = () => {
        const isMenuOpen = mobileMenuOverlay.classList.contains('active');

        if (isMenuOpen) {
            // Close menu: slide panel out, then hide overlay
            mobileMenuPanel.classList.add('translate-x-full');
            mobileMenuPanel.classList.remove('translate-x-0');
            
            // Wait for slide-out animation (300ms) before setting display: none
            setTimeout(() => {
                mobileMenuOverlay.classList.add('hidden');
                mobileMenuOverlay.classList.remove('active');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }, 300); 
        } else {
            // Open menu: show overlay, then slide panel in
            mobileMenuOverlay.classList.remove('hidden');
            mobileMenuOverlay.classList.add('active');
            
            // Small delay to ensure display: block is applied before transition starts
            setTimeout(() => { 
                mobileMenuPanel.classList.remove('translate-x-full');
                mobileMenuPanel.classList.add('translate-x-0');
            }, 10);
            
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        }
    };

    // Event listeners for opening and closing the menu
    if (mobileMenuButton) mobileMenuButton.addEventListener('click', toggleMobileMenu);
    if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', toggleMobileMenu); // Close when clicking the backdrop

    // --- Smooth Scroll Implementation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default for internal section links
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                const navbar = document.getElementById('navbar');
                
                if (targetElement && navbar) {
                    // Calculate offset for fixed navbar
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // If it's a mobile link, close the sidebar after scrolling
                    if (this.classList.contains('mobile-nav-link') && mobileMenuOverlay.classList.contains('active')) {
                        // Delay closing to allow smooth scroll to initiate
                        setTimeout(toggleMobileMenu, 300);
                    }
                }
            }
        });
    });

    // --- Set current year in footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }


    // --- Custom Alert Function and Form Handler ---

    // Custom alert function (since alert() is not allowed)
    function alertMessage(message, type = 'info') {
        const container = document.createElement('div');
        container.className = 'fixed top-20 right-4 p-4 rounded-lg shadow-xl z-[100] transition-all duration-500 transform opacity-0 translate-y-4';
        container.textContent = message;

        if (type === 'success') {
            container.classList.add('bg-green-500', 'text-white');
        } else if (type === 'error') {
            container.classList.add('bg-red-500', 'text-white');
        } else {
            container.classList.add('bg-blue-500', 'text-white');
        }

        document.body.appendChild(container);
        
        // Animate in
        setTimeout(() => {
            container.classList.remove('opacity-0', 'translate-y-4');
            container.classList.add('opacity-100', 'translate-y-0');
        }, 50);

        // Animate out and remove
        setTimeout(() => {
            container.classList.remove('opacity-100', 'translate-y-0');
            container.classList.add('opacity-0', 'translate-y-4');
            setTimeout(() => container.remove(), 500);
        }, 3000);
    }

    // Simple contact form submission handler (to prevent actual submission)
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alertMessage('Thank you for your message! (Form is currently a placeholder)', 'success');
        });
    }
});
