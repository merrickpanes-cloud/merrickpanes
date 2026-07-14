# Connect the live Instagram feed

The Work section is now styled and ready for a live feed from **@merrickspanes**.

A public Instagram profile cannot be pulled reliably by plain GitHub Pages code because Instagram requires authorization. Use a feed provider that generates client-side embed code.

## Recommended setup: Behold

1. Create a free Behold account.
2. Connect the Instagram account `@merrickspanes`.
3. Create a feed and choose a grid layout.
4. Copy the generated embed code.
5. Open `index.html`.
6. Find the comment beginning with `LIVE INSTAGRAM FEED`.
7. Replace the entire `.instagram-placeholder` element with the generated embed code.
8. Commit the updated `index.html` to GitHub.

Keep the outer `instagram-frame` and `instagram-feed-shell` containers so the feed matches the website design.

Until the live feed is connected, the section sends visitors directly to:
https://www.instagram.com/merrickspanes/
