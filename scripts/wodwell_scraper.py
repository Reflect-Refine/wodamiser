import os
import time
import requests
import pandas as pd
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from bs4 import BeautifulSoup

# -------------------------------
# 📥 Load Google Sheets URL
# -------------------------------
sheet_url = os.environ["GOOGLE_SHEETS_URL"]
json_path = "service-account.json"  # File is written by GitHub Actions

# -------------------------------
# 📤 Set up Google Sheets client
# -------------------------------
scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name(json_path, scope)
client = gspread.authorize(creds)
sheet = client.open_by_url(sheet_url)
worksheet = sheet.sheet1
worksheet.clear()

# -------------------------------
# 🔁 Scraper config
# -------------------------------
base_url = "https://wodwell.com/wp-json/wodwell/v2/pages/filters/"
headers = {"User-Agent": "Mozilla/5.0"}
categories = [
    {"label": "Hero", "match": "hero wod"},
    {"label": "Girl", "match": "girl wod"},
    {"label": "Benchmark", "match": "benchmark wod"}
]

all_wods = []
seen_urls = set()

def normalise_difficulty(levels):
    level = (levels[0].lower() if levels else "").strip()
    if "elite" in level:
        return "Elite"
    elif "advanced" in level:
        return "Advanced"
    elif "intermediate" in level:
        return "Intermediate"
    elif "beginner" in level:
        return "Beginner"
    return ""

def get_youtube_url(wod_url):
    try:
        res = requests.get(wod_url, headers=headers, timeout=10)
        soup = BeautifulSoup(res.text, "html.parser")
        iframe = soup.find("iframe", src=lambda x: x and "youtube.com/embed" in x)
        if iframe:
            return iframe["src"].replace("/embed/", "/watch?v=")
    except Exception as e:
        print(f"  ⚠️ Failed to fetch YouTube URL from {wod_url}: {e}")
    return ""

# -------------------------------
# 🔍 Scrape all WODs by category
# -------------------------------
for cat in categories:
    print(f"\n🔎 Scraping: {cat['label']} WODs")
    page = 1
    while True:
        print(f"  📄 Page {page}")
        params = {"feeds": "none", "sort": "popular", "paged": page}

        try:
            res = requests.get(base_url, headers=headers, params=params, timeout=10)
            data = res.json()
        except Exception as e:
            print(f"  ❌ Request failed: {e}")
            break

        wods = data.get("wods", [])
        if not wods:
            print("  ✅ No more results.")
            break

        new_count = 0
        for wod in wods:
            posted_by = wod.get("posted_by", {}).get("text", "").lower()
            if cat["match"] not in posted_by:
                continue

            url = wod.get("url")
            if url in seen_urls:
                continue

            seen_urls.add(url)
            new_count += 1

            all_wods.append({
                "Name": wod.get("title", ""),
                "Description": "\n".join(wod.get("workout", [])),
                "Type": wod.get("score_type", ""),
                "Movements": ";".join(wod.get("equipment", [])),
                "Difficulty": normalise_difficulty(wod.get("level", [])),
                "EstimatedTime": wod.get("time_cap", ""),
                "Category": "regular",
                "has_video": wod.get("has_video", False),
                "videoUrl": get_youtube_url(url) if wod.get("has_video", False) else "",
                "thumbnail": wod.get("thumbnail", ""),
                "posted_by": wod.get("posted_by", {}).get("text", "")
            })

        print(f"  ➕ Added {new_count} new {cat['label']} WODs")
        if new_count == 0:
            break
        page += 1
        time.sleep(0.5)

# -------------------------------
# ✅ Upload to Google Sheets
# -------------------------------
print("\n📤 Uploading to Google Sheets...")
df = pd.DataFrame(all_wods)
worksheet.update([df.columns.values.tolist()] + df.values.tolist())
print(f"✅ Uploaded {len(df)} WODs to Google Sheets.")