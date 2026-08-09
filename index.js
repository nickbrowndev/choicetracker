/*
TOOD:
 - [ ] Add local caching for recent values
 - [ ] Retrieve history on load (if required)
 - [ ] Update page state on button submit
 - [ ] arrange and style buttons
 - [ ] add custom entry form
 */
import {BEHAVIOUR_CONFIGS, DAY_MINUTE_OFFSET} from './config.js';
import {DataService} from './api.js';

  const HISTORY = 7;
  const today = Temporal.Now.zonedDateTimeISO();


  const lastSevenDays = getPreviousDates(today, HISTORY);

  const startOfHistory = today.subtract({days: HISTORY}).startOfDay();
  const endOfHistory = today.add({days: 1}).startOfDay().subtract({milliseconds: 1});

  if (true) {
      retrieveAllHistory()
      .then(responseJson => parseHistory(responseJson, startOfHistory.toInstant()))
      .then(history => {
          // sort by date
          // each method filters for appropriate records and calculates
          console.log("hiya");

          const todayDateKey = today.toPlainDate().toString();
          const todayData = history[todayDateKey];
          delete history.todayDateKey;

          populateDayHistory(lastSevenDays, history);

          populateDailyTotal(todayData);
      });
  }
  const values = Array.from({ length: lastSevenDays.length }, () => Math.floor(Math.random() * 5) - 2);

  //populateDayHistory(lastSevenDays, values);
  //populateDailyTotal(data);
  renderSelectionWheel();

  function retrieveAllHistory() {
      return DataService.fetchHistory();
  }

  function parseHistory(data) {

      const days = [...lastSevenDays];
      days.push(today.toPlainDate());

      return groupByLocalDayWithOffset(data, days, DAY_MINUTE_OFFSET);
  }

      // TOOD
      /* 
      [{
        id: 2,
        note: "",
        score: -2,
        strenuous: false,
        timestamp: "2026-05-21T00:52:09.789Z"
        },
        {..}
        ]
      */
      /**
     * Groups an array of objects by day in the local timezone, with a custom minute offset.
     * @param {Object[]} data - The array of objects to group.
     * @param {Temporal.Instant} cutOffInstant - The earliest time that values should be processed. Values before this will be ignored
     * @param {number} offsetMinutes - The boundary offset in minutes (e.g., 180 for 3:00 AM).
     * @returns {Object} An object where keys are 'YYYY-MM-DD' strings and values are arrays of objects.
     */
    function groupByLocalDayWithOffset(data = [], localDays, offsetMinutes = 0) {
      const localTimeZone = Temporal.Now.timeZoneId();
      const offsetDuration = Temporal.Duration.from({ minutes: offsetMinutes });

      /* 
       * Convert array into map, populating a blank object for each day we're interested in
       */
      const dayData = localDays.reduce((acc, obj) => {
          acc[obj.toString()] = { 
                  positiveValues: {
                      normal: 0,
                      strenuous: 0
                  },
                  negativeValues: {
                      normal: 0,
                      strenuous: 0
                  },
                  values: []
              };
          return acc;
      }, {});

      data.forEach(item => {
        const instant = Temporal.Instant.from(item[timestampKey]);
        const localZonedDateTime = instant.toZonedDateTimeISO(localTimeZone);
        const shiftedDateTime = localZonedDateTime.subtract(offsetDuration);
        const dateKey = shiftedDateTime.toPlainDate().toString();

        const dayDataValue = dayData[dateKey];

        if (dayDataValue) {

            const scoreType = item.score > 0 ? "positiveValues" : "negativeValues";
            const otherType = item.strenuous ? "strenuous" : "normal";

            dayDataValue[scoreType][otherType] += item.score;

            dayDataValue.values.push(item);
        }
      });

      return dayData;
    }

  function populateDailyTotal(todayValues) {
      
      const itemTemplate = document.getElementById("current-status-item");
      const ghostItemTemplate = document.getElementById("current-status-ghost-item");
      const positiveBlocks = document.getElementById("positive-blocks");
      const positiveTotalEle = document.getElementById("positive-total");
      const negativeBlocks = document.getElementById("negative-blocks");
      const negativeTotalEle = document.getElementById("negative-total");  

      let positiveTotal = 0;
      let negativeTotal = 0;
      let maxTotal = 0;

      for (const choice of todayValues.values) {

          console.log("doing choice " + JSON.stringify(choice));
          let value = choice.weight;
          let template = populateChoiceTemplate(choice);

          if (value > 0) {
              positiveBlocks.append(template);
              positiveTotal += value;
          } else {
              negativeBlocks.append(template);
              negativeTotal += Math.abs(value);
          }
      }

      const difference = positiveTotal - negativeTotal;
      
      if (difference != 0) {
        let ghostBlock = document.getElementById("current-status-ghost-item");
        const repetitions = Math.abs(difference);

        let parentNode = difference < 0 ? positiveBlocks : negativeBlocks;

        for (let i = 0; i < repetitions; i++) {
            parentNode.append(ghostBlock.content.cloneNode(true));
        }
      }

      negativeTotalEle.textContent = Math.abs(negativeTotal);
      positiveTotalEle.textContent = positiveTotal;
        
  }

  function populateChoiceTemplate(choice) {
      const template = document.getElementById("current-status-item");
      const clone = template.content.cloneNode(true);
      const unitDiv = clone.querySelector('.unit.value');
      const iconElement = clone.querySelector('i');

      unitDiv.classList.add(choice.type);
      iconElement.classList.add(choice.type); 

      return clone;
  }

  function getIconClass(type) {
      let result;
      switch (type) {
          case "strength": result = "fa-dumbbell"; break;
          case "running": result = "fa-person-running"; break;
      }
      return result;
  }

  const mappings = {
    "cake" : "fa-cake-candles",
    "strength" : "fa-dumbell",
    "running": "fa-person-running",
    "squash": "fa-table-tennis-paddle-ball",
    "healthy-snack": "fa-apple-whole",
    "unhealthy-snack": "fa-cookie-bite",
    "sweets": "fa-candy-cane",
    "cycling": "fa-bicycle", 
    "cycle-commuting": "fa-person-biking",
    "early-bed": "fa-bed",
    "pilates": "",
    "mobility" : "",
    "junkfood": "fa-pizza-slice",
    "beer": "fa-beer-mug-empty",
    "ice-cream": "fa-ice-cream"
  };

  function renderSingleIcon(spec) {
    let pack = spec.pack ? spec.pack : "fa-solid";
    let icon = spec.icon;
    
    return `<i class="${pack} ${icon}"></i>`;
  }

  function populateDayHistory(dates, values) {

      let dayContainer = document.getElementById("day-container");

      for (let i = 0; i < dates.length; i++) {

          let date = dates[i];
          let value = values[date.toString()];

          let dayTemplate = populateDayHistoryTemplate(date, value);

          console.log(dayTemplate);
          dayContainer.append(dayTemplate);
      }
  }
  
  function populateDayHistoryTemplate(date, value) {
    let dayTemplate = document.getElementById("day-template").content.cloneNode(true);

    const positive = "positive";
    const negative = "negative";
    const empty = "empty";

    let value2 = value == 2 ? positive : empty;
    let value1 = value > 0 ? positive : empty;
    let value_1 = value < 0 ? negative : empty;
    let value_2 = value == -2 ? negative : empty;

    const scoreMarkers = dayTemplate.querySelectorAll(".status");

    scoreMarkers[0].classList.add(value2);
    scoreMarkers[1].classList.add(value1);
    scoreMarkers[3].classList.add(value_1);
    scoreMarkers[4].classList.add(value_2);
    
    const dayLabels = scoreMarkers[2].querySelectorAll("span");
    dayLabels[0].textContent = date.toLocaleString(undefined, {weekday: 'long'});
    dayLabels[1].textContent = date.toLocaleString(undefined, {weekday: 'short'});
    dayLabels[2].textContent = date.toLocaleString(undefined, {weekday: 'narrow'});

    return dayTemplate;
  }

  function getPreviousDates(zonedDateTime, numberOfPriorDays) {
      let result = new Array(numberOfPriorDays);
      for (let i = 0; i < numberOfPriorDays; i++) {
          result[i] = zonedDateTime.subtract({days: numberOfPriorDays - i}).toPlainDate();
      }

      return result;
  }

