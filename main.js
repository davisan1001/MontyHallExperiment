/**
 * Author: Adam Davis
 * Date: 2023-03-04
 * Description: A rudementary and easy to read (but not at all efficient), experimental analysis of the Monty Hall problem
 */

let num_wins;
let num_losses;
let strategy_text;

const DOORVALUES = {
    WIN: "win",
    CHOSEN: "Chosen",
    WIN_CHOSEN: "Win & Chosen",
    OPENED: "Opened",
    CLOSED: "Closed"
}

function begin() {
    let num_doors = prompt("How many doors?: ");
    let prompt_strategy = prompt("Enter (1) for 'always switch', & (2) for 'never switch' & (3) for 'randomize': ");
    let num_experiments = prompt("How many times should the experiment be ran: ");

    num_wins = 0;
    num_losses = 0;

    if (prompt_strategy == 1) {
        strategy_text = "Always Switch";
    } else if (prompt_strategy == 2) {
        strategy_text = "Never Switch";
    } else {
        strategy_text = "Randomize Switch";
    }

    for (let iter = 0; iter < num_experiments; iter++) {
        if(prompt_strategy == 3) {
            strategy = Math.floor(Math.random()*2);
        } else {
            strategy = prompt_strategy;
        }
        run_experiment(num_doors, strategy);
    }
    show_results(strategy, num_experiments);
}

function run_experiment(num_doors, strategy) {
    const doors = [];
    // Generate a random number between 0 and num_doors
    let winning_door = Math.floor(Math.random()*num_doors);
    // Pick a random door
    let chosen_door = Math.floor(Math.random()*num_doors);

    // Initialize doors array values for corresponding door
    for (let i = 0; i < num_doors; i++) {
        if (i == winning_door && i == chosen_door) {
            doors.push(DOORVALUES.WIN_CHOSEN);
        } else if (i == winning_door) {
            doors.push(DOORVALUES.WIN);
        } else if (i == chosen_door) {
            doors.push(DOORVALUES.CHOSEN);
        } else {
            doors.push(DOORVALUES.CLOSED);
        }
    }

    // Eliminate all doors that are not the winning or chosen door
    let count = 0;
    for (let i = 0; i < doors.length; i++) {
        if (count < (num_doors-2)) {
            if (doors[i] === DOORVALUES.CLOSED) {
                doors[i] = DOORVALUES.OPENED;
                count++
            }
        } else {
            break;
        }
    }

    // Get remaining valid door
    let remaining_valid_door;
    for (let i = 0; i < doors.length; i++) {
        if (doors[i] === DOORVALUES.CLOSED || doors[i] === DOORVALUES.WIN) {
            remaining_valid_door = i;
        }
    }

    // switch doors (if specified) & update graphic
    if(strategy == 1) { // SWITCH_DOORS
        if (chosen_door == winning_door) {
            doors[chosen_door] = DOORVALUES.WIN;
            chosen_door = remaining_valid_door;
            doors[chosen_door] = DOORVALUES.CHOSEN;
        } else if (chosen_door != winning_door) {
            doors[chosen_door] = DOORVALUES.OPENED;
            chosen_door = winning_door;
            doors[chosen_door] = DOORVALUES.WIN_CHOSEN;
        } else { //This should never occur
            console.log("ERROR");
            return 1;
        }
    } // else: DO NOT SWITCH DOORS


    // Record data
    if(chosen_door == winning_door) {
        num_wins += 1;
    } else {
        num_losses += 1;
    }

    return 0;
}

function show_results(strategy, num_experiments) {
    let num_total_plays = num_wins + num_losses;
    if (num_total_plays != num_experiments) {
        console.log("MAJOR ERROR");
        return 1;
    }

    let percentage_won = (num_wins / num_experiments) * 100;
    
    document.getElementById("details").innerHTML = "Strategy '" + strategy_text + "' & " + "Experiment Size '" + num_experiments + "'";
    //console.log("Strategy '" + strategy_text + "' & experiment size '" + num_experiments + "':");
    document.getElementById("wins").innerHTML = "Wins: " + num_wins;
    //console.log("Wins : " + num_wins);
    document.getElementById("losses").innerHTML = "Losses: " + num_losses;
    //console.log("Losses : " + num_losses);
    document.getElementById("ratio").innerHTML = "Win Ratio : " + percentage_won + "%";
    //console.log("Win Ratio : " + percentage_won + "%");
}

begin();