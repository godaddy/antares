import { FocusLock } from '@bento/focus-lock';
/* v8 ignore next */
import React, { useState } from 'react';

export function FormExample() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Personal', 'Contact', 'Review'];

  return (
    <div className="form-wizard">
      <div className="step-indicator">
        {steps.map((step, index) => (
          <div key={step} className={`step ${index === currentStep ? 'active' : ''}`}>
            {step}
          </div>
        ))}
      </div>

      <FocusLock
        contain={true}
        restoreFocus={false}
        autoFocus={true}
        key={currentStep} // Re-mount to reset focus
      >
        <div className="step-content" data-testid={`step-${currentStep}`}>
          {currentStep === 0 && (
            <div>
              <h2>Personal Information</h2>
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
              <button type="button" onClick={() => setCurrentStep(1)}>
                Next
              </button>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h2>Contact Information</h2>
              <input type="email" placeholder="Email" />
              <input type="tel" placeholder="Phone" />
              <button type="button" onClick={() => setCurrentStep(0)}>
                Previous
              </button>
              <button type="button" onClick={() => setCurrentStep(2)}>
                Next
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2>Review</h2>
              <p>Please review your information.</p>
              <button type="button" onClick={() => setCurrentStep(1)}>
                Previous
              </button>
              <button type="submit">Submit</button>
            </div>
          )}
        </div>
      </FocusLock>
    </div>
  );
}

