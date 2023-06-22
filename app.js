const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      roundNo: 0,
      winner: null,
      logs: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      console.log("attack");
      this.roundNo++;
      const attackValue = Math.floor(Math.random() * (50 - 10));
      this.monsterHealth = this.monsterHealth - attackValue;
        this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = Math.floor(Math.random() * (50 - 10));
      this.playerHealth = this.playerHealth - attackValue;
        this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      console.log("special attack");
      this.roundNo++;
      const attackValue = Math.floor(Math.random() * (50 - 10));
      this.monsterHealth = this.monsterHealth - attackValue;
        this.addLogMessage("player", "attack", attackValue);
    },
    healPlayer() {
      console.log("heal player");
      this.roundNo++;
      const healValue = 10;
        this.addLogMessage("player", "heal", healValue);
      if (this.playerHealth > 89) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logs.unshift({
        who: who,
        what: what,
        value: value,
      });
    },
  },
  computed: {
    monsterHealthBar() {
      console.log("Monster");
      return { width: this.monsterHealth + "%" };
    },
    playerHealthBar() {
      return { width: this.playerHealth + "%" };
    },
  },
});
app.mount("#game");
