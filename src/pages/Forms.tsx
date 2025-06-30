import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  age: number
  gender: string
  interests: string[]
  country: string
  bio: string
  newsletter: boolean
  terms: boolean
}

const Forms: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(50)
  const [radioValue, setRadioValue] = useState('')
  const [checkboxValues, setCheckboxValues] = useState<string[]>([])
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>()
  const password = watch('password')

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
    toast.success('Form submitted successfully!')
  }

  const handleReset = () => {
    reset()
    setSliderValue(50)
    setRadioValue('')
    setCheckboxValues([])
    toast.success('Form reset successfully!')
  }

  const handleCheckboxChange = (value: string) => {
    setCheckboxValues(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    )
  }

  return (
    <div className="section">
      <h1>Forms Testing</h1>
      <p>This page contains various form elements to test Playwright form interactions.</p>

      <form onSubmit={handleSubmit(onSubmit)} data-testid="test-form">
        <div className="grid">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              {...register('firstName', { required: 'First name is required' })}
              data-testid="first-name-input"
            />
            {errors.firstName && <div className="error">{errors.firstName.message}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              {...register('lastName', { required: 'Last name is required' })}
              data-testid="last-name-input"
            />
            {errors.lastName && <div className="error">{errors.lastName.message}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              data-testid="email-input"
            />
            {errors.email && <div className="error">{errors.email.message}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' }
              })}
              data-testid="password-input"
            />
            {errors.password && <div className="error">{errors.password.message}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              data-testid="confirm-password-input"
            />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword.message}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              min="0"
              max="120"
              placeholder="Enter your age"
              {...register('age', { 
                min: { value: 0, message: 'Age must be positive' },
                max: { value: 120, message: 'Age must be less than 120' }
              })}
              data-testid="age-input"
            />
            {errors.age && <div className="error">{errors.age.message}</div>}
          </div>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={radioValue === 'male'}
                onChange={(e) => setRadioValue(e.target.value)}
                data-testid="gender-male"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={radioValue === 'female'}
                onChange={(e) => setRadioValue(e.target.value)}
                data-testid="gender-female"
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={radioValue === 'other'}
                onChange={(e) => setRadioValue(e.target.value)}
                data-testid="gender-other"
              />
              Other
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Interests</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="reading"
                checked={checkboxValues.includes('reading')}
                onChange={() => handleCheckboxChange('reading')}
                data-testid="interest-reading"
              />
              Reading
            </label>
            <label>
              <input
                type="checkbox"
                value="gaming"
                checked={checkboxValues.includes('gaming')}
                onChange={() => handleCheckboxChange('gaming')}
                data-testid="interest-gaming"
              />
              Gaming
            </label>
            <label>
              <input
                type="checkbox"
                value="sports"
                checked={checkboxValues.includes('sports')}
                onChange={() => handleCheckboxChange('sports')}
                data-testid="interest-sports"
              />
              Sports
            </label>
            <label>
              <input
                type="checkbox"
                value="music"
                checked={checkboxValues.includes('music')}
                onChange={() => handleCheckboxChange('music')}
                data-testid="interest-music"
              />
              Music
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            {...register('country')}
            data-testid="country-select"
          >
            <option value="">Select a country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
            <option value="jp">Japan</option>
            <option value="in">India</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            rows={4}
            placeholder="Tell us about yourself"
            {...register('bio')}
            data-testid="bio-textarea"
          />
        </div>

        <div className="form-group">
          <label htmlFor="slider">Rating: {sliderValue}</label>
          <input
            id="slider"
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="slider"
            data-testid="rating-slider"
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              {...register('newsletter')}
              data-testid="newsletter-checkbox"
            />
            Subscribe to newsletter
          </label>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              {...register('terms', { required: 'You must accept the terms' })}
              data-testid="terms-checkbox"
            />
            I accept the terms and conditions *
          </label>
          {errors.terms && <div className="error">{errors.terms.message}</div>}
        </div>

        <div className="form-group">
          <button type="submit" data-testid="submit-button">
            Submit Form
          </button>
          <button type="button" onClick={handleReset} data-testid="reset-button">
            Reset Form
          </button>
        </div>
      </form>

      <div className="section">
        <h3>Form Data Preview</h3>
        <pre data-testid="form-preview">
          {JSON.stringify({
            firstName: watch('firstName'),
            lastName: watch('lastName'),
            email: watch('email'),
            age: watch('age'),
            gender: radioValue,
            interests: checkboxValues,
            country: watch('country'),
            bio: watch('bio'),
            rating: sliderValue,
            newsletter: watch('newsletter'),
            terms: watch('terms')
          }, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default Forms 