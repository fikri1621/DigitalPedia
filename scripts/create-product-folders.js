/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const slugs = [
  "ultimate-bookkeeping-resources-bundle",
  "2000-office-templates-bundle",
  "editable-excel-spreadsheet-template-mega",
  "ultimate-contractor-resources-bundle",
  "ultimate-excel-spreadsheet-template",
  "600-mobile-app-templates-source-code",
  "1000-website-themes-bundle",
  "20000-fonts-icons-bundle",
  "50000-font-bundle",
  "500-editable-resume-templates",
  "5000-adobe-illustrator-assets-bundle",
  "10000-presentation-assets-bundle",
  "14000-t-shirt-design-bundle",
  "100000-icon-mega-pack",
  "10000-coreldraw-templates-bundle",
  "400000-digital-courses-bundle",
  "ielts-study-mega-bundle",
  "ultimate-entrepreneur-course-bundle",
  "16000-sound-effects-bundle",
  "5000-audio-track-bundle",
  "10000-adobe-lightroom-presets",
  "5000-after-effects-assets-bundle",
  "5000-photoshop-overlays-bundle",
  "4500-adobe-premiere-pro-transitions-effects-bundle",
  "10000-photoshop-actions-bundle",
  "1350-dog-reels-bundle",
  "100000-reels-bundle",
  "1460-funny-fails-reels-bundle",
  "1200-space-reels-bundle",
  "1000-wood-work-reels-bundle",
  "500-editable-motivational-reels-bundle",
  "500-satisfying-reels-bundle",
  "1000-nature-reels-bundle",
  "600-female-fitness-workout-reels-bundle",
  "2000-faceless-reels-bundle",
  "500-animated-motivational-reels-bundle",
  "3000-product-hack-video-clips-bundle",
  "2200-faceless-reels-bundle",
  "1200-tools-tips-reels-bundle",
  "1000-caravan-life-reels-bundle",
  "1700-luxury-lifestyle-reels-bundle",
  "4000-viral-art-craft-reels-bundle",
];

const base = path.join(process.cwd(), "public", "images", "products");

for (const slug of slugs) {
  fs.mkdirSync(path.join(base, slug), { recursive: true });
}

console.log(`Created ${slugs.length} product folders in public/images/products/`);