const categoryWheel = document.getElementById('category-wheel');
const submenuWheel = document.getElementById('submenu-wheel');

  function renderSelectionWheel() {
      const wheelId = "category-wheel";
      const subWheelId = "submenu-wheel";
      const activeClass = "active";
      const hiddenClass = "hidden";

    const onclickHandler = (e, item) => {

        const clickHandler = (e, item) => {
            alert("clicked submenu" + item.label);
        };
        const cancelHandler = (e) => {
            console.log("cancelling submenu");
            document.getElementById(subWheelId).classList.replace(activeClass, hiddenClass);
            document.getElementById(wheelId).classList.replace(hiddenClass, activeClass);
        }

        if (item.behaviours.length > 1) {

            document.getElementById(wheelId).classList.replace(activeClass,hiddenClass);
            document.getElementById(subWheelId).classList.replace(hiddenClass, activeClass);
        
            drawExplodedWheel(document.getElementById(subWheelId), {items: item.behaviours, onclick: clickHandler, oncancel: cancelHandler}); 
        } else {
            alert("no children");
        }
            
    };
    console.log("hello");
    
    drawExplodedWheel(document.getElementById(wheelId), {items: Object.values(BEHAVIOUR_CONFIGS), onclick: onclickHandler});
  }



// When a primary category slice is clicked:
function transitionToSubMenu(subActionsData) {
  // 1. (Optional) Run your JS loop to populate the #submenu-wheel paths here...
  
  
  
  // 2. Flip the CSS classes to trigger the animation
  categoryWheel.classList.remove('active');
  categoryWheel.classList.add('hidden');

  submenuWheel.classList.remove('hidden');
  submenuWheel.classList.add('active');
}

