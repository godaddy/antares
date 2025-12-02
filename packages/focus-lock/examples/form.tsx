import { FocusLock } from '@bento/focus-lock';
import { Button } from '@bento/button';
import { Heading } from '@bento/heading';
import { Text } from '@bento/text';
import { Container } from '@bento/container';
import { RadioGroup, Radio } from '@bento/radio';
/* v8 ignore next */
import React, { useState } from 'react';

export function FormExample() {
  const [currentStep, setCurrentStep] = useState(0);
  const [accountType, setAccountType] = useState<string>();
  const [contactMethod, setContactMethod] = useState<string>();
  const steps = ['Account Type', 'Contact Preference', 'Review'];

  return (
    <Container as="section" className="form-wizard">
      <Container as="nav" className="step-indicator">
        {steps.map((step, index) => (
          <Container as="span" key={step} className={`step ${index === currentStep ? 'active' : ''}`}>
            {step}
          </Container>
        ))}
      </Container>

      <FocusLock
        contain={true}
        restoreFocus={false}
        autoFocus={true}
        key={currentStep} // Re-mount to reset focus
      >
        <Container as="form" className="step-content" data-testid={`step-${currentStep}`}>
          {currentStep === 0 && (
            <Container as="fieldset">
              <Heading level={2}>Account Type</Heading>
              <RadioGroup value={accountType} onChange={setAccountType} isInvalid={false}>
                <Text slot="label">Select your account type</Text>
                <Radio value="personal">Personal</Radio>
                <Radio value="business">Business</Radio>
                <Radio value="enterprise">Enterprise</Radio>
              </RadioGroup>
              <Button onClick={() => setCurrentStep(1)}>Next</Button>
            </Container>
          )}

          {currentStep === 1 && (
            <Container as="fieldset">
              <Heading level={2}>Contact Preference</Heading>
              <RadioGroup value={contactMethod} onChange={setContactMethod} isInvalid={false}>
                <Text slot="label">How would you like to be contacted?</Text>
                <Radio value="email">Email</Radio>
                <Radio value="phone">Phone</Radio>
                <Radio value="sms">SMS</Radio>
              </RadioGroup>
              <Button onClick={() => setCurrentStep(0)}>Previous</Button>
              <Button onClick={() => setCurrentStep(2)}>Next</Button>
            </Container>
          )}

          {currentStep === 2 && (
            <Container as="fieldset">
              <Heading level={2}>Review</Heading>
              <Text>Account Type: {accountType || 'Not selected'}</Text>
              <Text>Contact Method: {contactMethod || 'Not selected'}</Text>
              <Button onClick={() => setCurrentStep(1)}>Previous</Button>
              <Button type="submit">Submit</Button>
            </Container>
          )}
        </Container>
      </FocusLock>
    </Container>
  );
}
