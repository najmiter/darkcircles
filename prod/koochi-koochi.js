function shinkalaka() {
    const ques = document.querySelectorAll(".que");
    if (!ques) return;

    ques.forEach((que) => {
        que.style.position = "relative";
        const question = que.querySelector(".qtext")?.textContent;

        const answer = que.querySelector(".ablock").textContent;

        const container = document.createElement("div");
        const indication = document.createElement("p");
        const copyBtn = document.createElement("div");

        copyBtn.classList.add("LMS-shinkalaka");
        container.classList.add("LMS-shinkalaka-container");

        copyBtn.textContent = "Copy";
        container.append(copyBtn, indication);

        let id;
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(`${question}\n${answer}`);
            indication.textContent = "Copied ✓ 😈";
            clearTimeout(id);
            id = setTimeout(() => (indication.textContent = ""), 4000);
        });

        que.insertAdjacentElement("beforebegin", container);
    });
}

window.onload = function () {
    automate_survey();
    show_da_grades_in_front_of_activity();
    show_grades_summary_on_summary_cards_if_any();
    shinkalaka();
};

function show_grades_summary_on_summary_cards_if_any() {
    const id = setInterval(() => {
        const courses = document.querySelectorAll(".course-summaryitem");

        if (courses.length > 1) {
            courses.forEach((course) => {
                const link = course.querySelector("a");
                const id = new URLSearchParams(new URL(link.href).search).get(
                    "id"
                );

                const gradeBook = `https://lms.uog.edu.pk/grade/report/user/index.php?id=${id}`;

                fetch(gradeBook)
                    .then((res) => res.text())
                    .then((data) => {
                        const doc = new DOMParser().parseFromString(
                            data,
                            "text/html"
                        );

                        const trs = doc.querySelectorAll("table tr");
                        if (trs && trs.length > 0) {
                            const div = document.createElement("div");
                            div.classList.add("LMS-summary-gradebook");
                            course.appendChild(div);

                            const terms = trs[0].querySelectorAll("th");
                            const result =
                                trs[trs.length - 2].querySelectorAll("td");

                            for (const [i, term] of terms.entries()) {
                                const item = document.createElement("div");
                                item.classList.add(
                                    "LMS-summary-gradebook--item"
                                );

                                const title = document.createElement("p");
                                const grade = document.createElement("p");

                                title.textContent = term.textContent;
                                grade.textContent = result[i].textContent;

                                item.append(title, grade);

                                div.appendChild(item);
                            }
                        }
                    });
            });

            clearInterval(id);
        }
    }, 500);
}

function show_da_grades_in_front_of_activity() {
    const activities = document.querySelectorAll(".activity");
    if (activities.length > 0) {
        activities.forEach((activity) => {
            const isAss = activity.classList.contains("assign");
            const isQuiz = activity.classList.contains("quiz");
            const isAttenda = activity.classList.contains("attendance");

            if (isAss || isQuiz || isAttenda) {
                const link = activity.querySelector("a").href;
                const div = document.createElement("div");
                div.classList.add("LMS-grades-feedback");
                activity.appendChild(div);
                div.textContent = "fetching results...";

                fetch(link)
                    .then((res) => res.text())
                    .then((data) => {
                        const doc = new DOMParser().parseFromString(
                            data,
                            "text/html"
                        );

                        if (isAttenda) {
                            const td = doc.querySelector(
                                "table tbody tr:last-child td"
                            );
                            if (!td) return;

                            div.classList.add(
                                td.textContent >= 70
                                    ? "LMS-grades-feedback--graded"
                                    : "LMS-grades-feedback--not-graded"
                            );

                            div.textContent = `${td.textContent}%`;
                            div.style.fontWeight = "bold";

                            return;
                        }

                        const selector = isAss
                            ? ".feedback table tbody tr:first-child td"
                            : "#feedback h3";

                        const graded = doc.querySelector(selector);

                        if (graded) {
                            let status = graded.textContent;
                            if (isQuiz) {
                                const pattern = /(\d+\.\d+)\s*\/\s*(\d+\.\d+)/g;
                                const matches = [...status.matchAll(pattern)];
                                status = [
                                    matches[0][1] || 0,
                                    matches[0][2] || 0,
                                ];
                            } else {
                                status = graded.textContent
                                    .replace(/\u00A0/g, "")
                                    .split("/");
                            }

                            const [got, outOf] = status;

                            if (
                                graded.textContent.toLowerCase() ==
                                "Grade of final cannot be displayed as per UoG policy.".toLowerCase()
                            ) {
                                div.textContent =
                                    "UOG policy shareef k tehat abi ye ni dikhaya ja skta! 😐";
                            } else {
                                div.innerHTML = `<div style="">${got}</div><sub><span>/</span><span>${outOf}</span></sub>`;
                            }
                            div.classList.add("LMS-grades-feedback--graded");
                        } else {
                            div.textContent = "Not graded yet!";
                            div.classList.add(
                                "LMS-grades-feedback--not-graded"
                            );
                        }
                    })
                    .catch((bruh) => {
                        div.textContent = "Couldn't get grades :(";
                    });
            }
        });
    }
}

