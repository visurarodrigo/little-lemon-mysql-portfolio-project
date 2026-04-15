# How to Contribute

Thank you for contributing to this student project.

## Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/little-lemon-mysql-portfolio-project.git
   cd little-lemon-mysql-portfolio-project
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Set up development environment**
   ```bash
   npm install
   cp .env.example .env
   # Configure .env with your database credentials
   ```

4. **Make your changes**
   - Follow the existing code style
   - Add short comments where needed

5. **Test your changes**
   ```bash
   npm run dev
   # Test endpoints with curl or Postman
   ```

6. **Run format and lint (optional but recommended)**
   ```bash
   npm run format
   npm run lint
   ```

7. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: describe your changes"
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Wait for review and feedback

## Simple Code Style

- Use 2-space indentation
- Use single quotes for strings
- Use semicolons at end of statements
- Add comments only when helpful
- Maximum line length: 100 characters

## Commit Messages

Use clear messages that explain your change.

Example: `Add endpoint to update bookings`

## Reporting Bugs

Create an issue with:
- Clear title describing the bug
- Steps to reproduce
- Expected vs actual behavior
- Environment details (Node version, OS, MySQL version)

## Questions?

Feel free to open a discussion or issue in the repository!
