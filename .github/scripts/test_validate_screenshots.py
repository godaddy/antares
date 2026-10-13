import base64
import os
import tempfile
import unittest
from pathlib import Path

from validate_screenshots import validate_and_copy_screenshots


ONE_PIXEL_PNG = base64.b64decode(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jf2sAAAAASUVORK5CYII="
)
SCREENSHOT = Path(
    "packages/@godaddy/antares/components/checkbox/test/"
    "__screenshots__/checkbox.visual.test.tsx/screenshot.png"
)
RENAMED_SCREENSHOT = SCREENSHOT.with_name("renamed.png")
DELETION_MANIFEST = "deleted-screenshots.nul"


class ValidateScreenshotsTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.artifact = self.root / "artifact"
        self.workspace = self.root / "workspace"
        self.artifact.mkdir()
        self.workspace.mkdir()
        self.manifest = self.artifact / DELETION_MANIFEST
        self.manifest.write_bytes(b"")

    def write_screenshot(self, content=ONE_PIXEL_PNG, path=SCREENSHOT):
        source = self.artifact / path
        source.parent.mkdir(parents=True, exist_ok=True)
        source.write_bytes(content)
        return source

    def write_deletions(self, *paths):
        self.manifest.write_bytes(b"".join(os.fsencode(path) + b"\0" for path in paths))

    def test_copies_nested_png_preserving_its_path(self):
        self.write_screenshot()

        copied = validate_and_copy_screenshots(self.artifact, self.workspace)

        self.assertEqual(1, copied)
        self.assertEqual(ONE_PIXEL_PNG, (self.workspace / SCREENSHOT).read_bytes())

    def test_rejects_empty_artifact(self):
        with self.assertRaisesRegex(SystemExit, "No screenshot PNGs found"):
            validate_and_copy_screenshots(self.artifact, self.workspace)

    def test_rejects_invalid_png_signature(self):
        self.write_screenshot(b"not a PNG")

        with self.assertRaisesRegex(SystemExit, "Not a PNG screenshot"):
            validate_and_copy_screenshots(self.artifact, self.workspace)

    def test_rejects_symlink_in_artifact_path(self):
        source = self.artifact / SCREENSHOT
        source.parent.mkdir(parents=True, exist_ok=True)
        external = self.root / "external.png"
        external.write_bytes(ONE_PIXEL_PNG)
        source.symlink_to(external)

        with self.assertRaisesRegex(SystemExit, "artifact contains a symlink"):
            validate_and_copy_screenshots(self.artifact, self.workspace)

    def test_rejects_symlink_in_destination_path(self):
        self.write_screenshot()
        destination = self.workspace / SCREENSHOT
        external = self.root / "external"
        external.mkdir()
        destination.parent.parent.mkdir(parents=True, exist_ok=True)
        destination.parent.symlink_to(external, target_is_directory=True)

        with self.assertRaisesRegex(SystemExit, "destination contains a symlink"):
            validate_and_copy_screenshots(self.artifact, self.workspace)

    def test_deletes_obsolete_png_and_copies_renamed_png(self):
        self.write_screenshot(path=RENAMED_SCREENSHOT)
        obsolete = self.workspace / SCREENSHOT
        obsolete.parent.mkdir(parents=True, exist_ok=True)
        obsolete.write_bytes(ONE_PIXEL_PNG)
        self.write_deletions(SCREENSHOT)

        applied = validate_and_copy_screenshots(self.artifact, self.workspace)

        self.assertFalse(obsolete.exists())
        self.assertEqual(ONE_PIXEL_PNG, (self.workspace / RENAMED_SCREENSHOT).read_bytes())
        self.assertEqual(2, applied)

    def test_allows_deletion_only_artifact(self):
        obsolete = self.workspace / SCREENSHOT
        obsolete.parent.mkdir(parents=True, exist_ok=True)
        obsolete.write_bytes(ONE_PIXEL_PNG)
        self.write_deletions(SCREENSHOT)

        applied = validate_and_copy_screenshots(self.artifact, self.workspace)

        self.assertEqual(1, applied)
        self.assertFalse(obsolete.exists())

    def test_rejects_unsafe_deletion_paths(self):
        for path in ("../outside/__screenshots__/evil.png", "packages/other/evil.png"):
            with self.subTest(path=path):
                self.write_screenshot()
                self.write_deletions(path)

                with self.assertRaisesRegex(SystemExit, "Invalid screenshot deletion path"):
                    validate_and_copy_screenshots(self.artifact, self.workspace)

                (self.artifact / SCREENSHOT).unlink()

    def test_rejects_deletion_conflicting_with_uploaded_png(self):
        self.write_screenshot()
        self.write_deletions(SCREENSHOT)

        with self.assertRaisesRegex(SystemExit, "conflicts with an uploaded screenshot"):
            validate_and_copy_screenshots(self.artifact, self.workspace)

    def test_rejects_unterminated_deletion_manifest(self):
        self.write_screenshot()
        self.manifest.write_bytes(os.fsencode(SCREENSHOT))

        with self.assertRaisesRegex(SystemExit, "NUL-terminated"):
            validate_and_copy_screenshots(self.artifact, self.workspace)

    def test_rejects_symlink_in_deleted_screenshot_path(self):
        external = self.root / "external.png"
        external.write_bytes(ONE_PIXEL_PNG)
        obsolete = self.workspace / SCREENSHOT
        obsolete.parent.mkdir(parents=True, exist_ok=True)
        obsolete.symlink_to(external)
        self.write_deletions(SCREENSHOT)

        with self.assertRaisesRegex(SystemExit, "destination contains a symlink"):
            validate_and_copy_screenshots(self.artifact, self.workspace)

        self.assertTrue(external.exists())


if __name__ == "__main__":
    unittest.main()
