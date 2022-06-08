class Traveler {
    constructor(name){
        this.name      = name
        this.qtdFood   = 1
        this.isHealthy = true
    }

    hunt(){
        return this.qtdFood += 2
    }

    eat(){
        if(this.qtdFood > 0){
            this.qtdFood -= 1
            return this.isHealthy = true
        }else{
            this.isHealthy = false
            return `${this.name} está sem comida.`
        }
    }
}

class Wagon {
    constructor(number){
        this.capacity    = number
        this.passageiros =[]
    }

    getAvailableSeatCount(){        
        return this.capacity - this.passageiros.length
    }

    join(traveler){
        if(this.getAvailableSeatCount() > 0){
            return this.passageiros.push(traveler)
        }else{
            return "Carroça cheia"
        }
    }

    shouldQuarantine(){
        if(this.passageiros.some(passageiro => passageiro.isHealthy === false)){
            return true
        }else{
            return false
        }
    }

    totalFood(){
        let total = 0
        this.passageiros.forEach(passageiro => {
            return total += passageiro.qtdFood
        })
        return total
    }
}

class Hunter extends Traveler {
    constructor(nome){
        super(nome)
        this.qtdFood = 2
    }

    hunt(){
        return this.qtdFood += 5
    }

    eat(){
        if(this.qtdFood >= 2){
            this.qtdFood -= 2
            return this.isHealthy = true
        }else{
            this.qtdFood = 0
            this.isHealthy = false
            return `${this.name} está sem comida.`
        }
    }

    giveFood(traveler, numOfFoodUnids){
        if(this.qtdFood >= numOfFoodUnids){
            this.qtdFood -= numOfFoodUnids
            return traveler.qtdFood += numOfFoodUnids
        }else{
            return `${this.name} não tem comida suficiente para transferir`
        }
    }
}

class Doctor extends Traveler{
    constructor(nome){
        super(nome)
    }

    heal(traveler){
        return traveler.isHealthy = true
    }
}

// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter); 

wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)

console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);

sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente

console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);