import os
import shutil
from pathlib import Path


PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"


def validate_and_copy_screenshots(artifact_directory, workspace):
    artifact_root = Path(artifact_directory)
    if artifact_root.is_symlink() or not artifact_root.is_dir():
        raise SystemExit("Screenshot artifact directory is invalid")
    artifact_root = artifact_root.resolve()
    workspace = Path(workspace).resolve()

    images = list(artifact_root.glob("**/__screenshots__/**/*.png"))
    if not images:
        raise SystemExit("No screenshot PNGs found in artifact")

    for image in images:
        relative = image.relative_to(artifact_root)
        if relative.is_absolute() or ".." in relative.parts:
            raise SystemExit(f"Invalid screenshot path: {relative}")

        source = artifact_root
        for part in relative.parts:
            source /= part
            if source.is_symlink():
                raise SystemExit(f"Screenshot artifact contains a symlink: {relative}")
        if not image.is_file():
            raise SystemExit(f"Not a regular screenshot file: {relative}")
        with image.open("rb") as stream:
            if stream.read(8) != PNG_SIGNATURE:
                raise SystemExit(f"Not a PNG screenshot: {relative}")

        target = workspace
        for part in relative.parts:
            target /= part
            if target.is_symlink():
                raise SystemExit(f"Screenshot destination contains a symlink: {relative}")
        if target.exists() and not target.is_file():
            raise SystemExit(f"Screenshot destination is not a file: {relative}")
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(image, target)

    return len(images)


if __name__ == "__main__":
    validate_and_copy_screenshots(os.environ["SCREENSHOTS_DIR"], Path.cwd())
