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
        background-color: #1893ff !important;
    }

    .block .block-cards .progress {
        height: 1rem !important;
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
    
`;

document.querySelector("head").appendChild(darkStyles);

setTimeout(() => {
    Array.from(document.getElementsByClassName("course-summaryitem")).forEach(
        (element) => {
            element.addEventListener("click", (e) =>
                e.target.querySelector("a").click()
            );
        }
    );
}, 1 * 1000);
