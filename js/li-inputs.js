document.addEventListener("DOMContentLoaded", () => {
    // обработчик input к li
    function addInputListenersToLi(ul) {
        ul.querySelectorAll("li").forEach((li) => {
            li.addEventListener("input", handleInput);
        });
    }

    // обработка событий input
    function handleInput(event) {
        const li = event.target;
        const ul = li.parentElement;

        // добавление li
        if (event.inputType === "insertLineBreak") {
            event.preventDefault();
            const newLi = document.createElement("li");
            newLi.setAttribute("contenteditable", "true");
            newLi.textContent = "";
            ul.insertBefore(newLi, li.nextSibling);

            setTimeout(() => newLi.focus(), 0);
            newLi.addEventListener("input", handleInput);
        }

        // Удаление пустого li
        if (li.textContent.trim() === "") {
            if (ul.children.length === 1) {
                return;
            }

            li.remove();

            const prevLi = li.previousElementSibling;
            if (prevLi) {
                prevLi.focus();
            }
        }
    }

    document.querySelectorAll(".job-points ul").forEach((ul) => {
        addInputListenersToLi(ul);

        ul.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                const li = event.target;
                if (li.tagName === "LI") {
                    event.preventDefault();
                    const newLi = document.createElement("li");
                    newLi.setAttribute("contenteditable", "true");
                    newLi.textContent = "";
                    ul.insertBefore(newLi, li.nextSibling);
                    setTimeout(() => newLi.focus(), 0);
                    newLi.addEventListener("input", handleInput);
                }
            }
        });

        // Отслеживаем добавление новых <li> с помощью MutationObserver
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
                    mutation.addedNodes.forEach((node) => {
                        if (node.tagName === "LI") {
                            node.addEventListener("input", handleInput);
                        }
                    });
                }
            }
        });

        // тут с помощью MutationObserver отслеживаем чайлдов.
        observer.observe(ul, { childList: true });
    });
});
