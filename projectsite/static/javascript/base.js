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
        const storedMenu = localStorage.getItem("activeMenu") || sidebarItems[0]?.dataset.menu;
        sidebarItems.forEach(item => {
            item.classList.toggle("active", item.dataset.menu === storedMenu);
        });
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