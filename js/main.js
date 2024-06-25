class Competition {
  constructor(name) {
    this.name = name;
    this.participantsNumber = null;
    this.judjesNumber = null;
    this.judjes = [];
    this.participants = [];
    this.status = "init";
    this.marks = [];
    this.container = document.querySelector(".container");
  }

  setStatus(state) {
    this.status = state;
  }

  // setPropertyArray(property, number, text) {
  //   for (let i = 0; i < number; i++) {
  //     this[property][i] = `${text}${i + 1}`;
  //   }
  // }

  // setParticipants(participantsNumber) {
  //   this.setPropertyArray("participants", participantsNumber, "Участник");
  // }

  setParticipants(participantsNumber) {
    for (let i = 0; i < participantsNumber; i++) {
      this.participants[i] = `Участник${i + 1}`;
    }
  }

  setJudjes(judjesNumber) {
    for (let i = 0; i < judjesNumber; i++) {
      this.judjes[i] = `Суддя${i + 1}`;
    }
  }


  drawInit() {
    let html = `
    <h1>Супер Мама</h1>
    <h2>Реєстрація суддів та учасниць:</h2>
    <form action="#" class="form-init" id="initForm">
      <h3>Судді:</h3>
      <select class="form__item" name="judjesNumber" id="judjesNumber" required>
       <option label="Кількість" value=""></option>
       <option value="1">1</option>
       <option value="2">2</option>
       <option value="3">3</option>
       <option value="4" selected>4</option>
       <option value="5">5</option>
       <option value="6">6</option>
       <option value="7">7</option>
       <option value="8">8</option>
       <option value="9">9</option>
       <option value="10">10</option>
      </select>
      <h3>Участниці:</h3>
      <select class="form__item" name="participantsNumber" id="participantsNumber" required>
       <option label="Кількість" value=""></option>
       <option value="1">1</option>
       <option value="2">2</option>
       <option value="3" selected>3</option>
       <option value="4">4</option>
       <option value="5">5</option>
       <option value="6">6</option>
       <option value="7">7</option>
       <option value="8">8</option>
       <option value="9">9</option>
       <option value="10">10</option>
      </select>
    `;
    // this.participants.forEach((participant, index) => {
    //   html += ` <input type="text" class="form__item" name="participant-${index}" value="${participant}" placeholder="Введіть ім'я участниці" required>`;
    // });

    html += ` 
      <input class="form__btn" type="submit" value="Зареєструватися" id="start">
      </form>
      `;
    this.container.innerHTML = html;
    const initForm = document.querySelector("#initForm");
    initForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const participantsNumber = document.querySelector("#participantsNumber");
      const judjesNumber = document.querySelector("#judjesNumber");
      this.setParticipants(participantsNumber.value);
      this.setJudjes(judjesNumber.value);
      this.setStatus("playing");
      this.draw();
    });
  }

  drawPlaying() {
    const judjesItems = this.judjes.reduce((acc, item,index) => {
      return (
        acc +
        `<input type="text" class="form__item" name="judje-${index}" value="${item}">`
      );
    }, "");
    let main = "";
    this.participants.forEach((participant, i) => {
      main += `
      <div class="row">
      <input type="text" class="form__item" name="participant-${i}" value="${participant}">
      `;
      this.judjes.forEach((judje, j) => {
        main += `
     <select class="form__item" name="${i}-${j}" required>
      <option label="Бали" value=""></option>
      <option value="1" selected>1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
      `;
      });
      main += "</div>";
    });
    const html = `
   <h2 class="form__heading">Таблиця оцінок</h2>
   <form class="form" id="voteForm">
   <div class="wrap" id="wrap">
      <div class="row">
        <div class="form__item">
          <span>Участниці/</span>
          <span >Судді</span>
        </div>
        ${judjesItems}
      </div>
      ${main}
    </div>
    <input class="form__btn" type="submit" form="voteForm" value="Проголосувати">
    </form>
  `;
    this.container.innerHTML = html;
    const voteForm = document.querySelector("#voteForm");
    voteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formObj = Object.fromEntries(formData.entries());
      // console.log(formObj);
      // console.log(formObj[this.participants[1]]);
      // this.judjes.map((judje, index) => {
      //   this.judjes[index] = formObj[judje];
      // });
      for (let i = 0; i < this.participants.length; i++) {
        this.participants[i] = formObj[`participant-${i}`];
      }
      for (let i = 0; i < this.judjes.length; i++) {
        this.judjes[i] = formObj[`participant-${i}`];
      }
      this.marks = getMarks(formObj);
      this.setStatus("result");
      this.draw();
    });
  }

  drawResult() {
    const standings = getStandings(this.participants, this.marks);
    let html = "";
    standings.forEach(({ participant, mark }) => {
      html += `
      <div>
      <span style="color:#fff; font-size: 5rem">${participant} : ${mark}</span>
      </div>
      `;
    });
    this.container.innerHTML = html;
  }

  draw() {
    switch (this.status) {
      case "init":
        this.drawInit();
        break;

      case "playing":
        this.drawPlaying();
        break;

      case "result":
        this.drawResult();
    }
  }
}

function getMarks(formObj) {
  return Object.keys(formObj).reduce((acc, key) => {
    const index = Number(key.split("-")[0]);
    if (acc[index] === undefined) {
      acc[index] = 0;
    }
    acc[index] += Number(formObj[key]);
    return acc;
  }, []);
}

function getStandings(participants, marks) {
  const participantsMarks = participants.map((participant, index) => ({
    participant,
    mark: marks[index],
  }));
  return participantsMarks.sort((a, b) => b.mark - a.mark);
}

const competition = new Competition("Super mama");
competition.draw();
