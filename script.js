// ==========================================================================
// MAIN APPLICATION INITIALIZATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApplication();
});

function initializeApplication() {
    // Initialize all effects and functionality
    initializeNoiseEffect();
    initializeCopyButton();
    initializeSurveillanceVideo();
    initializeRandomGlitches();
    initializeHorizontalScrollCheck();
    initializeAutoSoundActivation();
}

// ==========================================================================
// NOISE EFFECT - IMPROVED PERFORMANCE
// ==========================================================================

function initializeNoiseEffect() {
    // The noise effect is now handled by CSS for better performance
    // This function is kept for potential future enhancements
    console.log('Noise effect initialized via CSS');
}

// ==========================================================================
// COPY BUTTON FUNCTIONALITY
// ==========================================================================

function initializeCopyButton() {
    const copyButton = document.getElementById('copyButton');
    if (copyButton) {
        copyButton.addEventListener('click', copyEncryptedMessage);
    }
}

function copyEncryptedMessage() {
    const encryptedCodeElement = document.getElementById('encrypted-code');
    const feedback = document.getElementById('copyFeedback');
    const button = document.getElementById('copyButton');
    
    if (!encryptedCodeElement) {
        console.error('Encrypted code element not found');
        return;
    }
    
    const encryptedText = encryptedCodeElement.textContent;
    
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
        } else {
            console.error('Fallback copy failed');
        }
    } catch (err) {
        console.error('Fallback: Could not copy text', err);
    }
    
    // Clean up
    document.body.removeChild(textArea);
}

function showCopyFeedback() {
    const feedback = document.getElementById('copyFeedback');
    const button = document.getElementById('copyButton');
    
    if (!feedback || !button) return;
    
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
        button.innerHTML = `
            <span class="mr-1">COPY CODE</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        `;
    }, 2000);
}

// ==========================================================================
// YOUTUBE IFRAME PLAYER API
// ==========================================================================

// Global variable to store the YouTube player instance
let youtubePlayer = null;

// Load YouTube IFrame Player API dynamically
function loadYouTubeAPI() {
    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
        return Promise.resolve();
    }
    
    return new Promise((resolve, reject) => {
        // Create script element for YouTube API
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        
        // Set up global callback for when API is ready
        window.onYouTubeIframeAPIReady = function() {
            console.log('YouTube IFrame API loaded successfully');
            resolve();
        };
        
        // Handle script load errors
        script.onerror = () => {
            console.error('Failed to load YouTube IFrame API');
            reject(new Error('YouTube API load failed'));
        };
        
        // Append script to document head
        document.head.appendChild(script);
    });
}

// ==========================================================================
// SURVEILLANCE VIDEO SIMULATION
// ==========================================================================

function initializeSurveillanceVideo() {
    updateDateTime();
    startCountdown();
    createVideoGlitch();
}

function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    if (!dateTimeElement) return;
    
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
    
    dateTimeElement.textContent = `${dateStr} ${timeStr}`;
    
    // Update every second
    setTimeout(updateDateTime, 1000);
}

function startCountdown() {
    let counter = 10; // Reduced to 10 seconds for testing
    const counterElement = document.getElementById('reconnect-counter');
    const signalLostOverlay = document.getElementById('signal-lost-overlay');
    
    if (!counterElement || !signalLostOverlay) return;
    
    function updateCounter() {
        if (counter > 0) {
            counterElement.textContent = counter;
            counter--;
            setTimeout(updateCounter, 1000);
        } else {
            // Hide signal lost overlay and show YouTube video
            signalLostOverlay.style.opacity = '0';
            setTimeout(() => {
                signalLostOverlay.style.display = 'none';
                showYouTubeVideo();
            }, 500);
        }
    }
    
    updateCounter();
}

/**
 * Shows YouTube video with autoplay and sound control
 * 
 * Browser autoplay policies require videos to be muted initially to autoplay.
 * This function creates a YouTube player that:
 * 1. Starts muted and autoplays (compliant with browser policies)
 * 2. Allows user interaction (click or scroll) to unmute and enable sound
 * 3. Provides visual feedback for sound activation
 */
