function getRandomaNumber (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data(){
        return {
            monsterHealth: 100,
            playerHealth: 100
        }
    },
    computed: {
        monsterBarStyles(){
           return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
           return {width: this.playerHealth + '%'}
        }
    },
    methods: {
        attackMonster(){
            const attackValue = getRandomaNumber(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomaNumber(8, 15);
            this.playerHealth -= attackValue;
        }
    }
});

app.mount('#game');
