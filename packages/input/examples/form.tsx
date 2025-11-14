import React, { useState } from 'react';
import { Input } from '../src/index.tsx';

export function FormExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    quantity: 1,
    newsletter: false,
    favoriteFruit: '',
    favoriteColor: '#000000',
    birthdate: '',
    website: '',
    phone: ''
  });

  function handleChange(field: string) {
    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
    return onInputChange;
  }

  return (
    <form>
      <h2>Sample Form with Multiple Input Types</h2>

      {/* Text Input */}
      <div>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange('name')}
          placeholder="Enter your name"
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="you@example.com"
          required
        />
      </div>

      {/* Number Input */}
      <div>
        <label htmlFor="age">Age</label>
        <Input
          id="age"
          type="number"
          value={formData.age}
          onChange={handleChange('age')}
          min={0}
          max={120}
          placeholder="Enter your age"
        />
      </div>

      {/* Range Input */}
      <div>
        <label htmlFor="quantity">Quantity: {formData.quantity}</label>
        <Input
          id="quantity"
          type="range"
          value={formData.quantity}
          onChange={handleChange('quantity')}
          min={1}
          max={10}
          step={1}
        />
      </div>

      {/* Checkbox Input */}
      <div>
        <label>
          <Input type="checkbox" checked={formData.newsletter} onChange={handleChange('newsletter')} />
          Subscribe to newsletter
        </label>
      </div>

      {/* Radio Buttons - Favorite Fruit */}
      <div>
        <div>Favorite Fruit</div>
        <label>
          <Input
            type="radio"
            name="favoriteFruit"
            value="apple"
            checked={formData.favoriteFruit === 'apple'}
            onChange={handleChange('favoriteFruit')}
          />
          Apple
        </label>
        <label>
          <Input
            type="radio"
            name="favoriteFruit"
            value="banana"
            checked={formData.favoriteFruit === 'banana'}
            onChange={handleChange('favoriteFruit')}
          />
          Banana
        </label>
        <label>
          <Input
            type="radio"
            name="favoriteFruit"
            value="orange"
            checked={formData.favoriteFruit === 'orange'}
            onChange={handleChange('favoriteFruit')}
          />
          Orange
        </label>
      </div>

      {/* Color Input */}
      <div>
        <label htmlFor="color">Favorite Color</label>
        <Input id="color" type="color" value={formData.favoriteColor} onChange={handleChange('favoriteColor')} />
      </div>

      {/* Date Input */}
      <div>
        <label htmlFor="birthdate">Birthdate</label>
        <Input id="birthdate" type="date" value={formData.birthdate} onChange={handleChange('birthdate')} />
      </div>

      {/* URL Input */}
      <div>
        <label htmlFor="website">Website</label>
        <Input
          id="website"
          type="url"
          value={formData.website}
          onChange={handleChange('website')}
          placeholder="https://example.com"
        />
      </div>

      {/* Tel Input */}
      <div>
        <label htmlFor="phone">Phone</label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange('phone')}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          onClick={function HandleClick(e) {
            e.preventDefault();
            console.log('Form Data:', formData);
            alert('Form submitted! Check console for data.');
          }}
        >
          Submit
        </button>
      </div>

      {/* Display form data */}
      <div>
        <h3>Form Data (live preview):</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </form>
  );
}
