class Competition {
  constructor(name) {
    this.name = name;
    this.participantsNumber = null;
    this.judjesNumber = null;
    this.judjes = [];
    this.participants = [];
    this.status = "init";
    this.marks = [];
    this.res = [];
    this.container = document.querySelector(".container");
    this.body = document.body;
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
    <h1>${this.name}</h1>
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
    const judjesItems = this.judjes.reduce((acc, item, index) => {
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
      <select class="form__item" name="mark-${i}-${j}" required>
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
    <div class="competitors_table">
    <div class="form_container">
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
        <div class="container container-sm">
          <input type="button" value="+">
          <input class="form__btn" type="submit" form="voteForm" value="Проголосувати">
        </div>
        </form>
        </div>
      </div>
    `;
    //this.container.innerHTML = html;
    this.body.innerHTML = html; 
    const addParticipantBtn = document.querySelector('input[type="button"]');
    addParticipantBtn.addEventListener("click", () => {
      const wrap = document.querySelector("#wrap");
      const index = this.participants.length;
      this.participants.push(`Участник${index + 1}`);
      let formItem = "";
      this.judjes.forEach((judje, j) => {
        formItem += `
      <select class="form__item" name="mark-${index}-${j + 1}" required>
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
      const addedRow = document.createElement("div");
      addedRow.classList.add("row");
      addedRow.innerHTML +=  `
      <input 
        type="text" 
        class="form__item" 
        name="participant-${index}" 
        value="${this.participants[index]}"
        >
      ${formItem}
     `;
      wrap.appendChild(addedRow);
    });
    const voteForm = document.querySelector("#voteForm");
    voteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formObj = Object.fromEntries(formData.entries());
      console.log(formObj);
      for (let i = 0; i < this.participants.length; i++) {
        this.participants[i] = formObj[`participant-${i}`];
      }
      for (let i = 0; i < this.judjes.length; i++) {
        this.judjes[i] = formObj[`judje-${i}`];
      }
      this.marks = getMarks(formObj);
      console.log(this.marks);
      this.setStatus("judgesPoints");
      this.draw();
    });
  }

  judgesPoints() {
    const container = document.querySelector(".container");

    const containerKarpachovPage = document.createElement('div');
    containerKarpachovPage.classList.add('contKarpNotes');
    //заголовок
    const title = document.createElement("h2");
    title.classList.add("form__heading");
    title.textContent = "Oцінка судді";

    const wrap = document.createElement("div");
    wrap.classList.add("wrap", "wrap--special");
    //кнопка результаты голосования
    const button = document.createElement("div");
    button.classList.add("button");
    const link = document.createElement("a");
    link.classList.add("link");
    link.textContent = "Результати голосування";
    button.appendChild(link);

    //таблица
    const table = document.createElement("div");
    table.classList.add("table");

    //шапка таблицы
    const rowSpesial = document.createElement("div");
    rowSpesial.classList.add("row");
    const item = document.createElement("div");
    item.classList.add("item");
    rowSpesial.appendChild(item);
    const span = document.createElement("span");
    span.textContent = "Учасниці/";
    item.appendChild(span);
    const span2 = document.createElement("span");
    span2.textContent = "Суддя";
    item.appendChild(span2);

    const itemJudje = document.createElement("div");
    itemJudje.textContent = "Дмитро Карпачов";
    itemJudje.classList.add("item");
    rowSpesial.appendChild(itemJudje);
    wrap.appendChild(rowSpesial);

    this.participants.forEach((participant, index) => {
      const row = getRow(participant, index);
      wrap.appendChild(row);
    });

    //формирования таблицы
    function getRow(participant, index) {
      const row = document.createElement("div");
      row.classList.add("row");

      const inputText = document.createElement("input");
      inputText.classList.add("item");
      inputText.type = "text";
      inputText.readOnly = "true";
      inputText.placeholder = `Участник${index + 1}`;
      inputText.value = `${participant}`;
      row.appendChild(inputText);

      const selectPoints = document.createElement("select");
      selectPoints.classList.add("item");
      row.appendChild(selectPoints);
      let points = 10;
      for (let i = 1; i <= points; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        selectPoints.add(option);
      }
      return row;
    }

     //запись оценок Дмитрия в массив
      const getJudgeResult = () => {
      const selects = document.querySelectorAll(".wrap--special select");
      const result = [];
      selects.forEach(select => {
        result.push(Number(select.value));
      });
      return result;
    };


    button.addEventListener("click", () => {
      const result = getJudgeResult();
      console.log(result);
      this.res = result;
      this.setStatus("result");
      this.draw();
    });

    this.body.innerHTML = '';
    table.appendChild(wrap);
    table.appendChild(button);

    containerKarpachovPage.appendChild(title);
    containerKarpachovPage.appendChild(table);

    this.body.appendChild(containerKarpachovPage);
  }

  drawResult() {
    const points = totalPoints(this.marks, this.res);
    const standings = getStandings(this.participants, points);
    let compResults = "";
    for(let participant = 0; participant < standings.length; participant++) {
      compResults +=
      `
      <div class="winner">
        <div class="winner_result">${participant + 1}</div>
        <input class="winner_desc" type="text" value=" ${standings[participant].participant} : ${standings[participant].mark}"></input>
      </div>
      `
    }
    let html = "";
    html += `
      <div class="gameResult">
        <h2 class="gameResult__heading">Наші Переможці:</h2>
        <div class="winnerList">${compResults}</div>
      </div>
    `;
    this.body.innerHTML = html; 
  }

  draw() {
    switch (this.status) {
      case "init":
        this.drawInit();
        break;

      case "playing":
        this.drawPlaying();
        break;

      case "judgesPoints":
        this.judgesPoints();
        break;

      case "result":
        this.drawResult();
    }
  }
}

function getMarks(formObj) {
  const keys = Object.keys(formObj).filter((key) => key.startsWith("mark"));
  return keys.reduce((acc, key) => {
    const index = Number(key.split("-")[1]);
    if (acc[index] === undefined) {
      acc[index] = 0;
    }
    acc[index] += Number(formObj[key]);
    return acc;
  }, []);
}

function totalPoints(marks, res) {
  if (marks.length !== res.length) {
    throw new Error("Массивы должны быть одинаковой длины");
  }
  let resultArray = [];

  for (let i = 0; i < res.length; i++) {
    resultArray.push(marks[i] + res[i]);
  }

  return resultArray;
}

function getStandings(participants, marks) {
  const participantsMarks = participants.map((participant, index) => ({
    participant,
    mark: marks[index],
  }));
  return participantsMarks.sort((a, b) => b.mark - a.mark);
}

const competition = new Competition("Супер Мама");
competition.draw();
