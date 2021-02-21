const GSheetReader = require('g-sheets-api');

const options = {
    sheetId: '1jVwIwYROOlfD73DRgIdIWCLs2l7dPWIlMNIvYfXZJ0A',
    sheetNumber: 1,
    returnAllResults: false,
    // filter: {
    //   'department': 'archaeology',
    //   'module description': 'introduction'
    // },
    // filterOptions: {
    //   operator: 'or',
    //   matching: 'loose'
    // }
  }

//  const 

  GSheetReader(options, results => {
    // do something with the results here
    console.log(results)

    results.forEach(element => {
        console.log(`${element.name} ${element.contact} ${element.email}`)
    });
  }).catch(err => {
    // do something with the error message here'
    console.error(err)
  });