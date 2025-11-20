/* v8 ignore next */
import React, { useState } from 'react';
import { Input } from '../src/index.tsx';

export function BasicFormExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  function handleChange(field: string) {
    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
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
        <Input
          type="submit"
          onClick={function HandleClick(e) {
            e.preventDefault();
          }}
          value="Submit"
        />
      </div>

      <div>
        <h3>Form Data (live preview):</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </form>
  );
}
