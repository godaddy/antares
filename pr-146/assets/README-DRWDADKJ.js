import{j as e}from"./iframe-mIkG-ia4.js";import{useMDXComponents as l}from"./index-CYbcAVO_.js";import{M as a,A as s,a as t,S as o}from"./blocks-H-xBVXSD.js";import{S as d,P as c,D as x,C as u,E as h,a as m,H as p,V as g,b as f,R as v}from"./carousel.stories-B9yE2RCI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C8Gy-4ls.js";import"./index-BA5fCnJS.js";import"./index-qmzokPCi.js";import"./index-DrFu-skq.js";import"./index-B_O5YSnX.js";import"./index-BFUvbBmq.js";import"./clsx-CXVhVjWX.js";import"./index-CWmIgOtN.js";import"./mergeProps-VPp-_EQW.js";import"./useObjectRef-CF8ZtGSI.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-BqYfOhcr.js";import"./useFocusWithin-PKv_bTL9.js";import"./platform-BULRNHlZ.js";import"./useFocusable-Cc2c3LHG.js";import"./Collection-CYqfV12Y.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-BdqrIGw6.js";import"./context-6ndoatbe.js";import"./useControlledState-w-gpInWD.js";import"./useOverlayTriggerState-d59EUrgw.js";import"./PortalProvider-Bat0598t.js";import"./usePreventScroll-C01_aj-U.js";import"./useLabel-0AxH-o5c.js";import"./VisuallyHidden-PHHkCmUs.js";import"./useField-DH8Kpi32.js";import"./useButton-DPe44exJ.js";import"./index-Bbfxlgrc.js";import"./index-NOeWBRf7.js";import"./slots-DysxeCnN.js";import"./index-C5i0zoNI.js";import"./index-CLj43KZG.js";import"./index-D5Js5omO.js";import"./index-CYB4ICH7.js";import"./create-external-store-TtP3UJpK.js";import"./index-CjknuouO.js";import"./client-CAUSWO60.js";import"./index-COSOMKr7.js";import"./index-DV1KJj-k.js";const C=`import { Carousel, Flex } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Carousel style={{ maxWidth: 400 }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <Flex key={index} alignItems="center" justifyContent="center" style={{ height: 300, background: 'lavender' }}>
          Slide {index + 1}
        </Flex>
      ))}
    </Carousel>
  );
}
`,y=`import { Carousel, Flex } from '@godaddy/antares';
import { useState } from 'react';

export function ControlledExample() {
  const [activeIndex, setActiveIndex] = useState(1);

  function handlePrev(index: number, _values: { atFirstSlide: boolean; atLastSlide: boolean }) {
    setActiveIndex(Math.max(0, index - 1));
  }

  function handleNext(index: number, _values: { atFirstSlide: boolean; atLastSlide: boolean }) {
    setActiveIndex(Math.min(2, index + 1));
  }

  function handleChange(index: number) {
    setActiveIndex(index);
  }

  return (
    <Carousel
      style={{ maxWidth: 400 }}
      activeIndex={activeIndex}
      onPrev={handlePrev}
      onNext={handleNext}
      onChange={handleChange}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <Flex key={index} alignItems="center" justifyContent="center" style={{ height: 300, background: 'lavender' }}>
          Slide {index + 1}
        </Flex>
      ))}
    </Carousel>
  );
}
`,S=`import { Button, Icon, Carousel, Flex } from '@godaddy/antares';
import { useState } from 'react';

const TOTAL_SLIDES = 3;

export function ExternalControlsControlledExample() {
  const [activeIndex, setActiveIndex] = useState(1);

  function handlePrev() {
    setActiveIndex(Math.max(0, activeIndex - 1));
  }

  function handleNext() {
    setActiveIndex(Math.min(TOTAL_SLIDES - 1, activeIndex + 1));
  }

  return (
    <Flex direction="column" gap="md" style={{ maxWidth: 400 }}>
      <Flex direction="row" gap="md" alignSelf="end">
        <Button
          variant="secondary"
          aria-label="External prev slide"
          onClick={handlePrev}
          isDisabled={activeIndex === 0}
        >
          <Icon icon="chevron-left" />
        </Button>
        <Button
          variant="secondary"
          aria-label="External next slide"
          onClick={handleNext}
          isDisabled={activeIndex === TOTAL_SLIDES - 1}
        >
          <Icon icon="chevron-right" />
        </Button>
      </Flex>

      <Carousel hideDots hideNavigationControls activeIndex={activeIndex}>
        {Array.from({ length: TOTAL_SLIDES }).map((_, index) => (
          <Flex key={index} alignItems="center" justifyContent="center" style={{ height: 300, background: 'lavender' }}>
            Slide {index + 1}
          </Flex>
        ))}
      </Carousel>
    </Flex>
  );
}
`,j=`import { Button, Icon, Carousel, Flex, type CarouselRef } from '@godaddy/antares';
import { useRef } from 'react';

const TOTAL_SLIDES = 3;

export function ExternalControlsUncontrolledExample() {
  const carouselRef = useRef<CarouselRef>(null);

  function handlePrev() {
    carouselRef.current?.emblaApi?.goToPrev();
  }

  function handleNext() {
    carouselRef.current?.emblaApi?.goToNext();
  }

  return (
    <Flex direction="column" gap="md" style={{ maxWidth: 400 }}>
      <Flex direction="row" gap="md" alignSelf="end">
        <Button variant="secondary" aria-label="External prev slide" onClick={handlePrev}>
          <Icon icon="chevron-left" />
        </Button>
        <Button variant="secondary" aria-label="External next slide" onClick={handleNext}>
          <Icon icon="chevron-right" />
        </Button>
      </Flex>

      <Carousel hideNavigationControls ref={carouselRef} id="carousel">
        {Array.from({ length: TOTAL_SLIDES }).map((_, index) => (
          <Flex key={index} alignItems="center" justifyContent="center" style={{ height: 300, background: 'lavender' }}>
            Slide {index + 1}
          </Flex>
        ))}
      </Carousel>
    </Flex>
  );
}
`,I=`import { Carousel, Flex } from '@godaddy/antares';

export function HideControlsExample() {
  return (
    <Carousel style={{ maxWidth: 400 }} hideNavigationControls hideDots>
      {Array.from({ length: 3 }).map((_, index) => (
        <Flex key={index} alignItems="center" justifyContent="center" style={{ height: 300, background: 'lavender' }}>
          Slide {index + 1}
        </Flex>
      ))}
    </Carousel>
  );
}
`,b=`import { Carousel, Flex } from '@godaddy/antares';

const SLIDE_WIDTHS = [200, 100, 300, 100, 200];

export function VariableWidthsExample() {
  return (
    <Carousel style={{ maxWidth: 400 }}>
      {SLIDE_WIDTHS.map((width, index) => (
        <Flex
          key={index}
          alignItems="center"
          justifyContent="center"
          style={{ width, height: 300, background: 'lavender' }}
        >
          Slide {index + 1}
        </Flex>
      ))}
    </Carousel>
  );
}
`,F=`import { Box, Carousel, Flex } from '@godaddy/antares';
import { useState } from 'react';

export function EventsExample() {
  const [message, setMessage] = useState('Listening for change events...');
  const [messagePrev, setMessagePrev] = useState('Listening for prev events...');
  const [messageNext, setMessageNext] = useState('Listening for next events...');

  function handleChange(index: number, values: { atFirstSlide: boolean; atLastSlide: boolean }) {
    setMessage(\`onChange: \${index}, firstSlide: \${values.atFirstSlide}, lastSlide: \${values.atLastSlide}\`);
  }

  function handlePrev(index: number, values: { atFirstSlide: boolean; atLastSlide: boolean }) {
    setMessagePrev(\`onPrev: \${index}, firstSlide: \${values.atFirstSlide}, lastSlide: \${values.atLastSlide}\`);
  }

  function handleNext(index: number, values: { atFirstSlide: boolean; atLastSlide: boolean }) {
    setMessageNext(\`onNext: \${index}, firstSlide: \${values.atFirstSlide}, lastSlide: \${values.atLastSlide}\`);
  }
  return (
    <Flex direction="column" gap="md">
      <Box>{message}</Box>
      <Box>{messagePrev}</Box>
      <Box>{messageNext}</Box>

      <Carousel
        style={{ maxWidth: 400 }}
        defaultActiveIndex={2}
        onChange={handleChange}
        onPrev={handlePrev}
        onNext={handleNext}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <Flex key={index} alignItems="center" justifyContent="center" style={{ height: 300, background: 'lavender' }}>
            Slide {index + 1}
          </Flex>
        ))}
      </Carousel>
    </Flex>
  );
}
`,E=`import { Carousel, Flex } from '@godaddy/antares';

export function RTLDirectionExample() {
  return (
    <Carousel style={{ maxWidth: 400 }} dir="rtl">
      {Array.from({ length: 3 }).map((_, index) => (
        <Flex key={index} alignItems="center" justifyContent="center" style={{ height: 300, background: 'lavender' }}>
          Slide {index + 1}
        </Flex>
      ))}
    </Carousel>
  );
}
`;function i(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...l(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:d,name:"Overview"}),`
`,e.jsx(n.h1,{id:"carousel",children:"Carousel"}),`
`,e.jsx(n.p,{children:"The Carousel component allows users to cycle through a series of content panels (typically images, cards, or text) in a horizontal or vertical layout. It is commonly used for featured content, product showcases, or testimonials."}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Carousel"})," component accepts the following props:"]}),`
`,e.jsx(s,{of:c}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsxs(n.p,{children:["The default carousel is a carousel that is uncontrolled, it shows the first slide by default. You can also pass the ",e.jsx(n.code,{children:"defaultActiveIndex"})," prop to the ",e.jsx(n.code,{children:"Carousel"})," component to set the initial active slide index."]}),`
`,e.jsx(t,{of:x,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:C}),`
`,e.jsx(n.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(n.p,{children:["The controlled carousel is a carousel that is controlled by the ",e.jsx(n.code,{children:"activeIndex"})," prop."]}),`
`,e.jsx(t,{of:u,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:y}),`
`,e.jsx(n.h3,{id:"external-controls-uncontrolled",children:"External Controls (Uncontrolled)"}),`
`,e.jsxs(n.p,{children:["You can control the carousel externally by passing the ",e.jsx(n.code,{children:"ref"})," prop to the ",e.jsx(n.code,{children:"Carousel"})," component and using the ",e.jsx(n.code,{children:"emblaApi"})," to control the carousel imperatively."]}),`
`,e.jsx(t,{of:h,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:j}),`
`,e.jsx(n.h3,{id:"external-controls-controlled",children:"External Controls (Controlled)"}),`
`,e.jsxs(n.p,{children:["You can control the carousel externally by using the ",e.jsx(n.code,{children:"activeIndex"})," prop to control the active slide index."]}),`
`,e.jsx(t,{of:m,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:S}),`
`,e.jsx(n.h3,{id:"hide-controls",children:"Hide Controls"}),`
`,e.jsx(n.p,{children:"The hide controls carousel is a carousel that hides the navigation controls."}),`
`,e.jsx(t,{of:p,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:I}),`
`,e.jsx(n.h3,{id:"variable-widths",children:"Variable Widths"}),`
`,e.jsx(n.p,{children:"It supports multiple slides with different widths."}),`
`,e.jsx(t,{of:g,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:b}),`
`,e.jsx(n.h3,{id:"events",children:"Events"}),`
`,e.jsxs(n.p,{children:["You can listen to events like ",e.jsx(n.code,{children:"onChange"}),", ",e.jsx(n.code,{children:"onPrev"}),", or ",e.jsx(n.code,{children:"onNext"}),"."]}),`
`,e.jsx(t,{of:f,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:F}),`
`,e.jsx(n.h3,{id:"rtl-direction",children:"RTL Direction"}),`
`,e.jsxs(n.p,{children:[`By default, the carousel is rendered in the direction of the document, which is left to right in most cases.
You can set the `,e.jsx(n.code,{children:"dir"})," prop to ",e.jsx(n.code,{children:"rtl"})," to render the carousel from right to left."]}),`
`,e.jsx(t,{of:v,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:E})]})}function ve(r={}){const{wrapper:n}={...l(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{ve as default};
