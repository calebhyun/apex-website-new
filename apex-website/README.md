# APEX Consulting Website
## Overview

Created in 2025, this new version of the APEX Website leverages Next.js to maintain a sleek design and dynanic elements

## Installations

Ensure that node.js and npm.js are installed on your computer by running the command `node -v` followed by `npm -v`. If a version number does not appear, follow installation documentation [https://nodejs.org/en/download]

After installing node and npm, run `npm install clsx tailwind-merge @radix-ui/react-slot class-variance-authority @radix-ui/react-accordion @radix-ui/react-label @radix-ui/react-tabs next-themes @vercel/fonts` to ensure all appropriate librarires are installed.


## Running the Website
- (Only applicable for the first time you run the site) git clone the repo onto your local machine
- Open project on local machine 
- cd into "apex-website" directory (use pwd to ensure that the last section of your path is "/apex-website")
- run `npm start` in terminal
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.

## Directories

If you need to edit the project, read through the following descriptions of each directory in order to ensure that you understand the various componenets involved and can edit appropriately.  

### app/page.tsx

Website homepage. Currently contains the following sections: 
- Header
- APEX Consulting banner with typing effect
- Welcome to APEX message
- Hype Video
- Our Impact
- President's Welcome
- Footer

Note: the "welcome to APEX message," "hype video," "our impact," and "president's welcome" sections are all contained within the scroll-section component (/components/scroll-section). To edit any of these sections, or add a new section that appears on user scroll, edit that component. 

### app/team
Our Team page. Currently contains the following sections:
- Header
- Our team banner with typing effect
- Dynamic navigation bar that features each role in APEX
- Footer

Note: place all assets (i.e: new headshots) in the directory public/headshots

### app/alumni
Alumni page. Currently contains the following sections:
- Header
- Our Alumni Network banner with typing effect
- Carousel feature of alumni placement
- Alumni testimonials
- Alumni Impact
- Footer

### app/services
Client Services page. Currently contains the following sections:
- Header
- Client Services baner with typing effect
- Dynamic navigation bar that features each project type
- Case studies on each project
- Our consulting process info
- Footer

### app/join
Prospective Members page. Currently contains the following sections:
- Recruitment timeline
- Why Join Apex
- Application Process
- FAQ 
- Footer

### app/contact
Contact Us page. Currently contains the following sections: 
- Send Us a Message
- Contact Information
- Follow Us