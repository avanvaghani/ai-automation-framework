# 🤖 AI Automation Framework

An AI-enhanced test automation framework built with **Playwright + TypeScript** that leverages intelligent element detection and self-healing capabilities for robust, maintainable tests.

## ✨ Features

- 🧠 **AI-Powered Element Detection** — Smart locator strategies that adapt to UI changes
- 🎭 **Playwright + TypeScript** — Modern, fast, reliable browser automation
- 📊 **Detailed Reporting** — HTML reports with screenshots, traces, and logs
- ⚙️ **CI/CD Ready** — GitHub Actions workflow included
- 🏗️ **Scalable Architecture** — Clean separation of concerns with Page Object Model

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Playwright |
| **Language** | TypeScript |
| **CI/CD** | GitHub Actions |
| **Reporting** | Playwright HTML Reporter |

## 📁 Project Structure

```
ai-automation-framework/
├── .github/workflows/     # CI/CD pipeline configuration
├── src/                   # Source code
│   ├── pages/            # Page Object Models
│   ├── utils/            # Utility functions & helpers
│   └── fixtures/         # Test fixtures
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies & scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/avanvaghani/ai-automation-framework.git
cd ai-automation-framework

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install chromium
```

### Run Tests

```bash
# Run all tests
npx playwright test

# Run in headed mode (visible browser)
npx playwright test --headed

# Run with debug mode
npx playwright test --debug

# View HTML report
npx playwright show-report
```

## 📈 CI/CD

This project includes a GitHub Actions workflow that runs tests automatically on every push and pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a PR.

---

<div align="center">
Built with ❤️ by <a href="https://github.com/avanvaghani">Avan Vaghani</a>
</div>
