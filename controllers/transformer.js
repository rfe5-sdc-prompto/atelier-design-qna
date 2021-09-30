const booleanCheck = (num) => (num === 0 ? false : true);

module.exports = {
  questions: (id, { rows }) => {
    let formattedData = {};
    let resultsData = rows.map((row) => {
      return {
        question_id: row.id,
        question_body: row.body,
        question_date: new Date(parseInt(row.date_written)),
        asker_name: row.asker_name,
        question_helpfulness: row.helpful,
        reported: booleanCheck(row.reported),
        answers: {},
      };
    });
    formattedData.product_id = id;
    formattedData.results = resultsData;
    return formattedData;
  },
  answers: (id, { rows }) => {
    console.log('Rows: ', rows);
    let formattedData = {};
    let resultsData = rows.map((row) => {
      return {
        question_id: row.id,
        question_body: row.body,
        question_date: new Date(parseInt(row.date_written)),
        asker_name: row.asker_name,
        question_helpfulness: row.helpful,
        reported: booleanCheck(row.reported),
        answers: {},
      };
    });
    formattedData.product_id = id;
    formattedData.results = resultsData;
    return formattedData;
  },
};
