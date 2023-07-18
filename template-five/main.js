let colors_list = document.querySelectorAll(".colors-list li");

if (sessionStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    sessionStorage.getItem("color")
  );
  colors_list.forEach((e) => {
    if (e.dataset.color === sessionStorage.getItem("color")) {
      e.classList.add("active");
    } else {
      e.classList.remove("active");
    }
  });
}
let bkrandom = document.querySelectorAll(".controle-spans span");

let background_state = true;

let background_Interval;

if (sessionStorage.getItem("bg-state")) {
  bkrandom.forEach((el) => {
    el.classList.remove("active");
  });

  if (sessionStorage.getItem("bg-state") === "true") {
    background_state = true;
    document.querySelector(".controle-spans .yes").classList.add("active");
  } else {
    background_state = false;
    document.querySelector(".controle-spans .no").classList.add("active");
  }
}

let settings = document.querySelector(".settings");

let settingsIcon = (document.querySelector(".gear").onclick = function () {
  settings.classList.toggle("visible");
  this.classList.toggle("fa-spin");
});

function random_background() {
  if (background_state == true) {
    let landing = document.querySelector(".landing");
    let arr_images = ["landing", "landing-2", "landing-3"];
    background_Interval = setInterval(() => {
      let randomindex = Math.floor(Math.random() * arr_images.length);
      landing.style[
        "background-image"
      ] = `url("media/${arr_images[randomindex]}.jpg")`;
    }, 1000);
  } else {
    clearInterval(background_Interval);
  }
}

random_background();
colors_list.forEach((e) => {
  e.onclick = function () {
    active_RA(e);

    document.documentElement.style.setProperty(
      "--main-color",
      this.dataset.color
    );
    sessionStorage.setItem("color", this.dataset.color);
  };
});

/* **************/

bkrandom.forEach((span) => {
  span.onclick = function () {
    active_RA(span);
    if (this.dataset.background === "yes") {
      background_state = true;
      sessionStorage.setItem("bg-state", background_state);
      random_background();
    } else {
      background_state = false;
      sessionStorage.setItem("bg-state", background_state);

      clearInterval(background_Interval);
    }
  };
});

let skills = document.querySelector(".skills");

window.onscroll = function () {
  let scrolltopskills = skills.offsetTop;
  let heightskills = skills.offsetHeight;

  let windowHeight = this.innerHeight;
  let windowscroll = this.pageYOffset;

  if (windowscroll > scrolltopskills + heightskills - windowHeight) {
    document.querySelectorAll(".skills .progress span").forEach((e) => {
      e.style.width = e.dataset.progress;
    });
  }
};
let port = document.querySelector(".portfolio");
let myport = document.querySelectorAll(".portfolio span");
let links_arr = [];
let next = document.createElement("span");
next.className = "next-buttom";
next.innerHTML = "Next";
let Open = document.createElement("a");
Open.className = "open";
Open.setAttribute("target", "_blank");
let text_open = document.createElement("i");
text_open.classList.add("fa-thin", "fa-arrow-up-right-from-square");
Open.appendChild(text_open);

let close = document.createElement("span");
close.className = "close";
close.innerHTML = "×";
myport.forEach((e) => {
  links_arr.push(e.dataset.project);
  e.onclick = function () {
    let overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
    let view_cont = document.createElement("div");
    view_cont.className = "controles";
    port.appendChild(view_cont);
    let viewframe = document.createElement("iframe");
    let current_template = e.dataset.project;
    viewframe.setAttribute(
      "src",
      `../templates/${e.dataset.project}/index.html`
    );
    viewframe.className = "view-frame";
    view_cont.appendChild(Open);
    view_cont.appendChild(viewframe);
    view_cont.appendChild(next);
    view_cont.appendChild(close);

    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("next-buttom")) {
        if (links_arr.indexOf(current_template) === links_arr.length - 1) {
          current_template = links_arr[0];
          viewframe.setAttribute(
            "src",
            `../templates/${current_template}/index.html`
          );
        } else {
          current_template = links_arr[links_arr.indexOf(current_template) + 1];
          viewframe.setAttribute(
            "src",
            `../templates/${current_template}/index.html`
          );
        }
      } else if (e.target.classList.contains("close")) {
        document.body.removeChild(overlay);
        port.removeChild(view_cont);
      } else if (e.target.classList.contains("open")) {
        Open.href = `../templates/${current_template}/index.html`;
      }
    });
  };
});
let impoSections_state = true;
let impo_sctions = document.querySelectorAll(".sections-spans span");

if (sessionStorage.getItem("impo-state")) {
  impo_sctions.forEach((el) => {
    el.classList.remove("active");
  });

  if (sessionStorage.getItem("impo-state") === "true") {
    impoSections_state = true;
    document.querySelector(".nav").style.display = "block";
    document.querySelector(".sections-spans .yes").classList.add("active");
  } else {
    impoSections_state = false;
    document.querySelector(".nav").style.display = "none";
    document.querySelector(".sections-spans .no").classList.add("active");
  }
}

impo_sctions.forEach((span) => {
  span.onclick = function () {
    active_RA(span);
    if (this.dataset.background === "yes") {
      impoSections_state = true;
      document.querySelector(".nav").style.display = "block";
      sessionStorage.setItem("impo-state", impoSections_state);
    } else {
      impoSections_state = false;
      document.querySelector(".nav").style.display = "none";
      sessionStorage.setItem("impo-state", impoSections_state);
    }
  };
});

function active_RA(el) {
  el.parentElement.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });
  el.classList.add("active");
}

document.querySelector(".reset").onclick = function () {
  sessionStorage.clear();
  window.location.reload();
};

let minu = document.querySelector(".header ul ");
let bar = document.querySelector(".header .bar");
bar.onclick = function () {
  minu.classList.toggle("visi");
};
document.addEventListener("click", (e) => {
  if (e.target != minu && e.target != bar) {
    if (minu.classList.contains("visi")) {
      minu.classList.remove("visi");
    }
  }
});
minu.onclick = function (e) {
  e.stopPropagation();
};
