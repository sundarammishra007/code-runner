import { DeploymentGuide } from './types';

export const INITIAL_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Awesome App</title>
  <style>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .container {
      text-align: center;
      background: rgba(255, 255, 255, 0.1);
      padding: 3rem;
      border-radius: 1rem;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }
    h1 { font-size: 3rem; margin-bottom: 0.5rem; }
    p { font-size: 1.2rem; opacity: 0.8; }
    button {
      margin-top: 1.5rem;
      padding: 0.8rem 2rem;
      font-size: 1rem;
      border: none;
      border-radius: 50px;
      background: white;
      color: #764ba2;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s;
    }
    button:hover {
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello World</h1>
    <p>Generated with Gemini CodeRunner</p>
    <button onclick="alert('It works!')">Click Me</button>
  </div>
</body>
</html>`;

export const DEPLOYMENT_OPTIONS: DeploymentGuide[] = [
  {
    name: "Netlify Drop",
    url: "https://app.netlify.com/drop",
    description: "Simplest drag-and-drop hosting. No account required initially.",
    steps: [
      "Click 'Download Code' to save your index.html",
      "Open Netlify Drop in a new tab",
      "Drag the downloaded file onto the page",
      "Your site is live instantly!"
    ]
  },
  {
    name: "Tiiny.host",
    url: "https://tiiny.host/",
    description: "Instant hosting for static files. Very user friendly.",
    steps: [
      "Click 'Download Code' to save your index.html",
      "Go to Tiiny.host",
      "Upload the HTML file",
      "Type a link name and launch"
    ]
  },
  {
    name: "GitHub Pages",
    url: "https://pages.github.com/",
    description: "Host directly from your GitHub repository for free.",
    steps: [
      "Create a new repository on GitHub",
      "Upload your 'index.html' file to the repository",
      "Go to Settings > Pages",
      "Select the 'main' branch as the source and click Save"
    ]
  },
  {
    name: "Vercel",
    url: "https://vercel.com/new",
    description: "Professional developer platform with Git integration.",
    steps: [
      "Push your code to a GitHub/GitLab repository",
      "Log in to Vercel and click 'Add New Project'",
      "Import your repository",
      "Click 'Deploy' - it's automatic!"
    ]
  },
  {
    name: "Surge.sh",
    url: "https://surge.sh/",
    description: "Simple CLI deployment for power users.",
    steps: [
      "Install Node.js on your computer",
      "Run `npm install -g surge` in your terminal",
      "Navigate to the folder containing your index.html",
      "Run `surge` and follow the prompts"
    ]
  }
];