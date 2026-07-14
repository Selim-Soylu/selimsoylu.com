const reveals = document.querySelectorAll(".reveal");

function reveal() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;

        if (top < windowHeight - 120) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
reveal();

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

menu.addEventListener("click", () => {
    nav.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});

const stats = document.querySelectorAll(".stat-card h2");
const statsGrid = document.querySelector(".stats-grid");

if (statsGrid) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            stats.forEach(stat => {

                if (stat.dataset.done) return;

                stat.dataset.done = "1";

                const finalText = stat.textContent;
                const target = parseInt(finalText);

                let count = 0;
                const speed = 80;

                const timer = setInterval(() => {

                    count++;

                    stat.textContent = count + "+";

                    if (count >= target) {
                        stat.textContent = finalText;
                        clearInterval(timer);
                    }

                }, speed);

            });

            observer.unobserve(statsGrid);

        });

    }, {
        threshold: 0.6
    });

    observer.observe(statsGrid);
}
