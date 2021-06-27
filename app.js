function getRandomaNumber (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data(){
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },
    computed: {
        monsterBarStyles(){
            if(this.monsterHealth < 0){
                return {width: '0%'}
            }
           return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
            if(this.playerHealth < 0){
                return {width: '0%'}
            }
           return {width: this.playerHealth + '%'}
        },
        enableSpecialAttack(){
            return this.currentRound%3!==0;
        }
    },
    methods: {
        startGame(){
            this.logMessages=[];
            this.playerHealth=100;
            this.monsterHealth=100;
            this.winner=null;
            this.currentRound=0;
        },
        attackMonster(){
            this.currentRound += 1;
            const attackValue = getRandomaNumber(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLogMessages('player', 'attack', attackValue);
        },
        attackPlayer(){
            const attackValue = getRandomaNumber(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessages('monster', 'attack', attackValue);
        },
        specialAttack () {
            this.currentRound += 1;
            const attackValue = getRandomaNumber(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLogMessages('player', 'attack', attackValue);
        },
        healPlayer(){
            this.currentRound += 1;
            const healValue = getRandomaNumber(8, 20);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue;
            }
            this.attackPlayer();
            this.addLogMessages('player', 'heal', healValue);
        },
        surrender(){
            this.winner='monster';
        },
        addLogMessages(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            }); // instead of push (which adds at the end of the array), unshift adds at the beginning of the array
        }
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = 'draw';
            }else if(value<=0){
                this.winner='monster';
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'draw';
            }else if(value<=0){
                this.winner='player';
            }
        }
    }
});

app.mount('#game');
