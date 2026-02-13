from playwright.sync_api import sync_playwright

def verify_friend_update():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8000")

        # Wait for the page to load and signature animation to complete (it takes a few seconds)
        print("Waiting for initial load...")
        page.wait_for_timeout(5000) # Wait for preloader

        # Check title
        title = page.title()
        print(f"Page title: {title}")

        # Check specific text replacements
        # Hero Section
        hero_nickname = page.locator(".hero-name").text_content()
        print(f"Hero Nickname: {hero_nickname}")

        # Check for any "Bestie"
        bestie_count = page.get_by_text("Bestie").count()
        print(f"Occurrences of 'Bestie': {bestie_count}")

        # Check for "Friend"
        friend_count = page.get_by_text("Friend").count()
        print(f"Occurrences of 'Friend': {friend_count}")

        # Take screenshot of Hero Section
        page.screenshot(path="hero_friend.png")
        print("Hero screenshot saved to hero_friend.png")

        # Scroll to Cake Section (Page 4? "pg-cake" is index 3 or 4?)
        # Let's use the navigation logic or just manipulate DOM to show it.
        # It's easier to just take a screenshot of the current view (Hero).

        # Let's try to navigate to the Certificate section if possible.
        # It seems the certificate is in the "Notes" or "Guestbook" section?
        # "Official Friend Certificate" is in `id="friend-cert"`

        # We can force the element into view or just check its text content via locator
        cert_title = page.locator("#friend-cert h3").text_content()
        print(f"Certificate Title: {cert_title}")

        browser.close()

if __name__ == "__main__":
    verify_friend_update()
