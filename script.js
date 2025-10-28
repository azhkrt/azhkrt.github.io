// Fix smooth scrolling
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

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section-card');
    const contentDisplay = document.getElementById('selected-content');

    const contentData = {
        myself: `
            <div class="content-wrapper">
                <div class="content-icon">
                    <i class="fas fa-user"></i>
                </div>
                <div class="content-text">
                    <h3>About Myself</h3>
                    <p>Nothing to see here yet! :(</p>
                </div>
            </div>
        `,
        hobbies: `
            <div class="content-wrapper">
                <h3 class="hobbies-title"><i class="fas fa-gamepad"></i> My Hobbies</h3>
                <div class="hobbies-grid">
                    <div class="hobby-item">
                        <div class="hobby-icon">
                            <i class="fas fa-code"></i>
                        </div>
                        <div class="hobby-text">
                            <h4>Coding Projects</h4>
                            <p>I enjoy working on personal projects to explore new technologies</p>
                        </div>
                    </div>
                    <div class="hobby-item">
                        <div class="hobby-icon">
                            <i class="fas fa-book"></i>
                        </div>
                        <div class="hobby-text">
                            <h4>Reading</h4>
                            <p>Reading romance manga is one of my favorite, but it also sometimes kills me for a reason</p>
                        </div>
                    </div>
                    <div class="hobby-item">
                        <div class="hobby-icon">
                            <i class="fas fa-music"></i>
                        </div>
                        <div class="hobby-text">
                            <h4>Music</h4>
                            <p>Listening to a music, especially maidcore or alt rock, theyre sure the best one!</p>
                        </div>
                    </div>
                    <div class="hobby-item">
                        <div class="hobby-icon">
                            <i class="fas fa-basketball-ball"></i>
                        </div>
                        <div class="hobby-text">
                            <h4>Games</h4>
                            <p>I've been playing Visual novels, Minecraft, and RPG games!</p>
                        </div>
                    </div>
                </div>
            </div>
        `,
        facts: `
            <div class="content-wrapper">
                <h3 class="facts-title"><i class="fas fa-lightbulb"></i> Wait i didnt fill this yet</h3>
                <p>Nothing to see here yet! :(</p>
            </div>
        `
    };

    let currentSection = null;
    let hideTimeout = null;

    function showContent(sectionId) {
        // Clear any pending hide timeout
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }

        // If same section, don't reload
        if (currentSection === sectionId) {
            return;
        }

        currentSection = sectionId;
        
        // Update content
        contentDisplay.innerHTML = contentData[sectionId];
        
        // Show with animation
        contentDisplay.classList.add('show');
    }

    function hideContent() {
        // Clear timeout if exists
        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }

        // Set timeout to hide
        hideTimeout = setTimeout(() => {
            contentDisplay.classList.remove('show');
            currentSection = null;
            
            // Reset content after animation
            setTimeout(() => {
                if (!currentSection) {
                    contentDisplay.innerHTML = '<p>Hover over a card above to see its content</p>';
                }
            }, 300);
        }, 200);
    }

    // Add event listeners to cards
    sections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            showContent(section.id);
        });

        section.addEventListener('mouseleave', () => {
            hideContent();
        });
    });

    // Keep content visible when hovering over it
    contentDisplay.addEventListener('mouseenter', () => {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
    });

    contentDisplay.addEventListener('mouseleave', () => {
        hideContent();
    });

    // Initialize with default message
    contentDisplay.innerHTML = '<p>Hover over a card above to see its content</p>';
});

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Get submit button
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Change button text to loading
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate sending (replace with actual backend later)
            setTimeout(() => {
                // Success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
                
                // Show alert
                alert(`Thank you, ${formData.name}! Your message has been received.\n\nI'll get back to you at ${formData.email} soon! 😊`);
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
            
            // TODO: Replace with actual form submission to backend
            // Example using fetch API:
            /*
            fetch('your-backend-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // Handle success
            })
            .catch(error => {
                // Handle error
            });
            */
        });
    }
});

// Contact Section Fade-in Animation - Using Intersection Observer (More Reliable)
window.addEventListener('load', function() {
    const contactSection = document.getElementById('Contact');
    
    if (!contactSection) {
        console.log('Contact section not found!');
        return;
    }
    
    console.log('Contact section found, setting up observer...');
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log('Is intersecting:', entry.isIntersecting);
            
            if (entry.isIntersecting) {
                console.log('Adding fade-in class!');
                entry.target.classList.add('fade-in');
                // Stop observing after animation triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: '0px'
    });
    
    // Start observing
    observer.observe(contactSection);
    console.log('Observer started');
});