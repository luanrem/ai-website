// Generate more intense noise effect
function createNoise() {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    const noiseDiv = document.getElementById('noise');
    
    function drawNoise() {
        const imgData = ctx.createImageData(200, 200);
        const data = imgData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            // Noise in black and white more intense
            const value = Math.random() * 255;
            // Increase noise intensity
            const intensity = Math.random() * 1.5;
            
            data[i] = value;     // red
            data[i+1] = value;   // green
            data[i+2] = value;   // blue
            data[i+3] = 255 * (intensity > 1 ? 1 : intensity);
        }
        
        ctx.putImageData(imgData, 0, 0);
        noiseDiv.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`;
        
        requestAnimationFrame(drawNoise);
    }
    
    drawNoise();
}

// Function to copy the encrypted message
function copyEncryptedMessage() {
    const encryptedText = document.getElementById('content-text').innerText;
    const feedback = document.getElementById('copyFeedback');
    
    // Method 1: Using modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(encryptedText)
            .then(() => {
                showCopyFeedback();
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                fallbackCopyMethod(encryptedText);
            });
    } else {
        // Method 2: Fallback for browsers that don't support Clipboard API
        fallbackCopyMethod(encryptedText);
    }
}

// Alternative copy method for older browsers
function fallbackCopyMethod(text) {
    // Create a temporary text element
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Make textarea invisible
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    
    // Select and copy text
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback();
        }
    } catch (err) {
        console.error('Fallback: Could not copy text', err);
    }
    
    // Clean up
    document.body.removeChild(textArea);
}

// Show copy feedback with glitch effect
function showCopyFeedback() {
    const feedback = document.getElementById('copyFeedback');
    const button = document.getElementById('copyButton');
    
    // Add class for glitch effect
    feedback.classList.add('active');
    button.classList.add('glitch');
    button.innerHTML = '<span>DECODED</span>';
    
    // Temporarily disable button to prevent multiple clicks
    button.disabled = true;
    
    // Remove feedback after 2 seconds
    setTimeout(() => {
        feedback.classList.remove('active');
        button.classList.remove('glitch');
        button.disabled = false;
        button.innerHTML = '<span class="mr-1">COPY CODE</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>';
    }, 2000);
}

// Add random glitches on screen with higher frequency and intensity
function randomGlitches() {
    const body = document.body;
    
    setInterval(() => {
        // Random chance of glitch occurring (increased)
        if (Math.random() < 0.15) {
            // Random glitch type
            const glitchType = Math.floor(Math.random() * 5);
            
            switch(glitchType) {
                case 0:
                    // More intense horizontal displacement
                    body.style.transform = `translateX(${Math.random() * 15 - 7.5}px)`;
                    setTimeout(() => {
                        body.style.transform = 'translateX(0)';
                    }, 100);
                    break;
                case 1:
                    // Intense brightness (keeping black and white)
                    body.style.filter = `brightness(1.8)`;
                    setTimeout(() => {
                        body.style.filter = 'none';
                    }, 100);
                    break;
                case 2:
                    // Distortion (keeping black and white)
                    body.style.filter = `contrast(1.8)`;
                    setTimeout(() => {
                        body.style.filter = 'none';
                    }, 50);
                    break;
                case 3:
                    // New: Vertical displacement
                    body.style.transform = `translateY(${Math.random() * 10 - 5}px)`;
                    setTimeout(() => {
                        body.style.transform = 'translateY(0)';
                    }, 80);
                    break;
                case 4:
                    // New: Color distortion
                    body.style.filter = `hue-rotate(${Math.random() * 90}deg) grayscale(0.8)`;
                    setTimeout(() => {
                        body.style.filter = 'none';
                    }, 120);
                    break;
            }
        }
    }, 1500);
    
    // Add occasional "bad reception" effect
    setInterval(() => {
        if (Math.random() < 0.05) {
            const container = document.querySelector('.container');
            container.style.transform = 'skewX(2deg)';
            container.style.filter = 'blur(1px)';
            
            setTimeout(() => {
                container.style.transform = 'skewX(0)';
                container.style.filter = 'none';
            }, 200);
        }
    }, 5000);
}

// Surveillance video simulation with YouTube transition
function simulateSurveillanceVideo() {
    // Update date and time
    function updateDateTime() {
        const now = new Date();
        // Use future date to match narrative
        const futureYear = 2025;
        now.setFullYear(futureYear);
        
        const dateStr = now.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '-');
        
        const timeStr = now.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        document.getElementById('date-time').textContent = `${dateStr} ${timeStr}`;
    }
    
    // Countdown
    let counter = 10; // Reduced to 10 seconds for testing
    const counterElement = document.getElementById('reconnect-counter');
    const signalLostOverlay = document.getElementById('signal-lost-overlay');
    const youtubeContainer = document.getElementById('youtube-container');
    const videoTransition = document.getElementById('video-transition');
    
    function updateCounter() {
        counterElement.textContent = counter;
        
        if (counter <= 0) {
            // When counter reaches zero, show YouTube video
            showYouTubeVideo();
            // Stop counter
            clearInterval(counterInterval);
        } else {
            counter--;
        }
    }
    
    // Function to show YouTube video with transition effect
    function showYouTubeVideo() {
        // Create YouTube iframe
        const iframe = document.createElement('iframe');
        
        // Use correct link with embedding parameters
        iframe.src = "https://www.youtube.com/embed/tqn1cLICJm4?autoplay=1&mute=0&enablejsapi=1&origin=" + window.location.origin;
        iframe.title = "IN01 Surveillance Footage";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        
        // Add iframe to container
        youtubeContainer.innerHTML = '';
        youtubeContainer.appendChild(iframe);
        
        // Transition effect
        videoTransition.style.animation = 'videoTransition 2s forwards';
        
        // After a small delay, hide overlay and show video
        setTimeout(() => {
            signalLostOverlay.style.opacity = '0';
            
            setTimeout(() => {
                youtubeContainer.style.opacity = '1';
                signalLostOverlay.style.display = 'none';
            }, 500);
        }, 1000);
        
        // Additional check to ensure video is displayed
        setTimeout(() => {
            if (youtubeContainer.style.opacity !== '1') {
                youtubeContainer.style.opacity = '1';
                signalLostOverlay.style.display = 'none';
            }
        }, 3000);
    }
    
    // Video glitch effects
    const glitchElement = document.getElementById('surveillance-glitch');
    function createVideoGlitch() {
        if (Math.random() < 0.1) {
            const glitchType = Math.floor(Math.random() * 3);
            
            switch(glitchType) {
                case 0:
                    // Horizontal lines
                    glitchElement.style.background = `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 5px,
                        rgba(255, 255, 255, 0.1) 5px,
                        rgba(255, 255, 255, 0.1) 10px
                    )`;
                    break;
                case 1:
                    // Color displacement
                    glitchElement.style.boxShadow = `
                        inset 5px 0 0 0 rgba(255,0,0,0.2),
                        inset -5px 0 0 0 rgba(0,255,255,0.2)
                    `;
                    break;
                case 2:
                    // Image distortion
                    glitchElement.style.background = `linear-gradient(
                        ${Math.random() * 360}deg,
                        transparent 0%,
                        rgba(255, 255, 255, 0.05) 50%,
                        transparent 100%
                    )`;
                    break;
            }
            
            setTimeout(() => {
                glitchElement.style.background = 'transparent';
                glitchElement.style.boxShadow = 'none';
            }, 200);
        }
    }
    
    // Start simulation
    const dateTimeInterval = setInterval(updateDateTime, 1000);
    const counterInterval = setInterval(updateCounter, 1000);
    const glitchInterval = setInterval(createVideoGlitch, 500);
    
    // Ensure video is shown even if something goes wrong
    setTimeout(() => {
        if (parseInt(counterElement.textContent) <= 0 && youtubeContainer.style.opacity !== '1') {
            showYouTubeVideo();
        }
    }, 12000); // Safety check after 12 seconds
}

// Initialize effects when page loads
window.addEventListener('load', () => {
    createNoise();
    randomGlitches();
    simulateSurveillanceVideo();
    
    // Add click event to copy button
    document.getElementById('copyButton').addEventListener('click', copyEncryptedMessage);
    
    // Check for horizontal scroll and fix if necessary
    function checkHorizontalScroll() {
        if (document.body.scrollWidth > window.innerWidth) {
            console.log("Horizontal scroll detected, adjusting elements...");
            
            // Adjust elements that might be causing horizontal scroll
            const codeFragment = document.getElementById('content-text');
            if (codeFragment) {
                codeFragment.style.maxWidth = '100%';
                codeFragment.style.overflowX = 'auto';
                codeFragment.style.wordBreak = 'break-word';
            }
        }
    }
    
    // Check after complete loading
    setTimeout(checkHorizontalScroll, 1000);
    
    // Check after window resize
    window.addEventListener('resize', checkHorizontalScroll);
}); 