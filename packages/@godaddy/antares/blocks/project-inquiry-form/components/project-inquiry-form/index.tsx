'use client';

import { useCallback, useId, useState, type ComponentProps, type FormEvent } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  DropZone,
  type DropZoneRenderProps,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  TextContext,
  isFileDropItem
} from '@godaddy/antares';
import type { CalendarDate } from '@godaddy/antares/date';
import { DropOverlay } from '../drop-overlay/index.tsx';
import { AttachedFiles, acceptedTypes, fileKey } from '../attached-files/index.tsx';
import { Benefits } from '../benefits/index.tsx';
import { type FieldName, Fields } from '../fields/index.tsx';
import styles from './index.module.css';

const maximumSize = 256 * 1024 * 1024;
const initialValues: Record<FieldName, string> = { fullName: '', email: '', phone: '' };
const heroImage = {
  src: 'https://placehold.co/1280x720/eef2f7/667085?text=Project+image',
  alt: 'Project image placeholder',
  width: 1280,
  height: 720
};

type FormDropEvent = Parameters<NonNullable<ComponentProps<typeof DropZone>['onDrop']>>[0];

/** A complete, interactive project inquiry page with a local demo submission. */
export function ProjectInquiryForm() {
  const headingId = useId();
  const [values, setValues] = useState(initialValues);
  const [dueDate, setDueDate] = useState<CalendarDate | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const canSubmit =
    Object.values(values).every(function isFilled(value) {
      return value.trim().length > 0;
    }) && files.length > 0;

  const clearConfirmation = useCallback(function clearConfirmation() {
    setSubmitted(false);
  }, []);

  const addFiles = useCallback(
    function addFiles(list: FileList | File[] | null) {
      if (!list?.length) return;

      const incoming = Array.from(list);
      const valid = incoming.filter(function accept(file) {
        return acceptedTypes.includes(file.type) && file.size < maximumSize;
      });

      setFileError(valid.length === incoming.length ? '' : 'Use PDF, JPG, GIF, or PNG files smaller than 256MB.');
      if (valid.length === 0) return;

      setFiles(function appendFiles(previous) {
        const unique = new Map(
          previous.map(function identify(file) {
            return [fileKey(file), file];
          })
        );

        for (const file of valid) {
          const key = fileKey(file);
          if (!unique.has(key)) unique.set(key, file);
        }

        return Array.from(unique.values());
      });
      clearConfirmation();
    },
    [clearConfirmation]
  );

  const handleDropOperation = useCallback<NonNullable<ComponentProps<typeof DropZone>['getDropOperation']>>(
    function handleDropOperation(types) {
      return acceptedTypes.some(function supportsType(type) {
        return types.has(type);
      })
        ? 'copy'
        : 'cancel';
    },
    []
  );

  const handleDrop = useCallback(
    async function handleDrop(event: FormDropEvent) {
      if (event.dropOperation === 'cancel') return;

      try {
        const dropped = await Promise.all(
          event.items.filter(isFileDropItem).map(function readFile(item) {
            return item.getFile();
          })
        );
        addFiles(dropped);
      } catch {
        setFileError('We couldn’t read these files. Please try again.');
      }
    },
    [addFiles]
  );

  const handleFieldChange = useCallback(
    function handleFieldChange(name: FieldName, value: string) {
      setValues(function updateValues(previous) {
        return { ...previous, [name]: value };
      });
      clearConfirmation();
    },
    [clearConfirmation]
  );

  const handleDateChange = useCallback(
    function handleDateChange(value: CalendarDate | null) {
      setDueDate(value);
      clearConfirmation();
    },
    [clearConfirmation]
  );

  const handleClearDate = useCallback(
    function handleClearDate() {
      setDueDate(null);
      clearConfirmation();
    },
    [clearConfirmation]
  );

  const handleRemoveFile = useCallback(
    function handleRemoveFile(file: File) {
      setFiles(function removeFile(previous) {
        return previous.filter(function keepFile(candidate) {
          return fileKey(candidate) !== fileKey(file);
        });
      });
      clearConfirmation();
    },
    [clearConfirmation]
  );

  const handleSubmit = useCallback(
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (canSubmit) setSubmitted(true);
    },
    [canSubmit]
  );

  const renderDropTarget = useCallback(
    function renderDropTarget({ isDropTarget }: DropZoneRenderProps) {
      return (
        <TextContext.Provider value={null}>
          <Flex
            as="form"
            direction="column"
            gap="lg"
            padding="xl"
            rounding="xl"
            elevation="card"
            aria-labelledby={headingId}
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <Flex direction="column" gap="xs">
              <Heading id={headingId} level={2}>
                Talk with an expert to help with your project goals.
              </Heading>
            </Flex>

            <Fields
              values={values}
              dueDate={dueDate}
              onChange={handleFieldChange}
              onProjectTypeChange={clearConfirmation}
              onDateChange={handleDateChange}
              onClearDate={handleClearDate}
            />

            <AttachedFiles files={files} error={fileError} onSelect={addFiles} onRemove={handleRemoveFile} />

            <Button type="submit" variant="primary" isDisabled={!canSubmit}>
              <Icon icon="calendar" aria-hidden="true" />
              Schedule a Call
            </Button>

            <Text>
              Or call us at <a href="tel:+14803663344">(480) 366-3344</a>
            </Text>

            <Checkbox name="receiveTexts" onChange={clearConfirmation}>
              I want to receive texts from GoDaddy about these products and services.
            </Checkbox>

            {submitted ? (
              <Alert emphasis="success">Demo complete. No information was sent and no call was scheduled.</Alert>
            ) : null}

            <DropOverlay isDropTarget={isDropTarget} />
          </Flex>
        </TextContext.Provider>
      );
    },
    [
      addFiles,
      canSubmit,
      clearConfirmation,
      dueDate,
      fileError,
      files,
      handleClearDate,
      handleDateChange,
      handleFieldChange,
      handleRemoveFile,
      handleSubmit,
      headingId,
      submitted,
      values
    ]
  );

  return (
    <Box padding="xl" className={styles.root}>
      <Grid
        columns="repeat(auto-fit, minmax(min(100%, 30rem), 1fr))"
        gap="2xl"
        alignItems="start"
        className={styles.columns}
      >
        <Flex direction="column" gap="xl" className={styles.visualColumn}>
          <Box
            as="img"
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width}
            height={heroImage.height}
            rounding="xl"
            alignSelf="start"
            className={styles.heroImage}
          />
          <Benefits />
        </Flex>

        <DropZone
          aria-label="Upload project files"
          padding="0"
          alignItems="stretch"
          justifyContent="start"
          className={styles.dropZone}
          getDropOperation={handleDropOperation}
          onDrop={handleDrop}
        >
          {renderDropTarget}
        </DropZone>
      </Grid>
    </Box>
  );
}
