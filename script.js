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
                <h3 class="facts-title"><i class="fas fa-lightbulb"></i>Wait i didnt fill ths yet</h3>
                <p>Nothing to see here yet! :(</p>
            </div>
        `
    };

    let hideTimeout = null;
    let isContentHovered = false;
    let isCardHovered = false;

    function showContent(sectionId) {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
        contentDisplay.innerHTML = contentData[sectionId];
        contentDisplay.style.opacity = '1';
        contentDisplay.style.height = 'auto';
        contentDisplay.style.padding = '2rem';
        contentDisplay.style.marginTop = '3rem';
    }

    function hideContent() {
        hideTimeout = setTimeout(() => {
            if (!isContentHovered && !isCardHovered) {
                contentDisplay.style.opacity = '0';
                contentDisplay.style.height = '0';
                contentDisplay.style.padding = '0';
                contentDisplay.style.marginTop = '0';
                setTimeout(() => {
                    contentDisplay.innerHTML = '<p>Ooopss... You find me! :P</p>' + '<p>This is a bug, and im to lazy to fix it </p>' + '<p><b>Hover again to see the content!</b></p>';
                    contentDisplay.style.opacity = '1';
                }, 300); // Match to your CSS transition duration (3s)
            }
        }, 300); 
    }

    sections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            isCardHovered = true;
            showContent(section.id);
        });

        section.addEventListener('mouseleave', () => {
            isCardHovered = false;
            // Slight delay to allow moving into contentDisplay without hiding
            hideContent();
        });
    });

    contentDisplay.addEventListener('mouseenter', () => {
        isContentHovered = true;
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
    });

    contentDisplay.addEventListener('mouseleave', () => {
        isContentHovered = false;
        hideContent();
    });

});
