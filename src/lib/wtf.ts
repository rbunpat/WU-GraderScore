"use server";

let debug = true;

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';

import * as cheerio from "cheerio";

function extractOptionalNumber(title: string) {
    const regex = /ptional\D*(\d+)/i;
    const match = title.match(regex);
    if (match && match[1]) {
      return parseInt(match[1]);
    }
    return null;
}

export async function login(formData: any) {
    const username = formdata.get("username") as string;
    const password = formdata.get("password") as string;

    if (debug) {
        console.log("username", username);
        console.log("password", password);
    }

    const loginFormData = new FormData();
    loginFormData.append("utf8", "✓");
    loginFormData.append("username", username);
    loginFormData.append("password", password);
    loginFormData.append("commit", "Login");

    if (debug) {
        console.log("loginFormData", loginFormData);
    }

    const loginResponse = await fetch("https://posnwu.xyz/login/login", {
        method: "POST",
        body: loginFormData,
    });

    if (debug) {
        console.log("loginResponse", loginResponse);
    }

}