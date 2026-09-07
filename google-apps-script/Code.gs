/**
 * কামারপাড়া স্কুল অ্যান্ড কলেজ সুবর্ণ জয়ন্তী ও প্রাক্তন শিক্ষার্থী পুনর্মিলনী
 * Google Apps Script Master Sheet & Google Drive Photo Integration
 * 
 * Master Spreadsheet ID: 1H7GFUB1_no906qPDE6ZmZaahtY_vTTXVv4ba7ZFAV_U
 * Photo Google Drive Folder ID: 1kSVF9ZrWBjexGlqT2owPO2hHUROF94vF
 */

const SPREADSHEET_ID = "1H7GFUB1_no906qPDE6ZmZaahtY_vTTXVv4ba7ZFAV_U";
const DRIVE_FOLDER_ID = "1kSVF9ZrWBjexGlqT2owPO2hHUROF94vF";
const SHEET_NAME = "MasterRegistrations";

// Initialize Sheet with Headers if not exists
function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const headers = [
      "Registration ID",
      "নাম (বাংলা)",
      "Name (English)",
      "এসএসসি ব্যাচ",
      "মোবাইল নম্বর",
      "ইমেইল",
      "বর্তমান পেশা",
      "বর্তমান ঠিকানা",
      "টি-শার্ট সাইজ",
      "অতিথি সংখ্যা",
      "মোট ফি (টাকা)",
      "পেমেন্ট মাধ্যম",
      "প্রেরক মোবাইল",
      "Transaction ID (TrxID)",
      "পেমেন্ট স্ট্যাটাস",
      "Google Drive ছবি লিংক",
      "নিবন্ধনের সময়"
    ];
    
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground("#991B1B")
      .setFontColor("#FFFFFF")
      .setFontWeight("bold")
      .setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }
  return sheet;
}

// Handle POST Requests (Alumni Registration & Photo Upload to Google Drive)
function doPost(e) {
  try {
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      throw new Error("No data received");
    }

    const sheet = getOrCreateSheet();
    const timestamp = new Date().toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" });

    // 1. Save Photo to Google Drive Folder if provided
    let photoDriveUrl = "";
    const rawPhoto = data.photoBase64 || data.photoUrl;
    if (rawPhoto && rawPhoto.indexOf("base64,") !== -1) {
      try {
        const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
        const match = rawPhoto.match(/^data:(image\/[a-zA-Z0-9.+]+);base64,(.+)$/);
        const contentType = match ? match[1] : (data.photoType || "image/jpeg");
        const base64Data = match ? match[2] : rawPhoto.split("base64,")[1];
        const decoded = Utilities.base64Decode(base64Data);
        const safeName = (data.fullNameEn || data.nameEn || "alumni").replace(/[^a-zA-Z0-9]/g, "_");
        const fileName = (data.id || "SJ-2026") + "_" + safeName + "_" + (data.phone || "") + ".jpg";
        const blob = Utilities.newBlob(decoded, contentType, fileName);
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        photoDriveUrl = file.getUrl();
      } catch (driveErr) {
        Logger.log("Google Drive photo upload error: " + driveErr);
      }
    }

    // 2. Append Row to Master Google Sheet
    const row = [
      data.id || "",
      data.fullNameBn || data.nameBn || "",
      data.fullNameEn || data.nameEn || "",
      data.batch || "",
      "'" + (data.phone || ""),
      data.email || "",
      data.profession || "",
      data.address || "",
      data.tShirtSize || data.tShirt || "L",
      data.guestCount || 0,
      data.totalFee || 1000,
      data.paymentMethod || "bkash",
      "'" + (data.senderPhone || ""),
      data.trxId || "",
      data.status || "Pending",
      photoDriveUrl,
      timestamp
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Registration and photo saved successfully",
        id: data.id,
        photoDriveUrl: photoDriveUrl
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: err.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET Requests
function doGet(e) {
  try {
    const sheet = getOrCreateSheet();
    const rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: "success", count: 0, data: [] })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const data = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      data.push({
        id: r[0],
        fullNameBn: r[1],
        fullNameEn: r[2],
        batch: r[3],
        phone: r[4].toString().replace(/^'/, ''),
        email: r[5],
        profession: r[6],
        address: r[7],
        tShirtSize: r[8],
        guestCount: r[9],
        totalFee: r[10],
        paymentMethod: r[11],
        senderPhone: r[12].toString().replace(/^'/, ''),
        trxId: r[13],
        status: r[14],
        photoDriveUrl: r[15] || "",
        createdAt: r[16] || ""
      });
    }

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", count: data.length, data: data })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
