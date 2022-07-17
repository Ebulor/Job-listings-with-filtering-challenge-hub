const jobContainer = document.querySelector(".job-container");
const filterContainer = document.querySelector(".filter-container");
const filterDisplay = document.querySelector(".filter-display");
const filterDisplayBtn = document.querySelector(".filter-btn-display");
let jobs;
const main = document.querySelector("main");
const filterList = [];

fetch("data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    createCard(data);
  })
  .catch(function (err) {
    console.log(err);
  });

function createCard(data) {
  for (const offer of data) {
    const elFilters = [];
    const jobOffers = jobContainer.content.cloneNode(true);
    jobOffers.querySelector(".logo").src = offer.logo;
    if (offer.new) {
      jobOffers.querySelector(".header-new").classList.add("visible");
    }
    if (offer.featured) {
      jobOffers.querySelector(".header-featured").classList.add("visible");
    }
    if (offer.new && offer.featured) {
      const companies = jobOffers.querySelectorAll(".profile");
      companies.forEach((company) => {
        company.style.borderLeft = "5px solid var(--DesaturatedDarkCyan)";
      });
    }
    jobOffers.querySelector(".company-name").textContent = offer.company;
    jobOffers.querySelector(".position").textContent = offer.position;
    jobOffers.querySelector(".info-date").textContent = offer.postedAt;
    jobOffers.querySelector(".info-contract").textContent = offer.contract;
    jobOffers.querySelector(".info-location").textContent = offer.location;
    jobOffers.querySelector(".tag-role").textContent = offer.role;
    jobOffers.querySelector(".tag-level").textContent = offer.level;

    elFilters.push(offer.role);
    elFilters.push(offer.level);

    const tags = jobOffers.querySelector(".tag-container");

    for (const language in offer.languages) {
      const langTag = document.createElement("button");
      langTag.textContent = offer.languages[language];
      langTag.classList.add("tag");
      elFilters.push(offer.languages[language]);
      tags.appendChild(langTag);
    }

    for (const tool in offer.tools) {
      const toolTag = document.createElement("button");
      toolTag.textContent = offer.tools[tool];
      toolTag.classList.add("tag");
      elFilters.push(offer.tools[tool]);
      tags.appendChild(toolTag);
    }

    jobOffers.children[0].dataset.tags = elFilters;

    const tagBtns = tags.querySelectorAll(".tag");

    tagBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        addFilter(event.currentTarget.textContent);
      });
    });

    main.append(jobOffers);
  }
  jobs = document.querySelectorAll(".profile");
}

function addFilter(value) {
  const filterEl = filterContainer.content.cloneNode(true);
  filterEl.querySelector(".filter-value").textContent = value;
  if (filterList.includes(value)) {
    return;
  } else {
    filterList.push(value);
    filterEl.querySelector(".remove-btn").addEventListener("click", (event) => {
      removeFilter(event.currentTarget.parentElement);
    });
  }
  filterDisplayBtn.append(filterEl);

  CheckFilter();
  updateFilter();
}
function removeFilter(target) {
  filterDisplayBtn.removeChild(target);
  const tagIndex = filterList.indexOf(target.textContent.trim(), 0);
  filterList.splice(tagIndex, 1);
  CheckFilter();
  updateFilter();
}

const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", () => {
  filterDisplayBtn.innerHTML = "";
  filterList.length = 0;
  CheckFilter();
  updateFilter();
});

function CheckFilter() {
  jobs.forEach((job) => {
    const jobTags = job.dataset.tags.split(",");
    function checkFilters(element) {
      return jobTags.includes(element);
    }

    if (filterList.every(checkFilters)) {
      job.style.display = "flex";
    } else {
      job.style.display = "none";
    }
  });
}

function updateFilter() {
  if (filterList.length > 0) {
    filterDisplay.style.display = "flex";
  } else {
    filterDisplay.style.display = "none";
  }
}
