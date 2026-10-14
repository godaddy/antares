'use client';

import { useId, useState, type ComponentProps, type FormEvent } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  DropZone,
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
import { AttachedFiles } from '../attached-files/index.tsx';
import { Benefits } from '../benefits/index.tsx';
import { type FieldName, Fields } from '../fields/index.tsx';
import { fileKey, isAcceptedFile, MAX_FILE_COUNT, MAX_TOTAL_FILE_SIZE } from '../../data/files.ts';
import styles from './index.module.css';

const initialValues: Record<FieldName, string> = { fullName: '', email: '', phone: '' };
const heroImage = {
  src: 'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" viewBox="0 0 1280 720"%3E%3Crect width="1280" height="720" fill="%23eef2f7"%2F%3E%3Ctext x="640" y="360" fill="%23667085" font-family="sans-serif" font-size="48" text-anchor="middle"%3EProject image%3C%2Ftext%3E%3C%2Fsvg%3E',
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

  function clearConfirmation() {
    setSubmitted(false);
  }

  function addFiles(list: FileList | File[] | null) {
    if (!list?.length) return;

    const incoming = Array.from(list);
    const valid = incoming.filter(isAcceptedFile);

    setFileError(valid.length === incoming.length ? '' : 'Use PDF, JPG, GIF, or PNG files smaller than 256 MiB.');
    if (valid.length === 0) return;

    const unique = new Map(
      files.map(function identify(file) {
        return [fileKey(file), file];
      })
    );

    for (const file of valid) {
      const key = fileKey(file);
      if (!unique.has(key)) unique.set(key, file);
    }

    const nextFiles = Array.from(unique.values());
    const totalSize = nextFiles.reduce(function sumFileSizes(total, file) {
      return total + file.size;
    }, 0);

    if (nextFiles.length > MAX_FILE_COUNT || totalSize > MAX_TOTAL_FILE_SIZE) {
      setFileError('Use up to 10 files with a combined size under 256 MiB.');
      return;
    }

    setFiles(nextFiles);
    clearConfirmation();
  }

  async function handleDrop(event: FormDropEvent) {
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
  }

  function handleFieldChange(name: FieldName, value: string) {
    setValues(function updateValues(previous) {
      return { ...previous, [name]: value };
    });
    clearConfirmation();
  }

  function handleDateChange(value: CalendarDate | null) {
    setDueDate(value);
    clearConfirmation();
  }

  function handleClearDate() {
    setDueDate(null);
    clearConfirmation();
  }

  function handleRemoveFile(file: File) {
    setFiles(function removeFile(previous) {
      return previous.filter(function keepFile(candidate) {
        return fileKey(candidate) !== fileKey(file);
      });
    });
    clearConfirmation();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSubmit) setSubmitted(true);
  }

  return (
    <Box padding="xl" className={styles.root}>
      <Grid columns="repeat(auto-fit, minmax(min(100%, 30rem), 1fr))" gap="2xl" alignItems="start">
        <Flex direction="column" gap="xl">
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
          onDrop={handleDrop}
        >
          {({ isDropTarget }) => (
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
          )}
        </DropZone>
      </Grid>
    </Box>
  );
}