function radio_r_checkboxes_ko_parlor_py_jana_h_unhy_chhuti_dyn() {
    const radios = document.querySelectorAll(`input[type='radio']`);
    const checkboxes = document.querySelectorAll(`input[type='checkbox']`);

    function twinkle_twinkle_pink_stars(img, yes) {
        img.setAttribute(
            "src",
            yes
                ? `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='35px' viewBox='0 -960 960 960' width='35px' fill='%235985E1'%3E%3Cpath d='m429-336 238-237-51-51-187 186-85-84-51 51 136 135ZM216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h528q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm0-72h528v-528H216v528Zm0-528v528-528Z'/%3E%3C/svg%3E`
                : `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='35px' viewBox='0 -960 960 960' width='35px' fill='%23999999'%3E%3Cpath d='M216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h528q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm0-72h528v-528H216v528Z'/%3E%3C/svg%3E`
        );
    }

    function ap_chatkhara_lgwa_ayn(customers) {
        for (const radio of customers) {
            const abbaJaan = radio.parentNode;
            const img = document.createElement("img");
            img.classList.add("radio-x-checkbox-img");
            twinkle_twinkle_pink_stars(img, radio.checked);

            radio.style.visibility = "hidden";
            if (!radio.getAttribute("disabled")) {
                img.addEventListener("click", dimple_queen);
                radio.nextElementSibling?.addEventListener(
                    "click",
                    dimple_queen
                );

                function dimple_queen(e) {
                    e.preventDefault();
                    radio.checked = !radio.checked;

                    if (radio.type === "radio") {
                        for (const radio of customers) {
                            const abbaJaan = radio.parentNode;
                            const img = abbaJaan.querySelector("img");
                            twinkle_twinkle_pink_stars(img, radio.checked);
                        }
                    }

                    twinkle_twinkle_pink_stars(img, radio.checked);
                }
            }

            abbaJaan.insertBefore(img, radio);
        }
    }

    ap_chatkhara_lgwa_ayn(radios);
    ap_chatkhara_lgwa_ayn(checkboxes);
}

function automate_survey() {
    const thing = document.getElementById("resourceobject")?.contentWindow;
    if (thing) {
        const yes = confirm(
            "Looks like you got a survey, do you want to automate it?"
        );

        if (!yes) return;

        const style = document.createElement("style");
        style.innerHTML = `
          html {
            font-family: system-ui, sans-serif;
            color-scheme: dark;
            background-color: #333;
          }
        `;

        thing.document.head.appendChild(style);

        const total_subjects =
            document.querySelectorAll(
                ".metismenu li[data-key=mycourses] ul li.list-group-item"
            )?.length ?? 8;
        let counter = 0;
        const delay = 2000;
        for (; counter < total_subjects * 2; counter++) {
            setTimeout(() => {
                thing.document.querySelectorAll("input").forEach((each) => {
                    if (each.value === "1" || each.value === "225")
                        each.checked = true;
                });

                thing.document.querySelector(`input[type='submit']`).click();
            }, counter * delay);
            thing.document.head.appendChild(style);
        }

        setTimeout(() => {
            document.getElementById("actionmenuaction-6").click();
        }, counter * delay);
    }
}

if (
    /https:\/\/lms\.uog\.edu\.pk\/course\/view.php\?.*/.test(
        window.location.href
    )
) {
    document
        .querySelectorAll("#page-course-view-weeks img[title]")
        ?.forEach((img) => {
            img.style.width = "30px";
            img.style.height = "30px";

            if (
                !img
                    .getAttribute("title")
                    .toLowerCase()
                    .includes("not completed")
            ) {
                img.setAttribute(
                    "src",
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='30px' viewBox='0 -960 960 960' width='30px' fill='%235985E1'%3E%3Cpath d='m429-336 238-237-51-51-187 186-85-84-51 51 136 135ZM216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h528q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm0-72h528v-528H216v528Zm0-528v528-528Z'/%3E%3C/svg%3E"
                );
            } else if (
                img.getAttribute("title").toLowerCase().includes("completed")
            ) {
                img.setAttribute(
                    "src",
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='30px' viewBox='0 -960 960 960' width='30px' fill='%23999999'%3E%3Cpath d='M216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h528q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm0-72h528v-528H216v528Z'/%3E%3C/svg%3E"
                );
            }
        });
}

