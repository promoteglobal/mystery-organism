//Finds 1 letter random strands
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//created a mockup strand of 15 dna letters.
const randStrand = mockUpStrand();

//factory function returns specimen num, 1 dna arr, a mutate function, compare dna function, and likely to survive function
const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,

    //mutate returns an dna strand with one mutated dna
    mutate () {  
      const cloneDna = [...this.dna];
      // const currentDna = this.dna;
      const randomi = Math.floor(Math.random() * 15);
      const randomPartDna = cloneDna[randomi];
            let randombase = returnRandBase();

            while(randombase){
	           if(randombase != randomPartDna){
	                break;
                }
                randombase = returnRandBase();
            }
      
            cloneDna[randomi] = randombase;
            return cloneDna;
    },
    //CompareDna compares current specimen with passed in specimen and prints what percent they have in common
    compareDNA (pAequorObj) {
        pAequorObj = {
        	specimenNum: this.specimenNum + 1, 
        	dna: mockUpStrand()
        };
        currentDna = {...this};
        numInCommon = 0;
        for(let i = 0; i < 15; i++) {
        	if(pAequorObj.dna[i] === currentDna.dna[i]) {
                numInCommon++;
        	}
        }
        const percentInCommon = (numInCommon / 15) * 100;
        const twoDeciPerInCommon = percentInCommon.toFixed(2);
        console.log(`Specimen ${currentDna.specimenNum} and ${pAequorObj.specimenNum} have ${twoDeciPerInCommon}% DNA in common.`);
    },

    //will return true if the DnA is at least 60% C or G.  This means the specimen will be likely to survive if true.
    willLikelySurvive () {  
    	currentDna = {...this};
    	survivalGenes = 0;
        for(let i = 0; i < 15; i++) {
            if(currentDna.dna[i] === 'C' || currentDna.dna[i] === 'G') {
            	survivalGenes++;
            }
        }
        const percentToSurvive = (survivalGenes / 15) * 100;
        const twoDeciPerToSurvive = percentToSurvive.toFixed(2);
       if(twoDeciPerToSurvive >= 60) {
       	return true;
       } else {
       	return false;
       }
    }
  };
};

//collect enough samples and return an array of 30 likely to survive specimens.
const thirtyInstances = () => {
	   const thirtySamples = [];
	   let specimenNum = 1;
       let randomMockUpStrand = mockUpStrand();
       let specimenObj = pAequorFactory(specimenNum, randomMockUpStrand);


       while(randomMockUpStrand){
	       const willSurviveTF = specimenObj.willLikelySurvive();
	       if(willSurviveTF){
	       	 thirtySamples.push(specimenObj);
	       	 specimenNum++;
            }
            randomMockUpStrand = mockUpStrand();
          specimenObj = pAequorFactory(specimenNum, randomMockUpStrand);
          if(specimenNum === 31) {
          	return thirtySamples;	
          }
      }
};

//Here you find all 30 likly to survive specimens.
const thirtysurvivableInstances = thirtyInstances();
console.log(thirtysurvivableInstances);


//this is a checker to make sure that all instances are likely to survive.
const arrsTF = thirtysurvivableInstances.map((inst) => inst.willLikelySurvive());
console.log(arrsTF);





