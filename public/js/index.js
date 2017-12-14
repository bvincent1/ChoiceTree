var selections = [];
const choices = [
  {
    cid: 'q1', // starting choice
    question: 'What kind of car are you looking for?',
    answers:[
      {
        answer: 'Sedan',
        value: '20k'
      },
      {
        answer: 'Crossover',
        value: '40k',
        next: 'q3'
      },
      {
        answer: 'Van',
        value: '30k'
      },
      {
        answer: 'Truck',
        value: '30k',
        next: 'q3'
      }
    ],
    previous: null,
    next: 'q2'
  },
  {
    cid: 'q2',
    question: 'What color',
    answers:[
      {
        answer: 'Red',
        value: '5k'
      },
      {
        answer: 'Blue',
        value: '5k'
      },
      {
        answer: 'Green',
        value: '3K'
      }
    ],
    next: 'q4',
    previous: 'q1'
  },
  {
    cid: 'q3',
    question: 'Drive train?',
    answers:[
      {
        answer: '4WD',
        value: '10k'
      },
      {
        answer: '2WD',
        value: '5k'
      }
    ],
    next: 'q2',
    previous: 'q1'
  },
  {
    cid: 'q4',
    question: 'Hidden Cost',
    answers:[
      {
        answer: 'Yes',
        value: '10k'
      },
      {
        answer: 'No',
        value: '0k'
      }
    ],
    next: 'f1',
    previous: 'q2'
  },
  {
    cid: 'f1',
    final: true
  }
];


// on load

function getChoice(cid) {
  for (choice of choices) {
    if (choice.cid == cid) {
      console.log(choice);
      return choice;
    }
  }

  throw new Error('No CID found:' + cid);
}

function updateFinal(choice) {
  $('.question').text('Sum');
  let finalElement = `<div class="row justify-content-md-center answer"><div class="col-md-auto"><p>${selections.join(' + ')} = ${selections.map((s) => {return Number(s.slice(0, -1))}).reduce((a, b) => a + b, 0)}k</p></div></div>`;
  $('.question').after(finalElement);
}

function updateChoice(choice) {
  if (choice.final) {
    updateFinal(choice);
  }
  else {
    $('.question').text(choice.question);
    for (answer of choice.answers) {
      let value = '';
      if (answer.next) {
        value = answer.value + ':' + answer.next;
      }
      else {
        value = answer.value + ':' + choice.next;
      }

      let answerElement = `<div class="row justify-content-md-center answer"><div class="col-md-auto"><button type="button" class="btn btn-primary" value="${value}">${answer.answer}</button></div></div>`;
      $('.question').after(answerElement);
    }

    $('.answer div button').on('click', (e) => {
      let [value, next] = $(e.target).val().split(':');

      selections.push(value);
      console.log(selections);
      $('.answer').remove();
      updateChoice(getChoice(next));
    });
  }
}

updateChoice(getChoice('q1'));


$('.reset div button').on('click', (e) => {
  console.log('reset');
  selections = [];
  $('.answer').remove();
  updateChoice(getChoice('q1'));
});

$('.question').show();
$('.answer').show();
$('.reset').show();
