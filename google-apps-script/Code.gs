/**
 * কামারপাড়া স্কুল অ্যান্ড কলেজ সুবর্ণ জয়ন্তী ও প্রাক্তন শিক্ষার্থী পুনর্মিলনী
 * Google Apps Script Master Sheet Integration
 * Spreadsheet ID: 1H7GFUB1_no906qPDE6ZmZaahtY_vTTXVv4ba7ZFAV_U
 */

const SPREADSHEET_ID = "1H7GFUB1_no906qPDE6ZmZaahtY_vTTXVv4ba7ZFAV_U";
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

// Handle POST Requests (Alumni Registration Form Submission)
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

    // Row mapping
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
      timestamp
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Registration saved to Google Sheet successfully",
        id: data.id
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

// Handle GET Requests (Fetch All Registrations or Lookup by ID/Phone)
function doGet(e) {
  try {
    const sheet = getOrCreateSheet();
    const rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: "success", count: 0, data: [] })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const headers = rows[0];
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
        createdAt: r[15]
      });
    }

    // Optional query param: ?id=SJ-2026-1001 or ?phone=017XXXXXXXX
    const query = e && e.parameter ? (e.parameter.query || e.parameter.id || e.parameter.phone || "").toLowerCase().trim() : "";
    let filtered = data;
    if (query) {
      filtered = data.filter(item => 
        (item.id && item.id.toLowerCase().includes(query)) ||
        (item.phone && item.phone.includes(query)) ||
        (item.trxId && item.trxId.toLowerCase().includes(query))
      );
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        count: filtered.length,
        data: filtered
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
