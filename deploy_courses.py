import os
import shutil

TEMPLATE_FILE = "/home/Sachin/pixe website/frontend/app/seo-course/page.tsx"
APP_DIR = "/home/Sachin/pixe website/frontend/app"

TARGETS = [
    "ppc-course",
    "advance-digital-marketing-course",
    "social-media-marketing-course",
    "analytics-course",
    "affiliate-email-marketing-course"
]

def deploy():
    print(f"Reading template from {TEMPLATE_FILE}...")
    with open(TEMPLATE_FILE, "r") as f:
        template_content = f.read()

    for slug in TARGETS:
        target_dir = os.path.join(APP_DIR, slug)
        target_file = os.path.join(target_dir, "page.tsx")
        
        if not os.path.isdir(target_dir):
            print(f"⚠️ Directory not found: {slug}. Skipping.")
            continue

        print(f"Processing {slug}...")

        # Backup existing
        if os.path.exists(target_file):
            backup_file = os.path.join(target_dir, "page.tsx.client")
            print(f"   Backing up to {backup_file}")
            shutil.copy2(target_file, backup_file)

        # Prepare new content
        # Replace the hardcoded slug in getCourse
        # And purely cosmetic: replace function name if we want, but not strictly necessary.
        new_content = template_content.replace('c.slug === "seo-course"', f'c.slug === "{slug}"')
        
        # Write
        print(f"   Writing new page.tsx...")
        with open(target_file, "w") as f:
            f.write(new_content)

    print("✅ Deployment Complete.")

if __name__ == "__main__":
    deploy()
