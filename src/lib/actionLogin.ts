"use server";

import * as cheerio from "cheerio";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function extractOptionalNumber(title: string) {
  const regex = /ptional\D*(\d+)/i;
  const match = title.match(regex);
  if (match && match[1]) {
    return parseInt(match[1]);
  }
  return null;
}

export interface state {
  message: string;
  myName: string;
  myNontriID: string;
  maxNormalPercent: number;
  maxOptionalPercent: number;
  myNormalPercent: number;
  myOptionalExceed: number;
  myOptionalPercent: number;
  myleftOverScore: number;
  myScoreToDoLeft: number;
  totalscore: number;
  myCurrentScore: number;
  countNormal: number;
  mySumScoreNormal: number;
  fullScoreCount: number;
}

export async function login(prevState: any, formData: any) {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const response = await fetch("https://posnwu.xyz/", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const html = await response.text();

    // Extract authenticity token from the HTML response
    const authenticityTokenRegex = /authenticity_token" value="([^"]+)"/;
    const match = html.match(authenticityTokenRegex);

    const sessionIdHeader = response.headers.get("Set-Cookie");

    let sessionIdValue: string | undefined;
    let authenticityToken: string | undefined;

    if (sessionIdHeader) {
      const sessionIdRegex = /_session_id=([^;]+)/;
      const sessionIdMatch = sessionIdHeader.match(sessionIdRegex);

      if (sessionIdMatch && match) {
        sessionIdValue = sessionIdMatch[1];
        authenticityToken = match[1];
      }
    }

    const loginFormData = new URLSearchParams();

    loginFormData.append("utf8", "✓");
    loginFormData.append("authenticity_token", authenticityToken as string);
    loginFormData.append("login", username);
    loginFormData.append("password", password);
    loginFormData.append("commit", "Login");

    const loginResponse = await fetch("https://posnwu.xyz/login/login", {
      method: "POST",
      body: loginFormData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: `_session_id=${sessionIdValue}`, // Attach session cookie to request headers
      },
      credentials: "include",
    });

    if (!loginResponse.ok) {
      throw new Error("Failed to log in");
    }

    const mainResponse = await fetch("https://posnwu.xyz/main/list", {
      method: "GET",
      headers: {
        Cookie: `_session_id=${sessionIdValue}`,
      },
      credentials: "include",
    });

    const htmlContent = await mainResponse.text();

    if (htmlContent.includes("<b>Welcome to grader</b>")) {
      throw new Error(
        "Login Failed, please check your username and password again"
      );
    } else {
      console.log("Expected content found");
    }

    // Load the HTML content into Cheerio
    const $ = cheerio.load(htmlContent, { decodeEntities: false });

    // Array to store the extracted titles and scores
    const results: { title: string; score: string }[] = [];

    let mySumScoreNormal = 0;
    let mySumScoreOptional = 0;

    let countNormal = 0;
    let countOptional = 0;
    let myName = "";

    let dataUpdateTime = "";

    let submittedCount = 0;
    let fullScoreCount = 0;

    $("tbody tr").each((index, element) => {
      if (index == 0) {
        // const thaiRegex = /[\u0E00-\u0E7F]+/g;
        const matches = $(element)
          .find("td:nth-child(1)")
          .text()
          .trim()
          // .match(thaiRegex);
        // myName = matches && matches.length > 0 ? matches[0] : "";
        myName = matches

        dataUpdateTime = myName.split("\n")[1];
        dataUpdateTime = dataUpdateTime.split(" ")[3];

        myName = myName.split("\n")[0];
        myName = myName.split(".")[0] + " " + myName.split(".")[1];

        return;
      }
      let title = $(element).find("td:nth-child(2)").text().trim();
      let score = $(element).find("td:nth-child(4)").text().trim();

      // If score is not present, default to 0
      if (score === "-") {
        score = "0";
      } else {
        // Extract score from the string
        const scoreMatch = score.match(/score:\s*(\d+)/i);
        if (scoreMatch && scoreMatch[1]) {
          score = scoreMatch[1];
        } else {
          score = "0"; // If score not found, default to 0
        }
      }

      const optionalPoint = extractOptionalNumber(title);
      if (optionalPoint != null && optionalPoint > 0) {
        countOptional += optionalPoint;
        mySumScoreOptional += parseInt(score) * optionalPoint;
      } else {
        countNormal += 1;
        mySumScoreNormal += parseInt(score);
        if (parseInt(score) == 100) {
          fullScoreCount += 1;
          submittedCount += 1;
        } else if (parseInt(score) > 0) {
          submittedCount += 1;
        }
      }
      results.push({ title, score });
    });

    console.log(mySumScoreNormal);

    const maxNormalPercent = 100;
    const maxOptionalPercent = 0;

    const scoreRatio = maxNormalPercent / countNormal;

    // For chart
    const myNormalPercent =
      Math.round(((mySumScoreNormal * scoreRatio) / 100) * 1000) / 1000;
    let myOptionalPercent =
      Math.round(((mySumScoreOptional * scoreRatio) / 100) * 1000) / 1000;

    let myOptionalExceed = 0;

    if (myOptionalPercent >= maxNormalPercent - myNormalPercent) {
      myOptionalExceed = maxNormalPercent - myNormalPercent;
      myOptionalPercent =
        myOptionalPercent - (maxNormalPercent - myNormalPercent);
    } else {
      myOptionalExceed = myOptionalPercent;
      myOptionalPercent = 0;
    }

    let myleftOverScore =
      maxNormalPercent +
      maxOptionalPercent -
      myNormalPercent -
      myOptionalExceed -
      myOptionalPercent;
    if (myleftOverScore < 0) {
      myleftOverScore = 0;
    }

    // For text output
    const myScoreToDoLeft =
      ((maxNormalPercent + maxOptionalPercent) / scoreRatio) * 100 -
      mySumScoreNormal -
      mySumScoreOptional;

    const totalscore =
      ((maxNormalPercent + maxOptionalPercent) / scoreRatio) * 100;
    console.log("totalscore");

    const myCurrentScore = mySumScoreNormal + mySumScoreOptional;

    console.log(
      myNormalPercent,
      myOptionalExceed,
      myOptionalPercent,
      myleftOverScore,
      countNormal,
      submittedCount,
      fullScoreCount,
      totalscore, //corret
      myCurrentScore,
      mySumScoreNormal,
      myScoreToDoLeft // correct
    );
    const realOptionalPercent = myOptionalPercent > 10 ? 10 : myOptionalPercent;
    const leftOverPercent =
      maxNormalPercent +
      maxOptionalPercent -
      myNormalPercent -
      realOptionalPercent;

    const leftOverNormalScore = countNormal * 100 - mySumScoreNormal;
    const leftOverOptionalScore =
      (maxOptionalPercent * 100) / scoreRatio - mySumScoreOptional;

    const result = {
      message: "Success",
      myName,
      myNontriID: username,
      maxNormalPercent,
      myNormalPercent,
      myleftOverScore,
      submittedCount,
      fullScoreCount,
      totalscore,
      myCurrentScore,
      countNormal,
      mySumScoreNormal,
      myScoreToDoLeft,
      dataUpdateTime,
    };
    console.log(result);
    return result;
  } catch (error: any) {
    console.log(error.message);
    console.log(error);
    return {
      message: error.message,
      myName: "",
      myNontriID: "",
      maxNormalPercent: 0,
      myNormalPercent: 0,
      myleftOverScore: 0,
      myScoreToDoLeft: 0,
    };
  }
}
