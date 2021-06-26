function getRandomaNumber (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data(){
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            draw: null
        }
    },
    computed: {
        monsterBarStyles(){
           return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
           return {width: this.playerHealth + '%'}
        },
        enableSpecialAttack(){
            return this.currentRound%3!==0;
        }
    },
    methods: {
        attackMonster(){
            this.currentRound += 1;
            const attackValue = getRandomaNumber(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomaNumber(8, 15);
            this.playerHealth -= attackValue;
        },
        specialAttack () {
            this.currentRound += 1;
            const attackValue = getRandomaNumber(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
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
