# IN01 Surveillance - Priority Message

An immersive surveillance-themed website that creates an interactive experience with TV/security camera effects, countdown timers, and hidden messages.

## Features

- **Surveillance Effects**: Realistic TV/security camera visual effects including noise, scan lines, and glitch animations
- **Countdown Timer**: 10-second countdown that transitions to a YouTube video
- **Copy Functionality**: Button to copy the encrypted base64 message with visual feedback
- **Responsive Design**: Works on both desktop and mobile devices
- **Immersive Experience**: Full-screen effects with realistic surveillance aesthetics

## Files

- `index.html` - Main HTML structure with the surveillance interface
- `style.css` - All styling including surveillance effects, animations, and responsive design
- `script.js` - Interactive functionality including noise generation, copy features, and video transitions

## How to Use

1. Open `index.html` in a web browser
2. The page will display a surveillance-style interface with:
   - Priority message header with glitch effects
   - Video container showing "SIGNAL LOST" with countdown
   - Encrypted base64 message that can be copied
3. After 10 seconds, the surveillance feed transitions to a YouTube video
4. Click the "COPY CODE" button to copy the encrypted message

## Technical Details

- **Noise Generation**: Canvas-based dynamic noise effect for realistic surveillance appearance
- **Glitch Effects**: Random screen glitches and distortions for authenticity
- **Video Transition**: Smooth transition from surveillance simulation to YouTube embed
- **Copy Functionality**: Modern Clipboard API with fallback for older browsers
- **Responsive**: Mobile-optimized with adjusted video container heights

## Browser Compatibility

- Modern browsers with Canvas API support
- Clipboard API support for copy functionality (with fallback)
- YouTube embed support for video playback

## Project Structure

```
AIWebsite/
├── index.html          # Main HTML file
├── style.css           # All CSS styles and effects
├── script.js           # JavaScript functionality
└── README.md           # This file
```

The project creates an immersive surveillance experience with realistic effects and interactive elements, perfect for creating engaging web experiences with a security/mystery theme.
