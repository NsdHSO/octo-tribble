// const toDoInput = document.getElementById('todo')
// const addButton = document.getElementById('add-button')
// const listForTodo = document.getElementById('list-todo')
// console.log(addButton);
// function addTodo(){
//     const enteredValue = toDoInput.value;
//     const listItem = document.createElement('li');
//     listItem.textContent = enteredValue
//     listForTodo.append(listItem)
//     toDoInput.value = ''
// }

// addButton.addEventListener('click', addTodo)

Vue.createApp({
  data() {
    return {
      goals: [],
      enteredValue: "",
      name: "",
    };
  },
  methods: {
    addTodo() {
      if (this.enteredValue !== "") {
        this.goals.push(this.enteredValue);
        this.enteredValue = "";
      }
    },
    addName(name) {
      this.name = name.target.value;
    },
    submitForm(evn) {
      console.log(evn);
    },
  },
}).mount(".screen__content");

Vue.createApp({
  computed: {
    addNumberComplex() {
      if (this.addNumber < 37) return "Not there yet";
      else if (this.addNumber > 37) return "Too much";
      else return this.addNumber;
    },
  },
  watch: {
    addNumberComplex() {
      const self = this;
      setTimeout(() => {
        self.addNumber = 0;
      }, 5000);
    },
  },
  data() {
    return {
      addNumber: 0,
    };
  },
  methods: {
    addingNumber(enteredValue) {
      this.addNumber += enteredValue;
    },
  },
}).mount(".container-id");

Vue.createApp({
  data() {
    return {
      boxASelected: false,
      boxBSelected: false,
      dataInput: "",
      hiddenP: false,
      styleP: "",
    };
  },
  computed: {
    dataInputs() {
      console.log(this.dataInput);
      if (this.dataInput === "user1") return "bg-danger";
      else {
        return "bg-warning";
      }
    },
  },
  methods: {
    boxSelected(event) {
      if (event === "A") this.boxASelected = !this.boxASelected;
      else if (event === "B") {
        this.boxBSelected = !this.boxBSelected;
      }
    },
    toggleState() {
      this.hiddenP = !this.hiddenP;
    },
  },
}).mount(".screen_content");

Vue.createApp({
  data() {
    return {
      goals: [],
      goal: "",
    };
  },
  methods: {
    addNewGoal() {
      if (this.goal !== "") {
        this.goals.push(this.goal);
        this.goal = "";
      }
    },
    removeGoal(index) {
      this.goals.splice(index, 1);
    },
  },
}).mount(".screen");

const games = Vue.createApp({
  data() {
    return {
      players: [
        {
          name: "Monster",
          health: 100,
        },
        {
          name: "Player",
          health: 100,
        },
      ],
      showLogging: false,
      life: [
        { check: true, label: "Life" },
        { check: true, label: "Life" },
        { check: true, label: "Life" },
      ],
      rounds: 4,
      winner: "",
      log: [],
    };
  },
  methods: {
    findUser(findName) {
      return this.players.find((palyer) => palyer.name === findName);
    },
    showLoggings() {
      console.log("ion");
      this.showLogging = !this.showLogging;
    },
    randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    attackMonster(min, max) {
      let value = this.randomNumber(min, max);
      this.findUser("Monster").health -= value;
      this.addNewEvent("Monster", "attackMonster", value);
      this.rounds--;
    },
    playerAttack() {
      if (this.rounds > 0) {
        let value = this.randomNumber(
          this.randomNumber(5, 5),
          this.randomNumber(5, 18)
        );
        this.findUser("Player").health -= value;
        this.addNewEvent("Player", "playerAttack", value);
        this.attackMonster(
          this.randomNumber(this.randomNumber(5, 5), this.randomNumber(7, 8)),
          this.randomNumber(this.randomNumber(8, 15), this.randomNumber(15, 18))
        );
      }
    },
    specialAttack() {
      if (this.rounds > 0) {
        let valuePlayer = this.randomNumber(
          this.randomNumber(5, 5),
          this.randomNumber(15, 28)
        );
        this.findUser("Player").health -= valuePlayer;
        this.addNewEvent("Player", "specialAttack", valuePlayer);
        this.attackMonster(
          this.randomNumber(this.randomNumber(5, 5), this.randomNumber(7, 8)),
          this.randomNumber(
            this.randomNumber(15, 15),
            this.randomNumber(15, 38)
          )
        );
      }
    },
    addNewEvent(entity, method, value) {
      this.log.push(
        `Entity what make is ${entity} from ${method} with value: ${value}`
      );
    },
    newGame() {
      this.rounds = 4;
      this.findUser("Player").health = 100;
      this.findUser("Monster").health = 100;
      this.life = [
        { check: true, label: "Life" },
        { check: true, label: "Life" },
        { check: true, label: "Life" },
      ];
      this.winner = "";
      this.log = [];
      this.showLogging = false;
    },
    surrender() {
      this.addNewEvent("Monster", "Surrender", 100);
      this.showLogging = true;
      this.findUser("Player").health = 0;
      this.winner = "Monster";
      this.rounds = 0;
    },
    addedHeal(index) {
      if (this.rounds > 0) {
        let fountIndex = this.life.find(
          (element, indexElement) => indexElement === index
        );
        if (fountIndex.check !== false) {
          let counted = this.randomNumber(
            this.randomNumber(5, 6),
            this.randomNumber(5, 20)
          );
          if (this.findUser("Player").health + counted >= 100) {
            this.findUser("Player").health = 100;
            this.addNewEvent("Player", "addedHeal", "100/no Value");
          } else {
            fountIndex.label = "Used";
            fountIndex.check = false;
            this.findUser("Player").health += counted;
            this.addNewEvent("Player", "addedHeal", counted);
          }
          fountIndex.label = "Used";
          fountIndex.check = false;
          this.rounds--;
        }
      }
    },
  },
  watch: {
    rounds() {
      if (this.rounds <= 0) {
        if (this.findUser("Player").health < this.findUser("Monster").health) {
          this.winner = "Monster";
        } else if (
          this.findUser("Player").health > this.findUser("Monster").health
        ) {
          this.winner = "Player";
        } else {
          this.winner = "Equal";
        }

        setTimeout(() => {
          this.newGame();
        }, 2000);
      }
    },
  },
});

games.component("show-clock", {
  props: ["players"],
  template: `
  <div class="card-body" v-for="(item, index) in players" :key="item">
    <h5 class="card-title">{{item.name}} Health</h5>
    <div class="progress card-text" role="progressbar" aria-label="Basic example" aria-valuenow="25"
          aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar" :style="{width: item.health+'%'}"></div>
    </div>
  </div>
  `,
});

games.component("show-round", {
  props:['rounds'],
  template: `
    <div class="card-body d-flex justify-content-center">
    <h3 class="card-title">Round {{rounds}}</h5>
  </div>`,
});
games.mount(".continer-game");
const app = Vue.createApp({}).mount(".vue-behaind");
