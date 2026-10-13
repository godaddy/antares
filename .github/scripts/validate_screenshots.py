import os
import shutil
from pathlib import Path


PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"
DELETION_MANIFEST = "deleted-screenshots.nul"


def validate_and_copy_screenshots(artifact_directory, workspace):
    artifact_root = Path(artifact_directory)
    if artifact_root.is_symlink() or not artifact_root.is_dir():
        raise SystemExit("Screenshot artifact directory is invalid")
    artifact_root = artifact_root.resolve()
    workspace = Path(workspace).resolve()

    manifest = artifact_root / DELETION_MANIFEST
    if manifest.is_symlink() or not manifest.is_file():
        raise SystemExit("Screenshot deletion manifest is missing or invalid")
    contents = manifest.read_bytes()
    if contents and not contents.endswith(b"\0"):
        raise SystemExit("Screenshot deletion manifest must be NUL-terminated")
    entries = contents[:-1].split(b"\0") if contents else []
    if any(not entry for entry in entries) or len(set(entries)) != len(entries):
        raise SystemExit("Screenshot deletion manifest has empty or duplicate paths")

    deletions = []
    for entry in entries:
        path = os.fsdecode(entry)
        parts = path.split("/")
        if (
            path.startswith("/")
            or "\\" in path
            or any(part in ("", ".", "..") for part in parts)
            or "__screenshots__" not in parts[:-1]
            or not parts[-1].endswith(".png")
        ):
            raise SystemExit(f"Invalid screenshot deletion path: {path}")
        deletions.append((path, Path(*parts)))

    images = list(artifact_root.glob("**/__screenshots__/**/*.png"))
    if not images and not deletions:
        raise SystemExit("No screenshot PNGs found and no screenshot deletions were supplied")

    image_paths = set()
    validated_images = []
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
        image_paths.add(relative.as_posix())
        validated_images.append((image, target))

    deletion_targets = []
    for path, relative in deletions:
        if path in image_paths:
            raise SystemExit(f"Screenshot deletion conflicts with an uploaded screenshot: {path}")
        target = workspace
        for part in relative.parts:
            target /= part
            if target.is_symlink():
                raise SystemExit(f"Screenshot destination contains a symlink: {relative}")
        if not target.is_file():
            raise SystemExit(f"Screenshot deletion target is not an existing file: {relative}")
        deletion_targets.append(target)

    for target in deletion_targets:
        target.unlink()
    for image, target in validated_images:
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(image, target)

    return len(images) + len(deletion_targets)


if __name__ == "__main__":
    validate_and_copy_screenshots(os.environ["SCREENSHOTS_DIR"], Path.cwd())
