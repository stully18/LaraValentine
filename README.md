# LaraValentine

A romantic Valentine's Day website to ask your special someone to be your Valentine.

## Features

- Animated floating hearts background
- Dreamy bokeh lighting effects
- Countdown timer to Valentine's Day
- Beautiful love letter section
- Photo gallery for your memories together (6 slots)
- Yes/No buttons with playful interactions
- Confetti celebration on "Yes!"
- Background music support
- Fully responsive design

## Quick Start

1. **Add your photos** - Place 6 photos in the `photos/` folder and update `script.js`:

```javascript
loadGalleryPhotos([
    { src: 'photos/photo1.jpg', caption: 'Our first date' },
    { src: 'photos/photo2.jpg', caption: 'That amazing trip' },
    { src: 'photos/photo3.jpg', caption: 'Laughing together' },
    { src: 'photos/photo4.jpg', caption: 'My favorite smile' },
    { src: 'photos/photo5.jpg', caption: 'Making memories' },
    { src: 'photos/photo6.jpg', caption: 'Together forever' }
]);
```

2. **Add music (optional)** - Place a romantic song at `music/romantic-song.mp3`

3. **Personalize the message** - Edit the love letter in `index.html`

## Deploy to GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Under "Source", select `main` branch
4. Your site will be live at `https://yourusername.github.io/LaraValentine/`

## Customization

### Change the recipient name
In `index.html`, find and change "My Dearest Lara" to your partner's name.

### Change the signature
In `index.html`, find and change "~ Shane" to your name.

### Modify the love letter
Edit the `<p class="letter-body">` paragraphs in the love letter section.

### Change colors
Edit the CSS variables in `styles.css` under `:root` to customize the color palette.

## File Structure

```
LaraValentine/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # Interactivity
├── photos/         # Add your photos here
├── music/          # Add romantic-song.mp3 here
└── README.md       # This file
```

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

---

Made with love 💕
