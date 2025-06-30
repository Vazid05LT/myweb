# Playwright Testing Demo Web Application

A comprehensive web application designed specifically for testing Playwright automation capabilities on iOS and Android devices. This app covers all the features and capabilities mentioned in the LambdaTest Playwright documentation.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The app will be available at http://localhost:3000
```

## 📱 Mobile & Device Testing Ready

This application is specifically optimized for mobile and device testing with:

- **Touch-friendly elements**: All interactive elements meet minimum 44px touch targets
- **Responsive design**: Adapts to different screen sizes and orientations
- **Mobile-optimized navigation**: Easy to navigate on touch devices
- **Cross-platform compatibility**: Works on iOS Safari, Android Chrome, and other mobile browsers
- **Accessibility features**: Screen reader support and keyboard navigation
- **Performance optimized**: Fast loading and smooth interactions

## 🧪 Testing Features

### 1. **Complete Testing Features Page** (`/testing-features`)
- All testing capabilities in one place
- Perfect for comprehensive automation testing
- Includes: basic interactions, forms, modals, dynamic content, file upload, status indicators

### 2. **Forms Testing** (`/forms`)
- Text inputs with validation
- Checkboxes and radio buttons
- Select dropdowns
- Sliders and range inputs
- Form submission and reset
- Real-time form data preview

### 3. **Modal Testing** (`/modals`)
- Basic modal dialogs
- Form modals with validation
- Confirmation modals
- Alert modals
- Tooltips and popups
- Backdrop click handling

### 4. **Dynamic Content** (`/dynamic-content`)
- AJAX requests simulation
- Loading states and spinners
- Dynamic content updates
- Search and filtering
- Modal content display
- Real-time updates

### 5. **Authentication** (`/auth`)
- Login/logout flows
- Registration forms
- Session management
- Protected content
- Form validation
- User profile display

### 6. **File Upload** (`/file-upload`)
- Drag and drop functionality
- File selection dialog
- Multiple file upload
- File information display
- Upload progress indication
- File removal

### 7. **Todo Application** (`/todo`)
- Complete CRUD operations
- Add, edit, delete todos
- Mark as complete/incomplete
- Filter todos (all, active, completed)
- Clear completed todos
- Todo counters

### 8. **Infinite Scroll** (`/infinite-scroll`)
- Dynamic content loading
- Intersection Observer API
- Loading states
- End detection
- Image loading
- Performance optimization

### 9. **Accessibility** (`/accessibility`)
- ARIA labels and roles
- Keyboard navigation
- Tab navigation
- Collapsible sections
- Skip links
- Live regions
- Screen reader support

### 10. **Performance** (`/performance`)
- Loading states
- Animations and transitions
- Async operations
- Performance feedback
- Visual indicators

### 11. **Error Handling** (`/error-handling`)
- Form validation errors
- Error message displays
- Success notifications
- Input validation
- User feedback

## 🎯 Playwright Testing Capabilities Covered

### Basic Interactions
- ✅ Click, type, hover
- ✅ Drag and drop
- ✅ Keyboard navigation
- ✅ Touch interactions

### Form Elements
- ✅ Text inputs, textareas
- ✅ Checkboxes, radio buttons
- ✅ Select dropdowns
- ✅ Range sliders
- ✅ Form validation
- ✅ Form submission

### Navigation
- ✅ Links and buttons
- ✅ Client-side routing
- ✅ Scroll behavior
- ✅ Modal navigation

### Dynamic Content
- ✅ AJAX requests
- ✅ Loading states
- ✅ Content updates
- ✅ Search functionality
- ✅ Filtering

### UI Elements
- ✅ Modals and popups
- ✅ Tooltips
- ✅ Alerts and notifications
- ✅ Status indicators
- ✅ Progress indicators

### File Operations
- ✅ File upload
- ✅ Drag and drop
- ✅ File selection
- ✅ Multiple files

### Authentication
- ✅ Login/logout flows
- ✅ Session management
- ✅ Protected routes
- ✅ User state

### Accessibility
- ✅ ARIA attributes
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus management

### Mobile Features
- ✅ Touch-friendly elements
- ✅ Responsive design
- ✅ Mobile navigation
- ✅ Cross-device compatibility

### Performance
- ✅ Loading states
- ✅ Animations
- ✅ Async operations
- ✅ Performance monitoring

## 📱 Mobile Testing Features

### Touch Interactions
- All buttons and interactive elements are minimum 44px
- Touch-friendly sliders and form controls
- Proper touch event handling

### Responsive Design
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Optimized for portrait and landscape orientations

### Cross-Platform Compatibility
- iOS Safari support
- Android Chrome support
- Progressive Web App features
- Cross-browser compatibility

## 🔧 Technical Features

### Data Attributes
All interactive elements include `data-testid` attributes for easy Playwright selection:
```html
<button data-testid="submit-button">Submit</button>
<input data-testid="email-input" type="email" />
<div data-testid="modal-content">...</div>
```

### Visual Feedback
- Hover effects show test IDs for debugging
- Loading spinners and progress indicators
- Success/error message displays
- Status indicators with colors

### Performance Optimized
- Fast loading times
- Efficient rendering
- Optimized animations
- Minimal bundle size

## 🚀 Getting Started with Testing

1. **Start the application**:
   ```bash
   npm run dev
   ```

2. **Access the app**:
   - Local: http://localhost:3000
   - Network: Available on your local network for device testing

3. **Recommended testing flow**:
   - Start with `/testing-features` for comprehensive testing
   - Test individual pages for specific functionality
   - Use the home page for navigation testing

## 📋 Testing Checklist

### Basic Functionality
- [ ] All pages load correctly
- [ ] Navigation works on all devices
- [ ] Forms submit and validate properly
- [ ] Modals open and close correctly
- [ ] File upload works on mobile devices

### Mobile Testing
- [ ] Touch interactions work properly
- [ ] Responsive design adapts to screen size
- [ ] Navigation is touch-friendly
- [ ] Forms are easy to use on mobile
- [ ] Performance is acceptable on mobile devices

### Cross-Browser Testing
- [ ] Works on iOS Safari
- [ ] Works on Android Chrome
- [ ] Works on desktop browsers
- [ ] Consistent behavior across platforms

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Project Structure
```
src/
├── pages/           # Individual testing pages
├── App.tsx          # Main app component
├── main.tsx         # App entry point
└── index.css        # Global styles
```

## 📄 License

MIT License - feel free to use this application for your Playwright testing needs.

## 🤝 Contributing

This application is designed to be a comprehensive testing platform. Feel free to add more features or improve existing ones to enhance the testing capabilities. 