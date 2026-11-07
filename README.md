# Wedding Invitation Website

A responsive wedding invitation built with plain HTML, CSS, and vanilla JavaScript. It includes English and Hindi content, a live countdown, event details, WhatsApp sharing, an `.ics` calendar download, and decorative animations.

## Project structure

```text
.
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── images/
        └── img.jpeg  # Add the local venue photograph here
```

The hero and story photographs are stored locally in `assets/images/hero-wedding.jpg` and `assets/images/story-wedding.jpg`. The fonts are loaded from Google Fonts. The venue background expects a local `assets/images/img.jpeg` file; that photograph was not included in the project.

## Run locally

Open `index.html` in a browser, or serve the project directory over HTTP:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Update invitation details

- **Names, wedding date, venue address, and map links:** edit the `CONFIG` object near the top of [`assets/js/script.js`](assets/js/script.js). Keep the date in ISO format with its intended timezone. The displayed dates and WhatsApp message also contain fixed date text: update the relevant text in [`index.html`](index.html) and the share-message template in the script when changing the wedding date. WhatsApp sharing lets the sender choose a recipient.
- **Event names, dates, timings, dress codes, and colour palettes:** edit the `EVENTS` array and, if needed, `TRAD` in [`assets/js/script.js`](assets/js/script.js). Each translated field is stored as `[English, Hindi]`.
- **Visible venue details and other fixed page copy:** edit the corresponding HTML in [`index.html`](index.html), including both `data-en` and `data-hi` values where present.
- **Photographs:** replace `hero-wedding.jpg` and `story-wedding.jpg` in `assets/images/` with your own images, keeping those filenames, or update the corresponding relative `url("../images/...")` paths in [`assets/css/style.css`](assets/css/style.css). Add the venue photograph as `assets/images/img.jpeg`, or change the `.location-background .bg` URL in the stylesheet to a different file under `assets/images/`.

## Deploy with GitHub Pages

1. Push the project to a GitHub repository, keeping `index.html` at the repository root.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select the publishing branch (usually `main`) and the `/ (root)` folder, then save.
4. Visit the URL shown in the Pages settings when deployment completes.

The stylesheet, script, and image references are relative to the repository root, so they also work when the site is published under a GitHub Pages repository subpath.
