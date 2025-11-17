import React, { useState } from 'react';
import { Input } from '../src/index.tsx';

export function BasicFormExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
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
      <h2>Basic Form</h2>

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

      <div>
        <h3>Form Data (live preview):</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </form>
  );
}
