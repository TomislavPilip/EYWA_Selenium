const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const fs = require("fs");
require("dotenv").config();

(async function logToLinkedIn() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  const email = "tomtomic1989@yahoo.com";
  const password = "phammill1972?";
  const appLogs = [];
  try {
    //-----Getting to LINKEDIN PAGE----//
    await driver.get("https://www.linkedin.com/");
    appLogs.push(
      `${new Date().toLocaleTimeString("hr-HR", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })} Successfully navigated to www.linkedin.com`
    );
    //--------------------------------------------------------//

    //--------LOGIN to Linkedin---------//
    await driver
      .findElement(By.xpath("//input[@id='session_key']"))
      .sendKeys(email);

    await driver
      .findElement(By.xpath("//input[@id='session_password']"))
      .sendKeys(password, Key.RETURN);

    appLogs.push(
      `${new Date().toLocaleTimeString("hr-HR", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })} User successfully logged in`
    );
    await driver.sleep(2000);
    //--------------------------------------------------------//

    //--------Going into VIEW PROFILE---------//
    const profileName = await driver.findElement(
      By.xpath(
        "/html/body/div[6]/div[3]/div/div/div[2]/div/div/div/div/div[1]/div[1]/a/div[2]"
      )
    );
    await profileName.click();
    appLogs.push(
      `${new Date().toLocaleTimeString("hr-HR", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })} User successfully accessed profile page`
    );
    await driver.sleep(1500);
    //--------------------------------------------------------//

    {
      /*await driver
      .findElement(By.xpath("//button[@id='overflow-Add-new-experience']"))
      .click();
    appLogs.push(
      `${new Date().toLocaleTimeString("hr-HR", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })} Clicked on experience section`
    );
  await driver.sleep(2000);*/
    }

    //--------ADDING NEW EXPERIENCE---------//
    await driver
      .findElement(By.xpath('//*[@id="navigation-index-edit-position"]'))
      .click();

    await driver.findElement(
      By.xpath('//*[@id="navigation-add-edit-deeplink-edit-position"]')
    );

    appLogs.push(
      `${new Date().toLocaleTimeString("hr-HR", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })} Experience element located`
    );
    //--------------------------------------------------------//

    await driver.sleep(2000);
  } catch (error) {
    appLogs.push(
      `${new Date().toLocaleTimeString("hr-HR", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })} Error occured ${error.message}`
    );
  } finally {
    await driver.quit();
    appLogs.push(
      `${new Date().toLocaleTimeString("hr-HR", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })} Session over`
    );
    fs.writeFileSync("application.log", appLogs.join("\n"));
  }
})();
