import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from urllib.parse import quote
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException, ElementClickInterceptedException

def setup_driver():
    """Set up and return a Selenium WebDriver."""
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")
    options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.178 Safari/537.36"
    )
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    driver.set_page_load_timeout(30)
    return driver

def get_direct_link(driver, link_element):
    """Get direct link from a paper result."""
    try:
        original_window = driver.current_window_handle
        link_element.click()
        time.sleep(3)
        
        # Switch to new tab if opened
        if len(driver.window_handles) > 1:
            for handle in driver.window_handles:
                if handle != original_window:
                    driver.switch_to.window(handle)
                    break
        
        # Wait for page load and get final URL
        WebDriverWait(driver, 10).until(
            lambda d: d.execute_script('return document.readyState') == 'complete'
        )
        final_url = driver.current_url
        
        # Close new tab and switch back
        if len(driver.window_handles) > 1:
            driver.close()
            driver.switch_to.window(original_window)
            
        return final_url if "scholar.google.com" not in final_url else None
    except Exception as e:
        print(f"Error getting direct link: {e}")
        return None

def scrape_google_scholar(query):
    driver = setup_driver()
    try:
        # Add retry mechanism for failed requests
        max_retries = 3
        for retry in range(max_retries):
            try:
                url = f"https://scholar.google.com/scholar?q={query}"
                driver.get(url)
                WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CLASS_NAME, "gs_r"))
                )
                break
            except TimeoutException:
                if retry == max_retries - 1:
                    raise
                time.sleep(2 * (retry + 1))

        research_papers = []
        results = driver.find_elements(By.CLASS_NAME, "gs_r")

        for result in results[:10]:
            try:
                title_element = result.find_element(By.CLASS_NAME, "gs_rt")
                link_elements = title_element.find_elements(By.TAG_NAME, "a")
                
                if not link_elements:
                    continue
                    
                title = title_element.text.replace("[PDF] ", "").replace("[HTML] ", "")
                original_link = link_elements[0].get_attribute("href")
                
                # Get direct link
                direct_link = get_direct_link(driver, link_elements[0])
                link = direct_link if direct_link else original_link
                
                snippet = result.find_element(By.CLASS_NAME, "gs_rs").text if result.find_elements(By.CLASS_NAME, "gs_rs") else "No snippet available"
                authors_text = result.find_element(By.CLASS_NAME, "gs_a").text if result.find_elements(By.CLASS_NAME, "gs_a") else "Unknown"
                year = extract_year(authors_text)

                research_papers.append({
                    "title": title,
                    "link": link,
                    "snippet": snippet,
                    "authors": authors_text,
                    "year": year,
                    "source": "Google Scholar"
                })
            except Exception as e:
                print(f"Error parsing Google Scholar result: {e}")
                continue

        return research_papers
    except Exception as e:
        print(f"Error in Google Scholar scraping: {e}")
        return []
    finally:
        driver.quit()

def get_direct_paper_link(title, source):
    """Get direct link to the research paper."""
    # Check source and handle accordingly
    if source == "arXiv":
        # arXiv links are already direct PDF links
        return title.replace("abs", "pdf") + ".pdf" if "arxiv.org/abs/" in title else None
    elif source == "IEEE Xplore":
        # IEEE links need authentication, return original
        return None
    elif source == "Semantic Scholar":
        # Semantic Scholar links are direct
        return None

    # For Google Scholar results
    driver = setup_driver()
    try:
        url = f"https://scholar.google.com/scholar?q={quote(title)}"
        driver.get(url)
        
        # Wait for results to load
        wait = WebDriverWait(driver, 10)
        result = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "gs_rt")))
        
        # Try to find direct PDF link first
        pdf_links = driver.find_elements(By.XPATH, "//a[contains(text(),'[PDF]')]")
        if pdf_links:
            direct_url = pdf_links[0].get_attribute('href')
            if direct_url and not "scholar.google.com" in direct_url:
                return direct_url

        # If no PDF link, try first result
        link_element = result.find_element(By.TAG_NAME, "a")
        original_window = driver.current_window_handle
        
        try:
            link_element.click()
        except ElementClickInterceptedException:
            driver.execute_script("arguments[0].click();", link_element)
        
        time.sleep(3)

        # Handle multiple tabs/windows
        if len(driver.window_handles) > 1:
            for window_handle in driver.window_handles:
                if window_handle != original_window:
                    driver.switch_to.window(window_handle)
                    WebDriverWait(driver, 10).until(
                        lambda d: d.execute_script('return document.readyState') == 'complete'
                    )
                    break

        final_url = driver.current_url
        
        # Look for PDF download button
        try:
            pdf_button = WebDriverWait(driver, 5).until(EC.presence_of_element_located((
                By.XPATH, 
                "//a[contains(@href,'.pdf')] | //a[contains(text(),'PDF')] | //button[contains(text(),'Download')]"
            )))
            pdf_url = pdf_button.get_attribute('href')
            if pdf_url and pdf_url.endswith('.pdf'):
                return pdf_url
        except:
            pass

        return final_url if not "scholar.google.com" in final_url else None

    except Exception as e:
        print(f"Error getting direct paper link: {e}")
        return None
    finally:
        try:
            driver.quit()
        except:
            pass

def handle_redirects(driver, timeout=10):
    """Handle various types of redirects and wait for page load."""
    try:
        WebDriverWait(driver, timeout).until(
            lambda d: d.execute_script('return document.readyState') == 'complete'
        )
        
        # Check for common redirect elements
        redirect_selectors = [
            "//meta[contains(@http-equiv,'refresh')]",
            "//script[contains(text(),'window.location')]",
            "//a[contains(text(),'Click here if you are not redirected')]"
        ]
        
        for selector in redirect_selectors:
            try:
                element = driver.find_element(By.XPATH, selector)
                if element:
                    time.sleep(2)  # Wait for redirect
                    break
            except:
                continue
                
        return driver.current_url
    except:
        return driver.current_url

def handle_pdf_download(driver, timeout=10):
    """Handle PDF download popups and redirects."""
    try:
        # Wait for any download buttons
        wait = WebDriverWait(driver, timeout)
        download_button = wait.until(EC.presence_of_element_located((
            By.XPATH, 
            "//a[contains(@href,'.pdf')] | //button[contains(text(),'Download')] | //a[contains(text(),'PDF')]"
        )))
        
        if download_button:
            download_url = download_button.get_attribute('href')
            return download_url if download_url else driver.current_url
            
    except Exception:
        return driver.current_url