# 🤝 Contributing to Vehicle Damage Detection System

Thank you for your interest in contributing to our Vehicle Damage Detection System! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- **Be respectful** and inclusive of all contributors
- **Be collaborative** and open to feedback
- **Be constructive** in your criticism and suggestions
- **Be professional** in all interactions

## 🚀 Getting Started

### Prerequisites

- **Git** installed and configured
- **Python 3.8+** with pip
- **Node.js 18+** with npm
- **Basic knowledge** of Python, React, and web development

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/vehicle-damage-detector.git
   cd vehicle-damage-detector
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-owner/vehicle-damage-detector.git
   ```

## 🛠️ Development Setup

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Install development dependencies
pip install -r requirements-dev.txt  # if exists

# Run the backend
python main.py
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Verify Setup

1. **Backend**: http://localhost:8000/health should return `{"status": "healthy"}`
2. **Frontend**: http://localhost:3000 should show the main application
3. **API Docs**: http://localhost:8000/docs should show FastAPI documentation

## 📝 Contributing Guidelines

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug fixes** - Fix issues and improve reliability
- ✨ **New features** - Add new functionality
- 📚 **Documentation** - Improve docs and examples
- 🧪 **Tests** - Add or improve test coverage
- 🔧 **Infrastructure** - Improve build, deployment, CI/CD
- 🎨 **UI/UX** - Improve user interface and experience
- 🌐 **Localization** - Add translations and language support

### Before You Start

1. **Check existing issues** to avoid duplicates
2. **Discuss major changes** in an issue first
3. **Keep changes focused** - one feature/fix per PR
4. **Follow the existing code style** and patterns

## 📏 Code Standards

### Python (Backend)

- **PEP 8** compliance for code style
- **Type hints** for function parameters and return values
- **Docstrings** for all public functions and classes
- **Maximum line length** of 88 characters (Black formatter)

```python
from typing import Dict, List, Optional
from fastapi import HTTPException

def detect_damage(
    before_image: np.ndarray, 
    after_image: np.ndarray
) -> Dict[str, Any]:
    """
    Detect damage between two vehicle images.
    
    Args:
        before_image: Original vehicle image
        after_image: Current vehicle image
        
    Returns:
        Dictionary containing damage analysis results
        
    Raises:
        ValueError: If images are invalid
        HTTPException: If processing fails
    """
    # Implementation here
    pass
```

### TypeScript/React (Frontend)

- **ESLint** and **Prettier** for code formatting
- **TypeScript strict mode** enabled
- **Functional components** with hooks
- **Proper prop types** and interfaces

```typescript
interface DamageReportProps {
  result: DamageResult;
  onReset?: () => void;
}

export default function DamageReport({ 
  result, 
  onReset 
}: DamageReportProps): JSX.Element {
  // Component implementation
  return (
    <div className="damage-report">
      {/* Component JSX */}
    </div>
  );
}
```

### General Guidelines

- **Meaningful names** for variables, functions, and files
- **Single responsibility** principle for functions and classes
- **Error handling** for all external operations
- **Logging** for debugging and monitoring
- **Comments** for complex logic (but prefer self-documenting code)

## 🧪 Testing

### Backend Testing

```bash
cd backend

# Install testing dependencies
pip install pytest pytest-cov pytest-asyncio

# Run tests
python -m pytest

# Run with coverage
python -m pytest --cov=.

# Run specific test file
python -m pytest tests/test_image_processing.py
```

### Frontend Testing

```bash
cd frontend

# Run tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=ImageUploader.test.tsx
```

### Test Guidelines

- **Unit tests** for all new functions and components
- **Integration tests** for API endpoints
- **Test coverage** should be >80%
- **Meaningful test names** that describe the scenario
- **Mock external dependencies** appropriately

## 🔄 Pull Request Process

### 1. Prepare Your Changes

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ... edit files ...

# Add and commit changes
git add .
git commit -m "feat: add new damage detection algorithm

- Implemented advanced contour analysis
- Added severity classification
- Updated API documentation
- Added comprehensive tests"

# Push to your fork
git push origin feature/your-feature-name
```

### 2. Create Pull Request

1. **Go to your fork** on GitHub
2. **Click "New Pull Request"**
3. **Select the correct branches**:
   - **Base**: `main` (upstream)
   - **Compare**: `feature/your-feature-name` (your fork)
4. **Fill in the PR template**:
   - Description of changes
   - Related issues
   - Testing performed
   - Screenshots (if UI changes)

### 3. PR Review Process

- **Automated checks** must pass (CI/CD, tests, linting)
- **Code review** from maintainers
- **Address feedback** and make requested changes
- **Squash commits** if requested
- **Maintainers merge** when approved

### 4. Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(api): add new damage classification endpoint
fix(frontend): resolve image upload validation issue
docs(readme): update installation instructions
test(backend): add comprehensive image processing tests
```

## 🐛 Reporting Issues

### Bug Report Template

```markdown
**Bug Description**
Clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- OS: [e.g. Windows 10, macOS 12.0]
- Browser: [e.g. Chrome 96, Firefox 95]
- Backend Version: [e.g. 1.2.0]
- Frontend Version: [e.g. 1.2.0]

**Additional Context**
Any other context, screenshots, or logs.
```

### Issue Guidelines

- **Search existing issues** before creating new ones
- **Use descriptive titles** that summarize the problem
- **Include reproduction steps** and expected vs actual behavior
- **Provide environment details** and error messages
- **Add screenshots** for UI-related issues

## 💡 Feature Requests

### Feature Request Template

```markdown
**Feature Description**
Clear description of the feature you'd like to see.

**Use Case**
How would this feature be used? What problem does it solve?

**Proposed Solution**
Your suggested approach to implementing this feature.

**Alternatives Considered**
Other approaches you've considered.

**Additional Context**
Any other context, mockups, or examples.
```

### Feature Request Guidelines

- **Check existing issues** for similar requests
- **Explain the problem** the feature would solve
- **Provide use cases** and examples
- **Consider implementation** complexity and impact
- **Be open to discussion** and alternative approaches

## 🏷️ Labels and Milestones

### Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority: high`: High priority issue
- `priority: low`: Low priority issue

### Milestones

- **v1.1.0**: Next minor release
- **v2.0.0**: Major version with breaking changes
- **Documentation**: Documentation improvements
- **Testing**: Test coverage improvements

## 📚 Resources

### Documentation

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/)
- [OpenCV Documentation](https://docs.opencv.org/)

### Development Tools

- **Python**: [Black](https://black.readthedocs.io/), [Flake8](https://flake8.pycqa.org/)
- **TypeScript**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- **Git**: [Conventional Commits](https://www.conventionalcommits.org/)

### Community

- **GitHub Discussions**: Use the Discussions tab for questions
- **Discord/Slack**: Join our community channels
- **Email**: Contact maintainers directly for sensitive issues

## 🙏 Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **GitHub contributors** page
- **Release notes** for significant contributions
- **Project documentation** where appropriate

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Thank you for contributing to the Vehicle Damage Detection System! 🚗✨**

Your contributions help make this project better for everyone in the community.
