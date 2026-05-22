/*
TOOD:
 - [ ] Add local caching for recent values
 - [ ] Retrieve history on load (if required)
 - [ ] Update page state on button submit
 - [ ] arrange and style buttons
 - [ ] add custom entry form
 */

  $ (() => {
      const currentDate = new Date();
      const todayDateInfo = getDateInfo(currentDate);


      const lastSevenDayInfo = getPreviousDates(currentDate, 7).map(getDateInfo);
    
      const data = [
      { weight: 3, type: "strength"},
      { weight: 1, type: "strength"},
      { weight: -2, type: "strength"},
      { weight: -1, type: "strength"}];
      
      if (false) {
          retrieveHistory()
          .then(responseJson => parseHistory(responseJson))
          .then(history => {
              populateDayHistory(history);

              populateDailyTotal(history);
          });
      }
      console.log(lastSevenDayInfo);
      populateDayHistory(lastSevenDayInfo);
      populateDailyTotal(data);
      createSelectionButtons();
  });

  function retrieveHistory() {
      let url = 'https://api.sheety.co/133b32e7a990e2ebc6f2c10d5797c26f/behaviourTracker/logs';
     return fetch(url)
    .then((response) => response.json());
  }

  function parseHistory(history) {
      // TOOD
  }


  function populateDailyTotal(dailyChoices) {

      
      const $itemTemplate = $("#current-status-item");
      const $ghostItemTemplate = $("#current-status-ghost-item");
      const $positiveBlocks = $("#positive-blocks");
      const $positiveTotal = $("#positive-total");
      const $negativeBlocks = $("#negative-blocks");
      const $negativeTotal = $("#negative-total");

      let positiveTotal = 0;
      let negativeTotal = 0;
      let maxTotal = 0;

      for (choice of dailyChoices) {

          console.log("doing choice " + JSON.stringify(choice));
          let value = choice.weight;
          let $template = populateChoiceTemplate(choice);

          if (value > 0) {
              $positiveBlocks.append($template);
              positiveTotal += value;
          } else {
              $negativeBlocks.append($template);
              negativeTotal += Math.abs(value);
          }
      }

      const difference = positiveTotal - negativeTotal;
      
      if (difference != 0) {
          let ghostBlock = $("#current-status-ghost-item").html();
          ghostBlock = ghostBlock.repeat(Math.abs(difference));
          if (difference < 0) {
              $positiveBlocks.append(ghostBlock);
          } else {
              $negativeBlocks.append(ghostBlock);
          }
      }

      $negativeTotal.text(Math.abs(negativeTotal));
      $positiveTotal.text(positiveTotal);
        
  }

  function populateChoiceTemplate(choice) {
      let template = $("#current-status-item").html();
      template = template.replaceAll("${type}", choice.type);
      template = template.replaceAll("${iconClass}", getIconClass(choice.type));
      let $template = $(template);
      $template.css("flex", Math.abs(choice.weight));

      return $template;
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




  function populateDayHistory(dayInfos) {

      const values = Array.from({ length: dayInfos.length }, () => Math.floor(Math.random() * 5) - 2);

      let $dayContainer = $("#day-container");

      for (let i = 0; i < dayInfos.length; i++) {

          let dayInfo = dayInfos[i];
          let value = values[i];

          let dayTemplate = populateDayHistoryTemplate(dayInfo, value);

          console.log(dayInfo);
          console.log(dayTemplate);
          $dayContainer.append(dayTemplate);
      }
  }
  
  function populateDayHistoryTemplate(dayInfo, value) {
    let dayTemplate = $("#day-template").html();

    const positive = "positive";
    const negative = "negative";
    const empty = "empty";

    let value2 = value == 2 ? positive : empty;
    let value1 = value > 0 ? positive : empty;
    let value_1 = value < 0 ? negative : empty;
    let value_2 = value == -2 ? negative : empty;

    dayTemplate = dayTemplate.replaceAll("${value2}", value2);
    dayTemplate = dayTemplate.replaceAll("${value1}", value1);
    dayTemplate = dayTemplate.replaceAll("${value-1}", value_1);
    dayTemplate = dayTemplate.replaceAll("${value-2}", value_2);
    
    dayTemplate = dayTemplate.replaceAll("${full}", dayInfo.dayName);
    dayTemplate = dayTemplate.replaceAll("${abbr}", dayInfo.dayName.substring(0, 3));
    dayTemplate = dayTemplate.replaceAll("${initial}", dayInfo.dayName.charAt(0));
    return dayTemplate;
  }

  /*
   * Returns an object containing the zeroed Date, a formatted Date and the
   * day initial.
   */
  function getDateInfo(date) {
    let year = date.getFullYear().toString();
    let month = date.getMonth().toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    let actualDate = new Date(year, month, day);
    let actualDateFormat = [year, month, day].join("-");
    let dayName = actualDate.toLocaleDateString(undefined, {weekday: 'long'});

    return {
        date: actualDate,
        formattedDate: actualDateFormat,
        dayName: dayName,
    };
  }

  function getPreviousDates(date, numberOfPriorDays) {
      let result = new Array(numberOfPriorDays);
      for (let i = 0; i < numberOfPriorDays; i++) {

          let newDate = new Date(date);
          newDate.setDate(newDate.getDate() - i - 1);
          result[i] = newDate;
      }

      return result;
  }

  function createSelectionButtons() {
      let template = document.getElementById('behaviour-selector-template');
      let destination = document.getElementById('behaviour-selection');
      for (let behaviourId in BEHAVIOUR_CONFIGS) {

          let behaviour = BEHAVIOUR_CONFIGS[behaviourId];
          for (let choice of behaviour.behaviours) {
              const clone = template.content.cloneNode(true);

              const button = clone.querySelector('button');
              const iconSpan = button.querySelector(".behaviour-icon");
              const descriptionSpan = button.querySelector(".behaviour-description");

              button.id = "behaviour-" + choice.id;
              iconSpan.textContent = choice.icon ?? behaviour.icon;
              descriptionSpan.textContent = choice.description;

              button.addEventListener('click', () => {
                  logChoice(choice);
              });

              destination.append(clone);
          }
      }
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
