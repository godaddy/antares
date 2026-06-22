import{i as e}from"./preload-helper-CNDr7-K1.js";import{y as t}from"./iframe-DcehxJvJ.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-hPIBcDZI.js";import{t as c}from"./mdx-react-shim-nOkTKOG3.js";import{Controlled as l,Default as u,Events as d,ExternalControlsControlled as f,ExternalControlsUncontrolled as p,HideControls as m,Props as h,RTLDirection as g,VariableWidths as _,n as v,t as y}from"./carousel.stories-qo3xDQmE.js";var b,x=e((()=>{b=`import { Carousel, Flex } from '@godaddy/antares';

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
`})),S,C=e((()=>{S=`import { Carousel, Flex } from '@godaddy/antares';
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
`})),w,T=e((()=>{w=`import { Button, Icon, Carousel, Flex } from '@godaddy/antares';
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
`})),E,D=e((()=>{E=`import { Button, Icon, Carousel, Flex, type CarouselRef } from '@godaddy/antares';
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
`})),O,k=e((()=>{O=`import { Carousel, Flex } from '@godaddy/antares';

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
`})),A,j=e((()=>{A=`import { Carousel, Flex } from '@godaddy/antares';

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
`})),M,N=e((()=>{M=`import { Box, Carousel, Flex } from '@godaddy/antares';
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
`})),P,F=e((()=>{P=`import { Carousel, Flex } from '@godaddy/antares';
import { RTLProvider } from '../../../utils/rtl-locale-provider.tsx';

export function RTLDirectionExample() {
  return (
    <RTLProvider>
      <Carousel style={{ maxWidth: 400 }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Flex key={index} alignItems="center" justifyContent="center" style={{ height: 300, background: 'lavender' }}>
            Slide {index + 1}
          </Flex>
        ))}
      </Carousel>
    </RTLProvider>
  );
}
`}));function I(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...n(),...e.components};return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(o,{of:y,name:`Overview`}),`
`,(0,R.jsx)(t.h1,{id:`carousel`,children:`Carousel`}),`
`,(0,R.jsx)(t.p,{children:`The Carousel component allows users to cycle through a series of content panels (typically images, cards, or text) in a horizontal or vertical layout. It is commonly used for featured content, product showcases, or testimonials.`}),`
`,(0,R.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,R.jsx)(t.pre,{children:(0,R.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,R.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,R.jsxs)(t.p,{children:[`The `,(0,R.jsx)(t.code,{children:`Carousel`}),` component accepts the following props:`]}),`
`,(0,R.jsx)(a,{of:h}),`
`,(0,R.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,R.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,R.jsxs)(t.p,{children:[`The default carousel is a carousel that is uncontrolled, it shows the first slide by default. You can also pass the `,(0,R.jsx)(t.code,{children:`defaultActiveIndex`}),` prop to the `,(0,R.jsx)(t.code,{children:`Carousel`}),` component to set the initial active slide index.`]}),`
`,(0,R.jsx)(i,{of:u,inline:!0}),`
`,(0,R.jsx)(r,{language:`tsx`,code:b}),`
`,(0,R.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,R.jsxs)(t.p,{children:[`The controlled carousel is a carousel that is controlled by the `,(0,R.jsx)(t.code,{children:`activeIndex`}),` prop.`]}),`
`,(0,R.jsx)(i,{of:l,inline:!0}),`
`,(0,R.jsx)(r,{language:`tsx`,code:S}),`
`,(0,R.jsx)(t.h3,{id:`external-controls-uncontrolled`,children:`External Controls (Uncontrolled)`}),`
`,(0,R.jsxs)(t.p,{children:[`You can control the carousel externally by passing the `,(0,R.jsx)(t.code,{children:`ref`}),` prop to the `,(0,R.jsx)(t.code,{children:`Carousel`}),` component and using the `,(0,R.jsx)(t.code,{children:`emblaApi`}),` to control the carousel imperatively.`]}),`
`,(0,R.jsx)(i,{of:p,inline:!0}),`
`,(0,R.jsx)(r,{language:`tsx`,code:E}),`
`,(0,R.jsx)(t.h3,{id:`external-controls-controlled`,children:`External Controls (Controlled)`}),`
`,(0,R.jsxs)(t.p,{children:[`You can control the carousel externally by using the `,(0,R.jsx)(t.code,{children:`activeIndex`}),` prop to control the active slide index.`]}),`
`,(0,R.jsx)(i,{of:f,inline:!0}),`
`,(0,R.jsx)(r,{language:`tsx`,code:w}),`
`,(0,R.jsx)(t.h3,{id:`hide-controls`,children:`Hide Controls`}),`
`,(0,R.jsx)(t.p,{children:`The hide controls carousel is a carousel that hides the navigation controls.`}),`
`,(0,R.jsx)(i,{of:m,inline:!0}),`
`,(0,R.jsx)(r,{language:`tsx`,code:O}),`
`,(0,R.jsx)(t.h3,{id:`variable-widths`,children:`Variable Widths`}),`
`,(0,R.jsx)(t.p,{children:`It supports multiple slides with different widths.`}),`
`,(0,R.jsx)(i,{of:_,inline:!0}),`
`,(0,R.jsx)(r,{language:`tsx`,code:A}),`
`,(0,R.jsx)(t.h3,{id:`events`,children:`Events`}),`
`,(0,R.jsxs)(t.p,{children:[`You can listen to events like `,(0,R.jsx)(t.code,{children:`onChange`}),`, `,(0,R.jsx)(t.code,{children:`onPrev`}),`, or `,(0,R.jsx)(t.code,{children:`onNext`}),`.`]}),`
`,(0,R.jsx)(i,{of:d,inline:!0}),`
`,(0,R.jsx)(r,{language:`tsx`,code:M}),`
`,(0,R.jsx)(t.h3,{id:`rtl-direction`,children:`RTL Direction`}),`
`,(0,R.jsxs)(t.p,{children:[`The carousel follows the current `,(0,R.jsx)(t.strong,{children:`layout direction`}),` (LTR or RTL). By default, that direction is detected automatically from the browser or system settings.`]}),`
`,(0,R.jsx)(i,{of:g,inline:!0}),`
`,(0,R.jsx)(r,{language:`tsx`,code:P})]})}function L(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,R.jsx)(t,{...e,children:(0,R.jsx)(I,{...e})}):I(e)}var R;e((()=>{R=t(),c(),s(),v(),x(),C(),T(),D(),k(),j(),N(),F()}))();export{L as default};