import base64
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


class ValidateScreenshotsTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.artifact = self.root / "artifact"
        self.workspace = self.root / "workspace"
        self.artifact.mkdir()
        self.workspace.mkdir()

    def write_screenshot(self, content=ONE_PIXEL_PNG):
        source = self.artifact / SCREENSHOT
        source.parent.mkdir(parents=True, exist_ok=True)
        source.write_bytes(content)
        return source

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


if __name__ == "__main__":
    unittest.main()
