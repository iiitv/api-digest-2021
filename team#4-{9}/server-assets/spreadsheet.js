const nodefetch = require('node-fetch')
const gsheetsAPI = function (sheetId, sheetNumber = 1) {
  const errorObj = {
    hasError: true
  };
  let fetchFunc;

  try {
    fetchFunc = window.fetch;
  } catch (err) {
    fetchFunc = nodefetch;
  }

  try {
    const sheetsUrl = `https://spreadsheets.google.com/feeds/cells/${sheetId}/${sheetNumber}/public/values?alt=json-in-script`;

    return fetchFunc(sheetsUrl)
      .then(response => {
        if (!response.ok) {
          console.log('there is an error in the gsheets response');
          throw new Error('Error fetching GSheet');
        }
        return response.text();
      })
      .then(resultText => {
        const formattedText = resultText
          .replace('gdata.io.handleScriptLoaded(', '')
          .slice(0, -2);
        return JSON.parse(formattedText);
      })
      .catch(err => {
        throw new Error(
          'Failed to fetch from GSheets API. Check your Sheet Id and the public availability of your GSheet.'
        );
      });
  } catch (err) {
    throw new Error(`General error when fetching GSheet: ${err}`);
  }
};

async function getSheetData(id) {
  data = await gsheetsAPI(id)
  a = []
  console.log(Object.keys(data))
  data.feed.entry.forEach(e => {
    a.push(e.content.$t)
  })
  console.log(a)
  j = 0;
  b = []
  c = []
  a.forEach(e => {
    j++;
    c.push(e)
    if (j % 3 == 0) {
      b.push(c)
      c = []
    }
  })
  return b;
}
const dataFunc=async ()=>{
    console.log(await getSheetData('1jVwIwYROOlfD73DRgIdIWCLs2l7dPWIlMNIvYfXZJ0A'))
}
dataFunc()
module.exports = getSheetData