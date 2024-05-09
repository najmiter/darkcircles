const darkStyles = document.createElement("style");
darkStyles.innerHTML = `
    * {
        background-color: #202020 !important;
        color: #e3e3e3 !important;
        border: none !important;
    }
    
    .course-summaryitem {
        padding: 1rem !important;
        border-radius: 1rem !important;
        position: relative !important;
    }
    
    .course-summaryitem,
    .course-summaryitem * {
        background-color: #2a2a2a !important;
        cursor: pointer;

        transition: background-color 250ms ease !important;
    }

    .course-summaryitem:hover {
        padding: 0 !important;
    }
    .course-summaryitem:hover * {
        background-color: #1a1a1a !important;
    }

    .course-summaryitem:hover > div {
        padding: 1rem !important;
    }

    .course-summaryitem > div,
    .course-summaryitem > div > div {
        gap: 1rem !important;
    }

    .course-summaryitem .border {
        border: none !important;
        border-radius: 10px !important;
    }

    .progress .progress-bar {
        position: relative;
    }

    .course-summaryitem > div > div > div:last-child * {
        display: none !important;
    }

    .course-summaryitem > div > div > div:last-child::after {
        content: '';
        position: absolute !important;
        right: -45% !important;
        top: 50% !important;
        translate: -50% -50% !important;
        width: 100px !important;
        aspect-ratio: 1 !important;
        border-radius: 50% !important;

        background-color: #333 !important;
    }

    .block .block-cards .progress {
        width: 50px !important;
        aspect-ratio: 1 !important;
        background-color: #686868 !important;
    }

    #page-login-index.moove-login #page-wrapper #page,
    #page-login-index.moove-login #page-wrapper #page * {
        background-color: transparent !important;
        z-index: 5;
    }

    #page-login-index.moove-login #page-wrapper #page {
        background-image: url(https://i.imgur.com/j9t9Muy.jpeg) !important;
        background-position: center !important;
        background-size: cover;
        background-repeat: no-repeat;
    }

    #page-login-index.moove-login #page-wrapper #page::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black !important;
        opacity: 0.7;
        z-index: 1;
    }

    .btn-secondary,
    .btn-primary {
        padding: 10px 20px !important;
        border-radius: 10px !important;
        cursor: pointer !important;
        text-transform: uppercase !important;
        font-weight: bold !important;
        transition: background-color 250ms ease !important;
    }
    
    .btn-primary,
    #page-login-index.moove-login #page-wrapper #page .btn-primary {
        background-color: #d47b05 !important;
        color: #222 !important;
    }
    
    .btn-secondary {
        background-color: #0058ad !important;
    }
    
    .btn-primary:hover,
    #page-login-index.moove-login #page-wrapper #page .btn-primary:hover {
        background-color: #ad6200 !important;
    }
    
    .btn-secondary:hover {
        background-color: #00478c !important;
    }

    .text-muted {
        opacity: 0.75 !important;
    }

    #page-login-index.moove-login #page-wrapper #page input {
        background-color: #222 !important;
        border-radius: 10px !important;
    }
    
    #page-login-index.moove-login #page-wrapper #page .input-group {
        margin-block: 10px !important;
        align-items: center;
    }

    #page-header,
    #page-header :is(div, a, h1) {
        background-color: #2f2f2f !important;
    }

    .page-context-header {
        display: flex;
        align-items: center;
    }
    .course-summaryitem > div > div > div:last-child {
        --_progress-now: attr(aria-valuenow);
        position: absolute !important;
        right: 10% !important;
        top: 50% !important;
        translate: -50% -50% !important;
        width: 105px !important;
        aspect-ratio: 1 !important;
        border-radius: 50% !important;

        background-image: conic-gradient(from 0deg, orange var(--_progress-now), transparent 0%); !important;
        aspect-ratio: 1 !important;
    }
`;

async function do_da_course_clickable_thing() {
    while (
        /^https:\/\/lms\.uog\.edu\.pk\/my\/$/.test(window.location.href) &&
        document.getElementsByClassName("course-summaryitem").length <= 1
    ) {
        await new Promise((dontmatter) => setTimeout(dontmatter, 1 * 1000));

        Array.from(
            document.getElementsByClassName("course-summaryitem")
        ).forEach((element, i) => {
            element.addEventListener("click", (e) =>
                e.target.querySelector("a")?.click()
            );

            console.log(
                document.querySelectorAll(
                    ".course-summaryitem > div > div > div:last-child"
                )
            );
        });
    }
}

do_da_course_clickable_thing();
document.querySelector("head").appendChild(darkStyles);
