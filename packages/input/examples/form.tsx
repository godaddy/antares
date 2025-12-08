/* v8 ignore next */
import React, { useState } from 'react';
import { Container } from '@bento/container';
import { Input } from '@bento/input';
import { Text } from '@bento/text';

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

  const isPhoneInvalid = formData.phone.length > 0 && formData.phone.length < 7;

  return (
    <Container as="form">
      <Text as="h2">Sample Form with Multiple Input Types</Text>

      {/* Text Input */}
      <Container as="div">
        <Container as="label" htmlFor="name">
          Name
        </Container>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange('name')}
          placeholder="Enter your name"
        />
      </Container>

      {/* Email Input */}
      <Container as="div">
        <Container as="label" htmlFor="email">
          Email
        </Container>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="you@example.com"
          required
        />
      </Container>

      {/* Number Input */}
      <Container as="div">
        <Container as="label" htmlFor="age">
          Age
        </Container>
        <Input
          id="age"
          type="number"
          value={formData.age}
          onChange={handleChange('age')}
          min={0}
          max={120}
          placeholder="Enter your age"
        />
      </Container>

      {/* Range Input */}
      <Container as="div">
        <Container as="label" htmlFor="quantity">
          Quantity: {formData.quantity}
        </Container>
        <Input
          id="quantity"
          type="range"
          value={formData.quantity}
          onChange={handleChange('quantity')}
          min={1}
          max={10}
          step={1}
        />
      </Container>

      {/* Checkbox Input */}
      <Container as="div">
        <Container as="label" htmlFor="newsletter">
          <Input id="newsletter" type="checkbox" checked={formData.newsletter} onChange={handleChange('newsletter')} />
          Subscribe to newsletter
        </Container>
      </Container>

      {/* Radio Buttons - Favorite Fruit */}
      <Container as="div">
        <Container as="fieldset">
          <Text as="legend">Favorite Fruit</Text>
          <Container as="label">
            <Input
              type="radio"
              name="favoriteFruit"
              id="fruit-apple"
              value="apple"
              checked={formData.favoriteFruit === 'apple'}
              onChange={handleChange('favoriteFruit')}
            />
            Apple
          </Container>
          <Container as="label">
            <Input
              type="radio"
              name="favoriteFruit"
              id="fruit-banana"
              value="banana"
              checked={formData.favoriteFruit === 'banana'}
              onChange={handleChange('favoriteFruit')}
            />
            Banana
          </Container>
          <Container as="label">
            <Input
              type="radio"
              name="favoriteFruit"
              id="fruit-orange"
              value="orange"
              checked={formData.favoriteFruit === 'orange'}
              onChange={handleChange('favoriteFruit')}
            />
            Orange
          </Container>
        </Container>
      </Container>

      {/* Color Input */}
      <Container as="div">
        <Container as="label" htmlFor="color">
          Favorite Color
        </Container>
        <Input id="color" type="color" value={formData.favoriteColor} onChange={handleChange('favoriteColor')} />
      </Container>

      {/* Date Input */}
      <Container as="div">
        <Container as="label" htmlFor="birthdate">
          Birthdate
        </Container>
        <Input id="birthdate" type="date" value={formData.birthdate} onChange={handleChange('birthdate')} />
      </Container>

      {/* URL Input */}
      <Container as="div">
        <Container as="label" htmlFor="website">
          Website
        </Container>
        <Input
          id="website"
          type="url"
          value={formData.website}
          onChange={handleChange('website')}
          placeholder="https://example.com"
        />
      </Container>

      {/* Tel Input */}
      <Container as="div">
        <Container as="label" htmlFor="phone">
          Phone
        </Container>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange('phone')}
          style={() => ({
            borderColor: isPhoneInvalid ? 'red' : 'gray'
          })}
          placeholder="+1 (555) 123-4567"
          aria-invalid={isPhoneInvalid}
          aria-describedby={isPhoneInvalid ? 'phone-error' : undefined}
        />
        {isPhoneInvalid && (
          <Container as="span" id="phone-error" style={{ color: 'red', fontSize: '0.875rem' }}>
            Phone number must be at least 7 characters or empty
          </Container>
        )}
      </Container>

      {/* Submit Button */}
      <Container as="div">
        <Input
          type="submit"
          onClick={function HandleClick(e) {
            e.preventDefault();
            console.log('Form Data:', formData);
            alert('Form submitted! Check console for data.');
          }}
          value="Submit"
        />
      </Container>

      {/* Display form data */}
      <Container as="div">
        <Text as="h3">Form Data (live preview):</Text>
        <Container as="pre">{JSON.stringify(formData, null, 2)}</Container>
      </Container>
    </Container>
  );
}
