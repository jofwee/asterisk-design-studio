"""Build the public portfolio and magazine media from the supplied originals."""

import json
from pathlib import Path
from shutil import copyfile

import pymupdf
from PIL import Image, ImageOps

root = Path("final provided assets")
renders = root / "PORTFOLIO RENDERS"
output = Path("public/images/final-v1")
output.mkdir(parents=True, exist_ok=True)
magazine = pymupdf.open(root / "MAGAZINE/ASTERSK DESIGN STUDIO.pdf")
edition = Path("public/edition")
edition.mkdir(parents=True, exist_ok=True)
copyfile(root / "MAGAZINE/FLIPBOOK MAGAZINE.html", edition / "asterisk-magazine.html")


def source_image(path):
    with Image.open(path) as image:
        return ImageOps.exif_transpose(image).convert("RGBA")


def page_image(number, region=None, scale=2):
    page = magazine[number - 1]
    pixmap = page.get_pixmap(
        matrix=pymupdf.Matrix(scale, scale),
        clip=pymupdf.Rect(*region) if region else None,
        alpha=False,
    )
    return Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)


def save(image, name, size=(1600, 1600), quality=84):
    image.thumbnail(size, Image.Resampling.LANCZOS)
    if image.mode == "RGBA":
        white = Image.new("RGB", image.size, "white")
        white.paste(image, mask=image.getchannel("A"))
        image = white
    image.save(output / f"{name}.webp", quality=quality, method=4)
    return {"src": f"/images/final-v1/{name}.webp", "width": image.width, "height": image.height}


projects = {
    "guevara-heights": [
        "GUEVARA HEIGHTS (residential)/Scene 4 (2).png",
        "GUEVARA HEIGHTS (residential)/66f61b22-a9e0-4d92-896b-c6a972210a0f.jpg",
        "GUEVARA HEIGHTS (residential)/3D View 12.jpg",
        "GUEVARA HEIGHTS (residential)/master berdroom.jpg",
    ],
    "polilo-residence": [
        f"Polillo _ Residential/{name}" for name in
        ("Image(10).png", "Image(12) (1).png", "Image(13).png", "Image(15).png", "Image(4) (1).png", "Image(7).png")
    ],
    "kirigun-residence": ["ADASDSAF.jpg", "okay na _tong exterior na _to.jpeg"],
    "victorian-heights": ["Exterior Perspective.png"],
    "plumeria": ["COMMUNITY MARKET.png"],
    "siloy": ["SILOY (airport)/1766228275762.jpg"] + [
        f"SILOY (airport)/{file.name}"
        for file in sorted((renders / "SILOY (airport)").iterdir())
        if file.name != "1766228275762.jpg" and file.suffix.lower() in (".png", ".jpg", ".jpeg")
    ],
}
media = {}
for slug, files in projects.items():
    media[slug] = [save(source_image(renders / name), f"{slug}-{i}") for i, name in enumerate(files, 1)]
media["monreal-residence-1"] = [save(page_image(25, (42, 481, 546, 776), 2.8), "monreal-residence-1")]
media["monreal-residence-2"] = [save(page_image(27, (42, 481, 546, 776), 2.8), "monreal-residence-2")]
media["saluhan"] = [save(page_image(29, (201, 248, 524, 447), 3), "saluhan-1")]

team_files = {
    "capuras": "ROM-1", "nialda": "WJ-2", "murias": "THARA-1",
    "guevara": "ALEX-2", "aspuria": "EJ-1", "fajilagutan": "DEX-2",
}
portraits = {}
for key, suffix in team_files.items():
    photo = source_image(renders / f"PIPOLS/ASTERISK-MAGAZINE{suffix}.png")
    portraits[key] = save(photo, f"team-{key}-tall", (1000, 1450), 88)

plans = {}
for key, name in [
    ("ground", "gfp.png"), ("second", "2nd fp.png"),
    ("overview", "FIRM FLOOR PLAN-Model.png"), ("dimensions", "FP DIMENSIONS.png")
]:
    image = source_image(root / "PLANS" / name)
    bounds = image.getchannel("A").getbbox()
    if bounds:
        image = image.crop(bounds)
    # Preserve linework losslessly and full source dimensions.
    image.save(output / f"plan-{key}.png", optimize=True)
    plans[key] = {"src": f"/images/final-v1/plan-{key}.png", "width": image.width, "height": image.height}

# Use the approved background-removed artwork so regenerating the other assets
# preserves the transparent logo study.
logo_asset = output / "logo-study-transparent.webp"
with Image.open(logo_asset) as logo_image:
    logo = {
        "src": "/images/final-v1/logo-study-transparent.webp",
        "width": logo_image.width,
        "height": logo_image.height,
    }
pages = [save(page_image(n, scale=2.25), f"magazine-{n:02}", (1350, 1900), 86) for n in range(1, len(magazine) + 1)]
Path("src/content/final-media.json").write_text(
    json.dumps({"projects": media, "portraits": portraits, "plans": plans, "logo": logo, "magazine": pages}, indent=2) + "\n",
    encoding="utf-8",
)
