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

Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      life: [
        { check: true, label: "Life" },
        { check: true, label: "Life" },
        { check: true, label: "Life" },
      ],
    };
  },
  methods: {
    randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    attackMonster(min, max) {
      this.monsterHealth -= this.randomNumber(min, max);
    },
    playerAttack() {
      this.playerHealth -= this.randomNumber(
        this.randomNumber(5, 5),
        this.randomNumber(5, 18)
      );
      this.attackMonster(5, 12);
    },
    specialAttack() {
      this.playerHealth -= this.randomNumber(
        this.randomNumber(5, 5),
        this.randomNumber(15, 28)
      );
      this.attackMonster(
        this.randomNumber(this.randomNumber(5, 5), this.randomNumber(7, 8)),
        this.randomNumber(this.randomNumber(15, 15), this.randomNumber(25, 38))
      );
    },
    addedHeal(index) {
      if (this.playerHealth < 100 && this.monsterHealth < 100) {
        let fountIndex = this.life.find(
          (element, indexElement) => indexElement === index
        );
        if (fountIndex.check !== false) {
          fountIndex.label = "Used";
          fountIndex.check = false;
          this.playerHealth += 20;
          this.monsterHealth += 20;
        }
      }
    },
  },
}).mount(".continer-game");
