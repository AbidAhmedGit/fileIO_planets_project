const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];


function isHabitablePlanets(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol']>0.36 && planet['koi_insol']<1.11 
    && planet['koi_prad']<1.6;
    
};

// function isHabitablePlanets(planet) {
//     return planet['koi_disposition'] === 'CONFIRMED'
//       && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
//       && planet['koi_prad'] < 1.6;
//   }

const stream = fs.createReadStream('kepler_data.csv');
stream
.pipe(parse({
    comment: '#',
    columns: true,
}))
.on('data', (data)=>{
    if (isHabitablePlanets(data)){
        habitablePlanets.push(data);
    }
})

.on('error', (error)=>{console.log(error)})
.on('end', ()=>{
    console.log(`${habitablePlanets.length} habitable planets were found!`)
    console.log();
    console.log(
        habitablePlanets.map((planet)=>{
            // console.log(planet['kepler_name'])
            return planet['kepler_name']
        })
    );
    console.log();
    console.log('done!')
});