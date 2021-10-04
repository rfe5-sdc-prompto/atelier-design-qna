const booleanCheck = (num) => (num === 0 ? false : true);

const formatQuestions = (id, data) => {
  let formattedData = {};
  let resultsData = data.map((question) => {
    return {
      question_id: question.id,
      question_body: question.body,
      question_date: new Date(parseInt(question.date_written)),
      asker_name: question.asker_name,
      question_helpfulness: question.helpful,
      reported: booleanCheck(question.reported),
      answers: formatQuestionAnswers(question.id, question.answers),
    };
  });
  formattedData.product_id = id;
  formattedData.results = resultsData;
  return formattedData;
};

const formatQuestionAnswers = (id, answers) => {
  let formattedData = {};
  if (!answers) {
    return formattedData;
  }
  if (answers.length === 0) {
    return formattedData;
  }
  let resultsData = answers.map((answer) => {
    return {
      id: answer.id,
      body: answer.body,
      date: new Date(parseInt(answer.date_written)),
      answerer_name: answer.answerer_name,
      helpfulness: answer.helpful,
      photos: formatAnswerPhotos(answer.photos),
    };
  });
  resultsData.forEach((result, index) => {
    formattedData[resultsData[index].id] = result;
  });
  return formattedData;
};

const formatAnswerPhotos = (photos) => {
  let formattedPhotos = [];
  if (photos === undefined) {
    return formattedPhotos;
  }
  if (photos.length === 0) {
    return formattedPhotos;
  }
  photos.forEach((photo) => formattedPhotos.push(photo.photourl));
  return formattedPhotos;
};

// const formatAnswers = (id, page, count, { rows }) => {
//   let formattedData = {
//     question: id,
//     page: page,
//     count: count,
//   };
//   let resultsData = rows.map((row) => {
//     return {
//       answer_id: row.id,
//       body: row.body,
//       date: new Date(parseInt(row.date_written)),
//       answerer_name: row.answerer_name,
//       helpfulness: row.helpful,
//       photos: [],
//     };
//   });
//   formattedData.results = resultsData;
//   return formattedData;
// };

module.exports = {
  questions: formatQuestions,
  // answers: formatAnswers,
};
