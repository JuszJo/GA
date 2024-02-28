const population = new Array(100);

const target = "hello josh";

class DNA {
    // array of chars
    // genes = Array.from({length: 5}, () => Math.floor(Math.random() * 25 + 10).toString(36));
    genes = Array.from({length: target.length}, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97));

    fitness = 0;

    constructor(genes = this.genes, fitness = this.fitness) {
        this.genes = genes;
        this.fitness = fitness;
    }

    calculateFitness(target) {
        let score = 0;

        for(let i = 0; i < this.genes.length; ++i) {
            if(this.genes[i] == target.charAt(i)) {
                ++score;
            }
        }

        this.fitness = score / target.length;
    }

    crossover(partner) {
        const child = new DNA();

        const midpoint = Math.floor(Math.random() * this.genes.length);

        // Before midpoint copy genes from one
        // parent, after midpoint copy genes from the
        // other parent

        for (let i = 0; i < this.genes.length; i++) {
            if(i > midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }

        return child;

    }
}

function calculateFitness(population, target) {
    for(let i = 0; i < population.length; ++i) {
        population[i].calculateFitness(target);
    }
}

function selection(matingPool) {
    for(let i = 0; i < population.length; ++i) {
        // n is fitness * 100 = integer between 0 and 100
        let n = Math.floor(population[i].fitness * 100);

        for(let j = 0; j < n; ++j) {
            // add current dna to pool n times
            /* const dna = new DNA(population[i].genes, population[i].fitness);

            matingPool.push(dna); */

            matingPool.push(population[i]);
        }
    }
}

function reproduction(matingPool) {
    for (let i = 0; i < population.length; i++) {
        const randomIndexA = Math.floor(Math.random() * matingPool.length);
        const randomIndexB = Math.floor(Math.random() * matingPool.length);
    
        // console.log(randomIndexA, randomIndexB);
    
        const parentA = matingPool[randomIndexA];
        const parentB = matingPool[randomIndexB];
    
        const child = parentA.crossover(parentB);

        population[i] = child;
    
        // console.log(child);
    }
}

function getBest() {
    calculateFitness(population, target);
    
    return population.filter(dna => dna.fitness > 0.6);
}

function main() {
    for(let i = 0; i < population.length; ++i) {
        population[i] = new DNA();

        // console.log(population[i].genes, population[i].fitness);
    }

    for(let gen = 0; gen < 1000; ++gen) {
        calculateFitness(population, target);

        const matingPool = [];

        // selection
        selection(matingPool);

        // reproduction
        reproduction(matingPool);
    }

    console.log(getBest());
}

main();