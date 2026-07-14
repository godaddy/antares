import { useEffect, useState } from 'react';
import { Button, DropZone, FileTrigger, Flex, Icon, isFileDropItem, Text } from '@godaddy/antares';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

type Preview = { name: string; url?: string };

export function FileUploadExample() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<Preview[]>([]);

  useEffect(
    function buildPreviews() {
      const next: Preview[] = files.map(function toPreview(file) {
        return {
          name: file.name,
          url: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
        };
      });
      setPreviews(next);

      return function revoke() {
        for (const preview of next) {
          if (preview.url) URL.revokeObjectURL(preview.url);
        }
      };
    },
    [files]
  );

  function handleFiles(list: FileList | File[] | null) {
    if (!list) return;
    setFiles(Array.from(list));
  }

  return (
    <Flex direction="column" gap="sm">
      <DropZone
        aria-label="Add files or drag them here"
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
      >
        <FileTrigger acceptedFileTypes={ACCEPTED_TYPES} allowsMultiple onSelect={handleFiles}>
          <Button variant="inline" style={{ fontSize: '0.984rem', fontWeight: 700 }}>
            <Icon icon="add" aria-hidden="true" />
            Add files
          </Button>
        </FileTrigger>
        <Text style={{ fontSize: '0.778rem' }}>The file must be less than 256MB</Text>
      </DropZone>

      <Flex justifyContent="center" gap="xs">
        <Text style={{ fontSize: '0.778rem' }}>Supported formats:</Text>
        <Text as="strong" style={{ fontSize: '0.778rem' }}>
          .pdf, .jpg, .gif, .png
        </Text>
      </Flex>

      {previews.length > 0 ? (
        <Flex gap="sm" wrap="wrap" aria-label="Selected files">
          {previews.map(function renderPreview(preview) {
            return (
              <Flex key={preview.name} direction="column" alignItems="center" gap="xs">
                {preview.url ? (
                  <img
                    src={preview.url}
                    alt={preview.name}
                    style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }}
                  />
                ) : (
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    style={{ width: 64, height: 64, borderRadius: 8, background: '#f5f5f5' }}
                  >
                    <Text style={{ textTransform: 'uppercase' }}>{preview.name.split('.').pop()}</Text>
                  </Flex>
                )}
                <Text maxLines={1} style={{ maxWidth: 64 }}>
                  {preview.name}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      ) : null}
    </Flex>
  );
}
