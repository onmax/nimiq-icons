export { };

const search = document.querySelector<HTMLInputElement>("#search")
if (!search) throw new Error("Search input not found")

const elements = document.querySelectorAll<HTMLButtonElement>("[data-icon]")
if (!elements.length) throw new Error("No elements found")

const icons = Array.from(elements).map((element) => {
    const keywords = [element.dataset.icon as string, ...element.dataset.keywords?.split(",") || []]
    return { element: element.parentElement as HTMLElement, keywords }
})

const searchIcons = (query: string) => {
    icons.forEach(({ element, keywords }) => {
        if (keywords.some((keyword) => keyword.toLowerCase().includes(query.toLowerCase()))) {
            element.style.removeProperty("display")
        } else {
            element.style.display = "none"
        }
    })
}

search.addEventListener("input", (event) => {
    searchIcons((event.target as HTMLInputElement).value)
})
