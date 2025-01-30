document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const table = document.getElementById("patientsTable");
    const tbody = table.getElementsByTagName("tbody")[0];
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const hiddenRows = document.querySelectorAll(".hidden-row");

    let rowsShown = 4; // Initially showing only 4 rows

    // Search filter
    searchInput.addEventListener("input", function () {
        let filter = searchInput.value.toLowerCase();
        let rows = tbody.getElementsByTagName("tr");

        for (let row of rows) {
            let name = row.cells[0].textContent.toLowerCase();
            let location = row.cells[4].textContent.toLowerCase();
            row.style.display = (name.includes(filter) || location.includes(filter)) ? "" : "none";
        }
    });

    // Sorting function
    function sortTable(columnIndex) {
        const rows = Array.from(tbody.getElementsByTagName("tr"));
        const isNumeric = columnIndex === 1;
        const direction = table.getAttribute("data-sort-dir") === "asc" ? "desc" : "asc";
        table.setAttribute("data-sort-dir", direction);

        rows.sort((rowA, rowB) => {
            let cellA = rowA.cells[columnIndex].textContent.trim();
            let cellB = rowB.cells[columnIndex].textContent.trim();

            if (isNumeric) {
                return (direction === "asc" ? 1 : -1) * (parseInt(cellA) - parseInt(cellB));
            } else {
                return (direction === "asc" ? 1 : -1) * cellA.localeCompare(cellB);
            }
        });

        rows.forEach(row => tbody.appendChild(row));
    }

    // Load More Button Functionality
    loadMoreBtn.addEventListener("click", function () {
        hiddenRows.forEach((row, index) => {
            if (index < rowsShown) {
                row.style.display = "";
            }
        });

        rowsShown += 4; // Load 4 more rows at a time

        if (rowsShown >= hiddenRows.length) {
            loadMoreBtn.style.display = "none"; // Hide button if all rows are shown
        }
    });

    // Expose sorting function globally
    window.sortTable = sortTable;
});
