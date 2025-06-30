# Form IDs and Data-TestID Reference

This document provides a comprehensive list of all form elements and their IDs/data-testid attributes across the Playwright Testing Demo application.

## 📋 Forms Page (`/forms`)

### Main Form (`data-testid="test-form"`)
- **First Name Input**: `id="firstName"`, `data-testid="first-name-input"`
- **Last Name Input**: `id="lastName"`, `data-testid="last-name-input"`
- **Email Input**: `id="email"`, `data-testid="email-input"`
- **Password Input**: `id="password"`, `data-testid="password-input"`
- **Confirm Password Input**: `id="confirmPassword"`, `data-testid="confirm-password-input"`
- **Age Input**: `id="age"`, `data-testid="age-input"`

### Radio Buttons (Gender)
- **Male**: `data-testid="gender-male"`
- **Female**: `data-testid="gender-female"`
- **Other**: `data-testid="gender-other"`

### Checkboxes (Interests)
- **Reading**: `data-testid="interest-reading"`
- **Gaming**: `data-testid="interest-gaming"`
- **Sports**: `data-testid="interest-sports"`
- **Music**: `data-testid="interest-music"`

### Other Form Elements
- **Country Select**: `id="country"`, `data-testid="country-select"`
- **Bio Textarea**: `id="bio"`, `data-testid="bio-textarea"`
- **Rating Slider**: `id="slider"`, `data-testid="rating-slider"`
- **Newsletter Checkbox**: `data-testid="newsletter-checkbox"`
- **Terms Checkbox**: `data-testid="terms-checkbox"`
- **Submit Button**: `data-testid="submit-button"`
- **Reset Button**: `data-testid="reset-button"`
- **Form Preview**: `data-testid="form-preview"`

## 🔐 Authentication Page (`/auth`)

### Login Form (`data-testid="login-form"`)
- **Username Input**: `id="username"`, `data-testid="login-username"`
- **Password Input**: `id="password"`, `data-testid="login-password"`
- **Login Submit**: `data-testid="login-submit"`

### Registration Form (`data-testid="register-form"`)
- **Username Input**: `id="reg-username"`, `data-testid="register-username"`
- **Email Input**: `id="reg-email"`, `data-testid="register-email"`
- **Password Input**: `id="reg-password"`, `data-testid="register-password"`
- **Confirm Password Input**: `id="reg-confirm-password"`, `data-testid="register-confirm-password"`
- **Register Submit**: `data-testid="register-submit"`
- **Toggle Register**: `data-testid="toggle-register"`
- **Logout Button**: `data-testid="logout-button"`
- **Protected Content**: `data-testid="protected-content"`

## 📁 File Upload Page (`/file-upload`)

### File Upload Elements
- **Drag Drop Area**: `data-testid="drag-drop-area"`
- **File Input**: `data-testid="file-input"`
- **Select Files Button**: `data-testid="select-files-button"`
- **File Item**: `data-testid="file-{fileId}"`
- **Remove File**: `data-testid="remove-file-{fileId}"`

## 🖼️ Image Injection Page (`/image-injection`)

### Image Upload Elements
- **IP Input**: `data-testid="ip-input"`
- **Drop Zone**: `data-testid="drop-zone"`
- **Browse Button**: `data-testid="browse-button"`
- **File Input**: `data-testid="file-input"`
- **Generate Test Images**: `data-testid="generate-test-images"`
- **Toggle View Mode**: `data-testid="toggle-view-mode"`
- **Image Item**: `data-testid="image-item-{imageId}"`
- **View Image**: `data-testid="view-image-{imageId}"`
- **Remove Image**: `data-testid="remove-image-{imageId}"`

### Canvas Editor
- **Original Image**: `data-testid="original-image"`
- **Canvas Element**: `data-testid="canvas-element"`
- **Load to Canvas**: `data-testid="load-to-canvas"`
- **Rotate Button**: `data-testid="rotate-button"`
- **Zoom In Button**: `data-testid="zoom-in-button"`
- **Zoom Out Button**: `data-testid="zoom-out-button"`
- **Download Button**: `data-testid="download-button"`
- **Process Button**: `data-testid="process-button"`
- **Progress Bar**: `data-testid="progress-bar"`

### Image Modal
- **Image Modal**: `data-testid="image-modal"`
- **Close Image Modal**: `data-testid="close-image-modal"`
- **Modal Image**: `data-testid="modal-image"`
- **Image Dimensions**: `data-testid="image-dimensions"`

## ✅ Todo App Page (`/todo`)

### Todo Form (`data-testid="add-todo-form"`)
- **New Todo Input**: `data-testid="new-todo-input"`
- **Add Todo Button**: `data-testid="add-todo-button"`

### Filter Buttons
- **Filter All**: `data-testid="filter-all"`
- **Filter Active**: `data-testid="filter-active"`
- **Filter Completed**: `data-testid="filter-completed"`
- **Clear Completed**: `data-testid="clear-completed"`

### Todo Items
- **Todo List**: `data-testid="todo-list"`
- **Todo Item**: `data-testid="todo-{todoId}"`
- **Toggle Todo**: `data-testid="toggle-{todoId}"`
- **Todo Text**: `data-testid="todo-text-{todoId}"`
- **Edit Input**: `data-testid="edit-input-{todoId}"`
- **Save Button**: `data-testid="save-{todoId}"`
- **Cancel Button**: `data-testid="cancel-{todoId}"`
- **Edit Button**: `data-testid="edit-{todoId}"`
- **Delete Button**: `data-testid="delete-{todoId}"`

