/* v8 ignore next */
import React, { useState } from 'react';
import { Container } from '@bento/container';
import { Input } from '@bento/input';
import { Text } from '@bento/text';

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
    <Container as="form">
      <Text as="h2">Basic Form</Text>

      <Container as="div">
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange('name')}
          placeholder="Enter your name"
        />
      </Container>

      <Container as="div">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="you@example.com"
          required
        />
      </Container>

      <Container as="div">
        <Input
          type="submit"
          onClick={function HandleClick(e) {
            e.preventDefault();
          }}
          value="Submit"
        />
      </Container>

      <Container as="div">
        <Text as="h3">Form Data (live preview):</Text>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </Container>
    </Container>
  );
}
