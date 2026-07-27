// ------------------------
// Gym Tracker
// Version 1
// ------------------------

const todayDate = document.getElementById("todayDate");

const streak = document.getElementById("streak");

const foodInput = document.getElementById("foodInput");

const foodList = document.getElementById("foodList");

const history = document.getElementById("history");

// Progress Bars

const moodProgress = document.getElementById("moodProgress");
const waterProgress = document.getElementById("waterProgress");
const sleepProgress = document.getElementById("sleepProgress");
const proteinProgress = document.getElementById("proteinProgress");
const consistencyProgress = document.getElementById("consistencyProgress");

// Date

const now = new Date();

todayDate.innerHTML = now.toDateString();

// ---------- Storage ----------

let foods = JSON.parse(localStorage.getItem("foods")) || [];

let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

let streakCount = Number(localStorage.getItem("streak")) || 0;

// ---------- Load ----------

loadFoods();

loadHistory();

updateProgress();

streak.innerHTML = streakCount + " Days";

// ---------- FOOD ----------

foodInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        e.preventDefault();

        if(foodInput.value.trim()==="") return;

        const item={

            text:foodInput.value.trim(),

            time:new Date().toLocaleTimeString([],{

                hour:"2-digit",

                minute:"2-digit"

            }),

            date:new Date().toDateString()

        };

        foods.unshift(item);

        localStorage.setItem("foods",JSON.stringify(foods));

        foodInput.value="";

        loadFoods();

    }

});

// ---------- Load Foods ----------

function loadFoods(){

    foodList.innerHTML="";

    foods.forEach(food=>{

        const div=document.createElement("div");

        div.className="foodItem";

        div.innerHTML=`

        <div class="foodTime">

        🕒 ${food.time}

        </div>

        <div>${food.text}</div>

        `;

        foodList.appendChild(div);

    });

}

// ---------- SAVE STATUS ----------

document.getElementById("saveStatus").onclick=function(){

    const mood=document.getElementById("mood").value;

    const energy=document.getElementById("energy").value;

    const pump=document.getElementById("pump").value;

    const sleep=document.getElementById("sleep").value;

    const water=document.getElementById("water").value;

    localStorage.setItem("status",JSON.stringify({

        mood,

        energy,

        pump,

        sleep,

        water

    }));

    updateProgress();

    alert("Status Saved ✅");

};

// ---------- SAVE WORKOUT ----------

document.getElementById("saveWorkout").onclick=function(){

    const muscles=[];

    document.querySelectorAll(".muscles input:checked").forEach(box=>{

        muscles.push(box.value);

    });

    const workout={

        date:new Date().toDateString(),

        muscles,

        intensity:document.getElementById("intensity").value,

        duration:document.getElementById("duration").value,

        notes:document.getElementById("notes").value

    };

    workouts.unshift(workout);

    localStorage.setItem("workouts",JSON.stringify(workouts));

    streakCount++;

    localStorage.setItem("streak",streakCount);

    streak.innerHTML=streakCount+" Days";

    loadHistory();

    updateProgress();

    alert("Workout Saved 💪");

};

// ---------- HISTORY ----------

function loadHistory(){

    history.innerHTML="";

    workouts.forEach(workout=>{

        const card=document.createElement("div");

        card.className="historyCard";

        card.innerHTML=`

        <h3>${workout.date}</h3>

        <p>

        💪 ${workout.muscles.join(", ")}

        </p>

        <p>

        🔥 ${workout.intensity}

        </p>

        <p>

        ⏱ ${workout.duration} Minutes

        </p>

        <p>

        📝 ${workout.notes || "-"}

        </p>

        `;

        history.appendChild(card);

    });

}

// ---------- PROGRESS ----------

function updateProgress(){

    const status=JSON.parse(localStorage.getItem("status")) || {};

    moodProgress.value=(status.mood || 0)*10;

    waterProgress.value=((status.water || 0)/5)*100;

    sleepProgress.value=(status.sleep || 0)*10;

    proteinProgress.value=0;

    consistencyProgress.value=Math.min(streakCount*5,100);

}

// ---------- Load Status ----------

(function(){

    const status=JSON.parse(localStorage.getItem("status"));

    if(!status) return;

    document.getElementById("mood").value=status.mood;

    document.getElementById("energy").value=status.energy;

    document.getElementById("pump").value=status.pump;

    document.getElementById("sleep").value=status.sleep;

    document.getElementById("water").value=status.water;

})();
if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("sw.js")

        .then(() => {

            console.log("Service Worker Registered");

        })

        .catch(error => {

            console.log(error);

        });

    });

}
