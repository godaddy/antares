import { useEffect, useState } from 'react';
import {
  Button,
  DropZone,
  type DropZoneRenderProps,
  FileTrigger,
  Flex,
  Icon,
  isFileDropItem,
  Text
} from '@godaddy/antares';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

type Preview = { name: string; url?: string };

export function ReplaceFileExample() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);

  useEffect(
    function buildPreview() {
      if (!file) {
        setPreview(null);
        return;
      }
      const url = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;
      setPreview({ name: file.name, url });
      return function revoke() {
        if (url) URL.revokeObjectURL(url);
      };
    },
    [file]
  );

  function handleFiles(list: FileList | File[] | null) {
    if (!list) return;
    const f = Array.from(list)[0];
    if (f) setFile(f);
  }

  const isFilled = file !== null;

  return (
    <div style={{ width: 200 }}>
      <DropZone
        aria-label={isFilled ? 'Replace uploaded file' : 'Add a file'}
        getDropOperation={function getDropOperation(types) {
          return ACCEPTED_TYPES.some(function matches(type) {
            return types.has(type);
          })
            ? 'copy'
            : 'cancel';
        }}
        onDrop={async function handleDrop(e) {
          const dropped = await Promise.all(
            e.items.filter(isFileDropItem).map(function getFile(item) {
              return item.getFile();
            })
          );
          handleFiles(dropped);
        }}
        gap="sm"
        style={{ minHeight: 200 }}
      >
        {function renderContent({ isDropTarget }: DropZoneRenderProps) {
          if (isFilled && isDropTarget) {
            return <Text as="strong">Drop to replace</Text>;
          }

          if (isFilled) {
            return (
              <Flex direction="column" alignItems="center" gap="xs">
                {preview?.url ? (
                  <img
                    src={preview.url}
                    alt={preview.name}
                    style={{ width: 64, height: 48, objectFit: 'cover', borderRadius: 4 }}
                  />
                ) : (
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    style={{ width: 64, height: 48, background: '#f5f5f5', borderRadius: 4 }}
                  >
                    <Text style={{ textTransform: 'uppercase' }}>{file?.name.split('.').pop()}</Text>
                  </Flex>
                )}
                <Text maxLines={1} style={{ maxWidth: 96 }}>
                  {file?.name}
                </Text>
                <FileTrigger acceptedFileTypes={ACCEPTED_TYPES} onSelect={handleFiles}>
                  <Button variant="inline">Replace</Button>
                </FileTrigger>
              </Flex>
            );
          }

          return (
            <FileTrigger acceptedFileTypes={ACCEPTED_TYPES} onSelect={handleFiles}>
              <Button
                variant="inline"
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.984rem',
                  fontWeight: 700
                }}
              >
                <Icon icon="add" aria-hidden="true" />
                Add files
              </Button>
            </FileTrigger>
          );
        }}
      </DropZone>
    </div>
  );
}
