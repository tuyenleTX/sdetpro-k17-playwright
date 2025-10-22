# WebDriver Protocol 
- Client (WebDriver client package: Java, JS, Python) - Server (ChromeDriver)

# DevTool Protocol
- Same loop with the browser
- Cypress, Playwright

Steps: 
Step 0: "git checkout -b "branch_name""
-> create new branch in local
Step 1: "npm init -y" 
-> to generate package.json
Step 2: "touch .gitignore" 
-> ignore files pushed in git repo
Step 3: "npm install -g yarn"
-> install yarn
Step 4: "yarn test"
-> run the test in the package.json
Step 4.1: "npm run test"
-> run the test
Step 5: "@playwright/test" : "1.56.0"
-> add dependency to package.json
-> init node project to write tests using Playwright
Step 6: "yarn"
Step 7: 
- Create test folder
- Create a test script
Step 8: create a "playwright.config.ts" config file
Step 9: how to run
- install plugin "Playwright Test VSCode" 
Step 10: below commands are run before triggering the test
npm install                                                               ║
npx playwright install  

Step 11: 
- click on run icon of the plug in 
  -- note: under setting if choose "show browser", 
- or run by commandline: ex: "yarn test"

Locating elements: 
Locate by: 
1. role, label, placeholder, text, alt text, title
2. test id
3. CSS or XPath