async function showYouTubeVideo() {
    const youtubeContainer = document.getElementById('youtube-container');
    const videoTransition = document.getElementById('video-transition');
    
    if (!youtubeContainer || !videoTransition) return;
    
    try {
        // Show transition effect
        videoTransition.style.animation = 'videoTransition 1s ease';
        
        // Load YouTube API if not already loaded
        await loadYouTubeAPI();
        
        setTimeout(() => {
            // Create container for YouTube player
            const playerContainer = document.createElement('div');
            playerContainer.id = 'youtube-player';
            playerContainer.style.width = '100%';
            playerContainer.style.height = '100%';
            
            // Add subtle sound activation indicator
            const soundIndicator = document.createElement('div');
            soundIndicator.id = 'sound-indicator';
            soundIndicator.innerHTML = `
                <div class="sound-hint">
                    <div class="sound-icon">🔇</div>
                    <div class="sound-text">INTERACT TO ACTIVATE SOUND</div>
                </div>
            `;
            soundIndicator.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(0, 0, 0, 0.8);
                padding: 8px 12px;
                border-radius: 4px;
                z-index: 10;
                cursor: pointer;
                transition: opacity 0.3s ease;
                border: 1px solid rgba(255, 255, 255, 0.2);
            `;
            
            // Add styles for sound indicator
            const soundStyles = document.createElement('style');
            soundStyles.textContent = `
                .sound-hint {
                    text-align: center;
                    color: white;
                    font-family: 'Courier New', monospace;
                }
                .sound-icon {
                    font-size: 1.2rem;
                    margin-bottom: 5px;
                    animation: pulse 2s infinite;
                }
                .sound-text {
                    font-size: 0.7rem;
                    letter-spacing: 0.5px;
                    text-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `;
            document.head.appendChild(soundStyles);
            
            // Clear container and add elements
            youtubeContainer.innerHTML = '';
            youtubeContainer.appendChild(playerContainer);
            youtubeContainer.appendChild(soundIndicator);
            youtubeContainer.style.opacity = '1';
            
            // Create YouTube player with autoplay - try unmuted first, fallback to muted
            youtubePlayer = new YT.Player('youtube-player', {
                height: '100%',
                width: '100%',
                videoId: 'tqn1cLICJm4',
                playerVars: {
                    // Autoplay settings - try unmuted first for better experience
                    autoplay: 1,
                    mute: 0, // Try unmuted first
                    // Player appearance
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    controls: 1,
                    disablekb: 1,
                    fs: 0,
                    iv_load_policy: 3,
                    cc_load_policy: 0,
                    // Origin for security
                    origin: window.location.origin
                },
                events: {
                    onReady: function(event) {
                        console.log('YouTube player ready');
                        // Try to unmute immediately when ready
                        tryUnmutePlayer();
                    },
                    onStateChange: function(event) {
                        // Handle player state changes
                        if (event.data === YT.PlayerState.PLAYING) {
                            console.log('Video started playing');
                            // Try to unmute when playing starts
                            tryUnmutePlayer();
                        }
                    },
                    onError: function(event) {
                        console.error('YouTube player error:', event.data);
                    }
                }
            });
            
            // Function to try unmuting the player automatically
            function tryUnmutePlayer() {
                if (youtubePlayer && youtubePlayer.unMute && youtubePlayer.isMuted) {
                    try {
                        // Try to unmute the player
                        youtubePlayer.unMute();
                        youtubePlayer.setVolume(100);
                        
                        // Check if unmute was successful
                        setTimeout(() => {
                            if (youtubePlayer.isMuted && youtubePlayer.isMuted()) {
                                console.log('Browser blocked autoplay with sound - waiting for user interaction');
                                // Keep the sound indicator visible
                            } else {
                                console.log('Sound activated automatically');
                                // Hide the sound indicator since sound is working
                                const soundIndicator = document.getElementById('sound-indicator');
                                if (soundIndicator) {
                                    soundIndicator.style.opacity = '0';
                                    setTimeout(() => {
                                        soundIndicator.remove();
                                    }, 1000);
                                }
                            }
                        }, 500);
                    } catch (error) {
                        console.log('Auto-unmute failed:', error);
                    }
                }
            }
            
            // Function to activate sound
            function activateSound() {
                if (youtubePlayer && youtubePlayer.unMute) {
                    // Unmute the player
                    youtubePlayer.unMute();
                    
                    // Update indicator to show sound is active
                    soundIndicator.innerHTML = `
                        <div class="sound-hint">
                            <div class="sound-icon">🔊</div>
                            <div class="sound-text">SOUND ACTIVATED</div>
                        </div>
                    `;
                    
                    // Fade out indicator after 2 seconds
                    setTimeout(() => {
                        soundIndicator.style.opacity = '0';
                        setTimeout(() => {
                            soundIndicator.remove();
                        }, 300);
                    }, 2000);
                    
                    // Remove event listeners to prevent multiple activations
                    document.removeEventListener('click', activateSound);
                    document.removeEventListener('scroll', activateSound);
                    soundIndicator.removeEventListener('click', activateSound);
                    
                    console.log('Sound activated by user interaction');
                }
            }
            
            // Add multiple event listeners for sound activation
            // 1. Click anywhere on the page
            document.addEventListener('click', activateSound, { once: true });
            
            // 2. Scroll anywhere on the page
            document.addEventListener('scroll', activateSound, { once: true });
            
            // 3. Click directly on the sound indicator
            soundIndicator.addEventListener('click', activateSound);
            
            // Hide transition after video loads
            setTimeout(() => {
                videoTransition.style.animation = '';
            }, 1000);
            
        }, 500);
        
    } catch (error) {
        console.error('Error creating YouTube player:', error);
        // Fallback to simple iframe if API fails
        createFallbackIframe(youtubeContainer, videoTransition);
    }
}

/**
 * Fallback function that creates a simple iframe if YouTube API fails
 */
function createFallbackIframe(youtubeContainer, videoTransition) {
    const iframe = document.createElement('iframe');
    // Try without mute first, fallback to muted if needed
    iframe.src = "https://www.youtube.com/embed/tqn1cLICJm4?autoplay=1&mute=0&origin=" + window.location.origin;
    iframe.title = 'Surveillance Feed';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = false;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    
    youtubeContainer.innerHTML = '';
    youtubeContainer.appendChild(iframe);
    youtubeContainer.style.opacity = '1';
    
    setTimeout(() => {
        videoTransition.style.animation = '';
    }, 1000);
}

function createVideoGlitch() {
    const glitchElement = document.getElementById('surveillance-glitch');
    if (!glitchElement) return;
    
    // Add random glitch effects to the video
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            glitchElement.style.opacity = '0.2';
            glitchElement.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
            
            setTimeout(() => {
                glitchElement.style.opacity = '0';
                glitchElement.style.transform = 'translateX(0)';
            }, 100);
        }
    }, 2000);
}

// ==========================================================================
// RANDOM GLITCH EFFECTS
// ==========================================================================

function initializeRandomGlitches() {
    addBodyGlitches();
    addBadReceptionEffect();
}

function addBodyGlitches() {
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
                    // Vertical displacement
                    body.style.transform = `translateY(${Math.random() * 10 - 5}px)`;
                    setTimeout(() => {
                        body.style.transform = 'translateY(0)';
                    }, 80);
                    break;
                case 4:
                    // Color distortion
                    body.style.filter = `hue-rotate(${Math.random() * 90}deg) grayscale(0.8)`;
                    setTimeout(() => {
                        body.style.filter = 'none';
                    }, 120);
                    break;
            }
        }
    }, 1500);
}

function addBadReceptionEffect() {
    // Add occasional "bad reception" effect
    setInterval(() => {
        if (Math.random() < 0.05) {
            const container = document.querySelector('.container');
            if (container) {
                container.style.transform = 'skewX(2deg)';
                container.style.filter = 'blur(1px)';
                
                setTimeout(() => {
                    container.style.transform = 'skewX(0)';
                    container.style.filter = 'none';
                }, 200);
            }
        }
    }, 5000);
}

// ==========================================================================
// HORIZONTAL SCROLL PREVENTION
// ==========================================================================

function initializeHorizontalScrollCheck() {
    // Prevent horizontal scrolling
    function checkHorizontalScroll() {
        if (window.scrollX !== 0) {
            window.scrollTo(0, window.scrollY);
        }
    }
    
    // Check on scroll events
    window.addEventListener('scroll', checkHorizontalScroll);
    
    // Also check periodically
    setInterval(checkHorizontalScroll, 1000);
}

// ==========================================================================
// AUTO SOUND ACTIVATION ATTEMPTS
// ==========================================================================

function initializeAutoSoundActivation() {
    // Try to activate sound on various early user interactions
    const autoSoundEvents = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
    
    function attemptAutoSound() {
        if (youtubePlayer && youtubePlayer.unMute) {
            try {
                youtubePlayer.unMute();
                youtubePlayer.setVolume(100);
                
                // Check if successful
                setTimeout(() => {
                    if (youtubePlayer.isMuted && !youtubePlayer.isMuted()) {
                        console.log('Auto-sound activated on user interaction');
                        // Remove listeners since we succeeded
                        autoSoundEvents.forEach(event => {
                            document.removeEventListener(event, attemptAutoSound);
                        });
                        
                        // Hide sound indicator
                        const soundIndicator = document.getElementById('sound-indicator');
                        if (soundIndicator) {
                            soundIndicator.style.opacity = '0';
                            setTimeout(() => {
                                soundIndicator.remove();
                            }, 500);
                        }
                    }
                }, 200);
            } catch (error) {
                console.log('Auto-sound attempt failed:', error);
            }
        }
    }
    
    // Add listeners for early user interactions
    autoSoundEvents.forEach(event => {
        document.addEventListener(event, attemptAutoSound, { once: true, passive: true });
    });
} 