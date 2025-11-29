document.addEventListener("DOMContentLoaded", async () => {
    setupSidebarHighlight();
    displayCurrentDate();

});
function setupSidebarHighlight() {
    const sidebarItems = document.querySelectorAll(".sidebar ul li");
    if (!sidebarItems.length) return;

    const normalizePath = (path) => {
        if (!path) return "/";
        const cleaned = path.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
        return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
    };

    const currentPath = normalizePath(window.location.pathname);
    let matchedByPath = false;

    sidebarItems.forEach(item => {
        const link = item.querySelector("a");
        item.classList.remove("active");

        item.addEventListener("click", () => {
            const menuName = item.dataset.menu;
            if (menuName) {
                localStorage.setItem("activeMenu", menuName);
            } else {
                localStorage.removeItem("activeMenu");
            }
        });

        if (link) {
            const linkPath = normalizePath(new URL(link.href, window.location.origin).pathname);
            if (linkPath === currentPath) {
                item.classList.add("active");
                localStorage.setItem("activeMenu", item.dataset.menu);
                matchedByPath = true;
            }
        }
    });

    if (!matchedByPath) {
        const storedMenu = localStorage.getItem("activeMenu");
        const fallbackMenu = sidebarItems.some(item => item.dataset.menu === storedMenu)
            ? storedMenu
            : sidebarItems[0]?.dataset.menu;

        sidebarItems.forEach(item => {
            item.classList.toggle("active", item.dataset.menu === fallbackMenu);
        });

        if (fallbackMenu) {
            localStorage.setItem("activeMenu", fallbackMenu);
        } else {
            localStorage.removeItem("activeMenu");
        }
    }
}

// Display current date
function displayCurrentDate() {
    const dateElement = document.getElementById("date");
    if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString("enUS", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }
}