// When the center "Back" button is clicked to return home:
function transitionToMainMenu() {
  submenuWheel.classList.remove('active');
  submenuWheel.classList.add('hidden');

  categoryWheel.classList.remove('hidden');
  categoryWheel.classList.add('active');
}

  function logChoice(choice) {
      submitLogEntry(choice.id, choice.score, null, choice.isStrenuous);
      //updatePageState(choice);
  }
              
const SPREADSHEET_ID = '1DvetnxdpQCfQp6SWMYRqbN1JIo4hazKae6x_djsiTIk';
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwKMKvT-0CZLIELoEd84hGkv3wIJTnMp7UpnZugwLLsiYed5NdWdqHeK8HHzu4Ou0WcTg/exec';

          /**
 * Submits a logged behavioral event to the Google Sheet database
 * @param {string} behaviorId - The configuration key (e.g., 'pil_missed', 'act_journey')
 * @param {string} metadata - Optional context notes
 */
async function submitLogEntry(id, score, note, isStrenuous) {
    // Capture the absolute truth of the moment in ISO format
    const payload = {
        timestamp: new Date().toISOString(),
        id: id,
        score: score,
        note: note,
        isStrenuous: isStrenuous
    };

    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'cors', // Crucial for crossing domains safely
            headers: {
                'Content-Type': 'text/plain' // Using text/plain avoids restrictive CORS preflight walls in Apps Script
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.status === "success") {
            console.log("Database updated successfully:", result.rowAdded);
            return true;
        } else {
            console.error("Database rejected write:", result.message);
            return false;
        }
    } catch (error) {
        console.error("Network failure pushing log entry:", error);
        return false;
    }
}

const LocalCache = {
    KEY: 'dashboard_history_cache',
    TTL: 1000 * 60 * 10, // Cache expiry window: 10 minutes

    // Retrieve cached array
    get() {
        const rawData = localStorage.getItem(this.KEY);
        if (!rawData) return null;

        try {
            const cache = JSON.parse(rawData);
            // Optional: You can check cache.timestamp here if you want a strict cut-off
            return cache.data;
        } catch (e) {
            console.error("Cache compilation corrupted, purging record.");
            this.clear();
            return null;
        }
    },

    // Save fresh array from Google Sheets
    set(logsArray) {
        const cacheObject = {
            timestamp: Date.now(),
            data: logsArray
        };
        localStorage.setItem(this.KEY, JSON.stringify(cacheObject));
    },

    clear() {
        localStorage.removeItem(this.KEY);
    }
};
