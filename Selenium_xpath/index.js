const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const fs = require("fs");
require("dotenv").config();

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  const appLogs = [];
  try {
    //-----Getting to VEČERNJI----//
    await driver.get("https://www.vecernji.hr/");
    appLogs.push(
      `${new Date().toLocaleTimeString("hr-HR", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })} Successfully navigated to www.vecernji.hr`
    );
    //--------------------------------------------------------//

    //--------Closing modal---------//
    await driver
      .findElement(By.xpath("//button[@id='didomi-notice-agree-button']"))
      .click();
    appLogs.push(
      `${new Date().toLocaleTimeString("hr-HR", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })} Successfully closed modal: clicked on agree button`
    );
    //----------------------------------//

    ///----LOGIN----////
    await driver
      .wait(
        until.elementLocated(By.xpath("//a[@href='/korisnici/login?next=/']")),
        2000
      )
      .click();

    await driver
      .wait(until.elementLocated(By.xpath("//input[@id='id_username']")), 2000)
      .sendKeys(email);

    await driver
      .wait(until.elementLocated(By.xpath("//input[@id='id_password']")), 2000)
      .sendKeys(password);

    await driver
      .wait(
        until.elementLocated(
          By.xpath("//button[@class='button button--beta']")
        ),
        2000
      )
      .click();
    appLogs.push(
      `${new Date().toLocaleTimeString("hr-HR", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })} You have successfully logged in`
    );
    //----------------------------------------------------------------//

    //---------Clicking on search button---------//
    await driver.findElement(By.xpath("//a[@href='/pretraga']")).click();
    appLogs.push(
      `${new Date().toLocaleTimeString("hr-HR", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })} Clicked on search button`
    );
    //----------------------------------------------//

    //-----SEARCHED izbori 2024-----//
    await driver
      .findElement(By.xpath("//input[@placeholder='Upišite traženi pojam...']"))
      .sendKeys("Izbori 2024", Key.RETURN);
    appLogs.push(
      `${new Date().toLocaleTimeString("hr-HR", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })} Entered Search query`
    );
    //----------------------------------------------//

    //-------SEARCH RESULTS-------//
    await driver.wait(
      until.elementLocated(By.xpath("//div[@class='card-group__item']")),
      3000
    );
    appLogs.push(
      `${new Date().toLocaleTimeString("hr-HR", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })} Search results located`
    );

    const searchResults = await driver.findElements(
      By.xpath("//div[@class='card-group__item']")
    );
    appLogs.push(
      `${new Date().toLocaleTimeString("hr-HR", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })} Search results loaded`
    );
    //--------------------------------------------------//

    //-------STORING DATA IN JSON-------//
    const resultsData = [];

    for (const result of searchResults) {
      const titleElement = await result
        .findElement(By.xpath(".//h3[@class='card__title']"))
        .getText();

      const descriptionElement = await result
        .findElement(By.xpath(".//p[@class='card__description']"))
        .getText();

      resultsData.push({ titleElement, descriptionElement });
    }

    const jsonData = JSON.stringify(resultsData);
    fs.writeFileSync("articles.json", jsonData);
    //---------------------------------------------------//

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
    fs.writeFileSync("Application.log", appLogs.join("\n"));
  }
})();