async function do_da_course_clickable_thing_and_add_progress_for_summary_view() {
    let haventGotProgress = true;

    while (haventGotProgress) {
        Array.from(
            document.getElementsByClassName("course-summaryitem")
        )?.forEach((element, i) => {
            element.addEventListener("click", (e) =>
                e.target.querySelector("a")?.click()
            );

            const progress = document
                .querySelectorAll(".course-summaryitem")
                [i]?.querySelectorAll("div")[14];

            const actualProgress = progress
                ?.querySelector(".progress")
                .querySelector("div")
                .getAttribute("aria-valuenow");

            progress?.style.setProperty(
                "--_progress-now",
                `${actualProgress}%`
            );
            progress?.setAttribute("data-progress", `${actualProgress}%`);

            progress?.style.setProperty(
                "--_loader-color",
                `${actualProgress == 100 ? "green" : "orangered"}`
            );

            haventGotProgress = !Boolean(actualProgress);
        });
        await new Promise((dontmatter) => setTimeout(dontmatter, 1 * 1000));
    }
}

function do_da_favicon_and_the_title_thing() {
    if (document.querySelector(".page-header-headings h1"))
        document.title = `${document.querySelector(".page-header-headings h1").textContent}`;

    const favicon = document.createElement("link");
    favicon.setAttribute("rel", "shortcut icon");
    favicon.setAttribute("type", "image/x-icon");
    favicon.setAttribute(
        "href",
        document.querySelector(".avatars img")?.src ??
            "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>"
    );
    document.querySelector("head").appendChild(favicon);
}

// Handle the login page
if (/https:\/\/lms\.uog\.edu\.pk\/login\/.*/.test(window.location.href)) {
    const welcome = document.querySelector(".welcome");
    if (welcome) {
        document.title = "Welcome back! Login to start learning now!";

        welcome.style.width = "20vw";
        welcome.style.height = "100%";
        welcome.style.backgroundColor = "red !important";
        welcome.style.position = "fixed";
        welcome.style.top = "0";
        welcome.style.left = "0";

        const themBullets = welcome.textContent
            .split("\n")
            .map((line) => line.trim())
            .filter((s) => s);

        let themHTML =
            '<div class="themBulletsContainer"><h2>Instructions</h2><p>Welcome to the thing</p>';
        themBullets.forEach((point, i) => {
            if (i < themBullets.length - 1)
                themHTML += `<div data-number="${i + 1}" class="themBullet">${point.replace("* ", "")}</div>\n`;
        });

        themHTML += "</div>";

        welcome.innerHTML = `
            <div class="themBullets">
                ${themHTML}
            </div>`;

        const loginPanel = document.querySelector("div.logo");
        loginPanel.innerHTML = `<h2 class="loginHeading">Login</h2>`;
    }
}

// Handle the home page
if (/^https:\/\/lms\.uog\.edu\.pk\/my\/.*/.test(window.location.href)) {
    if (document.querySelector(".page-header-headings h1"))
        document.title = `${document.querySelector(".page-header-headings h1").textContent.split(" ")[0]}'s Dashboard`;

    // TODO: make it work without being this weird
    // For when switching between other views
    // we still wanna render the progress
    // and do the rest of the things
    document
        .querySelectorAll('div[data-region="filter"] a.dropdown-item')
        .forEach((filter) => {
            filter.addEventListener("click", (e) => {
                if (
                    e.target.dataset.value === "summary" ||
                    document.querySelector("a.active[data-value='summary']")
                ) {
                    do_da_course_clickable_thing_and_add_progress_for_summary_view();
                }
            });
        });

    do_da_course_clickable_thing_and_add_progress_for_summary_view();

    const gradients = [
        "#348f50, #56b4d3",
        "#000046, #1CB5E0",
        "#9CECFB, #65C7F7, #0052D4",
        "#43C6AC, #F8FFAE",
        "#EECDA3, #EF629F",
        "#3494E6, #EC6EAD",
        "#03001e, #7303c0, #ec38bc, #fdeff9",
        "#FC5C7D, #6A82FB",
        "#f12711, #f5af19",
        "#56ab2f, #a8e063",
        "#FFE000, #799F0C",
    ];

    const id = setInterval(() => {
        const stupidImages = document.querySelectorAll(".summaryimage");
        if (stupidImages.length > 0) {
            stupidImages.forEach((shurliImg, i) => {
                shurliImg.setAttribute(
                    "style",
                    `background-image: linear-gradient(to ${i % 2 ? "left" : "bottom"}, ${gradients[i % gradients.length]})`
                );
            });
            clearInterval(id);
        }
    }, 100);
}

do_da_favicon_and_the_title_thing();
radio_r_checkboxes_ko_parlor_py_jana_h_unhy_chhuti_dyn();