## 🔄 Dynamic Content Page (`/dynamic-content`)

### Content Controls
- **Load Posts Button**: `data-testid="load-posts-button"`
- **Search Input**: `data-testid="search-input"`
- **Loading Indicator**: `data-testid="loading-indicator"`
- **Post Item**: `data-testid="post-{postId}"`
- **Post Detail Modal**: `data-testid="post-detail-modal"`
- **Close Post Modal**: `data-testid="close-post-modal"`
- **Real-time Content**: `data-testid="real-time-content"`

## 🧪 Testing Features Page (`/testing-features`)

### Basic Interactions
- **Increment Button**: `data-testid="increment-button"`
- **Counter Value**: `data-testid="counter-value"`
- **Reset Button**: `data-testid="reset-button"`
- **Text Input**: `data-testid="text-input"`
- **Text Display**: `data-testid="text-display"`

### Form Elements
- **Select Dropdown**: `data-testid="select-dropdown"`
- **Selected Value**: `data-testid="selected-value"`
- **Checkbox 1**: `data-testid="checkbox-1"`
- **Checkbox 2**: `data-testid="checkbox-2"`
- **Checkbox 3**: `data-testid="checkbox-3"`
- **Radio 1**: `data-testid="radio-1"`
- **Radio 2**: `data-testid="radio-2"`
- **Radio 3**: `data-testid="radio-3"`
- **Slider Input**: `data-testid="slider-input"`
- **Slider Value**: `data-testid="slider-value"`

### Modal Elements
- **Open Modal Button**: `data-testid="open-modal-button"`
- **Test Modal**: `data-testid="test-modal"`
- **Close Modal Button**: `data-testid="close-modal-button"`

### Dynamic Content
- **Load Content Button**: `data-testid="load-content-button"`
- **Loading Spinner**: `data-testid="loading-spinner"`
- **Dynamic Content List**: `data-testid="dynamic-content-list"`
- **Dynamic Item**: `data-testid="dynamic-item-{index}"`

### File Upload
- **File Input**: `data-testid="file-input"`
- **File Upload Success**: `data-testid="file-upload-success"`
- **Image Injection Link**: `data-testid="image-injection-link"`

### Navigation & Status
- **Test Link**: `data-testid="test-link"`
- **Scroll Top Button**: `data-testid="scroll-top-button"`
- **Success Indicator**: `data-testid="success-indicator"`
- **Error Indicator**: `data-testid="error-indicator"`
- **Warning Indicator**: `data-testid="warning-indicator"`
- **Info Indicator**: `data-testid="info-indicator"`

### Responsive Elements
- **Responsive Item 1**: `data-testid="responsive-item-1"`
- **Responsive Item 2**: `data-testid="responsive-item-2"`
- **Responsive Item 3**: `data-testid="responsive-item-3"`

### Hidden Elements
- **Hidden Element**: `data-testid="hidden-element"`
- **Invisible Element**: `data-testid="invisible-element"`
- **Transparent Element**: `data-testid="transparent-element"`

### Test Summary
- **Test Summary**: `data-testid="test-summary"`

## 🎯 Navigation Elements

### Main Navigation
- **Mobile Menu Button**: `data-testid="mobile-menu-button"`

### Page Titles
- **Image Injection Title**: `data-testid="image-injection-title"`

## 📱 Mobile Responsive Features

All form elements are designed with:
- **Touch-friendly targets** (minimum 44px)
- **Responsive breakpoints** for different screen sizes
- **Mobile-optimized spacing** and typography
- **Accessible labels** and ARIA attributes

## 🤖 Playwright Testing Tips

### Form Interaction Examples
```javascript
// Fill text input
await page.fill('[data-testid="first-name-input"]', 'John');

// Click button
await page.click('[data-testid="submit-button"]');

// Select dropdown option
await page.selectOption('[data-testid="country-select"]', 'us');

// Check checkbox
await page.check('[data-testid="terms-checkbox"]');

// Upload file
await page.setInputFiles('[data-testid="file-input"]', 'test-file.txt');

// Drag and drop
await page.dragAndDrop('[data-testid="source"]', '[data-testid="target"]');
```

### Waiting for Elements
```javascript
// Wait for element to be visible
await page.waitForSelector('[data-testid="loading-spinner"]', { state: 'visible' });

// Wait for element to be hidden
await page.waitForSelector('[data-testid="loading-spinner"]', { state: 'hidden' });

// Wait for text content
await page.waitForSelector('[data-testid="counter-value"]:has-text("5")');
```

### Assertions
```javascript
// Assert element is visible
await expect(page.locator('[data-testid="success-indicator"]')).toBeVisible();

// Assert text content
await expect(page.locator('[data-testid="counter-value"]')).toHaveText('0');

// Assert form values
await expect(page.locator('[data-testid="email-input"]')).toHaveValue('test@example.com');
```

---

**Note**: All IDs and data-testid attributes are already implemented in the application. This reference makes it easy to write Playwright tests for any form or interactive element in the application. 