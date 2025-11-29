document.addEventListener("DOMContentLoaded", async () => {
    setupSidebarToggle();
    setupMobileSidebar();
    setupSidebarHighlight();
    displayCurrentDate();
});

// 📌 Sidebar toggle functionality (Desktop)
function setupSidebarToggle() {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggle-btn");

    if (!sidebar || !toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        localStorage.setItem("sidebarState", sidebar.classList.contains("collapsed") ? "collapsed" : "expanded");
    });

    if (localStorage.getItem("sidebarState") === "collapsed") {
        sidebar.classList.add("collapsed");
    }
}

// 📌 Mobile sidebar functionality
function setupMobileSidebar() {
    const sidebar = document.getElementById("sidebar");
    const mobileToggle = document.getElementById("mobile-menu-toggle");
    const overlay = document.getElementById("sidebar-overlay");

    console.log("Sidebar:", sidebar);
    console.log("Mobile toggle:", mobileToggle);
    console.log("Overlay:", overlay);

    if (!sidebar) {
        console.error("Sidebar not found!");
        return;
    }
    if (!mobileToggle) {
        console.error("Mobile toggle button not found!");
        return;
    }
    if (!overlay) {
        console.error("Overlay not found!");
        return;
    }

    // Toggle mobile sidebar
    mobileToggle.addEventListener("click", (e) => {
        console.log("Mobile toggle clicked!");
        sidebar.classList.toggle("mobile-active");
        overlay.classList.toggle("active");
    });

    // Close sidebar when clicking overlay
    overlay.addEventListener("click", () => {
        sidebar.classList.remove("mobile-active");
        overlay.classList.remove("active");
    });

    // Close sidebar when clicking a menu item (mobile only)
    if (window.innerWidth <= 767) {
        const menuItems = document.querySelectorAll(".sidebar ul li a");
        menuItems.forEach(item => {
            item.addEventListener("click", () => {
                sidebar.classList.remove("mobile-active");
                overlay.classList.remove("active");
            });
        });
    }

    // Handle window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 767) {
            sidebar.classList.remove("mobile-active");
            overlay.classList.remove("active");
        }
    });
}

// Display current date
function displayCurrentDate() {
    const dateElement = document.getElementById("date");
    if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }
}